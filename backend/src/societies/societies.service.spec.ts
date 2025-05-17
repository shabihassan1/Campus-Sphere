import { Test, TestingModule } from '@nestjs/testing';
import { SocietiesService } from './societies.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Society } from './entities/society.entity';
import { User } from '../users/entities/user.entity';

describe('SocietiesService', () => {
  let service: SocietiesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SocietiesService,
        { provide: getRepositoryToken(Society), useValue: {} },
        { provide: getRepositoryToken(User), useValue: {} },
      ],
    }).compile();

    service = module.get<SocietiesService>(SocietiesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
