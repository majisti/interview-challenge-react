import { useEffect, useState } from 'react'
import { SpellDescription, spells } from '../../../modules/spells'

export const useGetSelectedSpell = (selectedSpell: string | null) => {
  const [spellDescription, setSpellDescription] = useState<SpellDescription>()
  useEffect(() => {
    const execute = async () => {
      if (selectedSpell) {
        const effectResult = await spells.description(selectedSpell)
        setSpellDescription(effectResult)
      }
    }

    execute()
  }, [selectedSpell])

  return spellDescription
}
