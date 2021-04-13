import { SpellList } from './interfaces'

export interface SpellFilters {
  school?: string
  level?: string
}

const parsedFilters = (filters: SpellFilters): Record<string, string> => {
  const parsed: Record<string, string> = filters as Record<string, string>
  Object.keys(parsed).forEach((key: string) => parsed[key] === undefined && delete parsed[key])

  return parsed
}

export const getSpellList = async (filters: SpellFilters = {}): Promise<SpellList> => {
  const url = new URL(`${process.env.REACT_APP_SPELL_API_URL}/spells`)
  url.search = new URLSearchParams(parsedFilters(filters)).toString()

  const rawResponse = await fetch(url.toString())

  return rawResponse.json()
}
