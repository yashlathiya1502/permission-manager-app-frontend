import axiosInstance from '../../utils/axiosInstance';
import handleApiResponse from '../../utils/handleApiResponse';
import { DELETE_USER_URL, GET_USERS_URL, UPDATE_USER_URL } from '../apiUrl';

export const fetchUsers = async () => {
  return await handleApiResponse(axiosInstance.get(GET_USERS_URL));
};

export const deleteUser = async (userId) => {
  return await handleApiResponse(axiosInstance.delete(`${DELETE_USER_URL}/${userId}`),true);
};

export const updateUser = async (userId,body) => {
  return await handleApiResponse(axiosInstance.put(`${UPDATE_USER_URL}/${userId}`, body),true);
};
