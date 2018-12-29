import React from 'react'
import Adapter from 'enzyme-adapter-react-16'
import { configure, shallow } from 'enzyme'
import UpdateMessage from '../../components/UpdateMessage'

configure({adapter: new Adapter()})

it('should return nothing when no update available', () => {
  const component = shallow(<UpdateMessage update={false}/>)

  expect(component.html()).toBe(null)
})

it('should return not null when update available', () => {
  const component = shallow(<UpdateMessage update={true}/>)

  expect(component.html()).not.toBe(null)
})
