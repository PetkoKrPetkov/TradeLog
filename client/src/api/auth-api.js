import * as requester from './requester';
import { API_URL } from '../config';

const BASE_URL = `${API_URL}/users`;

export const login = (email, password, options) => requester.post(`${BASE_URL}/login`, { email, password }, options);

export const register = (email, password, username, options) => requester.post(`${BASE_URL}/register`, { email, password, username }, options);

export const logout = (options) => requester.get(`${BASE_URL}/logout`, options);
