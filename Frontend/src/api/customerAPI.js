import api from './axios'; // Axios instance with baseURL & withCredentials enabled

// ✅ Register a new customer
export const registerCustomer = async (data) => {
  try {
    const res = await api.post('/customers/register', data);
    return res.data;
  } catch (err) {
    throw err;
  }
};

// ✅ Login an existing customer
export const loginCustomer = async (data) => {
  try {
    const res = await api.post('/customers/login', data);
    return res.data;
  } catch (err) {
    throw err;
  }
};

// ✅ Logout the current customer
export const logoutCustomer = async () => {
  try {
    const res = await api.post('/customers/logout');
    return res.data;
  } catch (err) {
    throw err;
  }
};

// ✅ Get current customer profile
export const getCustomerProfile = async () => {
  try {
    const res = await api.get('/customers/profile');
    return res.data;
  } catch (err) {
    throw err;
  }
};

// ✅ FIXED: Update customer profile with avatar file
export const updateCustomerProfile = async (formData) => {
  try {
    const res = await api.put('/customers/profile', formData, {
      headers: {
        'Content-Type': 'multipart/form-data' // ✅ REQUIRED for uploading files
      }
    });
    return res.data;
  } catch (err) {
    throw err;
  }
};

// ✅ Request password reset link
export const requestPasswordReset = async (data) => {
  try {
    const res = await api.post('/customers/reset-password-request', data);
    return res.data;
  } catch (err) {
    throw err;
  }
};

// ✅ Reset password using user ID and token
export const resetPassword = async (userId, token, newPassword) => {
  try {
    const res = await api.post(`/customers/reset-password/${userId}/${token}`, {
      password: newPassword,
    });
    return res.data;
  } catch (err) {
    throw err;
  }
};
