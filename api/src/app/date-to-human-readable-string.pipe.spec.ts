import { DateToHumanReadableStringPipe } from './date-to-human-readable-string.pipe'
import { Favorite } from '@prisma/client'

describe(`DateToHumanReadableStringPipe`, () => {
  let pipe: DateToHumanReadableStringPipe;

  beforeEach(() => {
    pipe = new DateToHumanReadableStringPipe();
  });

  it(`should convert a date to a human readable string`, () => {
    const data: Favorite = {
      id: 1,
      dateAdded: new Date(2020, 0, 1).toString(),
      spellId: 'test',
      spellName: 'Test'
    }
    const result = pipe.transform(data);

    expect(result.dateAdded).toEqual('Jan 1, 2020');
  });

  it(`throws when the date isn't really a date`, () => {
    const data: Favorite = {
      id: 1,
      dateAdded: 'not a date',
      spellId: 'test',
      spellName: 'Test'
    }

    expect(() => pipe.transform(data)).toThrow();
  });
});
