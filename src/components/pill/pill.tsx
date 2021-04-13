import React, { FC, useMemo } from 'react'
import classnames from 'classnames'
import styles from './pill.module.scss'

export interface PillProps {
  color?: 'yellow' | 'purple'
}

export const Pill: FC<PillProps> = ({ children, color = 'yellow' }) => {
  const classes = useMemo(() => classnames({
    [styles.pill]: true,
    [styles.yellow]: color === 'yellow',
    [styles.purple]: color === 'purple',
  }), [color])

  return (
    <span className={classes}>
      {children}
    </span>
  )
}
