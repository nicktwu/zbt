/**
 * Created by nwu on 9/26/17.
 */

const AUTH_BASE = "http://localhost:3002";
const BACKEND_BASE = "http://localhost:3001";
const API_BASE= BACKEND_BASE + "/api/v1";
const USER_BASE = API_BASE + "/user";

export const session = {
  certificate: AUTH_BASE,
  form: BACKEND_BASE + "/login",
};

export const user = {
  info: USER_BASE + "/"
};