import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap, withLatestFrom } from 'rxjs/operators';
import { TasksFilterService } from './tasks-filter.service';
import { TasksService } from './tasks.service';

@Component({
  selector: 'app-tasks-with-issue',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: ` {{ areTasksValid$ | async }} `,
})
export class TasksComponent {
  readonly areTasksValid$: Observable<boolean>;

  constructor(
    private tasksService: TasksService,
    private tasksFilterService: TasksFilterService
  ) {
    this.areTasksValid$ = this.setupAreTasksValid(
      tasksService.tasks$,
      tasksFilterService.tasksFilterPattern$
    );

    this.tasksFilterService.setTasksFilterPattern('code');
    setTimeout(() => {
      this.tasksService.setTasks(['write code', 'other']);
    }, 2000);
  }

  private setupAreTasksValid(
    tasks$: Observable<Array<string>>,
    tasksFilterPattern$: Observable<string>
  ): Observable<boolean> {
    return tasks$.pipe(
      withLatestFrom(tasksFilterPattern$),
      tap((values) =>
        console.log(
          values,
          `AppComponent: Check if tasks are valid for pattern`
        )
      ),
      map(([tasks, tasksFilterPattern]) =>
        tasks.reduce(
          (isValid, task) => isValid && task.includes(tasksFilterPattern),
          true as boolean
        )
      )
    );
  }
}
