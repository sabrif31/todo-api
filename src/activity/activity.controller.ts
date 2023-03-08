import { Body, Controller, Get, HttpStatus, Post, Res } from '@nestjs/common';
import { ActivityService } from './activity.service';
import { ActivityCreateInput } from './dto/activity.create.dto';
import { Activity } from './entities/activity.entity';

@Controller('activity')
export class ActivityController {
  constructor(private activityService: ActivityService) {}

  @Post('/post')
  async addActivity(
    @Res() res,
    @Body() createActivityDTO: ActivityCreateInput,
  ) {
    const newActivity = await this.activityService.activityCreate(
      createActivityDTO,
    );
    return res.status(HttpStatus.OK).json({
      message: 'newActivity has been submitted successfully!',
      post: newActivity,
    });
  }

  @Post('getActivityById')
  async getActivityById(@Res() res, @Body() id: Activity['id']) {
    const newActivity = await this.activityService.getActivityById(id);
    return res.status(HttpStatus.OK).json({
      message: 'newActivity has been submitted successfully!',
      post: newActivity,
    });
  }

  // Fetch all posts
  @Get('getActivities')
  async getActivities(@Res() res) {
    const activities = await this.activityService.getActivities();
    return res.status(HttpStatus.OK).json(activities);
  }
}
