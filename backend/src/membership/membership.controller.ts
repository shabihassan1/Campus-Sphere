import { Controller, Post, Body } from '@nestjs/common';
import { MembershipService } from './membership.service';

@Controller('membership')
export class MembershipController {
  constructor(private readonly membershipService: MembershipService) {}

  @Post('join')
  join(@Body() body: { userId: string; societyId: string }) {
    return this.membershipService.joinSociety(body.userId, body.societyId);
  }
}
