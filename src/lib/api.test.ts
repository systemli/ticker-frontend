import { getInit, getTimeline } from './api'

describe('api', function () {
  beforeEach(() => {
    fetchMock.resetMocks()
  })

  test('get w/ error response', async function () {
    fetchMock.mockResponse('{}', { status: 400, statusText: 'Bad Request' })

    expect(async () => {
      await getInit()
    }).rejects.toThrow('The server responses with an error: Bad Request (400)')
  })

  test('getInit', async function () {
    fetchMock.mockResponseOnce('{}')

    const response = await getInit()

    expect(response).not.toBeNull()
    expect(fetchMock).toHaveBeenCalledTimes(1)
    expect(fetchMock).toHaveBeenCalledWith('http://localhost:8080/v1/init')
  })

  test('getTimeline', async function () {
    fetchMock.mockResponseOnce('{}')

    const response = await getTimeline({})

    expect(response).not.toBeNull()
    expect(fetchMock).toHaveBeenCalledTimes(1)
    expect(fetchMock).toHaveBeenCalledWith('http://localhost:8080/v1/timeline')
  })

  test('getTimeline w/ after pagination', async function () {
    fetchMock.mockResponseOnce('{}')

    const response = await getTimeline({ after: 1 })

    expect(response).not.toBeNull()
    expect(fetchMock).toHaveBeenCalledTimes(1)
    expect(fetchMock).toHaveBeenCalledWith('http://localhost:8080/v1/timeline?after=1')
  })

  test('getTimeline w/ before pagination', async function () {
    fetchMock.mockResponseOnce('{}')

    const response = await getTimeline({ before: 1 })

    expect(response).not.toBeNull()
    expect(fetchMock).toHaveBeenCalledTimes(1)
    expect(fetchMock).toHaveBeenCalledWith('http://localhost:8080/v1/timeline?before=1')
  })
})
