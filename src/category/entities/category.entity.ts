import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Activity } from 'src/activity/entities/activity.entity';
// import { Sector } from 'src/sector/entities/sector.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  RelationId,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
@ObjectType()
export class Category extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field(() => String)
  @Column()
  name: string;

  @Field(() => [Activity], { nullable: true })
  @OneToMany(() => Activity, (activity) => activity.category, {
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
