<template>
    <div class="container" :class="{'light-background' : !isDarkMode, 'dark-background' : isDarkMode}">
        <RequestAccount />
        <div class="login">
            <h4 :class="{'light-text' : isDarkMode, 'dark-text' : !isDarkMode}">Request Account</h4>
            <input type="email" placeholder="Email" :class="{'light-field' : isDarkMode, 'dark-field' : !isDarkMode}">
            <button>Request Account</button>
            <router-link to="/recover" :class="{'light-link' : isDarkMode, 'dark-link' : !isDarkMode}">Already have an account? Sign in now.</router-link>
            <ThemeSwitch />
        </div>
    </div>
</template>

<script>
import RequestAccount from "@/components/RequestAccount";
import ThemeSwitch from "@/components/ThemeSwitch"

    export default {
        name: "Request",
        components: {
            RequestAccount,
            ThemeSwitch
        },
        computed: {
            isDarkMode() {
                return this.$store.getters.isDarkMode;
            }
        }
    }
</script>

<style lang="scss" scoped>

.container{
    display: flex;
    justify-content: center;
    align-items: center;

    min-height: 100vh;
}

.login{
    width: 400px;
    margin-top: 65px;
}
</style>