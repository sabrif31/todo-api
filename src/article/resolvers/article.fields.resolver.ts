import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { Article } from '../models/article.model';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/models/user.model';

@Resolver(Article)
export class ArticleFieldsResolver {
  constructor(private userService: UserService) {}

  @ResolveField(() => User, { nullable: true })
  async author(@Parent() article: Article) {
    if (!article.authorId) return null;
    try {
      return this.userService.userGetById(article.authorId);
    } catch (e) {
      return null;
    }
  }
}
