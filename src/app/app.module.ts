import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { TasksModule as TasksWithIssueModule } from './tasks-issue/tasks.module';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, TasksWithIssueModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
