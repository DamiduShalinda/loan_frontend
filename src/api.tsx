const API_BASE_URL = "http://localhost:8000";

export const API_ENDPOINTS = {
  getUser: `${API_BASE_URL}/users/token`,
  refreshUser: `${API_BASE_URL}/user/token/refresh`,
  postData: `${API_BASE_URL}/data`,
  // Add more API endpoints as needed
};