import React, { FC, useEffect, useState } from 'react'
import { useSelector } from '../../hooks'
import { selectedSpellSelector } from '../../modules/routing/selectors'
import { prettyPrintSpellLevel, SpellDescription, spells } from '../../modules/spells'
import { Pill } from '../../components/pill'

export const SelectedSpell: FC = () => {
  const selectedSpell = useSelector(selectedSpellSelector)
  const [spellDescription, setSpellDescription] = useState<SpellDescription>()
  useEffect(() => {
    const execute = async () => {
      if (selectedSpell) {
        const effectResult = await spells.description(selectedSpell)
        setSpellDescription(effectResult)
      }
    }

    execute()
  })

  if (!spellDescription) {
    return <p>Select a spell on the left to display its description.</p>
  }

  return (
    <>
      <h1>{spellDescription.name}</h1>
      <hr />
      <p>{prettyPrintSpellLevel(spellDescription.level)} level {spellDescription.school.name} spell</p>
      {(spellDescription.concentration || spellDescription.ritual) && (
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          {spellDescription.ritual && <Pill color='yellow'>ritual</Pill>}
          {spellDescription.concentration && <Pill color='purple'>concentration</Pill>}
        </div>
      )}
      <hr />
      {spellDescription.desc.map((description, index) => <p key={`spell-desc-${index}`}>{description}</p>)}
    </>
  )
}
