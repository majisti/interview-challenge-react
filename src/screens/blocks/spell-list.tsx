import React, { FC, useEffect, useState } from 'react'
import { SpellList as SpellListInterface, spells } from '../../modules/spells'
import { useDispatch, useSelector } from '../../hooks'
import { selectResource } from '../../modules/routing'
import { List, ListItem } from '../../components'
import { levelFilterSelector, schoolFilterSelector } from '../../modules/filters'
import { Box, Heading, Text } from '@chakra-ui/react'

export const SpellList: FC = () => {
  const dispatch = useDispatch()
  const levelFilter = useSelector(levelFilterSelector)
  const schoolFilter = useSelector(schoolFilterSelector)
  const [spellList, setSpellList] = useState<SpellListInterface>()
  useEffect(() => {
    const execute = async () => {
      const effectResult = await spells.list({
        school: schoolFilter || undefined,
        level: levelFilter ? levelFilter.toString() : undefined,
      })
      setSpellList(effectResult)
    }

    execute()
  }, [levelFilter, schoolFilter])

  return (
    <Box paddingTop={6}>
      <Heading as='h3' size='lg' marginBottom={3}>Spells</Heading>
      {spellList ? (
        spellList && (
          <List>
            {spellList.results.map(({ name, index }) => (
              <ListItem key={index} onClick={() => dispatch(selectResource(index))}>{name}</ListItem>
            ))}
          </List>
        )
      ) : (
        <Text>loading</Text>
      )}
    </Box>
  )
}
