import { Middleware } from "@reduxjs/toolkit";
import { RootState } from "..";
import axios from "axios";
const authMiddleware: Middleware =
  ({ getState }) =>
  (next) =>
  (action) => {
    const state: RootState = getState();
    const token = state.user.token;

    if (token) {
      axios.defaults.headers["Authorization"] = `Bearer ${token}`;
    }

    return next(action);
  };

export default authMiddleware;
