import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);
    if (user && await bcrypt.compare(password, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(email: string, password: string) {
    const user = await this.validateUser(email, password);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { email: user.email, sub: user.id };
    return {
      token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    };
  }

  async register(email: string, password: string, name: string, securityQuestion: string, securityAnswer: string) {
    const securityAnswerHash = await bcrypt.hash(securityAnswer, 10);
    const user = await this.usersService.create(email, password, name, securityQuestion, securityAnswerHash);
    const { password: _, securityAnswerHash: __, ...result } = user;
    return result;
  }

  async getSecurityQuestion(email: string): Promise<{ question: string } | { error: string }> {
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      return { error: 'User not found' };
    }
    return { question: user.securityQuestion };
  }

  async resetPassword(email: string, securityAnswer: string, newPassword: string): Promise<{ success: boolean; message: string }> {
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      return { success: false, message: 'User not found' };
    }
    const isMatch = await bcrypt.compare(securityAnswer, user.securityAnswerHash);
    if (!isMatch) {
      return { success: false, message: 'Incorrect security answer' };
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await this.usersService.save(user);
    return { success: true, message: 'Password reset successful' };
  }
} 