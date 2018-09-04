
import * as types from './mutations-type';
import { fetchUserById } from '../api/user';
import { fetchVideos, fetchVideoByUserid } from '../api/video'
import { fetchImages } from '../api/image'
const mutations = {

  [types.FETCH_VIDEOS](state, p) {
    fetchVideos(p).then(res => {
      state.current = p
      state.videos = res.data.videos
      state.all = Math.ceil(res.data.total / state.limitNum)
    })
  },

  [types.HIDDEN_VIDEO](state, video) {
    const index = state.videos.indexOf(video)
    state.videos = [
      ...state.videos.slice(0, index),
      ...state.videos.slice(index + 1)
    ]
    return state
  },

  [types.FETCH_VIDEOS_BY_USERID](state, id) {
    fetchVideoByUserid(id).then(res => {
      state.userInfo = res.data
    })
  },

  [types.FETCH_IMAGES](state, count) {
    fetchImages(count).then(res => {
      state.images = res.data
    }).then(() => {
      state.isFetch = false
    })
  },

  [types.SET_SIGNIN_USER](state, data) {
    state.user = data;
  },

  [types.SET_USER_OUT](state) {
    state.token = '';
  },
  [types.SHOW_SIGN_DIALOG](state) {
    state.showSignDialog = true;
  },
  [types.CLOSE_SIGN_DIALOG](state) {
    state.showSignDialog = false;
  },
  [types.SET_TOKEN](state, token) {
    state.token = token;
  },

  [types.SET_MESSAGE](state, message) {
    state.message = message;
  },
  [types.FETCH_USER_INFO](state, id) {
    fetchUserById(id).then(res => {
      state.userInfo = res.data;
    })
  }
}

export default mutations;
