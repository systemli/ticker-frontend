import React from 'react'
import Adapter from 'enzyme-adapter-react-16'
import { configure, shallow } from 'enzyme'
import About from '../../components/About'
import Ticker from '../../models/Ticker'

configure({adapter: new Adapter()})

const ticker = new Ticker({
  id: 7,
  creation_date: '2018-12-11T13:59:52.752829564+01:00',
  domain: 'example.org',
  title: 'Example title',
  description: 'Description',
  active: false,
  prepend_time: false,
  hashtags: null,
  information: {
    author: '',
    url: '',
    email: '',
    twitter: '',
    facebook: ''
  },
  twitter: {
    active: false,
    connected: false,
    name: '',
    screen_name: '',
    description: '',
    image_url: ''
  }
})

it('should return null when ticker is not set', () => {
  const component = shallow(<About ticker={null}/>)

  expect(component.html()).toBe(null)
})

it('should render the mobile mode', () => {
  const component = shallow(<About ticker={ticker}/>)

  expect(component.html()).not.toBe(null)
})

it('should render the modal mode', () => {
  const component = shallow(<About ticker={ticker} type='modal'/>)

  expect(component.html()).not.toBe(null)
})
