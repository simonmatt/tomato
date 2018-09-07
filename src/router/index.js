import Vue from 'vue'
import Router from 'vue-router'

// const Home = resolve => require(['views/home/Home'], resolve)

import Home from '../views/home/Home'
import VideoList from '../views/videolist/VideoList'
import ImageList from '../views/imagelist/ImageList'
import ImageBanner from '../views/imagebanner/ImageBanner'
import VideoPlayer from '../views/videoplayer/VideoPlayer'
import PersonalPage from '../views/personalpage/PersonalPage'
import VideoPost from '../views/videopost/VideoPost'
import PostSuccess from '../views/success/PostSuccess'
import Chat from '../views/chat/Chat'
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
      path: '/post/video',
      name: 'videopost',
      component: VideoPost,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/post/success',
      name: 'success',
      component: PostSuccess,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/images',
      name: 'imagelist',
      component: ImageList,
      children: [
        {
          path: ':id',
          component: ImageBanner
        }
      ]
    },
    {
      path: '/page',
      name: 'page',
      component: PersonalPage,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/chat',
      name: 'chat',
      component: Chat,
      meta: {
        requireAuth: true
      }
    }
  ]
})
