import { ArgsType, Field, InputType, ObjectType } from '@nestjs/graphql';
import {
  Pagination,
  PaginationArgs,
  PaginationSortBy,
  SortDirection,
} from 'src/pagination/dto/pagination.dto';
import { Category } from '../entities/category.entity';

@InputType()
export class CategoriesPaginationSortBy extends PaginationSortBy {
  @Field(() => SortDirection, { nullable: true })
  name?: SortDirection;
}

@ArgsType()
export class CategoriesPaginationArgs extends PaginationArgs {
  @Field(() => CategoriesPaginationSortBy, { nullable: true })
  sortBy?: CategoriesPaginationSortBy;
}

@ObjectType()
export class CategoriesPagination extends Pagination {
  @Field(() => [Category])
  nodes: Category[];
}
