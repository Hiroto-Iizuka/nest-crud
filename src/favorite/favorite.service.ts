import { Injectable } from '@nestjs/common';
import { Favorite } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class FavoriteService {
  constructor(private prisma: PrismaService) {}

  async createFavorite(userId: number, postId: number): Promise<Favorite> {
    const favorite = await this.prisma.favorite.create({
      data: {
        userId,
        postId,
      },
    });
    return favorite;
  }

  async deleteFavorite(userId: number, postId: number): Promise<string> {
    await this.prisma.favorite.delete({
      where: {
        userId_postId: {
          userId,
          postId,
        },
      },
    });
    return 'ok';
  }
}
