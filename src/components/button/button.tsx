import React, { FC, useMemo } from 'react'
import styles from './button.module.scss'

export interface ButtonProps {
  onClick?: () => void
}

export const Button: FC<ButtonProps> = ({ onClick, children }) => {
  const onClickHandler = useMemo(() => onClick ? onClick : () => null, [onClick])

  return (
    <button className={styles.button} onClick={onClickHandler}>
      {children}
    </button>
  )
}
