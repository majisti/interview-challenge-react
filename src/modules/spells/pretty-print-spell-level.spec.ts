import { prettyPrintSpellLevel } from './pretty-print-spell-level'

describe(`prettyPrintSpellLevel`, () => {
  it.each<[number, string]>([
    // level, expected string
    [0, 'cantrip'],
    [1, '1st'],
    [2, '2nd'],
    [3, '3rd'],
    [4, '4th'],
    [5, '5th'],
    [6, '6th'],
    [7, '7th'],
    [8, '8th'],
    [9, '9th'],
  ])('converts the spell level to an easily readable format (%s -> %s)', (spellLevel, expected) => {
    expect(prettyPrintSpellLevel(spellLevel)).toEqual(expected)
  })
})
