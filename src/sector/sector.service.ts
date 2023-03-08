import { Injectable } from '@nestjs/common';
// import { UpdateSectorInput } from './dto/update-sector.input';
import { Sector } from './entities/sector.entity';
import { Repository } from 'typeorm';
import { SectorCreateInput, SectorCreateOutput } from './dto/sector.create.dto';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class SectorService {
  constructor(
    @InjectRepository(Sector)
    private readonly sectorRepository: Repository<Sector>,
  ) {}

  async sectorCreate(input: SectorCreateInput): Promise<SectorCreateOutput> {
    const sector = this.sectorRepository.create(input);
    await sector.save();
    return { sector };
  }

  async sectorGetById(sectorId: Sector['id']): Promise<Sector> {
    return await this.sectorRepository.findOneOrFail(sectorId);
  }

  async sectorList(): Promise<Sector[]> {
    return this.sectorRepository.find({
      relations: [],
    });
  }
  /*
  create(createSectorInput: CreateSectorInput) {
    return 'This action adds a new sector';
  }

  findAll() {
    return `This action returns all sector`;
  }

  findOne(id: string) {
    return `This action returns a #${id} sector`;
  }

  update(id: string, updateSectorInput: UpdateSectorInput) {
    return `This action updates a #${id} sector`;
  }

  remove(id: string) {
    return `This action removes a #${id} sector`;
  }
  */
}
