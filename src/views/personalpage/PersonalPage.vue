<template>
<div>
  <div class="personalPage">
    <div class="personalInfo">
      <img src="https://1x.com/images/user/7059ae85778abd28a685d4fab79fb997-hd2.jpg" class="banner">
      <div class="page-mark">
        <img :src="userInfo.avatar_url" alt="" class="avatar">
        <div class="name">{{userInfo.name}}</div>
        <span
        v-show="userInfo.name === user.name"
        title="Modify avatar"
        @click="switchShowFlag"
        class="upload-button">+</span>
      </div>
    </div>
    <div class="info-wrapper">
      <InfoContainer></InfoContainer>
    </div>
    <Upload
    v-show="showFlag"
    @close="closeUpload"
    ></Upload>
  </div>
  <AppFooter></AppFooter>
</div>
</template>
<script>
import { mapState } from "vuex";
import InfoContainer from "../../components/tab/InfoContainer";
import AppFooter from "../../components/footer/App-Footer";
import Upload from "../../components/upload/Upload";
export default {
  data() {
    return {
      showFlag: false
    };
  },
  components: {
    InfoContainer,
    AppFooter,
    Upload
  },
  created() {
    this.fetchUser();
  },
  watch: {
    $route: "fetchUser"
  },
  computed: {
    ...mapState({
      userInfo: state => {
        console.log(state.userInfo);
        return state.userInfo;
      },
      user: state => {
        console.log(...state.user);
        return state.user;
      }
    })
  },
  methods: {
    fetchUser() {
      const id = this.$route.query.user;
      console.log("$route", this.$route);
      console.log("$router", this.$router);
      this.$store.commit("FETCH_USER_INFO", id);
    },
    switchShowFlag() {
      this.showFlag = !this.showFlag;
    },
    closeUpload() {
      this.showFlag = false;
    }
  },
  mounted() {
    this.$store.state.isHome = false;
  }
};
</script>
<style lang="scss" scoped>
@import "../../assets/scss/mixins.scss";

.personalPage {
  @include stickFooter;
  @include mediaQ(480px) {
    padding-top: 3rem;
  }
  background: #eee;
  padding-bottom: 1rem;
}

.personalInfo {
  width: 100%;
  height: 25rem;
  position: relative;
  @include mediaQ(480px) {
    height: 23rem;
  }

  .banner {
    max-height: 100%;
    width: 100%;
  }

  .page-mask {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.5);
    @include flexCenter;
    flex-direction: column;

    .avatar {
      width: 10rem;
      height: 10rem;
      background: rgba(255, 255, 255, 0.5);
      border-radius: 10px;
      box-shadow: inset 5px 5px 5px rgba(0, 0, 0, 0.1);
      padding: 0.3rem;
    }

    .name {
      color: white;
      padding: 1.5rem 0;
      font-size: 1.5rem;
    }

    .upload-button {
      display: inline-block;
      background: blue;
      color: white;
      width: 2rem;
      height: 2rem;
      text-align: center;
      line-height: 2rem;
      font-size: 1.5rem;
      border-radius: 50%;
      cursor: pointer;
    }
  }
}

.info-wrapper {
  width: 60%;
  margin: 0 auto;
  @include mediaQ(480px) {
    width: 100%;
  }
  @include mediaQ(768px, 481px) {
    width: 80%;
  }
  @include mediaQ(768px, 481px) {
    width: 80%;
  }
  @include mediaQ(960px, 769px) {
    width: 70%;
  }
}
</style>
