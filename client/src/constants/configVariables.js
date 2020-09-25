import config from '../config';

export const ENV = process.env.REACT_APP_ENV;

export const { API_URL } = config[ENV];
