import { Controller, Get } from '@nestjs/common';
import { SocietyService } from './society.service';

@Controller('societies')
export class SocietyController {
  constructor(private readonly societyService: SocietyService) {}

  @Get()
  findAll() {
    return this.societyService.findAll();
  }
}
