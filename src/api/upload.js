import service from '../utils/axiosService'

export const upload = (data) => {
  return service.post('/api/upload', data);
}
