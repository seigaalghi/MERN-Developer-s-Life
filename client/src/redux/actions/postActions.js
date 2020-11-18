import axios from 'axios';
import { setAlert } from './alertActions';
import { GET_POSTS, POST_ERROR, CLEAN_POSTS, UPDATE_LIKE, DELETE_POST, ADD_POST, GET_POST, ADD_COMMENT, REMOVE_COMMENT } from '../types';

// Get Posts
export const getPosts = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/post');
    dispatch({
      type: GET_POSTS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: error.response.statusText, status: error.response.status },
    });
  }
};

// Get Post
export const getPost = (postId) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/post/${postId}`);
    dispatch({
      type: GET_POST,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: error.response.statusText, status: error.response.status },
    });
  }
};

// Bring back loading to true
export const cleanPosts = () => async (dispatch) => {
  try {
    dispatch({
      type: CLEAN_POSTS,
    });
  } catch (error) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: error.response.statusText, status: error.response.status },
    });
  }
};

// Add like to post
export const addLike = (postId) => async (dispatch) => {
  try {
    const res = await axios.put(`/api/post/like/${postId}`);
    dispatch({
      type: UPDATE_LIKE,
      payload: { id: postId, likes: res.data },
    });
  } catch (error) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: error.response.statusText, status: error.response.status },
    });
  }
};
// Remove like to post
export const removeLike = (postId) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/post/like/${postId}`);
    dispatch({
      type: UPDATE_LIKE,
      payload: { id: postId, likes: res.data },
    });
  } catch (error) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: error.response.statusText, status: error.response.status },
    });
  }
};
// Delete post
export const removePost = (postId) => async (dispatch) => {
  if (window.confirm('Are you sure?')) {
    try {
      await axios.delete(`/api/post/${postId}`);
      dispatch({
        type: DELETE_POST,
        payload: { id: postId },
      });
      dispatch(setAlert('Post Deleted', 'success'));
    } catch (error) {
      dispatch({
        type: POST_ERROR,
        payload: { msg: error.response.statusText, status: error.response.status },
      });
    }
  }
};

// ADD POST
export const addPost = (formData) => async (dispatch) => {
  const config = {
    headers: {
      'Content-type': 'application/json',
    },
  };
  const body = JSON.stringify(formData);
  try {
    const res = await axios.post(`/api/post/`, body, config);
    dispatch({
      type: ADD_POST,
      payload: [res.data],
    });
    dispatch(setAlert('Posted', 'success'));
  } catch (error) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: error.response.statusText, status: error.response.status },
    });
  }
};

// ADD Comment
export const addComment = (formData, postId) => async (dispatch) => {
  const config = {
    headers: {
      'Content-type': 'application/json',
    },
  };
  const body = JSON.stringify(formData);
  try {
    const res = await axios.post(`/api/post/comment/${postId}`, body, config);
    dispatch({
      type: ADD_COMMENT,
      payload: res.data,
    });
    dispatch(setAlert('Comment Published', 'success'));
  } catch (error) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: error.response.statusText, status: error.response.status },
    });
  }
};

// ADD Comment
export const removeComment = (postId, commentId) => async (dispatch) => {
  if (window.confirm('Are You Sure?')) {
    try {
      const res = await axios.delete(`/api/post/comment/${postId}/${commentId}`);
      dispatch({
        type: REMOVE_COMMENT,
        payload: res.data,
      });
      dispatch(setAlert('Comment Removed', 'success'));
    } catch (error) {
      dispatch({
        type: POST_ERROR,
        payload: { msg: error.response.statusText, status: error.response.status },
      });
    }
  }
};
