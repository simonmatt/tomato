<template>
  <div class="personalMenu">
    <img v-bind:src="user.avatar_url" class="personalAvatar" @click.stop="showMenu" />
    <nav class="menu" v-show="showMenued">
      <ul>
        <li>
          <a href="#">我喜欢的</a>
            <router-link :to="'/post/video'">发布视频</router-link>
            <router-link :to="{name: 'page', query: {user: user._id}}">个人主页</router-link>
            <a href="#" @click.prevent="signout">退出登录</a>
        </li>
      </ul>
    </nav>
  </div>
</template>
<script>
export default {
  props: ["user"],
  data() {
    return {
      showMenued: false
    };
  },
  methods: {
    showMenu(e) {
      if (e.target.className !== "personalAvatar") {
        this.showMenued = false;
      } else if (e.target.className === "personalAvatar") {
        this.showMenued = !this.showMenued;
      }
    },
    signout() {
      this.$store.commit("SET_USER_OUT");
      localStorage.setItem("tomato_token", "");
      if (this.$route.meta.requireAuth) {
        this.$router.push("/");
      }
    }
  },
  mounted() {
    document.addEventListener("click", this.showMenu);
  }
};
</script>
<style lang="scss" scoped>
.personalMenu {
  width: 2rem;
  height: 100%;
  border-radius: 50%;
  position: relative;
  cursor: pointer;

  img {
    max-width: 2.5rem;
    height: 2.5rem;
    border-radius: 50%;
  }

  .menu {
    position: absolute;
    width: 7rem;
    text-align: center;
    top: 85%;
    right: -140%;
    background: rgba(0, 0, 0, 0.5);
    border-radius: 5px;

    ul {
      list-style-type: none;
      padding: 0;
      margin: 0;
    }

    a {
      color: white;
      display: block;
      padding: 0.5rem;
      letter-spacing: 1px;
      transition: all 0.3s;

      &:hover {
        background: red;
      }
    }
  }
}
</style>
