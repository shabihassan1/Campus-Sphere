import { Test, TestingModule } from '@nestjs/testing';
import { FeedbackService } from './feedback.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserFeedback } from './entities/feedback.entity';
import { Society } from '../societies/entities/society.entity';
import { Event } from '../events/entities/event.entity';
import { User } from '../users/entities/user.entity';

describe('FeedbackService', () => {
  let service: FeedbackService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FeedbackService,
        { provide: getRepositoryToken(UserFeedback), useValue: {} },
        { provide: getRepositoryToken(Society), useValue: {} },
        { provide: getRepositoryToken(Event), useValue: {} },
        { provide: getRepositoryToken(User), useValue: {} },
      ],
    }).compile();

    service = module.get<FeedbackService>(FeedbackService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
