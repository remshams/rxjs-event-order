import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';

@Injectable()
export class TasksFilterService {
  private readonly tasksFilterPattern = new ReplaySubject<string>(1);

  readonly tasksFilterPattern$: Observable<string>;

  constructor() {
    this.tasksFilterPattern$ = this.tasksFilterPattern.asObservable();
  }

  setTasksFilterPattern(tasksFilterPattern: string) {
    this.tasksFilterPattern.next(tasksFilterPattern);
  }
}
