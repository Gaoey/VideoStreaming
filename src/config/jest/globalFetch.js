global.Headers = () => ({
    append: () => {}
})

global.fetch = jest.fn();

// Helper to mock a success response (only once)
fetch.mockResponseSuccess = (body) => {
  fetch.mockImplementationOnce (
    () => Promise.resolve({json: () => Promise.resolve(JSON.parse(body))})
  );
};