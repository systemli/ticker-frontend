import React from 'react'
import MessageList from '../../components/MessageList'
import { configure, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16/build'
import Ticker from '../../models/Ticker'

configure({adapter: new Adapter()})

it('should initial loading the messages', () => {
  const ticker = new Ticker({
    information: {}
  })
  const component = mount(<MessageList ticker={ticker}/>)

  expect(component.text()).toBe('Loading messages')
})

it('should called fetchMessages after mounting', () => {
  const ticker = new Ticker({
    active: true,
    information: {}
  })

  window.fetch = jest.fn().mockImplementation(() => {
    return new Promise((resolve) => {
      resolve({
        ok: true,
        json: () => {return {data: {messages: null}}}
      })
    })
  })

  const methodFetchMessages = jest.spyOn(MessageList.prototype, 'fetchMessages')

  mount(<MessageList ticker={ticker}/>)

  expect(methodFetchMessages).toHaveBeenCalledTimes(1)
})
