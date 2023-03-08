import { InputType, Field, ObjectType } from '@nestjs/graphql';
import { Sector } from '../entities/sector.entity';

@InputType()
export class SectorCreateInput {
  @Field(() => String)
  name: string;
}

@ObjectType()
export class SectorCreateOutput {
  @Field(() => Sector)
  sector: Sector;
}
