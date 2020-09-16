<!--
 * @Author: your name
 * @Date: 2020-09-13 16:47:49
 * @LastEditTime: 2020-09-15 20:24:52
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-admin\src\views\SignInFlow\Request.vue
-->
<template>
  <div
    class="container"
    :class="{ 'light-background': !isDarkMode, 'dark-background': isDarkMode }"
  >
    <RequestAccount />
    <div class="login">
      <h4 :class="{ 'light-text': isDarkMode, 'dark-text': !isDarkMode }">Request Account</h4>
      <input
        type="email"
        placeholder="Email"
        :class="{ 'light-field': isDarkMode, 'dark-field': !isDarkMode }"
        v-model="email"
      />
      <button @click="request">Request Account</button>
      <router-link
        to="/signin"
        :class="{ 'light-link': isDarkMode, 'dark-link': !isDarkMode }"
      >Already have an account? Sign in now.</router-link>
      <ThemeSwitch />
    </div>
  </div>
</template>

<script>
import RequestAccount from "@/components/RequestAccount";
import ThemeSwitch from "@/components/ThemeSwitch";

export default {
  name: "Request",
  components: {
    RequestAccount,
    ThemeSwitch
  },
  data() {
    return {
      email: ""
    };
  },
  computed: {
    isDarkMode() {
      return this.$store.getters.isDarkMode;
    }
  },
  methods: {
    request() {
      console.log(this.email.length);
      if (this.email.length === 0) {
        alert("邮箱为空");
      } else {
        // console.log("true");
        this.$axios({
          method: "post",
          url: "/request",
          data: {
            email: this.email
          }
        })
          .then(res => {
            // console.log(res.data.password);
            if (res.data.status === 1) {
              alert(res.data.message);
            } else {
              alert("Welcome " + this.email + ", 密码为: " + res.data.password);
              this.$router.push({
                name: "SignIn",
                params: {
                  email: this.email,
                  password: res.data.password
                }
              });
            }
          })
          .catch(err => {
            alert(err.message);
          });
      }
    }
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
  // margin-top: 65px;
  text-align: center;
}
</style>
