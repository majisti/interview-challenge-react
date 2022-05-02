import React, { FC } from 'react'
import { SpellLevels, SpellSchool } from '../../modules/spells'
import { Button, Dropdown } from '../../components'
import { capitalizeFirstLetter } from '../../utils/string'
import { useDispatch, useSelector } from '../../hooks'
import {
  hasActiveFiltersSelector,
  levelFilterSelector,
  resetFilters,
  schoolFilterSelector,
  setLevelFilter,
  setSchoolFilter,
} from '../../modules/filters'
import { Box, Heading } from '@chakra-ui/react'

export const SpellFilters: FC = () => {
  const dispatch = useDispatch()
  const hasActiveFilters = useSelector(hasActiveFiltersSelector)
  const levelFilter = useSelector(levelFilterSelector)
  const schoolFilter = useSelector(schoolFilterSelector)

  const onClassFilterChange = (value: string) => dispatch(setLevelFilter(parseInt(value)))
  const onSchoolFilterChange = (value: string) => dispatch(setSchoolFilter(value))
  const onResetClick = () => dispatch(resetFilters())

  return (
    <>
      <Box display='flex' flexDirection='row' alignItems='center' justifyContent='space-between' marginBottom={3}>
        <Heading as='h3' size='lg'>Filters</Heading>
        {hasActiveFilters && <Button onClick={onResetClick}>Reset</Button>}
      </Box>
      <Dropdown
        options={SpellLevels.map((level) => ({ value: level.toString(), label: level.toString() }))}
        placeholder='Level'
        selected={levelFilter ? levelFilter.toString() : undefined}
        onChange={onClassFilterChange}
      />
      <Dropdown
        options={Object.values(SpellSchool).map((value) => ({ value, label: capitalizeFirstLetter(value) }))}
        placeholder='School'
        selected={schoolFilter || undefined}
        onChange={onSchoolFilterChange}
      />
    </>
  )
}
