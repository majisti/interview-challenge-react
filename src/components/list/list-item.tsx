import { FC } from 'react'
import {ListItem as ChakraListItem} from '@chakra-ui/react'

export interface ListItemProps {
  onClick?: () => void
}

export const ListItem: FC<ListItemProps> = ({ children, onClick }) => (
  <ChakraListItem onClick={onClick} cursor='pointer'>
    {children}
  </ChakraListItem>
)
