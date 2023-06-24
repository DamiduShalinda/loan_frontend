const API_BASE_URL = "http://localhost:8000";

export const API_ENDPOINTS = {
  getUser: `${API_BASE_URL}/users/token`,
  refreshUser: `${API_BASE_URL}/users/token/refresh`,
  addCustomer: `${API_BASE_URL}/users/customer`,
  getCustomers: `${API_BASE_URL}/customers/getcustomers`,
  getCustomername: `${API_BASE_URL}/users/viewcustomer`,
  addLoan: `${API_BASE_URL}/loans/addloan`,
  getLoans: `${API_BASE_URL}/loans/getloans`,
  getMoreDetails: (id: number) => `${API_BASE_URL}/loans/getloans/${id}`,
  
  // Add more API endpoints as needed
};