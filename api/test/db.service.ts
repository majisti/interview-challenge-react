import { Injectable } from '@nestjs/common'
import { Favorite, PrismaClient } from '@prisma/client'

/**
 * Mock service for database access.
 *
 * @todo: get Prisma working with a local test db instead.
 */
@Injectable()
export class NoopDbService extends PrismaClient {
  public favoriteSpell: Favorite = { id: 1, spellId: 'test', spellName: 'Test', dateAdded: 'Jan 1, 2020' }

  // @ts-ignore
  public get favorite() {
    return {
      findMany: jest.fn().mockResolvedValue([this.favoriteSpell]),
      create: jest.fn().mockImplementation((query) => ({
        ...query.data,
        id: 1,
      })),
      delete: jest.fn().mockResolvedValue(this.favoriteSpell),
      findFirst: () => this.favoriteSpell
    }
  }
}
