<!--
 * @Author: your name
 * @Date: 2020-09-13 16:47:49
 * @LastEditTime: 2020-09-16 08:06:39
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-admin\src\views\SignInFlow\Recover.vue
-->
<template>
  <div
    class="container"
    :class="{'light-background' : !isDarkMode, 'dark-background' : isDarkMode}"
  >
    <RequestAccount />
    <div class="login">
      <h4 :class="{'light-text' : isDarkMode, 'dark-text' : !isDarkMode}">Recover Account</h4>
      <input
        type="email"
        placeholder="Email"
        :class="{'light-field' : isDarkMode, 'dark-field' : !isDarkMode}"
        v-model="email"
      />
      <button @click="recover">Send Email</button>
      <router-link
        to="/signin"
        :class="{'light-link' : isDarkMode, 'dark-link' : !isDarkMode}"
      >Already have an account? Sign in now.</router-link>
      <ThemeSwitch />
    </div>
  </div>
</template>

<script>
import RequestAccount from "@/components/RequestAccount";
import ThemeSwitch from "@/components/ThemeSwitch";

export default {
  name: "Recover",
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
    recover() {
      this.$axios({
        method: "post",
        url: "/recover",
        data: {
          email: this.email
        }
      })
        .then(res => {
          // console.log(res.data);
          if (res.data.status === 0) {
            alert(res.data.message + ", 密码: " + res.data.password);
            this.$router.push({
              name: "SignIn",
              // path: "/signin",
              params: {
                email: this.email,
                password: res.data.password
              }
            });
          } else {
            alert(res.data.message);
          }
        })
        .catch(() => {
          alert("服务器错误!");
        });
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