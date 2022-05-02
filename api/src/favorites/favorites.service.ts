import { DbService } from '../db/db.service'
import { Favorite } from '@prisma/client'

export class FavoritesService {
  public constructor(private readonly db: DbService) {
  }

  public async favorites(): Promise<Favorite[]> {
    return this.db.favorite.findMany()
  }

  public async addFavorite(favorite: Omit<Favorite, 'id'>): Promise<Favorite> {
    return this.db.favorite.create({ data: favorite })
  }

  public async removeFavorite(spellId: string): Promise<Favorite> {
    const favorite = await this.db.favorite.findFirst({ where: { spellId } })
    return this.db.favorite.delete({ where: { id: favorite.id } })
  }
}
