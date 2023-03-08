import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { Activity } from '../entities/activity.entity';

@InputType()
export class ActivityCreateInput {
  @Field(() => String)
  categoryId: string;

  @Field(() => String)
  sectorId: string;

  @Field(() => String)
  name: string;
}

@ObjectType()
export class ActivityCreateOutput {
  @Field(() => Activity, { nullable: true })
  activity: Activity;
}
