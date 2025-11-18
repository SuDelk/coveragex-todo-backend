import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreateTaskDto } from './dto/create-task.dto';

@Injectable()
export class TasksService {
  private readonly prisma = new PrismaClient();

  async createTask(dto: CreateTaskDto) {
    return this.prisma.task.create({
      data: {
        title: dto.title,
        description: dto.description,
      },
    });
  }

  async getRecentTasks() {
    return this.prisma.task.findMany({
      where: { completed: false },
      orderBy: { created_at: 'desc' },
      take: 5,
    });
  }

  async markDone(id: number) {
    return this.prisma.task.update({
      where: { id },
      data: { completed: true },
    });
  }

  async markPending(id: number) {
    return this.prisma.task.update({
      where: { id },
      data: { completed: false },
    });
  }

  async deleteTask(id: number) {
    return this.prisma.task.delete({
      where: { id },
    });
  }
}
