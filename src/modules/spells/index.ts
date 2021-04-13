import { getSpellList } from './get-spell-list'
import { getSpell } from './get-spell-by-id'

export * from './interfaces'
export * from './constants'
export * from './pretty-print-spell-level'

export const spells = {
  list: getSpellList,
  description: (spellIndex: string) => getSpell(spellIndex),
}
