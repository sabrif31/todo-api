import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from './models/comment.model';
import { Repository } from 'typeorm';
import { ArticleService } from 'src/article/article.service';
import { JWTPayload } from 'src/auth/auth.service';
import {
  CommentCreateInput,
  CommentCreateOutput,
} from './dto/comment-create.dto';
import { User } from 'src/user/models/user.model';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
    private readonly articleService: ArticleService,
  ) {}

  async commentCreate(
    user: JWTPayload,
    input: CommentCreateInput,
  ): Promise<CommentCreateOutput> {
    const article = await this.articleService.articleGetById(input.articleId);

    const comment = await this.commentRepository.create(input);
    comment.author = new User();
    comment.author.id = user.id;
    comment.article = article;
    comment.message = input.message;
    await comment.save();
    return { comment };
  }
}
