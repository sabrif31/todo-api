import { Injectable } from '@nestjs/common';
import { Activity } from './entities/activity.entity';
import { CategoryService } from 'src/category/category.service';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import {
  ActivityCreateInput,
  ActivityCreateOutput,
} from './dto/activity.create.dto';
import { SectorService } from 'src/sector/sector.service';

@Injectable()
export class ActivityService {
  constructor(
    @InjectRepository(Activity)
    private readonly activityRepository: Repository<Activity>,
    private readonly categoryService: CategoryService,
    private readonly sectorService: SectorService,
  ) {}

  async activityCreate(
    input: ActivityCreateInput,
  ): Promise<ActivityCreateOutput> {
    const category = await this.categoryService.categoryGetById(
      input.categoryId,
    );
    const sector = await this.sectorService.sectorGetById(input.sectorId);
    const activity = this.activityRepository.create(input);
    // activity.category = category;
    activity.sector = sector;
    activity.name = input.name;
    await activity.save();
    return { activity };
  }

  async getActivityById(id: Activity['id']): Promise<Activity> {
    return await this.activityRepository.findOneOrFail(id, {
      relations: ['category', 'sector'],
    });
  }

  async getActivities(): Promise<Activity[]> {
    return this.activityRepository.find({ relations: ['category', 'sector'] });
  }
  /*
  create(createActivityInput: CreateActivityInput) {
    return 'This action adds a new activity';
  }

  findAll() {
    return `This action returns all activity`;
  }

  findOne(id: number) {
    return `This action returns a #${id} activity`;
  }

  update(id: number, updateActivityInput: UpdateActivityInput) {
    return `This action updates a #${id} activity`;
  }

  remove(id: number) {
    return `This action removes a #${id} activity`;
  }
  */
}
