import { render, screen } from '@testing-library/react'
import user from '@testing-library/user-event'
import { Dropdown, DropdownProps } from './dropdown'

describe(`<Dropdown />`, () => {
  const optionOne = { label: 'Option 1', value: 'option-1' }
  const optionTwo = { label: 'Option 2', value: 'option-2' }
  const defaultProps: DropdownProps = {
    placeholder: 'Choose',
    options: [optionOne, optionTwo],
  }
  const renderDropdown = (props: Partial<DropdownProps> = {}) => render(<Dropdown {...{ ...defaultProps, ...props }} />)

  const dropdown = () => screen.getByTestId(/choose/i)

  it(`renders with all the listed options`, () => {
    renderDropdown()

    expect(dropdown()).toBeInTheDocument()
    expect(dropdown()).toHaveDisplayValue(defaultProps.placeholder)

    user.selectOptions(dropdown(), screen.getByText(optionOne.label))
    user.selectOptions(dropdown(), screen.getByText(optionTwo.label))
  })

  it(`calls the method given on value change`, () => {
    const onChange = jest.fn()
    renderDropdown({ onChange })

    user.selectOptions(dropdown(), screen.getByText(optionOne.label))

    expect(onChange).toHaveBeenCalled()
  })

  it(`sets the selected option`, () => {
    renderDropdown({ selected: optionTwo.value })

    expect(dropdown()).toHaveDisplayValue(optionTwo.label)
  })
})
