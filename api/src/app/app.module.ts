import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { FavoritesModule } from '../favorites/favorites.module'
import { DateToHumanReadableStringPipe } from './date-to-human-readable-string.pipe'

@Module({
  imports: [FavoritesModule],
  controllers: [AppController],
  providers: [DateToHumanReadableStringPipe]
})
export class AppModule {
}
