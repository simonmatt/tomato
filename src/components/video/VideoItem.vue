<template>
<div class="video">
  <div class="video-top">
    <div class="video-img">
      <img v-lazy="video.coverSrc" alt="">
    </div>
    <div class="video-mask">
      <router-link :to="`/video/${video._id}`">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-video1"></use>
      </svg>
      </router-link>
    </div>
  </div>
  <div class="video-info">
    <router-link :to="`/video/${video._id}`">
      <h2 class="video-title">{{video.title}}</h2>
    </router-link>
    <div class="auth">
      <router-link :to="{name: 'page', query: { user: video.user._id }}" class="auth-avatar">
        <img :src="video.user.avatar" alt="">
      </router-link>
      <router-link :to="{name: 'page', query: { user: video.user._id } }" class="auth-name">
        <span>{{ video.user.name }}</span>
      </router-link>
      <span class="timeago">{{video.create_at | timeAgo }}</span>
      <a href="javascript:void(0)" class="hidden" @click="hiddenVideo(video)">
        X
        <span class="alter">Not interested</span>
      </a>
    </div>
  </div>
</div>
</template>
<script>
export default {
  props: ["video"],
  methods: {
    hiddenVideo(video) {
      this.$store.commit("HIDDEN_VIDEO", video);
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../../assets/scss/mixins.scss";

.video {
  font-size: 1rem;
  font-family: Arial, Helvetica, sans-serif;
  width: 20.5rem;
  border-radius: 0.5rem;
  overflow: hidden;
  box-shadow: 1px 2px 2px rgba(0, 0, 0, 0.5);
  margin: 1.5rem 0 0 2rem;
  display: inline-block;
  @include mediaQ(480px) {
    height: 13rem;
  }
  @include mediaQ(768px, 481px) {
    height: 17rem;
  }
  @include mediaQ(768px) {
    width: 45%;
    margin: 1rem 0;
  }
  @include mediaQ(960px, 769px) {
    width: 31%;
    margin: 1rem 0;
  }
  @include mediaQ(1355px, 961px) {
    width: 31.5%;
    margin: 1rem 0;
  }
  position: relative;
  height: 17rem;
  transition: all 0.2s;

  &:hover {
    box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.3);
  }

  .video-top {
    width: 100%;
    height: 10.625rem;
    position: relative;
    @include mediaQ(480px) {
      height: 60%;
    }

    .video-img {
      height: 10.625rem;
      width: 100%;
      @include mediaQ(480px) {
        height: 100%;
      }

      img {
        width: 100%;
        height: 100%;
      }
    }

    .video-mask {
      position: absolute;
      top: 0;
      right: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.5);

      a {
        display: block;
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;

        svg {
          width: 3rem;
          height: 3rem;
          color: #fff;
          transition: color 0.3s;
        }

        &:hover > svg {
          color: red;
        }
      }
    }
  }

  .video-info {
    width: 100%;
    border: 1px solid #eee;

    a:hover > h2 {
      color: red;
    }

    .video-title {
      margin: 0;
      font-size: 1rem;
      padding: 0.5rem;
      letter-spacing: 1px;
      color: #34332b;
      min-height: 3.3rem;
      @include mediaQ(480px) {
        min-height: 0;
        padding-top: 0;
        height: 2rem;
        line-height: 2rem;
        @include no-wrap;
      }
    }

    .auth {
      width: 100%;
      display: flex;

      .auth-avatar {
        display: block;
        flex-basis: 2rem;
        height: 2rem;
        border-radius: 50%;
        overflow: hidden;
        margin: 0.5rem;

        img {
          max-width: 100%;
          height: 2rem;
        }
      }

      .auth-name {
        display: block;
        padding: 0.5rem 0.5rem 0.5rem 0;
        flex-basis: 9rem;
        height: 1.6rem;
        overflow: hidden;
        align-self: center;
        color: #333;
        @include mediaQ(768px, 481px) {
          flex-basis: 60%;
        }
        &:hover {
          color: red;
        }
      }

      .timeago {
        font-size: 0.625rem;
        flex-basis: 6rem;
        align-self: center;
        padding: 0.4rem 0;
        text-align: right;
        @include mediaQ(960px) {
          padding-right: 0.2rem;
        }
      }
    }
  }

  .hidden {
    display: block;
    font-size: 0.8rem;
    padding: 1rem 0 0 1rem;
    position: relative;
    color: #666;
    @include mediaQ(960px) {
      display: none;
    }

    &:hover {
      color: red;
    }

    &:hover > .alter {
      display: block;
    }
  }

  .alter {
    display: none;
    position: absolute;
    color: white;
    background: red;
    border-radius: 5px;
    width: 4rem;
    font-size: 0.625rem;
    top: 0.35rem;
    right: 1.3rem;
    padding: 0.5rem;
    border-right: none;
    transition: all 0.5s;

    &::before {
      content: "";
      width: 0;
      height: 0;
      border: 0.625rem solid transparent;
      border-left-color: red;
      position: absolute;
      top: 13%;
      left: 95%;
    }
  }
}
</style>


