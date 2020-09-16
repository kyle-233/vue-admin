<!--
 * @Author: your name
 * @Date: 2020-09-16 08:03:01
 * @LastEditTime: 2020-09-16 08:25:58
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-admin\src\components\Notification.vue
-->
<template>
  <div class="bubble">
    <div class="message">{{text}}</div>
  </div>
</template>

<script>
export default {
  name: "Notification",
  props: {
    text: String
  }
};
</script>

<style scoped lang="scss">
@import "@/global-styles/colors.scss";
@import "@/global-styles/typography.scss";

.bubble {
  border-radius: 6px;
  position: absolute;
  top: 10%;
  padding: 5px 10px;
  background-color: $blue;
}

.messsage {
  @include medium-text;
  color: $white;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>>

