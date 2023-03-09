import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { CategoryService } from './category.service';
import {
  CategoryCreateInput,
  CategoryCreateOutput,
} from './dto/category.create.dto';
import { Category } from './entities/category.entity';
import {
  CategoriesPagination,
  CategoriesPaginationArgs,
} from './dto/category-pagination.dto';

@Resolver(Category)
export class CategoryResolver {
  constructor(private readonly categoryService: CategoryService) {}

  @Mutation(() => CategoryCreateOutput)
  async categoryCreate(@Args('input') input: CategoryCreateInput) {
    return this.categoryService.categoryCreate(input);
  }

  @Query(() => [Category])
  async categoryList() {
    return this.categoryService.categoryList();
  }

  @Query(() => CategoriesPagination)
  async articlesPagination(@Args() args: CategoriesPaginationArgs) {
    return this.categoryService.categoriesPagination(args);
  }
  /*
  @Query('category')
  findAll() {
    return this.categoryService.findAll();
  }

  @Query('category')
  findOne(@Args('id') id: number) {
    return this.categoryService.findOne(id);
  }

  @Mutation('updateCategory')
  update(
    @Args('updateCategoryInput') updateCategoryInput: UpdateCategoryInput,
  ) {
    return this.categoryService.update(
      updateCategoryInput.id,
      updateCategoryInput,
    );
  }

  @Mutation('removeCategory')
  remove(@Args('id') id: number) {
    return this.categoryService.remove(id);
  }
  */
}
