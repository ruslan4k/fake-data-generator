import axios from 'axios';
import { API_URL } from '../constants/configVariables';

const request = async (url, method, data = {}) => {
  const response = await axios({
    method,
    // give permission to include cookies on cross-origin requests
    withCredentials: true,
    url,
    data,
    baseURL: API_URL,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });
  return response.data;
};

export default request;
