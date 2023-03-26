import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePostDto } from './dto/create-post.dto';
import { Post } from './interfaces/post.interface';

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
}
