import React, { FC, useEffect } from 'react'
import { favoriteSpellsSelector, setFavorites } from '../../modules/spells'
import { useDispatch, useSelector } from '../../hooks'
import { selectResource } from '../../modules/routing'
import { List, ListItem } from '../../components'
import { Box, Heading, Text, Tooltip } from '@chakra-ui/react'

export const FavoriteSpells: FC = () => {
  const dispatch = useDispatch()
  const favoriteSpells = useSelector(favoriteSpellsSelector)
  useEffect(() => {
    const asyncEffect = async () => {
      const favorites = await fetch(`${process.env.REACT_APP_FAVORITE_SPELLS_API_URL}`)

      if (favorites.status >= 200 && favorites.status < 300) {
        dispatch(setFavorites(await favorites.json() || []))
      }
    }

    asyncEffect()
  }, [dispatch])

  if (!favoriteSpells || favoriteSpells.length === 0) {
    return null
  }

  console.log(favoriteSpells)

  return (
    <Box paddingTop={6}>
      <Heading as='h3' size='lg' marginBottom={3}>Favorites</Heading>
      {favoriteSpells ? (
        favoriteSpells && (
          <List>
            {favoriteSpells.map(({ spellId, spellName, dateAdded, id }) => (
              <Tooltip label={dateAdded}>
                <ListItem key={id} onClick={() => dispatch(selectResource(spellId))}>{spellName}</ListItem>
              </Tooltip>
            ))}
          </List>
        )
      ) : (
        <Text>loading</Text>
      )}
    </Box>
  )
}
