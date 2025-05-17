import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Society } from './entities/society.entity';
import { CreateSocietyDto } from './dto/create-society.dto';
import { User } from '../users/entities/user.entity';

@Injectable()
export class SocietiesService {
  constructor(
    @InjectRepository(Society)
    private societiesRepository: Repository<Society>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(createSocietyDto: CreateSocietyDto, userId: string): Promise<Society> {
    const user = await this.usersRepository.findOne({ where: { id: userId } });
    if (!user) throw new NotFoundException('User not found');
    const society = this.societiesRepository.create({ ...createSocietyDto, president: user });
    return this.societiesRepository.save(society);
  }

  async findAll(): Promise<Society[]> {
    return this.societiesRepository.find({
      relations: ['members'],
    });
  }

  async findOne(id: string): Promise<Society> {
    const society = await this.societiesRepository.findOne({
      where: { id },
      relations: ['members'],
    });
    if (!society) {
      throw new NotFoundException(`Society with ID ${id} not found`);
    }
    return society;
  }

  async joinSociety(societyId: string, userId: string): Promise<Society> {
    const society = await this.findOne(societyId);
    const user = await this.usersRepository.findOne({ where: { id: userId } });
    
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    if (!society.members) {
      society.members = [];
    }

    if (!society.members.some(member => member.id === userId)) {
      society.members.push(user);
      await this.societiesRepository.save(society);
    }

    return society;
  }

  async leaveSociety(societyId: string, userId: string): Promise<Society> {
    const society = await this.findOne(societyId);
    
    if (society.members) {
      society.members = society.members.filter(member => member.id !== userId);
      await this.societiesRepository.save(society);
    }

    return society;
  }

  async editSociety(id: string, updateDto: Partial<CreateSocietyDto>): Promise<Society> {
    await this.societiesRepository.update(id, updateDto);
    return this.findOne(id);
  }

  async removeMember(societyId: string, memberId: string): Promise<Society> {
    const society = await this.findOne(societyId);
    society.members = society.members.filter(member => member.id !== memberId);
    await this.societiesRepository.save(society);
    return society;
  }
} 