import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post } from '@prisma/client';

@Injectable()
export class PostService {
  constructor(private prisma: PrismaService) {}

  async getPosts(): Promise<Post[]> {
    return await this.prisma.post.findMany();
  }

  async getPostById(authorId: number, postId: number): Promise<Post> {
    return this.prisma.post.findFirst({
      where: {
        authorId,
        id: postId,
      },
    });
  }

  async createPost(authorId: number, dto: CreatePostDto): Promise<Post> {
    const post = await this.prisma.post.create({
      data: {
        authorId,
        ...dto,
      },
    });
    return post;
  }

  async updatePostById(
    authorId: number,
    postId: number,
    dto: UpdatePostDto,
  ): Promise<Post> {
    const post = await this.prisma.post.findUnique({
      where: {
        id: postId,
      },
    });

    console.log(post);

    if (!post || post.authorId !== authorId)
      throw new ForbiddenException('No permission to update');

    return this.prisma.post.update({
      where: {
        id: postId,
      },
      data: {
        ...dto,
      },
    });
  }
}
