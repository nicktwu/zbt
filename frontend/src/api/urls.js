/**
 * Created by nwu on 9/26/17.
 */

const AUTH_BASE = "https://zbt.scripts.mit.edu:444/authentication/";
const BACKEND_BASE = "http://zbt-backend.herokuapp.com";
const API_BASE= BACKEND_BASE + "/api/v1";
const USER_BASE = API_BASE + "/user";

export const session = {
  certificate: AUTH_BASE,
  form: BACKEND_BASE + "/login",
};

export const user = {
  info: USER_BASE + "/"
};