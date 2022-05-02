import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common'
import { format, isDate } from 'date-fns'
import { Favorite } from '@prisma/client'

const isDateObject = (value: unknown): value is Date =>
  isDate(value)

@Injectable()
export class DateToHumanReadableStringPipe implements PipeTransform {
  public transform(value: any, metadata?: ArgumentMetadata): Favorite {
    const added = new Date((value as Favorite).dateAdded)

    if (!isDateObject(added)) {
      throw new Error(`favorite.dateAdded is not a date. Got ${JSON.stringify(value)}, ${JSON.stringify(metadata)}.`)
    }

    return {
      ...value,
      dateAdded: format(added, 'MMM d, yyyy'),
    }
  }
}
