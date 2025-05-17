import { Controller, Post, Body, Get, UseGuards, Request, Param } from '@nestjs/common';
import { FeedbackService } from './feedback.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateFeedbackDto } from './dto/create-feedback.dto';
import { UsersService } from '../users/users.service';

@Controller('feedback')
export class FeedbackController {
  constructor(
    private readonly feedbackService: FeedbackService,
    private readonly usersService: UsersService,
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@Body() createFeedbackDto: CreateFeedbackDto, @Request() req) {
    const user = await this.usersService.findById(req.user.id);
    return this.feedbackService.create(
      createFeedbackDto.message,
      createFeedbackDto.rating,
      user,
      createFeedbackDto.societyId,
      createFeedbackDto.eventId
    );
  }

  @Get()
  findAll() {
    return this.feedbackService.findAll();
  }

  @Get('society/:id')
  findBySociety(@Param('id') id: string) {
    return this.feedbackService.findBySociety(id);
  }

  @Get('event/:id')
  findByEvent(@Param('id') id: string) {
    return this.feedbackService.findByEvent(id);
  }
}