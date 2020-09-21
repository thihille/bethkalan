import * as jwt_decode from 'jwt-decode';

const token = window.localStorage.getItem('user');

export const getToken = () => {
  try {
    return jwt_decode(token);
  } catch (Error) {
    return null;
  }
}
export const decodeToken = () => {
  try {
    return jwt_decode(token);
  } catch (Error) {
    return null;
  }
}
  
