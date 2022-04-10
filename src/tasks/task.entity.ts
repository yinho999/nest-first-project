import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { TaskStatus } from './task.model';

@Entity()
export class Task {
  // Primary key and auto generated
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // Make it a column
  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  status: TaskStatus;
}
