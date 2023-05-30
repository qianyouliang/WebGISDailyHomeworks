<template>
  <div>
    <HeadBar></HeadBar>
    <router-view />
  </div>
</template>

<script>
import HeadBar from "./components/HeadBar.vue";
export default {
  components: {
    HeadBar,
  },
};
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
}
body {
  background-color: #00668a;
}
</style>
