import { Exclude } from 'class-transformer';
import { User } from 'src/auth/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { TaskStatus } from './task-status.enum';

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

  @ManyToOne((_type) => User, (user) => user.tasks, { eager: false })
  // Remove this property when send as plain text
  @Exclude({ toPlainOnly: true })
  user: User;
}
