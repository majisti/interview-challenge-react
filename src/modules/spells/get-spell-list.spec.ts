import { getSpellList, SpellFilters } from './get-spell-list'
import fetchMock from 'fetch-mock'
import { SpellSchool } from './constants'
import { SpellList } from './interfaces'

describe(`getSpellList`, () => {
  beforeEach(() => {
    fetchMock.mock(`begin:${process.env.REACT_APP_SPELL_API_URL!}`, {
      count: '1',
      results: [
        { index: 'spell', url: 'https://api.whatever.com', name: 'Spell' },
      ],
    } as SpellList)
  })

  afterEach(() => {
    fetchMock.restore()
  })

  it.each<[SpellFilters, string[]]>([
    // filters, expected queryString
    [{}, ['']],
    [{ school: SpellSchool.EVOCATION }, [`?school=${SpellSchool.EVOCATION}`]],
    [{ level: '2' }, ['?level=2']],
    [{ level: '2', school: SpellSchool.EVOCATION }, ['level=2', `school=${SpellSchool.EVOCATION}`]],
  ])('converts the spell level to an easily readable format (%s -> %s)', (filters, expectationList) => {
    getSpellList(filters)

    const [url] = fetchMock.lastCall() || ['']

    expectationList.forEach((expectation) => {
      expect(url).toContain(expectation)
    })
  })

  it(`adds nothing to the URL when no filter are added`, () => {
    getSpellList()

    const [url] = fetchMock.lastCall() || ['']

    expect(url).not.toContain('?')
  })

  it(`filters undefined values`, () => {
    getSpellList({ level: undefined, school: SpellSchool.EVOCATION })

    const [url] = fetchMock.lastCall() || ['']

    expect(url).not.toContain('undefined')
  })
})
