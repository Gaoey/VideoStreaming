import {
  FETCH_POSTS_REQUEST,
  FETCH_POSTS_SUCCESS,
  FETCH_POSTS_FAILURE
} from '../../constants/ActionTypes'

function posts(state = {
  isFetching: false,
  error: false,
  meta: {},
  value: []
}, action) {
  switch (action.type) {
    case FETCH_POSTS_REQUEST:
      return {
        ...state,
        isFetching: true,
        error: false
      };
    case FETCH_POSTS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        value: action.payload,
        meta: action.meta,
      };
    case FETCH_POSTS_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.payload
      };
    default:
      return state;
  }
}

export default posts;
