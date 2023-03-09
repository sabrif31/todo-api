import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Category } from 'src/category/entities/category.entity';
import { Sector } from 'src/sector/entities/sector.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
@ObjectType()
export class Activity extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field(() => String)
  @Column()
  name: string;

  @Field(() => Category, { nullable: true })
  @ManyToOne(() => Category, (category) => category.activities, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
    nullable: true,
  })
  @JoinColumn({ name: 'categoryId' })
  category: Category;
  /*
  @RelationId((self: Activity) => self.category)
  readonly categoryId: Category['id'];
  */

  @Field(() => Sector, { nullable: true })
  @ManyToOne(() => Sector, (sector) => sector.activities, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
    nullable: true,
  })
  @JoinColumn({ name: 'sectorId' })
  sector: Sector;
  /*
  @RelationId((self: Activity) => self.sector)
  readonly sectorId: Sector['id'];
  */

  /*
  @Field(() => [Sector], { nullable: true })
  @ManyToOne(() => Sector, (sector) => sector.activities, {
    onDelete: 'CASCADE',
    nullable: true,
  })
  @JoinColumn({ name: 'activityId' })
  sector: Sector;
  */

  @CreateDateColumn()
  created!: Date;

  @UpdateDateColumn()
  updated!: Date;
}

/*
  @Field(() => String)
  @Column({ nullable: false })
  categoryId!: string;
  */

// activityCreate() in src\activity\activity.service.ts:
// @ManyToOne(() => Category) // , (category) => category.activities
/*
  @ManyToOne(() => Category, (category) => category.activities, {
    onDelete: 'CASCADE',
    nullable: false,
    eager: true,
  })
  @JoinColumn()
  category: Category;
  */

/*
  @Field(() => String)
  @Column()
  readonly categoryId: Category['id'];
  @OneToMany(() => Activity, (activity) => activity.category)
  @JoinColumn()
  activity: Activity;
  */
