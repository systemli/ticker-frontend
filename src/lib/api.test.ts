import { getInit, getTimeline } from './api'
import fetch from 'jest-fetch-mock'

describe('api', function () {
  beforeEach(() => {
    fetch.resetMocks()
  })

  test('get w/ error response', async function () {
    fetch.mockResponse('{}', { status: 400 })

    expect(async () => {
      await getInit()
    }).rejects.toThrow('The server responses with an error: Bad Request (400)')
  })

  test('getInit', async function () {
    fetch.mockResponseOnce('{}')

    const response = await getInit()

    expect(response).not.toBeNull()
    expect(fetch).toHaveBeenCalledTimes(1)
    expect(fetch).toHaveBeenCalledWith('http://localhost:8080/v1/init')
  })

  test('getTimeline', async function () {
    fetch.mockResponseOnce('{}')

    const response = await getTimeline({})

    expect(response).not.toBeNull()
    expect(fetch).toHaveBeenCalledTimes(1)
    expect(fetch).toHaveBeenCalledWith('http://localhost:8080/v1/timeline')
  })

  test('getTimeline w/ after pagination', async function () {
    fetch.mockResponseOnce('{}')

    const response = await getTimeline({ after: '1' })

    expect(response).not.toBeNull()
    expect(fetch).toHaveBeenCalledTimes(1)
    expect(fetch).toHaveBeenCalledWith('http://localhost:8080/v1/timeline?after=1')
  })

  test('getTimeline w/ before pagination', async function () {
    fetch.mockResponseOnce('{}')

    const response = await getTimeline({ before: '1' })

    expect(response).not.toBeNull()
    expect(fetch).toHaveBeenCalledTimes(1)
    expect(fetch).toHaveBeenCalledWith('http://localhost:8080/v1/timeline?before=1')
  })
})
