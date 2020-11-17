import axios from 'axios';
import { setAlert } from './alertActions';
import { REGISTER_FAIL, REGISTER_SUCCESS, USER_LOADED, AUTH_ERROR, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT, CLEAR_PROFILE } from '../types';
import setAuthToken from '../utility/setAuthToken';

// LOAD USER

export const loadUser = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const res = await axios.get('/api/auth');
    dispatch({
      type: USER_LOADED,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

// Register User
export const register = ({ name, email, password }) => async (dispatch) => {
  const config = {
    headers: {
      'Content-type': 'application/json',
    },
  };
  const body = JSON.stringify({ name, email, password });
  try {
    const res = await axios.post('/api/users', body, config);

    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data,
    });
    dispatch(setAlert('Registered Successfully', 'success'));
    dispatch(loadUser());
  } catch (error) {
    const errors = error.response.data.errors;
    if (errors) {
      errors.forEach((err) => dispatch(setAlert(err.msg, 'danger')));
    }
    dispatch({
      type: REGISTER_FAIL,
    });
  }
};

// LOGIN User
export const login = ({ email, password }) => async (dispatch) => {
  const config = {
    headers: {
      'Content-type': 'application/json',
    },
  };
  const body = JSON.stringify({ email, password });
  try {
    const res = await axios.post('/api/auth', body, config);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });
    dispatch(loadUser());
  } catch (error) {
    const errors = error.response.data.errors;
    if (errors) {
      errors.forEach((err) => dispatch(setAlert(err.msg, 'danger')));
    }
    dispatch({
      type: LOGIN_FAIL,
    });
  }
};

// LOGOUT

export const logout = () => (dispatch) => {
  dispatch({
    type: LOGOUT,
  });
  dispatch({
    type: CLEAR_PROFILE,
  });
};
