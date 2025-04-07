import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Society } from './entities/society.entity';

@Injectable()
export class SocietyService {
  constructor(
    @InjectRepository(Society)
    private societyRepository: Repository<Society>,
  ) {}

  findAll() {
    return this.societyRepository.find();
  }
}
