import {
  Controller,
  Delete,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Favorite } from '@prisma/client';
import { Request } from 'express';
import { FavoriteService } from './favorite.service';

@UseGuards(AuthGuard('jwt'))
@Controller('favorite')
export class FavoriteController {
  constructor(private readonly favoriteService: FavoriteService) {}

  @Post(':id')
  async createFavorite(
    @Req() req: Request,
    @Param('id', ParseIntPipe) postId: number,
  ): Promise<Favorite> {
    return await this.favoriteService.createFavorite(req.user.id, postId);
  }

  @HttpCode(HttpStatus.OK)
  @Delete(':id')
  async deleteFavorite(
    @Req() req: Request,
    @Param('id', ParseIntPipe) postId: number,
  ): Promise<string> {
    await this.favoriteService.deleteFavorite(req.user.id, postId);
    return 'ok';
  }
}
