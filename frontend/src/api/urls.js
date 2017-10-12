/**
 * Created by nwu on 9/26/17.
 */
// dev backend
// const BACKEND_BASE = "http://localhost:3001";
// const AUTH_BASE="http://localhost:3002";

// prod backend
const AUTH_BASE = "https://zbt.scripts.mit.edu:444/authentication/";
const BACKEND_BASE = "https://zbt-backend.herokuapp.com";

const API_BASE= BACKEND_BASE + "/api/v1";
const USER_BASE = API_BASE + "/user";
const MIDNIGHT_BASE = API_BASE + "/midnights";
const SEMESTER_BASE = API_BASE + "/semester";

export const session = {
  certificate: AUTH_BASE,
  form: BACKEND_BASE + "/login",
};

export const user = {
  info: USER_BASE + "/",
  all: USER_BASE + "/current",
  create: USER_BASE + "/create",
  remove: USER_BASE + "/remove/",
  edit: USER_BASE + "/update/",
  reset: USER_BASE + "/password/reset/",
  change: USER_BASE + "/password/change"
};

export const midnight = {
  weekList: MIDNIGHT_BASE + "/weeklist",
  createMidnight: MIDNIGHT_BASE + "/assign",
  editMidnight: MIDNIGHT_BASE + "/update_assignment/",
  removeMidnight: MIDNIGHT_BASE + "/remove/",
  typeList: MIDNIGHT_BASE + "/types",
  createType: MIDNIGHT_BASE + "/types/create",
  editType: MIDNIGHT_BASE + "/types/update/",
  removeType: MIDNIGHT_BASE + "/types/remove/",
};

export const semester = {
  get: SEMESTER_BASE + "/",
  create: SEMESTER_BASE + "/",
  getAll: SEMESTER_BASE + "/all",
  set: SEMESTER_BASE + "/update_current/",
};