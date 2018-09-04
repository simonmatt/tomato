// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/store'
import axios from './utils/axiosService'
import moment from 'moment'
import VueLazyLoad from 'vue-lazyload'

import './assets/scss/index.scss'

Vue.config.productionTip = false
Vue.prototype.$http = axios

Vue.use(VueLazyLoad, {
  loading: require('./assets/img/placeholder.png')
})

Vue.filter('timeAgo', timestamp => {
  return moment(timestamp).startOf('hour').fromNow()
})

Vue.filter('durationFormat', duration => {
  const min = parseInt(duration / 60)
  const s = duration % 60
  const time = s >= 10 ? `${min}:${s}` : `${min}:0${s}`
  return time
})

router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) {
    if (store.getters.token) {
      next();
    } else {
      next({ path: '/' });
      store.commit('SHOW_SIGN_DIALOG');
    }
  } else {
    next();
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
