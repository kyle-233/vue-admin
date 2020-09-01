<template>
  <div id="nav" :class="{'nav-light' : !isDarkMode, 'nav-dark' : isDarkMode}">
    <div class="nav-1">
      <router-link to="/" :class="{'light-nav' : !isDarkMode, 'dark-nav' : isDarkMode}">Home</router-link>
      <router-link to="/manage">Manage Users</router-link>
      <router-link to="/about">About</router-link>
    </div>
    <a @click="onClick">
      Logout
      <img src="@/assets/logout.svg" />
    </a>
  </div>
</template>

<script>
export default {
  name: "Header",
  computed: {
    isDarkMode(){
      return this.$store.getters.isDarkMode
    }
  },
  methods: {
    onClick() {
      this.$router.replace("/signin");
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/global-styles/colors.scss";
@import "@/global-styles/typography.scss";

.nav-light{
  background: $white;
}

.nav-dark{
  background: $super-dark-blue;
}

#nav {
  padding: 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  width: 100%;
  padding: 15px 15%;

  a {
    display: flex;
    align-items: center;
    font-weight: bold;
    color: $dark-gray;
    padding: 5px 8px;
    box-sizing: border-box;

    &:hover {
      cursor: pointer;
    }

    &.router-link-exact-active.dark-nav{
      color: $white;
    }

    &.router-link-exact-active.light-nav{
      color: $middle-blue;
    }
  }

  img {
    margin-left: 5px;
  }
}

.nav-1{
  display: flex;
  align-items: center;

  a{
    margin-left: 20px;
    margin-right: 20px;
  }
}


</style>