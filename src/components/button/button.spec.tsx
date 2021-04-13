import { render, screen } from '@testing-library/react'
import user from '@testing-library/user-event'
import { Button } from './button'

describe(`<Button />`, () => {
  it(`renders`, () => {
    render(<Button>Hello</Button>)

    expect(screen.getByRole('button')).toBeInTheDocument()
    expect(screen.getByText('Hello')).toBeInTheDocument()
  })

  it(`calls the method given on click`, () => {
    const onClick = jest.fn()
    render(<Button onClick={onClick}>Hello</Button>)

    user.click(screen.getByRole('button'))

    expect(onClick).toHaveBeenCalled()
  })
})
