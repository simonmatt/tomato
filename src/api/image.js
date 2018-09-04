import service from '../utils/axiosService'

export const fetchImages = (count) => {
  return service.get(`/api/images?count=${count}`)
}


export const fetchImageById = (id) => {
  return service.get(`/api/images/${id}`)
}
