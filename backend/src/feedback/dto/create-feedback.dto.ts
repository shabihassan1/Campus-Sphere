import { IsString, IsNotEmpty, IsOptional, IsInt, ValidateIf } from 'class-validator';

export class CreateFeedbackDto {
  @IsString()
  @IsNotEmpty()
  message: string;

  @IsOptional()
  @IsInt()
  rating?: number;

  @IsOptional()
  @IsString()
  societyId?: string;

  @IsOptional()
  @IsString()
  eventId?: string;
} 