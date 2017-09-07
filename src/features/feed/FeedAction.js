import { FETCH_POSTS } from '../../constants/ActionTypes'

function fetchPostsFailure(error) {
  return {
    type: FETCH_POSTS.FAILURE,
    payload: error.message
  }
}

function fetchPostsSuccess(data) {
  return {
    type: FETCH_POSTS.SUCCESS,
    meta: {
      receivedAt: Date.now(),
      config: data.config,
      headers: data.headers,
      request: data.request
    },
    payload: data.data
  }
}

function fetchPosts(axios) {
  return (dispatch) => {
    dispatch({
      type: FETCH_POSTS.REQUEST
    })
    return axios('https://jsonplaceholder.typicode.com/posts')
      .then(
        data => dispatch(fetchPostsSuccess(data)),
        error => dispatch(fetchPostsFailure(error))
      )
  }
}

function shouldFetchPosts(state) {
  const posts = state.posts
  // return !(posts.value.children instanceof Array || posts.isFetching);
  return true
}

export function fetchPostsIfNeeded() {
  return (dispatch, getState, axios) => {
    if (shouldFetchPosts(getState())) {
      return dispatch(fetchPosts(axios))
    }
  }
}
