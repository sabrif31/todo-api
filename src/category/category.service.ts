import { Injectable } from '@nestjs/common';
import {
  CategoryCreateInput,
  CategoryCreateOutput,
} from './dto/category.create.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';
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
  /*
  create(createCategoryInput: CreateCategoryInput) {
    return 'This action adds a new category';
  }

  findAll() {
    return `This action returns all category`;
  }

  findOne(id: number) {
    return `This action returns a #${id} category`;
  }

  update(id: number, updateCategoryInput: UpdateCategoryInput) {
    return `This action updates a #${id} category`;
  }

  remove(id: number) {
    return `This action removes a #${id} category`;
  }
  */
}
