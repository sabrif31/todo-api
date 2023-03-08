import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryService } from './category.service';
import { CategoryResolver } from './category.resolver';
import { Category } from './entities/category.entity';
// import { SectorModule } from 'src/sector/sector.module';

@Module({
  imports: [TypeOrmModule.forFeature([Category])], // , SectorModule
  providers: [CategoryResolver, CategoryService],
  exports: [CategoryService, CategoryModule],
})
export class CategoryModule {}
