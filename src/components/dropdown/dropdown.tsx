import React, { ChangeEvent, FC, useMemo } from 'react'
import { Select } from '@chakra-ui/react'

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
    <Select
      data-testid={placeholder}
      onChange={onChangeHandler}
      value={selected || lowercasePlaceholder}
      placeholder={placeholder}
      background='white'
    >
      {options.map(({ value, label }) => <option key={`option-${value}`} value={value}>{label}</option>)}
    </Select>
  )
}
