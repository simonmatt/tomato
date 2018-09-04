import service from '../utils/axiosService'

export const signByUserName = (username, password, type) => {
  const data = {
    username,
    password,
    type
  };
  return service.post('/auth/users', data);
}

export const fetchSignedUser = () => {
  return service.get('/auth/user');
}

export const fetchUserById = (id) => {
  return service.get(`/auth/users/${id}`);
}
