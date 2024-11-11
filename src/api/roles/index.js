import axiosInstance from '../../utils/axiosInstance';
import handleApiResponse from '../../utils/handleApiResponse';
import {
    CREATE_ROLE_URL,
    DELETE_ROLE_URL,
    GET_ROLES_URL,
    UPDATE_ROLE_PERMISSION_URL
} from '../apiUrl';

export const fetchRoles = async () => {
  return await handleApiResponse(axiosInstance.get(GET_ROLES_URL));
};

export const deleteRole = async (roleId) => {
  return await handleApiResponse(
    axiosInstance.delete(`${DELETE_ROLE_URL}/${roleId}`),
    true
  );
};

export const createRole = async (body) => {
  return await handleApiResponse(
    axiosInstance.post(`${CREATE_ROLE_URL}`, body), true
  );
};

export const updateRolePermissions = async (roleId, permissions) => {
  return await handleApiResponse(
    axiosInstance.put(`${UPDATE_ROLE_PERMISSION_URL}/${roleId}`, permissions), true
  );
};
