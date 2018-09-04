<template>
<div class="info-container">
  <div class="container-header">
    <span class="videTab">Video</span>
  </div>
</div>
</template>
<script>
import VideoInfoCard from "../video/VideoInfoCard";
import { mapState } from "vuex";
export default {
  components: {
    VideoInfoCard
  },
  created() {
    this.fetchVideoByUserid();
  },
  watch: {
    $route: "fetchVideoByUserid"
  },
  computed: {
    ...mapState({
      userVideos: state => state.userVideos
    })
  },
  methods: {
    fetchVideoByUserid() {
      const id = this.$route.query.user;
      this.$store.commit("FETCH_VIDEOS_BY_USERID", id);
    }
  }
};
</script>
<style lang="scss" scoped>
.info-container {
  width: 100%;
  margin: 1rem auto 0 auto;
  border: 1px solid #eee;
  background: white;
}
.container-header {
  padding: 1rem;
  border-bottom: 1px solid #eee;

  .videoTab {
    font-weight: bold;
    color: #999;
    letter-spacing: 3px;
    cursor: pointer;
  }
}
</style>
