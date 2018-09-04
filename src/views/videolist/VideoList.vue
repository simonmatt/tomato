<template>
<div class="videolist">
  <div class="banner">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon--sad"></use>
        </svg>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon--kiss"></use>
        </svg>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon--joy"></use>
        </svg>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon--happy-"></use>
        </svg>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon--cool"></use>
        </svg>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon--astonished-"></use>
        </svg>
      </div>
      <div class="videos">
        <Loading v-show="videos.length<=0"></Loading>
        <VideoItem
          v-for="(video,index) in videos"
          :video="video"
          :key="index">
          </VideoItem>
        <Pagination v-show="videos.length"></Pagination>
        <AppFooter v-show="videos.length"></AppFooter>
      </div>
</div>
</template>
<script>
import VideoItem from "../../components/video/VideoItem";
import AppFooter from "../../components/footer/App-Footer";
import Loading from "../../components/loading/loading";
import Pagination from "../../components/pagination/Pagination";
import { mapState } from "vuex";
export default {
  components: {
    Loading,
    VideoItem,
    AppFooter,
    Pagination
  },
  watch: {
    $route: "fetchVideos"
  },
  created() {
    this.fetchVideos();
  },
  computed: {
    ...mapState({
      videos: "videos"
    })
  },
  methods: {
    fetchVideos() {
      const p = Number(this.$route.query.p) || 1;
      this.$store.commit("FETCH_VIDEOS", p);
    }
  },
  mounted() {
    this.$store.state.isHome = false;
  }
};
</script>
<style lang="scss" scoped>
</style>


