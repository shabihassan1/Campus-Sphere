import { Controller, Get, Post, Body, Param, UseGuards, Request, Patch, Delete, ForbiddenException } from '@nestjs/common';
import { SocietiesService } from './societies.service';
import { CreateSocietyDto } from './dto/create-society.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('societies')
export class SocietiesController {
  constructor(private readonly societiesService: SocietiesService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() createSocietyDto: CreateSocietyDto, @Request() req) {
    return this.societiesService.create(createSocietyDto, req.user.id);
  }

  @Get()
  findAll() {
    return this.societiesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.societiesService.findOne(id);
  }

  @Post(':id/join')
  @UseGuards(JwtAuthGuard)
  joinSociety(@Param('id') id: string, @Request() req) {
    return this.societiesService.joinSociety(id, req.user.id);
  }

  @Post(':id/leave')
  @UseGuards(JwtAuthGuard)
  leaveSociety(@Param('id') id: string, @Request() req) {
    return this.societiesService.leaveSociety(id, req.user.id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  async editSociety(@Param('id') id: string, @Body() updateDto: Partial<CreateSocietyDto>, @Request() req) {
    const society = await this.societiesService.findOne(id);
    if (society.president.id !== req.user.id) throw new ForbiddenException('Only the president can edit this society');
    return this.societiesService.editSociety(id, updateDto);
  }

  @Get(':id/members')
  @UseGuards(JwtAuthGuard)
  async getMembers(@Param('id') id: string, @Request() req) {
    const society = await this.societiesService.findOne(id);
    if (society.president.id !== req.user.id) throw new ForbiddenException('Only the president can view members');
    return society.members;
  }

  @Delete(':id/members/:memberId')
  @UseGuards(JwtAuthGuard)
  async removeMember(@Param('id') id: string, @Param('memberId') memberId: string, @Request() req) {
    const society = await this.societiesService.findOne(id);
    if (society.president.id !== req.user.id) throw new ForbiddenException('Only the president can remove members');
    if (memberId === req.user.id) throw new ForbiddenException('President cannot remove themselves');
    return this.societiesService.removeMember(id, memberId);
  }
} 