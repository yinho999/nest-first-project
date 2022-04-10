import { DataSource, EntityRepository, Repository } from 'typeorm';
import { Task } from './task.entity';

// Note that Repository<Task> is using task entity
@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {}
