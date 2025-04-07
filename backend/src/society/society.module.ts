import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Society } from './entities/society.entity';
import { SocietyService } from './society.service';
import { SocietyController } from './society.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Society])],
  controllers: [SocietyController],
  providers: [SocietyService],
})
export class SocietyModule {}
