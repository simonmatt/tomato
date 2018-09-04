import service from '../utils/axiosService'


export const postCommentApi = (commentinfo) => {
  return service.post('/api/comments', commentinfo)
}

export const fetchCommentsByType = (type, typeId) => {
  return service.get(`/api/comments?type=${type}&typeId=${typeId}`);
}

export const fetchCommentById = (id) => {
  return service.get(`/api/comments/${id}`)
}
