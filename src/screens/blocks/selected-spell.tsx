import React, { FC, useMemo } from 'react'
import { useSelector } from '../../hooks'
import { selectedSpellSelector } from '../../modules/routing/selectors'
import { favoriteSpellsSelector, isFavoriteSelector, prettyPrintSpellLevel } from '../../modules/spells'
import { Pill } from '../../components/pill'
import { Box, Button, Divider, Heading, Text } from '@chakra-ui/react'
import { useAddToFavorites, useGetSelectedSpell, useRemoveFromFavorites } from './hooks'

export const SelectedSpell: FC = () => {
  const selectedSpell = useSelector(selectedSpellSelector)
  const isFavorite = useSelector(isFavoriteSelector)
  const favoriteSpells = useSelector(favoriteSpellsSelector)
  const dateAddedToFavorites = useMemo(() => {
    const favoriteSpell = favoriteSpells.find(({ spellId }) => spellId === selectedSpell)
    return favoriteSpell?.dateAdded
  }, [favoriteSpells, selectedSpell])
  const spellDescription = useGetSelectedSpell(selectedSpell)
  const addToFavorites = useAddToFavorites(selectedSpell, spellDescription)
  const removeFromFavorites = useRemoveFromFavorites(selectedSpell)

  if (!spellDescription) {
    return <Text>Select a spell on the left to display its description.</Text>
  }

  return (
    <>
      <Box display='flex' flexDirection='row'>
        <Heading flex={1}>{spellDescription.name}</Heading>
        {isFavorite && <Button colorScheme='red' onClick={removeFromFavorites}>Remove from favorites</Button>}
        {!isFavorite && <Button colorScheme='teal' onClick={addToFavorites}>Add to favorites</Button>}
      </Box>
      {isFavorite && <Pill>Added to favorites on {dateAddedToFavorites}</Pill>}
      <Divider marginY={3} borderColor='black' />
      <Text>{prettyPrintSpellLevel(spellDescription.level)} level {spellDescription.school.name} spell</Text>
      {(spellDescription.concentration || spellDescription.ritual) && (
        <Box display='flex' flexDirection='row' marginTop={3}>
          {spellDescription.ritual && <Pill color='yellow'>ritual</Pill>}
          {spellDescription.concentration && <Pill color='purple'>concentration</Pill>}
        </Box>
      )}
      <Divider marginY={3} borderColor='black' />
      {spellDescription.desc.map((description, index) => {
        return <Text key={`spell-desc-${index}`} marginTop={3}>{description}</Text>
      })}
    </>
  )
}
