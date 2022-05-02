import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common'
import { FavoritesService } from '../favorites/favorites.service'
import { Favorite } from '@prisma/client'

@Controller()
export class AppController {
  constructor(private readonly favorites: FavoritesService) {
  }

  @Get()
  public async getAllFavorites(): Promise<Favorite[]> {
    return this.favorites.favorites()
  }

  @Post()
  public async addFavorite(@Body() favorite: Omit<Favorite, 'id'>): Promise<Favorite> {
    return this.favorites.addFavorite(favorite)
  }

  @Delete(':spellId')
  public async removeFavorite(@Param('spellId') spellId: string): Promise<Favorite> {
    return this.favorites.removeFavorite(spellId)
  }
}
