import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, withLatestFrom } from 'rxjs/operators';
import { TasksFilterService } from './tasks-filter.service';

@Injectable()
export class TasksService {
  private readonly tasks = new BehaviorSubject<Array<string>>([]);

  readonly tasks$: Observable<Array<string>>;

  constructor(tasksFilterService: TasksFilterService) {
    this.tasks$ = this.setupFilteredTasks(this.tasks.asObservable(), tasksFilterService.tasksFilterPattern$);
  }

  setTasks(tasks: Array<string>) {
    console.log(tasks, 'TasksService: set tasks');
    this.tasks.next(tasks);
  }

  private setupFilteredTasks(
    newTasks$: Observable<Array<string>>,
    tasksFilterPattern$: Observable<string>
  ): Observable<Array<string>> {
    return newTasks$.pipe(
      withLatestFrom(tasksFilterPattern$),
      map(([newTasks, tasksFilterPattern]) => newTasks.filter(task => task.includes(tasksFilterPattern)))
    );
  }
}
