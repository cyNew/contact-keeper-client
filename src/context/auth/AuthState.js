import axios from "axios";
import { useReducer } from "react";
import * as types from "../types";
import AuthContext from "./authContext";
import authReducer from "./authReducer";
import setAuthToken from "../../utils/setAuthToken";

export default function AuthState(props) {
  const initialState = {
    token: localStorage.getItem("token"),
    isAuthenticated: null,
    loading: true,
    user: null,
    error: null,
  };

  const [state, dispatch] = useReducer(authReducer, initialState);

  // Load User
  const loadUser = async () => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }

    try {
      const res = await axios.get("/api/auth/");

      dispatch({
        type: types.USER_LOADED,
        payload: res.data,
      });
    } catch (err) {
      dispatch({ type: types.AUTH_ERROR });
    }
  };

  // Register User
  const register = async (formData) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const res = await axios.post("/api/auth/register", formData, config);
      dispatch({
        type: types.REGISTER_SUCCESS,
        payload: res.data,
      });

      loadUser();
    } catch (err) {
      dispatch({
        type: types.REGISTER_FAIL,
        payload: err.response.data.message,
      });
    }
  };

  // Login User
  const login = async (formData) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const res = await axios.post("/api/auth/login", formData, config);
      dispatch({
        type: types.LOGIN_SUCCESS,
        payload: res.data,
      });

      loadUser();
    } catch (err) {
      dispatch({
        type: types.LOGIN_FAIL,
        payload: err.response.data.message,
      });
    }
  };

  // Logout
  const logout = () => {
    dispatch({
      type: types.LOGOUT
    })
  };

  // Clear Errors
  const clearErrors = () => dispatch({ type: types.CLEAR_ERRORS });

  return (
    <AuthContext.Provider
      value={{
        ...state,
        register,
        login,
        logout,
        loadUser,
        clearErrors,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}
