const API_BASE_URL = "http://localhost:8000";

export const API_ENDPOINTS = {
  getUser: `${API_BASE_URL}/users/token/`,
  refreshUser: `${API_BASE_URL}/users/token/refresh/`,
  addCustomer: `${API_BASE_URL}/users/customer/add`,
  getCustomers: `${API_BASE_URL}/customers/getcustomers`,
  getCustomername: `${API_BASE_URL}/customers/getnames`,
  addLoan: `${API_BASE_URL}/loans/add`,
  getLoans: `${API_BASE_URL}/loans/getall`,
  getMoreDetails: (id: number) => `${API_BASE_URL}/loans/get/${id}`,
  getAllLoans: `${API_BASE_URL}/loans/allnumbers`,
  addPayment: `${API_BASE_URL}/loanvalues/update/`,
  getAllpayments: (id : number) => `${API_BASE_URL}/loanvalues/all/${id}`,
  getArrears: (id:number) => `${API_BASE_URL}/arrears/getbyloanid/${id}`,
  calculateArrears: `${API_BASE_URL}/arrears/add`,
  getAllArrears: `${API_BASE_URL}/arrears/getall`,
  getAllArrearsOnce: `${API_BASE_URL}/arrears/calall`,
  getOneCustomer: (id: number) => `${API_BASE_URL}/customers/getone/${id}`,
  getArrearsByStaff : (name : string) => `${API_BASE_URL}/arrears/getbystaff/?staff=${name}`,
  getStaffId : (id : number) => `${API_BASE_URL}/staff/get/${id}`,
  
  // Add more API endpoints as needed
};

