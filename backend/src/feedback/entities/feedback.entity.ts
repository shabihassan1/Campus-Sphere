import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne } from 'typeorm';

@Entity('feedback')
export class UserFeedback {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  message: string;

  @Column({ type: 'int', nullable: true })
  rating?: number;

  @ManyToOne('User', { eager: true })
  user: any;

  @ManyToOne('Society', { nullable: true, eager: true })
  society: any;

  @ManyToOne('Event', { nullable: true, eager: true })
  event: any;

  @CreateDateColumn()
  createdAt: Date;
}