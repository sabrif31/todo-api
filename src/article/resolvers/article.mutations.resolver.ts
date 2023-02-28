import { Args, ID, Mutation, Resolver } from '@nestjs/graphql';
import { ArticleService } from '../article.service';
import {
  ArticleCreateInput,
  ArticleCreateOutput,
} from '../dto/article.create.dto';
import { Article } from '../models/article.model';
import {
  ArticleUpdateInput,
  ArticleUpdateOutput,
} from '../dto/article.update.dto';
import { ArticleDeleteOutput } from '../dto/article.delete.dto';
import { UseGuards } from '@nestjs/common';
import { CurrentUser, JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { JWTPayload } from 'src/auth/auth.service';

@Resolver(Article)
export class ArticleMutationResolver {
  constructor(private readonly articleService: ArticleService) {}

  @UseGuards(JwtAuthGuard)
  @Mutation(() => ArticleCreateOutput)
  async articleCreate(
    @CurrentUser() user: JWTPayload,
    @Args('input') input: ArticleCreateInput,
  ) {
    return this.articleService.articleCreate(user, input);
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => ArticleUpdateOutput)
  async articleUpdate(
    @Args({ name: 'articleId', type: () => ID }) articleId: Article['id'],
    @Args('input') input: ArticleUpdateInput,
  ) {
    return this.articleService.articleUpdate(articleId, input);
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => ArticleDeleteOutput)
  async articleDelete(
    @Args({ name: 'articleId', type: () => ID }) articleId: Article['id'],
  ) {
    return this.articleService.articleDelete(articleId);
  }
}
