import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Membership {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  userId: string;

  @Column()
  societyId: string;

  @Column({ default: 'pending' })
  status: string;
}
