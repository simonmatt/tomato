import Vue from 'vue'
import Router from 'vue-router'

// const Home = resolve => require(['views/home/Home'], resolve)

import Home from '../views/home/Home'
import VideoList from '../views/videolist/VideoList'
import ImageList from '../views/imagelist/ImageList'
import ImageBanner from '../views/imagebanner/ImageBanner'
import VideoPlayer from '../views/videoplayer/VideoPlayer'
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      component: Home
    },
    {
      path: '/videolist',
      name: 'videolist',
      component: VideoList
    },
    {
      path: '/video/:id',
      name: 'videoPlayer',
      component: VideoPlayer
    },
    {
      path: '/images',
      name: 'imagelist',
      component: ImageList,
      children: [{
        path: ':id',
        component: ImageBanner
      }]
    },
    {
      path: '/page',
      name: 'page',
      //component: PersonalPage,
      meta: {
        requireAuth: true
      }
    }
  ]
})
