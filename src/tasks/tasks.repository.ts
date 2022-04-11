import { DeleteResult, EntityRepository, Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-task-filter.dto';
import { TaskStatus } from './task-status.enum';
import { Task } from './task.entity';

// Note that Repository<Task> is using task entity
@EntityRepository(Task)
export class TasksRepository extends Repository<Task> {
  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    const { title, description } = createTaskDto;

    // Create a new task
    const task = this.create({
      title,
      description,
      status: TaskStatus.OPEN,
    });

    // Save the task to the database
    await this.save(task);

    // Return the task
    return task;
  }

  async deleteTaskById(id: string): Promise<DeleteResult> {
    // Delete the task
    return await this.delete(id);
  }

  async updateTaskStatus(id: string, status: TaskStatus): Promise<Task> {
    // Update the task
    const task = await this.findOne(id);

    // Set the status
    task.status = status;

    // Save the task to the database
    await this.save(task);
    return task;
  }

  async getTasks(filterDto: GetTasksFilterDto): Promise<Task[]> {
    const { status, search } = filterDto;

    // Create a query builder for task entity
    const query = this.createQueryBuilder('task');

    // If status is defined, add a where clause
    if (status) {
      query.andWhere('task.status = :status', { status });
    }

    // If search is defined, add a where clause
    if (search) {
      query.andWhere(
        // For the search, we need to use the like operator
        // Lower for case insensitive
        'LOWER(task.title) LIKE LOWER(:search) OR LOWER(task.description) LIKE LOWER(:search)',
        { search: `%${search}%` },
      );
    }

    const tasks = await query.getMany();
    // Return the tasks
    return tasks;
  }
}
