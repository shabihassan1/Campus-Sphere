import { Injectable } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { Response } from 'express';

@Injectable()
export class AuthService {
  login(loginDto: LoginDto, res: Response) {
    const token = 'mock-jwt-token';
    res.cookie('jwt', token, { httpOnly: true });
    return { message: 'Login successful' };
  }
}
