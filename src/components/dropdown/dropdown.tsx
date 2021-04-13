import React, { ChangeEvent, FC, useMemo } from 'react'
import styles from './dropdown.module.scss'

export interface DropdownProps {
  placeholder: string
  options: Array<{
    value: string
    label: string
  }>
  onChange?: (value: string) => void
  selected?: string
}

export const Dropdown: FC<DropdownProps> = ({ onChange, options, placeholder, selected }) => {
  const onChangeHandler = useMemo(() => (
    !onChange ? () => null : (event: ChangeEvent<HTMLSelectElement>) => {
      onChange(event.target.value)
    }), [onChange])
  const lowercasePlaceholder = useMemo(() => placeholder.toLowerCase(), [placeholder])

  return (
    <select
      className={styles.dropdown}
      onChange={onChangeHandler}
      value={selected || lowercasePlaceholder}
      aria-label={placeholder}
    >
      <option value={lowercasePlaceholder} disabled>{placeholder}</option>
      {options.map(({ value, label }) => <option key={`option-${value}`} value={value}>{label}</option>)}
    </select>
  )
}
