import { FC } from 'react'
import styles from './list.module.scss'

export const List: FC = ({children}) => (
  <ul className={styles.list}>
    {children}
  </ul>
)
