import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { PostService } from './post.service';
import { Request } from 'express';
// commonのPostと名前が被るため
import { Post as typePost } from '@prisma/client';
import { CreatePostDto } from './dto/create-post.dto';

@UseGuards(AuthGuard('jwt'))
@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get()
  async getPosts(): Promise<typePost[]> {
    return await this.postService.getPosts();
  }

  @Get(':id')
  getPostById(
    @Req() req: Request,
    @Param('id', ParseIntPipe) postId: number,
  ): Promise<typePost> {
    return this.postService.getPostById(req.user.id, postId);
  }

  @Post()
  createPost(
    @Req() req: Request,
    @Body() dto: CreatePostDto,
  ): Promise<typePost> {
    return this.postService.createPost(req.user.id, dto);
  }
}