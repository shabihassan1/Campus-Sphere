import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserFeedback } from './entities/feedback.entity';
import { User } from '../users/entities/user.entity';
import { Society } from '../societies/entities/society.entity';
import { Event } from '../events/entities/event.entity';
import { FeedbackService } from './feedback.service';
import { FeedbackController } from './feedback.controller';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserFeedback, User, Society, Event]),
    UsersModule,
  ],
  providers: [FeedbackService],
  controllers: [FeedbackController],
  exports: [FeedbackService],
})
export class FeedbackModule {} 