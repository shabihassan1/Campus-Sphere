import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Society {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  createdBy: string; // User ID of the creator (president)
}
