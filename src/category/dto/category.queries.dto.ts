import { Field, ObjectType } from '@nestjs/graphql';
import { Category } from '../entities/category.entity';
import { Activity } from 'src/activity/entities/activity.entity';

@ObjectType()
export class CategoryQueriesOutput {
  @Field(() => Category, { nullable: true })
  category: Category;

  @Field(() => Activity, { nullable: true })
  activities: Activity[];
}
