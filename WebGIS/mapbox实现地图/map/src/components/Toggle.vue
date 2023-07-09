<template>
  <div class="mapConvert">
    <img src="../assets/线划.png" alt="" @click="convertToMap" />
    <img src="../assets/影像.png" alt="" @click="convertToImage" />
  </div>
</template>

<script setup>
import { ref, onMounted, inject } from "vue";
import { useStore } from "../store/index.js";
const $map = ref(null);
const store = ref(useStore());
onMounted(() => {
  $map.value = store.value.map;
});
const convertToImage = () => {
  store.value.convertToImage();
};
const convertToMap = () => {
  store.value.convertToMap();
};
</script>

<style lang="scss" scoped>
.mapConvert {
  display: flex;
  gap: 30px;
  position: absolute;
  right: 20px;
  bottom: 30px;
  z-index: 100;
  img {
    width: 100px;
    height: 100px;
  }
}
#mouse-position {
  position: fixed;
  z-index: 100;
  bottom: 20px;
  left: 50%;
}
</style>