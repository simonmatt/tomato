import { signByUserName, fetchSignedUser } from "../api/user";;
import * as types from './mutations-type';

const actions = {
  // User sign up
  [types.SIGN_BY_USERNAME]({ commit, dispatch }, formInfo) {
    const username = formInfo.username.trim();
    return new Promise((resolve, reject) => {
      signByUserName(username, formInfo.password, formInfo.type).then(res => {
        const data = res.data;
        commit(types.SET_MESSAGE, data);
        if (data.success) {
          commit(types.SET_TOKEN, data.token);
          localStorage.setItem('tomato_token', data.token);
          dispatch(types.FETCH_SIGNIN_USER);
          resolve(data.success);
        } else {
          resolve(data.success);
        }
      }).catch(error => {
        reject(error);
      })
    })
  },

  [types.FETCH_SIGNIN_USER]({ commit, state }) {
    fetchSignedUser().then(res => {
      const data = res.data;
      commit(types.SET_SIGNIN_USER, data);
    })
  }
}

export default actions;
