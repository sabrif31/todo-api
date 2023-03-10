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
import { SortDirection } from 'src/pagination/dto/pagination.dto';
import {
  ActivitiesPagination,
  ActivitiesPaginationArgs,
} from './dto/activity-pagination.dto';

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
    activity.category = category;
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

  async activitiesPagination(
    args: ActivitiesPaginationArgs,
  ): Promise<ActivitiesPagination> {
    const qb = this.activityRepository.createQueryBuilder('activity');
    qb.take(args.take);
    qb.skip(args.skip);
    if (args.sortBy) {
      if (args.sortBy.createdAt !== null) {
        qb.addOrderBy(
          'activity.createdAt',
          args.sortBy.createdAt === SortDirection.ASC ? 'ASC' : 'DESC',
        );
      }
      if (args.sortBy.name !== null) {
        qb.addOrderBy(
          'activity.name',
          args.sortBy.name === SortDirection.ASC ? 'ASC' : 'DESC',
        );
      }
      // Add search by filter text
    }
    // qb.relation('activity'); // .of('category').add('activity');
    qb.leftJoinAndSelect('activity.category', 'category');
    const [nodes, totalCount] = await qb.getManyAndCount();
    return { nodes, totalCount };
  }
}
