global.Headers = () => ({
  append: () => ({})
})

global.fetch = jest.fn()

// Helper to mock a success response (only once)
fetch.mockResponseSuccess = (body) => {
  fetch.mockImplementationOnce(
    () => Promise.resolve({
      headers: {
        get: () => (['application/json'])
      },
      json: () => Promise.resolve(body)
    })
  )
}
