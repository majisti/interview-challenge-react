import { Test, TestingModule } from '@nestjs/testing'
import { AppModule } from './app.module'
import { INestApplication } from '@nestjs/common'
import * as request from 'supertest'
import { DbService } from '../db/db.service'
import { NoopDbService } from '../../test/db.service'
import { Favorite } from '@prisma/client'

describe('AppModule', () => {
  let app: INestApplication
  let dbService: NoopDbService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).overrideProvider(DbService).useClass(NoopDbService).compile()

    dbService = module.get(DbService)

    app = module.createNestApplication()
    await app.init()
  })

  it('lists all favorites', async () => {
    const { status, body } = await request(app.getHttpServer()).get('/')

    expect(status).toEqual(200)
    expect(body).toEqual([dbService.favoriteSpell])
  })

  it('adds a new favorite', async () => {
    const favorite: Omit<Favorite, 'id'> = {
      dateAdded: new Date(2020, 0, 1).toString(),
      spellId: 'test',
      spellName: 'Test'
    }
    const { status, body } = await request(app.getHttpServer()).post('/').send(favorite)

    expect(status).toEqual(201)
    expect(body).toMatchObject({
      ...favorite,
      dateAdded: 'Jan 1, 2020',
      id: expect.any(Number),
    })
  })

  it('removes a favorite', async () => {
    const { status, body } = await request(app.getHttpServer()).delete(`/test`)

    expect(status).toEqual(200)
    expect(body).toMatchObject(dbService.favoriteSpell)
  })
})
