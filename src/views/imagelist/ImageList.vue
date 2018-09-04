<template>
  <div class="imagelist">
    <div class="imageswrapper">
      <Loading :center="true" v-show="!images.length"></Loading>
      <ImageItem v-for="image in images" :key="image._id" :image="image"></ImageItem>
    </div>
    <a href="#" class="loadmore" @click.prevent="fetchMore" v-show="images.length && fetchCount<=1">Load More</a>
    <Loading v-show="this.$store.state.isFetch"></Loading>
    <router-view></router-view>
    <AppFooter v-show="images.length"></AppFooter>
  </div>
</template>
<script>
import AppFooter from "../../components/footer/App-Footer";
import Loading from "../../components/loading/loading";
import ImageItem from "../../components/imageitem/ImageItem";
import { mapState } from "vuex";
export default {
  components: {
    AppFooter,
    Loading,
    ImageItem
  },
  created() {
    this.$store.commit("FETCH_IMAGES", this.fetchCount);
  },
  computed: {
    ...mapState({
      images: "images",
      fetchCount: "fetchCount"
    })
  },
  methods: {
    fetchMore() {
      this.$store.state.fetchCount += 1;
      this.$store.commit("FETCH_IMAGES", this.fetchCount);
    }
  },
  mounted() {
    this.$store.state.isHome = false;
    window.addEventListener("scroll", () => {
      const scrollTop =
        document.body.scrollTop || document.documentElement.scrollTop;
      if (
        scrollTop + window.innerHeight > document.body.clientHeight - 50 &&
        this.$store.state.isFetch === false &&
        this.fetchCount >= 2
      ) {
        this.$store.state.isFetch = true;
        this.fetchMore();
      }
    });
  }
};
</script>
<style lang="scss" scoped>
@import "../../assets/scss/mixins.scss";

.imagelist {
  text-align: center;
  padding-top: 1rem;

  .imageswrapper {
    @include stickFooter;
    width: 79rem;
    margin: 0 auto;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    @include mediaQ(1365px) {
      width: 100%;
    }


  }

  .loadmore {
      display: inline-block;
      padding: 0.5rem;
      margin: 1rem;
      color: white;
      background: #999;
      border-radius: 5px;
    }
}
</style>
