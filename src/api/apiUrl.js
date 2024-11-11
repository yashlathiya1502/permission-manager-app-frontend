const url = `${process.env.REACT_APP_BACKEND_URL}`;
export const LOGIN_URL = `${url}/user/login`;
export const REGISTER_URL = `${url}/user/register`;
export const REFRESH_TOKEN_URL = `${url}/user/refresh-token`;
export const LOGOUT_URL = `${url}/user/logout`;
export const GET_USERS_URL = `${url}/user/getAllUsers`;
export const DELETE_USER_URL = `${url}/user/delete`;
export const UPDATE_USER_URL = `${url}/user/update`;
export const GET_ROLES_URL = `${url}/role/getAllRoles`;
export const DELETE_ROLE_URL = `${url}/role/delete`;
export const CREATE_ROLE_URL = `${url}/role/create`;
export const UPDATE_ROLE_PERMISSION_URL = `${url}/role/update/permissions`;