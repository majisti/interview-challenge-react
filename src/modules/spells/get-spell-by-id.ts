import { SpellDescription } from './interfaces'

export const getSpell = async (id: string): Promise<SpellDescription> => {
  const rawResponse = await fetch(`${process.env.REACT_APP_SPELL_API_URL}/spells/${id}`)

  return rawResponse.json()
}
