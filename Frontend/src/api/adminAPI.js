import api from './axios';

/**
 * Register a new admin
 * @param {Object} data - Admin data: { name, email, password }
 * @returns {Promise<Object>} - { message, admin }
 */
export const registerAdmin = async (data) => {
  try {
    const res = await api.post('/admins/register', data);
    return res.data;
  } catch (err) {
    throw err;
  }
};

/**
 * Login admin
 * @param {Object} data - Login data: { email, password }
 * @returns {Promise<Object>} - { message, admin }
 */
export const loginAdmin = async (data) => {
  try {
    const res = await api.post('/admins/login', data);
    return res.data;
  } catch (err) {
    throw err;
  }
};

/**
 * Logout admin (clear token/cookie)
 * @returns {Promise<Object>} - { message }
 */
export const logoutAdmin = async () => {
  try {
    const res = await api.post('/admins/logout');
    return res.data;
  } catch (err) {
    throw err;
  }
};

/**
 * Get the currently logged-in admin's profile
 * @returns {Promise<Object>} - { name, email, role }
 */
export const getAdminProfile = async () => {
  try {
    const res = await api.get('/admins/profile');
    return res.data;
  } catch (err) {
    throw err;
  }
};
