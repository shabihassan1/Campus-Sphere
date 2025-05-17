import { IsString, IsNotEmpty, IsOptional, IsUrl } from 'class-validator';

export class CreateSocietyDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsOptional()
  @IsUrl()
  logoUrl?: string;

  @IsString()
  @IsNotEmpty()
  category: string;
} 