import { GET_POSTS, POST_ERROR, CLEAN_POSTS, UPDATE_LIKE, DELETE_POST, ADD_POST, GET_POST, ADD_COMMENT, REMOVE_COMMENT } from '../types';

const initialState = {
  posts: [],
  post: null,
  loading: true,
  error: {},
};

const post = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_POSTS:
      return {
        ...state,
        posts: payload,
        loading: false,
      };
    case GET_POST:
      return {
        ...state,
        post: payload,
        loading: false,
      };
    case POST_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    case CLEAN_POSTS:
      return {
        ...state,
        posts: [],
        post: null,
        loading: true,
        error: {},
      };
    case UPDATE_LIKE:
      return {
        ...state,
        posts: state.posts.map((post) => (post._id === payload.id ? { ...post, likes: payload.likes } : post)),
        loading: false,
      };
    case DELETE_POST:
      return {
        ...state,
        loading: false,
        posts: state.posts.filter((post) => post._id !== payload.id),
      };
    case ADD_POST:
      return {
        ...state,
        loading: false,
        posts: [...payload, ...state.posts],
      };
    case ADD_COMMENT:
      return {
        ...state,
        loading: false,
        post: { ...state.post, comment: payload },
      };
    case REMOVE_COMMENT:
      return {
        ...state,
        loading: false,
        post: { ...state.post, comment: payload },
      };
    default:
      return state;
  }
};

export default post;
