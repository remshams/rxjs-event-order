import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { TasksModule as TasksWithIssueModule } from './tasks-issue/tasks.module';
import { TasksModule as TasksScheduledModule } from './tasks-scheduled/tasks.module';
import { TasksModule as TasksSingleStreamModule } from './tasks-single-stream/tasks.module';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, TasksWithIssueModule, TasksScheduledModule, TasksSingleStreamModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
