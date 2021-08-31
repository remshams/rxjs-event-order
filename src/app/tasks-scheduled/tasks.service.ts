import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';

@Injectable()
export class TasksService {
  private readonly tasks = new ReplaySubject<Array<string>>(1);

  readonly tasks$: Observable<Array<string>>;

  constructor() {
    this.tasks$ = this.tasks.asObservable();
  }

  setTasks(tasks: Array<string>) {
    console.log(tasks, 'TasksService: set tasks');
    this.tasks.next(tasks);
  }
}
