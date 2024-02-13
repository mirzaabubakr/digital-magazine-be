import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  DeleteDateColumn,
} from 'typeorm';

@Entity()
export class Magazine {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  price: number;

  @Column()
  imgUrl: string;

  @Column({ default: false })
  subscribed: boolean;

  @DeleteDateColumn({ nullable: true, default: null })
  deletedAt: Date;
}
