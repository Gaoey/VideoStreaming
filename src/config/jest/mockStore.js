import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import callAPIMiddleware from '../../middlewares/callAPIMiddleware'

global.Date = jest.fn()
Date.now = () => '123456'
Date.getTime = () => '123456'

const middlewares = [thunk, callAPIMiddleware]
const mockStore = configureMockStore(middlewares)
export default mockStore
