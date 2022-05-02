import { FC } from 'react'
import {UnorderedList} from '@chakra-ui/react'

export const List: FC = ({ children }) => (
  <UnorderedList spacing={2} styleType='none' margin={0}>
    {children}
  </UnorderedList>
)
