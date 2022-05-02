import { Module } from "@nestjs/common";
import { DbModule } from '../db/db.module'
import { FavoritesService } from './favorites.service'

@Module({
  imports: [DbModule],
  providers: [FavoritesService],
  exports: [FavoritesService]
})
export class FavoritesModule {}
