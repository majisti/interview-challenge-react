import { capitalizeFirstLetter } from './index'

describe(`string`, () => {
  it(`capitalizes the first letter`, () => {
    expect(capitalizeFirstLetter('foobar')).toEqual('Foobar')
  })
})
