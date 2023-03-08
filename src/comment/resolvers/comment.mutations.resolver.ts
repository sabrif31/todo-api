import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CommentService } from '../comment.service';
import { CurrentUser, JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { JWTPayload } from 'src/auth/auth.service';
import {
  CommentCreateInput,
  CommentCreateOutput,
} from '../dto/comment-create.dto';

@Resolver()
export class CommentMutationsResolver {
  constructor(private readonly commentService: CommentService) {}

  @UseGuards(JwtAuthGuard)
  @Mutation(() => CommentCreateOutput)
  async commentCreate(
    @CurrentUser() user: JWTPayload,
    @Args('input') input: CommentCreateInput,
  ) {
    return this.commentService.commentCreate(user, input);
  }
}
