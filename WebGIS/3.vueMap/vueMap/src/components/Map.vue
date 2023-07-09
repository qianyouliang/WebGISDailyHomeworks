<template>
  <div class="mapConvert">
    <img src="../../public/线划.png" alt="" @click="convertToMap" />
    <img src="../../public/影像.png" alt="" @click="convertToImage" />
  </div>
  <div id="map" class="map"></div>
  <!-- <button class="downloadMap" @click="downloadMap">下载</button> -->
</template>

<script setup>
import { ref, onMounted } from "vue"; // vue相关方法
import { useStore } from "../store/index.js";
const map = ref(null);
const store = ref(useStore());
const initMap = () => {
  store.value.initMap();
  map.value = store.value.map;
};
const convertToImage = () => {
  store.value.convertToImage();
};
const convertToMap = () => {
  store.value.convertToMap();
};
const downloadMap = () => {
  store.value.downloadMap();
};
onMounted(() => {
  initMap();
});
</script>

<style lang="scss" scoped>
.map {
  width: 100vw;
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
  ::v-deep(.ol-control) button {
    background-color: rgb(92, 156, 182);
    color: white;
  }
  ::v-deep(.ol-custom-overviewmap) {
    /* position: fixed; */
    top: right;
    right: center;
  }
  ::v-deep(.ol-overviewmap-box) {
    border: 1px solid #ff2d51;
  }
}
.mapConvert {
  display: flex;
  gap: 30px;
  position: absolute;
  right: 20px;
  bottom: 30px;
  z-index: 100;
}
img {
  width: 100px;
  height: 100px;
}
.downloadMap {
  position: absolute;
  top: 0;
  right: 1;
}
</style>