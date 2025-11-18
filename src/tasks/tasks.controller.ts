import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Delete,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  create(@Body() dto: CreateTaskDto) {
    return this.tasksService.createTask(dto);
  }

  @Get()
  findRecent() {
    return this.tasksService.getRecentTasks();
  }

  @Get('all')
  findAll() {
    return this.tasksService.getFindAll();
  }

  @Patch('/:id/markdone')
  markPending(@Param('id') id: string) {
    return this.tasksService.markDone(Number(id));
  }

  @Patch(':id/markpending')
  markDone(@Param('id') id: string) {
    return this.tasksService.markPending(Number(id));
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tasksService.deleteTask(Number(id));
  }
}
