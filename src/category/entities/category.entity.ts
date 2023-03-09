import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Activity } from 'src/activity/entities/activity.entity';
import { Node } from 'src/pagination/models/node.model';
// import { Sector } from 'src/sector/entities/sector.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
@ObjectType()
export class Category extends Node {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field(() => String)
  @Column()
  name: string;

  @Field(() => [Activity], { nullable: true })
  @OneToMany(() => Activity, (activity) => activity.category, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
    nullable: true,
  })
  @JoinColumn()
  activities?: Activity[];

  /*
  @RelationId((self: Category) => self.activities)
  readonly activityId?: Activity['id'];
  */
  /*
  @ManyToOne(() => Sector, (sector) => sector.categories)
  @JoinColumn()
  sector: Sector;
  */

  /*
  @Field(() => Sector, { nullable: true })
  @ManyToOne(() => Sector, (sector) => sector.categories, {
    onDelete: 'CASCADE',
    nullable: true,
  })
  @JoinColumn({ name: 'sectorId' })
  sector: Sector;

  @RelationId((self: Category) => self.sector)
  readonly sectorId: Sector['id'];
  */

  @CreateDateColumn()
  created!: Date;

  @UpdateDateColumn()
  updated!: Date;
}
