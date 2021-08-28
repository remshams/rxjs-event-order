import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class TasksFilterService {
  private readonly tasksFilterPattern = new BehaviorSubject('');

  readonly tasksFilterPattern$: Observable<string>;

  constructor() {
    this.tasksFilterPattern$ = this.tasksFilterPattern.asObservable();
  }

  setTasksFilterPattern(tasksFilterPattern: string) {
    this.tasksFilterPattern.next(tasksFilterPattern);
  }
}
