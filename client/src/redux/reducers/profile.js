import { GET_PROFILE, PROFILE_ERROR, CLEAR_PROFILE, CLEAN_PROFILE, UPDATE_PROFILE, ACCOUNT_DELETED } from '../types';

const initialState = {
  profile: null,
  profiles: [],
  repos: [],
  loading: true,
  error: {},
};

const profile = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_PROFILE:
      return {
        ...state,
        profile: payload,
        loading: false,
      };
    case PROFILE_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    case CLEAR_PROFILE:
      return {
        ...state,
        profile: null,
        profiles: [],
        repos: [],
        error: {},
        loading: true,
      };
    case CLEAN_PROFILE:
      return {
        ...state,
        loading: true,
      };
    case UPDATE_PROFILE:
      return {
        ...state,
        profile: payload,
        loading: false,
      };
    default:
      return state;
  }
};

export default profile;
