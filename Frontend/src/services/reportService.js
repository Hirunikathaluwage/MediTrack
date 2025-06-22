import axios from 'axios';

export const fetchRegistrations = () => axios.get('/api/reports/registrations');
export const fetchProfitReport = () => axios.get('/api/reports/profit');
export const fetchTopMedicines = () => axios.get('/api/reports/top-medicines');
export const fetchBranchOrders = () => axios.get('/api/reports/branch-orders');
