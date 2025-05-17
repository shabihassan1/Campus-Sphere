import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToMany, JoinTable, OneToMany, ManyToOne } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Event } from '../../events/entities/event.entity';

@Entity('societies')
export class Society {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column('text')
  description: string;

  @Column({ nullable: true })
  logoUrl: string;

  @Column()
  category: string;

  @Column({ default: true })
  isActive: boolean;

  @ManyToMany(() => User)
  @JoinTable({
    name: 'society_members',
    joinColumn: { name: 'society_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'user_id', referencedColumnName: 'id' },
  })
  members: User[];

  @OneToMany(() => Event, event => event.society)
  events: Event[];

  @ManyToOne(() => User, { eager: true })
  president: User;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
} 