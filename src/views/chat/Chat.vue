<template>
<div class="chat">
  <div class="chat-box">
    <div class="user-list">
      <span class="title">Online Users</span>
      <ul class="online-user">
        <li>
          <img :src="user.avatar_url" alt="">
          <span>{{ user.name }}</span>
        </li>
      </ul>
    </div>
    <div class="chat-window">
      <span class="descript-title">Message</span>
      <div class="chat-message" ref="chatMessage">
        <ul>
          <li class="message-info" v-for="message in messages" :class="{ self: message.name === user.name}">
            <template v-if="message.type==='userMessage'">
              <img :src="message.avatar_url" alt="" class="message-user-avatar">
              <div class="message-wrapper">
                <span class="message-user">{{ message.name }}</span>
                <p class="message-content">{{ message.message }}</p>
              </div>
            </template>

            <template v-else-if="message.type === 'left'">
                <p class="server-message">{{ message.name }}  离开</p>
              </template>

              <template v-else-if="message.type === 'join'">
                <p class="server-message">{{ message.name }}  进入</p>
              </template>
          </li>
        </ul>
      </div>

      <div class="send-message">
          <textarea v-model="message" class="message-text" placeholder="输入您的消息..." ref="textarea" autofocus @keyup.enter="sendMessage"></textarea>
          <svg class="icon" aria-hidden="true" @click="sendMessage">
            <use xlink:href="#icon-sendemail"></use>
          </svg>
        </div>
    </div>
  </div>
</div>
</template>
<script>
import io from "socket.io-client";
import { mapState } from "vuex";
export default {
  data() {
    return {
      message: "",
      socket: {},
      onlineUsers: [],
      messages: []
    };
  },
  created() {
    this.socket = io.connect("http://localhost:4001");
  },
  computed: {
    ...mapState({
      user: "user"
    })
  },
  watch: {
    messages() {
      this.$nextTick(() => {
        const chatMessage = this.$refs.chatMessage;
        chatMessage.scrollTop = chatMessage.scrollHeight;
      });
    }
  },
  methods: {
    sendMessage() {
      this.socket.emit("chat", {
        name: this.user.name,
        avatar_url: this.user.avatar_url,
        message: this.message,
        type: "userMessage"
      });
      this.message = "";
      const textarea = this.$refs.textarea;
      textarea.focus();
    }
  },
  mounted() {
    this.$store.state.isHome = false;

    this.socket.emit("online", {
      name: this.user.name,
      avatar_url: this.user.avatar_url,
      type: "join"
    });

    this.socket.on("join", data => {
      this.messages.push(data);
    });

    this.socket.on("online", onlineUsers => {
      this.onlineUsers = onlineUsers;
    });

    this.socket.on("chat", data => {
      this.messages.push(data);
    });

    this.socket.on("user left", data => {
      this.messages.push(data);
    });

    this.socket.on('disconnect',()=>{
      console.log('You\'ve been disconnected' )
    })
  }
};
</script>
<style lang="scss" scoped>
@import "../../assets/scss/mixins.scss";

ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
}
.chat {
  font-size: 1rem;
  padding-top: 3.75rem;
  background: #e8e6fd;
  height: 100vh;

  .chat-box {
    width: 50rem;
    margin: 0 auto;
    margin-top: 1rem;
    background: #fff;
    height: 36.5rem;
    border-radius: 7px;
    box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1), -1px -1px 2px rgba(0, 0, 0, 0.1);
    display: flex;
    @include mediaQ(768px) {
      margin-top: 0;
      width: 100%;
      height: 100%;
    }
  }

  .user-list {
    width: 15rem;
    height: 100%;
    display: flex;
    flex-direction: column;
    @include mediaQ(768px) {
      display: none;
    }

    .title {
      text-align: center;
      padding: 1rem 0;
      border: 1px solid #eee;
      color: #999;
    }

    .online-user {
      overflow: auto;
      height: calc(100% - 6.5rem);
      border-bottom: 1px solid #eee;

      li {
        width: 100%;
        padding: 0.5rem 0.5rem;
        display: flex;
        align-items: center;
        border-bottom: 1px solid rgba(0, 0, 0, 0.02);
        cursor: pointer;
        transition: all 0.3s;
        &:hover {
          background: #eee;
        }

        img {
          width: 2.3rem;
          height: 2.3rem;
          border-radius: 50%;
          margin-right: 0.5rem;
        }
      }
    }
  }

  .chat-window {
    width: 35rem;
    background: #f6f6fc;
    height: 100%;
    border-top-right-radius: 7px;
    border-bottom-right-radius: 7px;
    display: flex;
    flex-direction: column;
    @include mediaQ(768px) {
      width: 100%;
      border-radius: 7px;
    }

    .descript-title {
      padding: 1rem 0 1rem 1rem;
      color: #999;
    }

    .chat-message {
      overflow-y: scroll;
      height: calc(100% - 6.5rem);
      border-bottom: 1px solid #eee;
      width: 100%;

      .message-info {
        padding: 0.5rem 0 0.5rem 0.5rem;
        display: flex;
        width: 100%;
        @include mediaQ(768px) {
          line-height: 1.5;
        }

        .message-user-avatar {
          width: 2rem;
          height: 2rem;
          border-radius: 50%;
        }

        .message-wrapper {
          display: flex;
          flex-direction: column;
          padding: 0 0.5rem;
          max-width: 75%;
        }
        .message-user {
          display: inline-block;
          vertical-align: top;
          color: #999;
          font-size: 0.8rem;
        }

        .message-content {
          background: #fff;
          display: inline-block;
          padding: 0.5rem;
          max-width: 100%;
          border-radius: 7px;
          margin: 0;
          margin-top: 0.5rem;
          box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1),
            -1px -1px 2px rgba(0, 0, 0, 0.1);
        }
      }

      .server-message {
        font-size: 0.7rem;
        color: #999;
        width: 100%;
        text-align: center;
      }
      .self {
        text-align: right;
        justify-content: flex-end;
        padding: 0.5rem 1rem 0.5rem 0;

        .message-user-avatar {
          order: 2;
        }

        .message-content {
          text-align: left;
        }
      }
    }

    .send-message {
      height: 3rem;
      display: flex;
      align-items: center;

      .message-text {
        height: 2rem;
        width: 80%;
        color: #999;
        outline: none;
        border: none;
        background: #f6f6f6;
        resize: none;
        border-bottom: 1px solid rgb(0, 50, 200);
        margin-left: 1rem;
      }

      svg {
        width: 2rem;
        height: 2rem;
        cursor: pointer;
        margin-left: 0.5rem;
      }
    }
  }
}
</style>
