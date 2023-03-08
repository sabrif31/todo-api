import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ActivityService } from './activity.service';
import { ActivityResolver } from './activity.resolver';
import { Activity } from './entities/activity.entity';
import { CategoryModule } from 'src/category/category.module';
import { SectorModule } from 'src/sector/sector.module';
import { ActivityController } from './activity.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Activity]), CategoryModule, SectorModule],
  providers: [ActivityResolver, ActivityService],
  exports: [ActivityService, ActivityModule],
  controllers: [ActivityController],
})
export class ActivityModule {}
