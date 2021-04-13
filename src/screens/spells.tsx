import { FC } from 'react'
import { SelectedSpell, SpellFilters, SpellList } from './blocks'
import styles from './spells.module.scss'

export const Spells: FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.spellList}>
        <SpellFilters />
        <SpellList />
      </div>
      <div className={styles.spellDescription}>
        <SelectedSpell />
      </div>
    </div>
  )
}
