import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { SectorService } from './sector.service';
import { Sector } from './entities/sector.entity';
import { SectorCreateInput, SectorCreateOutput } from './dto/sector.create.dto';

@Resolver(() => Sector)
export class SectorResolver {
  constructor(private readonly sectorService: SectorService) {}

  @Mutation(() => SectorCreateOutput)
  async sectorCreate(@Args('input') input: SectorCreateInput) {
    return this.sectorService.sectorCreate(input);
  }

  @Query(() => [Sector])
  async sectorList() {
    return this.sectorService.sectorList();
  }
  /*
  @Mutation(() => Sector)
  createSector(
    @Args('createSectorInput') createSectorInput: CreateSectorInput,
  ) {
    return this.sectorService.create(createSectorInput);
  }

  @Query(() => [Sector], { name: 'sector' })
  findAll() {
    return this.sectorService.findAll();
  }

  @Query(() => Sector, { name: 'sector' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.sectorService.findOne(id);
  }

  @Mutation(() => Sector)
  updateSector(
    @Args('updateSectorInput') updateSectorInput: UpdateSectorInput,
  ) {
    return this.sectorService.update(updateSectorInput.id, updateSectorInput);
  }

  @Mutation(() => Sector)
  removeSector(@Args('id', { type: () => String }) id: string) {
    return this.sectorService.remove(id);
  }
  */
}
