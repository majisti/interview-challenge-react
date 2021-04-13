import { FC } from 'react'
import styles from './list-item.module.scss'

export interface ListItemProps {
  onClick?: () => void
}

export const ListItem: FC<ListItemProps> = ({ children, onClick }) => (
  <li className={styles.listItem} onClick={onClick}>
    {children}
  </li>
)
