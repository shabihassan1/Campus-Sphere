import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserFeedback } from './entities/feedback.entity';
import { User } from '../users/entities/user.entity';
import { ManyToOne } from 'typeorm';
import { Society } from '../societies/entities/society.entity';
import { Event } from '../events/entities/event.entity';

@Injectable()
export class FeedbackService {
  constructor(
    @InjectRepository(UserFeedback)
    private feedbackRepository: Repository<UserFeedback>,
    @InjectRepository(Society)
    private societiesRepository: Repository<Society>,
    @InjectRepository(Event)
    private eventsRepository: Repository<Event>,
  ) {}

  async create(
    message: string,
    rating: number | undefined,
    user: User,
    societyId?: string,
    eventId?: string
  ): Promise<UserFeedback> {
    let society: Society | undefined;
    let event: Event | undefined;

    if (societyId) {
      const foundSociety = await this.societiesRepository.findOne({ where: { id: societyId } });
      if (!foundSociety) {
        throw new NotFoundException(`Society with ID ${societyId} not found`);
      }
      society = foundSociety;
    }

    if (eventId) {
      const foundEvent = await this.eventsRepository.findOne({ where: { id: eventId } });
      if (!foundEvent) {
        throw new NotFoundException(`Event with ID ${eventId} not found`);
      }
      event = foundEvent;
    }

    const feedback = this.feedbackRepository.create({
      message,
      rating,
      user,
      society,
      event,
    });

    return this.feedbackRepository.save(feedback);
  }

  async findAll(): Promise<UserFeedback[]> {
    return this.feedbackRepository.find({
      relations: ['user', 'society', 'event'],
    });
  }

  async findBySociety(societyId: string): Promise<UserFeedback[]> {
    return this.feedbackRepository.find({
      where: { society: { id: societyId } },
      relations: ['user', 'society', 'event'],
    });
  }

  async findByEvent(eventId: string): Promise<UserFeedback[]> {
    return this.feedbackRepository.find({
      where: { event: { id: eventId } },
      relations: ['user', 'society', 'event'],
    });
  }
}
 