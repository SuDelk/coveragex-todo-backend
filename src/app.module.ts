import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TasksModule } from './tasks/tasks.module';
import { AppController } from './app.controller';

@Module({
  imports: [ConfigModule.forRoot(), TasksModule],
  controllers: [AppController],
})
export class AppModule {}
