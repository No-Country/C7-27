import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const userSlice = createSlice({
  name: "user",
  initialState: {},
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
    },
  },
});

export const { login, logout } = userSlice.actions;

export default userSlice.reducer;

export const actionUserLogin = (user) => {
  return async function (dispatch) {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const URL = `${process.env.NEXT_PUBLIC_VERCEL_URL || process.env.NEXT_PUBLIC_API_URL}/api/loginUser`;
    try {
      const { data } = await axios.post(URL, user, config);
      dispatch(login(data));
      return data.token;
    } catch (e) {
      throw e.response.data.msg;
    }
  };
};

export const actionUserLogout = () => {
  return async function (dispatch) {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const URL = `${process.env.NEXT_PUBLIC_VERCEL_URL || process.env.NEXT_PUBLIC_API_URL}/api/users/logout`;
    try {
      await axios.get(URL, config);
      dispatch(logout());
    } catch (e) {
      console.log(e);
    }
  };
};

export const userRegister = (user) => {
  return async function () {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const URL = `${process.env.NEXT_PUBLIC_VERCEL_URL || process.env.NEXT_PUBLIC_API_URL}/api/users/registerProfessional`;
    try {
      const { data } = await axios.post(URL, user, config);
      return;
    } catch (e) {
      return e.message;
    }
  };
};

export const actionAuthenticateUser = (token) => {
  return async function (dispatch) {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const URL = `${process.env.NEXT_PUBLIC_VERCEL_URL || process.env.NEXT_PUBLIC_API_URL}/api/users/profile`;
    try {
      const { data } = await axios.post(URL, { token }, config);
      dispatch(login(data));
      return;
    } catch (e) {
      return e.message;
    }
  };
};

export const updateProfile = (user) => {
  return async function (dispatch) {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const URL = `${process.env.NEXT_PUBLIC_API_URL}/api/users/update`;
    try {
      const { data } = await axios.put(URL, user, config);
      dispatch(login(data));
    } catch (e) {
      return e.message;
    }
  };
};
