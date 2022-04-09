import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { v4 as uuid } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-task-filter.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks(): Task[] {
    return this.tasks;
  }
  getTaskById(id: string): Task {
    return this.tasks.find((task) => task.id === id);
  }

  getTasksFilter(filterDto: GetTasksFilterDto): Task[] {
    const { status, search } = filterDto;

    // Define a new array to store the filtered tasks
    let tasks = this.getAllTasks();

    // If status is defined, filter the tasks by status
    if (status) {
      tasks = tasks.filter((task) => task.status === status);
    }

    // If search is defined, filter the tasks by search
    if (search) {
      tasks = tasks.filter(
        (task) =>
          task.title.includes(search) || task.description.includes(search),
      );
    }

    // Return the filtered tasks
    return tasks;
  }

  deleteTaskById(id: string): void {
    this.tasks = this.tasks.filter((task) => task.id !== id);
  }

  updateTaskStatus(id: string, status: TaskStatus): Task {
    const task = this.getTaskById(id);
    task.status = status;
    return task;
  }

  createTask(createTaskDto: CreateTaskDto): Task {
    const { title, description } = createTaskDto;
    const task: Task = {
      id: uuid(),
      title,
      description,
      status: TaskStatus.OPEN,
    };

    this.tasks.push(task);
    return task;
  }
}
