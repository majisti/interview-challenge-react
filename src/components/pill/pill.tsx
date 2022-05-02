import React, { FC } from 'react'
import {Tag} from '@chakra-ui/react'

export interface PillProps {
  color?: 'yellow' | 'purple'
}

export const Pill: FC<PillProps> = ({ children, color = 'yellow' }) => {
  return (
    <Tag colorScheme={color} borderRadius='full'>
      {children}
    </Tag>
  )
}
