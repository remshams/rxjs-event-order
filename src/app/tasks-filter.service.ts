import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable, ReplaySubject } from 'rxjs';
import {
  distinctUntilChanged,
  map,
  takeUntil,
  tap,
  withLatestFrom,
} from 'rxjs/operators';
import { TasksService } from './tasks.service';
import { isEqualArray } from './utils/primitives';

@Injectable({
  providedIn: 'root',
})
export class TasksFilterService implements OnDestroy {
  private readonly destroy = new ReplaySubject<void>(1);
  private readonly tasksFilterPattern = new BehaviorSubject('');

  readonly tasksFilterPattern$: Observable<string>;

  constructor(private tasksService: TasksService) {
    this.tasksFilterPattern$ = this.tasksFilterPattern.asObservable();

    this.setupTasksFilter(this.tasksService.tasks$, this.tasksFilterPattern$);
  }

  ngOnDestroy() {
    this.destroy.next();
    this.destroy.complete();
  }

  setTasksFilterPattern(tasksFilterPattern: string) {
    this.tasksFilterPattern.next(tasksFilterPattern);
  }

  private setupTasksFilter(
    tasks$: Observable<Array<string>>,
    tasksFilterPattern$: Observable<string>
  ) {
    return tasks$
      .pipe(
        withLatestFrom(tasksFilterPattern$),
        tap((values) =>
          console.log(values, `TasksFilterService: filter tasks with pattern`)
        ),
        map(([tasks, tasksFilterPattern]) =>
          tasks.filter((task) => task.includes(tasksFilterPattern))
        ),
        distinctUntilChanged(isEqualArray),
        takeUntil(this.destroy)
      )
      .subscribe((tasks) => this.tasksService.setTasks(tasks));
  }
}
