import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { Category } from '../entities/category.entity';

@InputType()
export class CategoryCreateInput {
  @Field(() => String)
  name: string;
}

@ObjectType()
export class CategoryCreateOutput {
  @Field(() => Category, { nullable: true })
  category: Category;
}
