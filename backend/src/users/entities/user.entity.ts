import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Exclude } from 'class-transformer';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  name: string;

  @Column()
  @Exclude() // Exclude password from responses
  password: string;

  @Column({ default: 'student' })
  role: string;

  @Column()
  securityQuestion: string;

  @Column()
  @Exclude() // Exclude security answer hash from responses
  securityAnswerHash: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
} 