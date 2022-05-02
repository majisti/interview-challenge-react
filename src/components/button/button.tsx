import React, { FC, useMemo } from 'react'
import {Button as ChakraButton} from '@chakra-ui/react'

export interface ButtonProps {
  onClick?: () => void
}

export const Button: FC<ButtonProps> = ({ onClick, children }) => {
  const onClickHandler = useMemo(() => onClick ? onClick : () => null, [onClick])

  return (
    <ChakraButton onClick={onClickHandler} size='sm'>
      {children}
    </ChakraButton>
  )
}
