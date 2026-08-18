import { getInit, getTimeline, mediaUrl } from './api'

describe('api', function () {
  beforeEach(() => {
    fetchMock.resetMocks()
  })

  test('get w/ error response', async function () {
    fetchMock.mockResponse('{}', { status: 400, statusText: 'Bad Request' })

    await expect(async () => {
      await getInit()
    }).rejects.toThrow('The server responses with an error: Bad Request (400)')
  })

  test('getInit', async function () {
    fetchMock.mockResponseOnce('{}')

    const response = await getInit()

    expect(response).not.toBeNull()
    expect(fetchMock).toHaveBeenCalledTimes(1)
    expect(fetchMock).toHaveBeenCalledWith('/api/init')
  })

  test('getTimeline', async function () {
    fetchMock.mockResponseOnce('{}')

    const response = await getTimeline({})

    expect(response).not.toBeNull()
    expect(fetchMock).toHaveBeenCalledTimes(1)
    expect(fetchMock).toHaveBeenCalledWith('/api/timeline')
  })

  test('getTimeline w/ after pagination', async function () {
    fetchMock.mockResponseOnce('{}')

    const response = await getTimeline({ after: 1 })

    expect(response).not.toBeNull()
    expect(fetchMock).toHaveBeenCalledTimes(1)
    expect(fetchMock).toHaveBeenCalledWith('/api/timeline?after=1')
  })

  test('getTimeline w/ before pagination', async function () {
    fetchMock.mockResponseOnce('{}')

    const response = await getTimeline({ before: 1 })

    expect(response).not.toBeNull()
    expect(fetchMock).toHaveBeenCalledTimes(1)
    expect(fetchMock).toHaveBeenCalledWith('/api/timeline?before=1')
  })

  test('mediaUrl', function () {
    // ApiUrl is the relative default in tests, so the URL passes through.
    expect(mediaUrl('/api/media/uuid.jpg')).toEqual('/api/media/uuid.jpg')
    expect(mediaUrl('https://cdn.example.org/media/uuid.jpg')).toEqual('https://cdn.example.org/media/uuid.jpg')
  })
})
