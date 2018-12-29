import React from 'react'
import Adapter from 'enzyme-adapter-react-16'
import { configure, mount } from 'enzyme'
import Credits from '../../components/Credits'

configure({adapter: new Adapter()})

it('should return the correct string', () => {
  const component = mount(<Credits/>)

  expect(component.text()).toBe(' with  by systemli.org')
})
