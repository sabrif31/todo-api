import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Activity } from 'src/activity/entities/activity.entity';
// import { Category } from 'src/category/entities/category.entity';
import {
  BaseEntity,
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
export class Sector extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field(() => String)
  @Column()
  name: string;

  /*
  @Field(() => [Category], { nullable: true })
  @OneToMany(() => Category, (category) => category.sector)
  @JoinColumn({ name: 'categoryId' })
  categories: Category[];

  @RelationId((self: Sector) => self.categories)
  readonly categoryId: Category['id'];
  */

  @Field(() => [Activity], { nullable: true })
  @OneToMany(() => Activity, (activity) => activity.sector, {
    onDelete: 'CASCADE',
    nullable: true,
  })
  @JoinColumn({ name: 'activityId' })
  activities: Activity[];

  /*
  @RelationId((self: Sector) => self.activities)
  readonly activityId: Activity['id'];
  */

  /*
  @Field(() => [Activity], { nullable: true })
  @OneToMany(() => Activity, (activity) => activity.category, {
    onDelete: 'CASCADE',
    nullable: true,
  })
  @JoinColumn()
  activities?: Activity[];
  */

  @CreateDateColumn()
  created!: Date;

  @UpdateDateColumn()
  updated!: Date;
}
