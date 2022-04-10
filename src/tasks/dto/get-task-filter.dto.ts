import { IsEnum, IsOptional, IsString } from 'class-validator';
import { TaskStatus } from '../task-status.enum';

export class GetTasksFilterDto {
  // optional symbol is not working at runtime
  // Use IsOptional to validate instead
  @IsOptional()
  @IsEnum(TaskStatus)
  status?: TaskStatus;

  // optional symbol is not working at runtime
  // Use IsOptional to validate instead
  @IsOptional()
  @IsString()
  search?: string;
}
