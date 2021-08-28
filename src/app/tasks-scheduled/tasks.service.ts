import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class TasksService {
  private readonly tasks = new BehaviorSubject<Array<string>>([]);

  readonly tasks$: Observable<Array<string>>;

  constructor() {
    this.tasks$ = this.tasks.asObservable();
  }

  setTasks(tasks: Array<string>) {
    console.log(tasks, 'TasksService: set tasks');
    this.tasks.next(tasks);
  }
}
