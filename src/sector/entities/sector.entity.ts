import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Activity } from 'src/activity/entities/activity.entity';
// import { Category } from 'src/category/entities/category.entity';
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
  RelationId,
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
  @OneToMany(() => Activity, (activity) => activity.sector)
  @JoinColumn({ name: 'activityId' })
  activities: Activity[];

  @RelationId((self: Sector) => self.activities)
  readonly activityId: Activity['id'];

  /*
  @Field(() => [Activity], { nullable: true })
  @OneToMany(() => Activity, (activity) => activity.category, {
    onDelete: 'CASCADE',
    nullable: true,
  })
  @JoinColumn()
  activities?: Activity[];
  */
}
