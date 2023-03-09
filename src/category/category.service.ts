import { Injectable } from '@nestjs/common';
import {
  CategoryCreateInput,
  CategoryCreateOutput,
} from './dto/category.create.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';
import {
  CategoriesPagination,
  CategoriesPaginationArgs,
} from './dto/category-pagination.dto';
import { SortDirection } from 'src/pagination/dto/pagination.dto';
// import { SectorService } from 'src/sector/sector.service';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}
  /*private readonly sectorService: SectorService,*/

  async categoryCreate(
    input: CategoryCreateInput,
  ): Promise<CategoryCreateOutput> {
    const category = this.categoryRepository.create(input);
    category.name = input.name;
    await category.save();
    return { category };
  }

  async categoryGetById(categoryId: Category['id']): Promise<Category> {
    return await this.categoryRepository.findOneOrFail(categoryId);
  }

  async categoryList(): Promise<Category[]> {
    return this.categoryRepository.find({
      relations: ['activities'],
    });
  }

  async categoriesPagination(
    args: CategoriesPaginationArgs,
  ): Promise<CategoriesPagination> {
    /*
    const [nodes, totalCount] = await this.articleRepository.findAndCount({
      skip: args.skip,
      take: args.take,
      order: {
        createdAt:
          args.sortBy?.createdAt === SortDirection.ASC ? 'ASC' : 'DESC',
        title: args.sortBy?.title === SortDirection.ASC ? 'ASC' : 'DESC',
      },
    });
    return { nodes, totalCount };
    */
    const qb = this.categoryRepository.createQueryBuilder('category');
    qb.take(args.take);
    qb.skip(args.skip);
    if (args.sortBy) {
      if (args.sortBy.createdAt !== null) {
        qb.addOrderBy(
          'article.createdAt',
          args.sortBy.createdAt === SortDirection.ASC ? 'ASC' : 'DESC',
        );
      }
      if (args.sortBy.title !== null) {
        qb.addOrderBy(
          'article.title',
          args.sortBy.title === SortDirection.ASC ? 'ASC' : 'DESC',
        );
      }
      // Add search by filter text
    }
    const [nodes, totalCount] = await qb.getManyAndCount();
    return { nodes, totalCount };
  }
}
