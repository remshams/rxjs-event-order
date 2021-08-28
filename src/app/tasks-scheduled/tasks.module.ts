import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TasksFilterService } from './tasks-filter.service';
import { TasksComponent } from './tasks.component';
import { TasksService } from './tasks.service';

@NgModule({
  declarations: [TasksComponent],
  imports: [CommonModule],
  exports: [TasksComponent],
  providers: [TasksService, TasksFilterService],
})
export class TasksModule {}
