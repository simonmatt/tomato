<template>
<div class="video-card">
  <router-link v-bind:to="`/video/${video._id}`">
    <img v-bind:src="video.coverSrc" alt="">
  </router-link>
  <div class="video-info">
    <div>
      <span>{{video.user.name}}</span>
      <span class="timeago"> ● {{ video.created_at | timeAgo}}</span>
    </div>
    <h3>
      <router-link v-bind:to="`/video/${video._id}`">
        {{video.title}}
      </router-link>
    </h3>
    <div>
      <span>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-zan2"></use>
        </svg>
        {{video.collectionCount}}
      </span>
    </div>
  </div>
  <button class="deleteButton" v-show="user.name === video.user.name" @click="showComfirm">Delete</button>
  <Confirm
  ref="confirm"
  text="Are you sure you want to delete it?"
  @confirm="deleteVideo"
  ></Confirm>
</div>
</template>
<script>
import Confirm from "../confirm/Confirm";
import { deleteVideoById } from "../../api/video.js";
import { mapGetters } from "vuex";
export default {
  props: ["video"],
  components: {
    Confirm
  },
  computed: {
    ...mapGetters(["user"])
  },
  methods: {
    showComfirm(id) {
      this.$refs.comfirm.show();
    },
    deleteVideo() {
      deleteVideoById(this.video._id).then(res => {
        if (res.data.success) {
          this.$store.commit("FETCH_VIDEOS_BY_USERID", this.$route.query.user);
        }
      });
    }
  }
};
</script>
<style scoped>
</style>
