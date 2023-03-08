import { Module } from '@nestjs/common';
import { SectorService } from './sector.service';
import { SectorResolver } from './sector.resolver';
import { Sector } from './entities/sector.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Sector])],
  providers: [SectorResolver, SectorService],
  exports: [SectorService],
})
export class SectorModule {}
