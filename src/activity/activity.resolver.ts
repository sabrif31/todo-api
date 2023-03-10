import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { ActivityService } from './activity.service';
import {
  ActivityCreateInput,
  ActivityCreateOutput,
} from './dto/activity.create.dto';
import { Activity } from './entities/activity.entity';
import {
  ActivitiesPagination,
  ActivitiesPaginationArgs,
} from './dto/activity-pagination.dto';

@Resolver(Activity)
export class ActivityResolver {
  constructor(private readonly activityService: ActivityService) {}

  @Mutation(() => ActivityCreateOutput)
  async activityCreate(@Args('input') input: ActivityCreateInput) {
    return this.activityService.activityCreate(input);
  }

  @Query(() => Activity)
  async getActivityById(@Args('id') id: string) {
    return this.activityService.getActivityById(id);
  }

  @Query(() => [Activity])
  async getActivities() {
    return this.activityService.getActivities();
  }

  @Query(() => ActivitiesPagination)
  async activitiesPagination(@Args() args: ActivitiesPaginationArgs) {
    return this.activityService.activitiesPagination(args);
  }
  /*
  @Mutation('createActivity')
  create(
    @Args('createActivityInput') createActivityInput: CreateActivityInput,
  ) {
    return this.activityService.create(createActivityInput);
  }

  @Query('activity')
  findAll() {
    return this.activityService.findAll();
  }

  @Query('activity')
  findOne(@Args('id') id: number) {
    return this.activityService.findOne(id);
  }

  @Mutation('updateActivity')
  update(
    @Args('updateActivityInput') updateActivityInput: UpdateActivityInput,
  ) {
    return this.activityService.update(
      updateActivityInput.id,
      updateActivityInput,
    );
  }

  @Mutation('removeActivity')
  remove(@Args('id') id: number) {
    return this.activityService.remove(id);
  }
  */
}
