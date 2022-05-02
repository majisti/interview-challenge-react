import { FC } from 'react'
import { SelectedSpell, SpellFilters, SpellList } from './blocks'
import { Box, Center, Container } from '@chakra-ui/react'
import { FavoriteSpells } from './blocks/favorite-spells'

export const Spells: FC = () => {
  return (
    <Center>
      <Container maxWidth='container.lg' display='flex' marginTop={6}>
        <Box maxHeight='96vh' overflowY='scroll' paddingX={4} position='sticky' top={0}>
          <SpellFilters />
          <FavoriteSpells />
          <SpellList />
        </Box>
        <Container>
          <SelectedSpell />
        </Container>
      </Container>
    </Center>
  )
}
