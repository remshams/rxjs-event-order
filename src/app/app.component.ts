import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  styleUrls: ['./app.component.css'],
  template: `
    <app-tasks-with-issue></app-tasks-with-issue
    ><app-tasks-scheduled></app-tasks-scheduled>
  `,
})
export class AppComponent {}
