import request from '../../helpers/requestHelper';

// eslint-disable-next-line import/prefer-default-export
export const login = (email, password) => request('/users/login', 'post', { email, password });
export const getUser = () => request('/users/me', '');
export const register = (email, password, name) => request('/users', 'post', { email, password, name });
export const logout = () => request('/users/logout');
