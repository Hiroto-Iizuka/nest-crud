import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Patch,
  Delete,
  Req,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { PostService } from './post.service';
import { Request } from 'express';
// commonのPostと名前が被るため
import { Post as typePost } from '@prisma/client';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@UseGuards(AuthGuard('jwt'))
@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get()
  async getPosts(): Promise<typePost[]> {
    console.log('test');
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

  @Patch(':id')
  async updatePostById(
    @Req() req: Request,
    @Param('id', ParseIntPipe) postId: number,
    @Body() dto: UpdatePostDto,
  ): Promise<typePost> {
    return await this.postService.updatePostById(req.user.id, postId, dto);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  deletePostById(
    @Req() req: Request,
    @Param('id', ParseIntPipe) postId: number,
  ): Promise<void> {
    return this.postService.deletePostById(req.user.id, postId);
  }
}
