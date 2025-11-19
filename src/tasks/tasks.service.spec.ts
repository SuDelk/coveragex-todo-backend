import { TasksService } from './tasks.service';
import { prismaMock } from '../../test/prisma.mock';

describe('TasksService', () => {
  let service: TasksService;

  beforeEach(() => {
    service = new TasksService();
    (service as unknown as { prisma: typeof prismaMock }).prisma = prismaMock;
  });

  it('should create a task', async () => {
    const dto = { title: 'Test', description: 'Desc' };

    prismaMock.task.create.mockResolvedValue({
      id: 1,
      ...dto,
    });

    await expect(service.createTask(dto)).resolves.toEqual({
      id: 1,
      ...dto,
    });
  });

  it('should get recent tasks', async () => {
    prismaMock.task.findMany.mockResolvedValue([
      { id: 1, title: 'A', description: 'B' },
    ]);

    const result = await service.getRecentTasks();
    expect(result).toHaveLength(1);
  });

  it('should mark done', async () => {
    prismaMock.task.update.mockResolvedValue({
      id: 1,
      completed: true,
    });

    await expect(service.markDone(1)).resolves.toEqual({
      id: 1,
      completed: true,
    });
  });

  it('should delete task', async () => {
    prismaMock.task.delete.mockResolvedValue({ id: 1 });

    await expect(service.deleteTask(1)).resolves.toEqual({ id: 1 });
  });
});
