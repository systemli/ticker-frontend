import React from 'react'
import ReloadInfo from '../../components/ReloadInfo'
import Adapter from 'enzyme-adapter-react-16'
import { configure, mount } from 'enzyme'

configure({adapter: new Adapter()})

it('should return the correct informative text', () => {
  const component = mount(<ReloadInfo/>)

  expect(component.contains('The messages update automatically. There is no need to reload the entire page.')).toBe(true)

  component.unmount()
})

it('should update the state if close button clicked', () => {
  const component = mount(<ReloadInfo/>)

  expect(component.state().showReloadInfo).toBe(true)

  component.find('i.close.icon').simulate('click')

  expect(component.state().showReloadInfo).toBe(false)

  component.unmount()
})
