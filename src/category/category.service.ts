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
import { Activity } from 'src/activity/entities/activity.entity';
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
    const qb = this.categoryRepository.createQueryBuilder('category');
    qb.take(args.take);
    qb.skip(args.skip);
    if (args.sortBy) {
      if (args.sortBy.createdAt !== null) {
        qb.addOrderBy(
          'category.createdAt',
          args.sortBy.createdAt === SortDirection.ASC ? 'ASC' : 'DESC',
        );
      }
      if (args.sortBy.name !== null) {
        qb.addOrderBy(
          'category.name',
          args.sortBy.name === SortDirection.ASC ? 'ASC' : 'DESC',
        );
      }
      // Add search by filter text
    }
    // qb.relation('activity'); // .of('category').add('activity');
    qb.leftJoinAndSelect('category.activities', 'activity');
    const [nodes, totalCount] = await qb.getManyAndCount();
    return { nodes, totalCount };
  }
}
