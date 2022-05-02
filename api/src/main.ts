import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { DbService } from './db/db.service'

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({origin: true});

  const dbService = app.get(DbService);
  await dbService.enableShutdownHooks(app)

  await app.listen(3001);
}
bootstrap();
