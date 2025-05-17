import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Event } from './entities/event.entity';
import { CreateEventDto } from './dto/create-event.dto';
import { Society } from '../societies/entities/society.entity';
import { User } from '../users/entities/user.entity';

@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(Event)
    private eventsRepository: Repository<Event>,
    @InjectRepository(Society)
    private societiesRepository: Repository<Society>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(createEventDto: CreateEventDto): Promise<Event> {
    const society = await this.societiesRepository.findOne({ where: { id: createEventDto.societyId } });
    if (!society) throw new NotFoundException('Society not found');
    const event = this.eventsRepository.create({
      ...createEventDto,
      date: new Date(createEventDto.date),
      society,
    });
    return this.eventsRepository.save(event);
  }

  async findAll(): Promise<Event[]> {
    return this.eventsRepository.find({ relations: ['attendees', 'society'] });
  }

  async findOne(id: string): Promise<Event> {
    const event = await this.eventsRepository.findOne({ where: { id }, relations: ['attendees', 'society'] });
    if (!event) throw new NotFoundException('Event not found');
    return event;
  }

  async joinEvent(eventId: string, userId: string): Promise<Event> {
    const event = await this.findOne(eventId);
    const user = await this.usersRepository.findOne({ where: { id: userId } });
    if (!user) throw new NotFoundException('User not found');
    if (!event.attendees) event.attendees = [];
    if (!event.attendees.some(u => u.id === userId)) {
      event.attendees.push(user);
      await this.eventsRepository.save(event);
    }
    return event;
  }

  async leaveEvent(eventId: string, userId: string): Promise<Event> {
    const event = await this.findOne(eventId);
    if (event.attendees) {
      event.attendees = event.attendees.filter(u => u.id !== userId);
      await this.eventsRepository.save(event);
    }
    return event;
  }
} 