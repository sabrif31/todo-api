import { Field, ObjectType } from '@nestjs/graphql';
import { Node } from 'src/pagination/models/node.model';
import { User } from 'src/user/models/user.model';
import { Column, Entity, JoinColumn, ManyToOne, RelationId } from 'typeorm';

@Entity()
@ObjectType()
export class Article extends Node {
  @Field(() => String)
  @Column()
  title: string;

  @Field(() => String)
  @Column()
  description: string;

  @Field(() => String)
  @Column()
  image: string;

  // Relation avec l'utilisateur
  @ManyToOne(() => User, (user) => user.articles)
  @JoinColumn()
  author: User;

  // RelationId pour récupérer l'id de l'utilisateur
  @RelationId((self: Article) => self.author)
  readonly authorId: User['id'];
}
