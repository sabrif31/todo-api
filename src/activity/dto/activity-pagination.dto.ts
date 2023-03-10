import { ArgsType, Field, InputType, ObjectType } from '@nestjs/graphql';
import {
  Pagination,
  PaginationArgs,
  PaginationSortBy,
  SortDirection,
} from 'src/pagination/dto/pagination.dto';
import { Activity } from '../entities/activity.entity';

@InputType()
export class ActivitiesPaginationSortBy extends PaginationSortBy {
  @Field(() => SortDirection, { nullable: true })
  name?: SortDirection;
}

@ArgsType()
export class ActivitiesPaginationArgs extends PaginationArgs {
  @Field(() => ActivitiesPaginationSortBy, { nullable: true })
  sortBy?: ActivitiesPaginationSortBy;
}

@ObjectType()
export class ActivitiesPagination extends Pagination {
  @Field(() => [Activity])
  nodes: Activity[];
}
