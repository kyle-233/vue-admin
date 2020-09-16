<template>
  <div
    class="container"
    :class="{'light-background' : !isDarkMode, 'dark-background' : isDarkMode}"
  >
    <Notification />
    <RequestAccount />
    <div class="login">
      <h4 :class="{'light-text' : isDarkMode, 'dark-text' : !isDarkMode}">Sign into Design+Code HQ</h4>
      <input
        type="email"
        placeholder="Email"
        :class="{'light-field' : isDarkMode, 'dark-field' : !isDarkMode}"
        v-model="userInfo.email"
      />
      <input
        type="password"
        placeholder="Password"
        :class="{'light-field' : isDarkMode, 'dark-field' : !isDarkMode}"
        v-model="userInfo.password"
      />
      <button @click="signIn">Sign In</button>
      <router-link
        to="/recover"
        :class="{'light-link' : isDarkMode, 'dark-link' : !isDarkMode}"
      >Forgot your password?</router-link>
      <ThemeSwitch />
    </div>
  </div>
</template>

<script>
import RequestAccount from "@/components/RequestAccount";
import ThemeSwitch from "@/components/ThemeSwitch";
import Notification from "@/components/Notification";
// import * as netlifyIdentityWidget from "netlify-identity-widget";

export default {
  name: "SignIn",
  components: {
    RequestAccount,
    ThemeSwitch,
    Notification
  },
  data() {
    return {
      userInfo: {
        email: "",
        password: ""
        // hasText: false,
        // text: ""
      }
    };
  },
  computed: {
    isDarkMode() {
      return this.$store.getters.isDarkMode;
    }
  },
  mounted() {
    const params = this.$router.params;
    console.log(params);
    // if (params.userLoggedOut) {
    //   this.hasText = true;
    //   this.text = "You have logged out!";
    // }
  },
  methods: {
    signIn() {
      this.$axios({
        method: "post",
        url: "/signin",
        data: {
          email: this.userInfo.email,
          password: this.userInfo.password
        }
      })
        .then(res => {
          if (res.data.status === 0) {
            sessionStorage.setItem("accessToken", res.data.storage);
            this.$router.push({
              name: "Home",
              path: "/home"
            });

            // console.log(sessionStorage.getItem("accessToken"));
          } else {
            alert(res.data.message);
          }
        })
        .catch(err => {
          console.log(err.data);
        });
    },

    getInfo() {
      let that = this;
      // console.log(that.$route.params);
      that.userInfo.email = that.$route.params.email;
      that.userInfo.password = that.$route.params.password;
      // console.log(that.userInfo);
    }
  },
  created() {
    this.getInfo();
  }
};
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}

.login {
  width: 400px;
  // margin-top: 6s5px;
  text-align: center;
}
</style>