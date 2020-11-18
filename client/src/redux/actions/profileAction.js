import axios from 'axios';
import { setAlert } from './alertActions';

import { GET_PROFILE, PROFILE_ERROR, CLEAN_PROFILE, UPDATE_PROFILE, GET_PROFILES, LOGOUT, CLEAR_PROFILE, GET_REPOS } from '../types';

// GET CURRENT USER PROFILE

export const getCurrentProfile = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/profile/me');

    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: error.response.msg },
    });
  }
};

// Cleaer Profile
export const cleanProfile = () => (dispatch) => {
  dispatch({
    type: CLEAN_PROFILE,
  });
};

// Create or Update Profile
export const createProfile = (formData, history, edit = false) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-type': 'application/json',
      },
    };
    const res = await axios.post('/api/profile', formData, config);
    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });
    dispatch(setAlert(edit ? 'Profile Updated' : 'Profile Created', 'success'));
  } catch (error) {
    const errors = error.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: error.response.msg },
    });
  }
  if (!edit) {
    history.push('/dashboard');
  }
};

// Add Experience
export const addExperience = (formData, history) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-type': 'application/json',
      },
    };
    const res = await axios.put('/api/profile/experience', formData, config);
    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });
    dispatch(setAlert('Experience Added', 'success'));
    history.push('/dashboard');
  } catch (error) {
    const errors = error.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: error.response.msg },
    });
  }
};

// Add Education
export const addEducation = (formData, history) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-type': 'application/json',
      },
    };
    const res = await axios.put('/api/profile/education', formData, config);
    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });
    dispatch(setAlert('Education Added', 'success'));
    history.push('/dashboard');
  } catch (error) {
    const errors = error.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: error.response.msg },
    });
  }
};

// Delete Experience
export const deleteExperience = (id) => async (dispatch) => {
  if (window.confirm('Are you sure to delete this experience filed?')) {
    try {
      const res = await axios.delete(`/api/profile/experience/${id}`);
      dispatch({
        type: UPDATE_PROFILE,
        payload: res.data,
      });
      dispatch(setAlert('Experience Removed', 'success'));
    } catch (error) {
      dispatch({
        type: PROFILE_ERROR,
        payload: { msg: error.response.msg },
      });
    }
  }
};

// Delete Education
export const deleteEducation = (id) => async (dispatch) => {
  if (window.confirm('Are you sure to delete this education filed?')) {
    try {
      const res = await axios.delete(`/api/profile/education/${id}`);
      dispatch({
        type: UPDATE_PROFILE,
        payload: res.data,
      });
      dispatch(setAlert('Education Removed', 'success'));
    } catch (error) {
      dispatch({
        type: PROFILE_ERROR,
        payload: { msg: error.response.msg },
      });
    }
  }
};

// Delete Account
export const deleteAccount = (id) => async (dispatch) => {
  if (window.confirm('Are you sure to delete your account?')) {
    try {
      await axios.delete(`/api/profile/`);
      dispatch({
        type: LOGOUT,
      });
      dispatch(setAlert('Your account has been permanently removed', 'warning'));
    } catch (error) {
      dispatch({
        type: PROFILE_ERROR,
        payload: { msg: error.response.msg },
      });
    }
  }
};

// Get All Profiles
export const getProfiles = () => async (dispatch) => {
  dispatch({ type: CLEAR_PROFILE });
  try {
    const res = await axios.get('/api/profile');
    dispatch({
      type: GET_PROFILES,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: error.response.msg },
    });
  }
};

// Get Profile by ID
export const getProfileById = (userId) => async (dispatch) => {
  dispatch({ type: CLEAR_PROFILE });
  try {
    const res = await axios.get(`/api/profile/user/${userId}`);
    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: error.response.msg },
    });
  }
};

// Get Github Repos
export const getGithubRepos = (githubusername) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/profile/github/${githubusername}`);
    dispatch({
      type: GET_REPOS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: error.response.msg },
    });
  }
};
