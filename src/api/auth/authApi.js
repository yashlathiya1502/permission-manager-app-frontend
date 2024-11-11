import axios from 'axios';
import axiosInstance from '../../utils/axiosInstance';
import handleApiResponse from '../../utils/handleApiResponse';
import {
  LOGIN_URL,
  LOGOUT_URL,
  REFRESH_TOKEN_URL,
  REGISTER_URL,
} from '../apiUrl';

// export const registerUser = async (body, showToaster=false) => {
//     try {
//       const response = await axios.post(REGISTER_URL, body);
//       const { data = null, success, message,metaData = null } = response.data;
//       const result = {
//         success,
//         message,
//         data,
//         metaData
//       };
//       if (success) {
//         showToaster && showSuccessToaster(result?.message);
//       } else {
//         showToaster && showErrorToaster(result?.message);
//       }

//       return result;
//     } catch (error) {
//       const { message } = error?.response?.data || {statusCode:500,message:"Something went wrong"};
//       const result = {
//         success: false,
//         message: message || "Something went wrong!",
//         data: null,
//         metaData: null
//       };
//       showToaster && showErrorToaster(result.message);
//       return result;
//     }
//   };

export const registerUser = async (body) => {
  return await handleApiResponse(axios.post(REGISTER_URL, body), true);
};

export const loginUser = async (body) => {
  return await handleApiResponse(axios.post(LOGIN_URL, body), true);
};

export const refershAccessToken = async (refresh_token) => {
  return await handleApiResponse(
    axios.post(REFRESH_TOKEN_URL, { refreshToken: refresh_token })
  );
};

export const logoutUser = async () => {
  return await handleApiResponse(axiosInstance.post(LOGOUT_URL), true);
};
