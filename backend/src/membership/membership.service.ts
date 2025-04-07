import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Membership } from './entities/membership.entity';

@Injectable()
export class MembershipService {
  constructor(
    @InjectRepository(Membership)
    private membershipRepository: Repository<Membership>,
  ) {}

  async joinSociety(userId: string, societyId: string) {
    const request = this.membershipRepository.create({ userId, societyId });
    return await this.membershipRepository.save(request);
  }
}
