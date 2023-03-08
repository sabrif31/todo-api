import { Field, ObjectType } from '@nestjs/graphql';
import { Activity } from '../entities/activity.entity';
import { Category } from 'src/category/entities/category.entity';

@ObjectType()
export class ActivityQueriesOutput {
  @Field(() => Activity, { nullable: true })
  activity: Activity;

  @Field(() => Category, { nullable: true })
  category: Category;
}
