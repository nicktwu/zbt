/**
 * Created by nwu on 9/26/17.
 */
// dev backend
// const BACKEND_BASE = "http://localhost:3001";
// const AUTH_BASE="http://localhost:3002";

// prod backend
const AUTH_BASE = "https://zbt.scripts.mit.edu:444/authentication/";
const REDIRECT_AUTH = "https://zbt.scripts.mit.edu:444/authentication2/";
const BACKEND_BASE = "https://zbt-backend.herokuapp.com";

const API_BASE= BACKEND_BASE + "/api/v1";
const USER_BASE = API_BASE + "/user";
const MIDNIGHT_BASE = API_BASE + "/midnights";
const SEMESTER_BASE = API_BASE + "/semester";
const TRADES_BASE = API_BASE+"/trades";

export const session = {
  certificate: AUTH_BASE,
  form: BACKEND_BASE + "/login",
  external: REDIRECT_AUTH,
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
  all: MIDNIGHT_BASE + "/all",
  weekList: MIDNIGHT_BASE + "/weeklist",
  createMidnight: MIDNIGHT_BASE + "/assign",
  editMidnight: MIDNIGHT_BASE + "/update_assignment/",
  removeMidnight: MIDNIGHT_BASE + "/remove/",
  typeList: MIDNIGHT_BASE + "/types",
  createType: MIDNIGHT_BASE + "/types/create",
  editType: MIDNIGHT_BASE + "/types/update/",
  removeType: MIDNIGHT_BASE + "/types/remove/",
  accountList: MIDNIGHT_BASE + "/accounts",
  createAccount: MIDNIGHT_BASE + "/accounts/create",
  editAccount: MIDNIGHT_BASE + "/accounts/update/",
  removeAccount: MIDNIGHT_BASE + "/accounts/remove/",
  unreviewed: MIDNIGHT_BASE + "/unreviewed",
  reviewed: MIDNIGHT_BASE + "/reviewed",
  award: MIDNIGHT_BASE + "/award",
};

export const semester = {
  get: SEMESTER_BASE + "/",
  create: SEMESTER_BASE + "/",
  getAll: SEMESTER_BASE + "/all",
  set: SEMESTER_BASE + "/update_current/",
};

export const trades = {
  midnightTrades: TRADES_BASE + "/midnight",
};