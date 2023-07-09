<template>
  <div id="popup"></div>
  <div>
    <button id="current-city" @click="jumpCity($router)">
      <el-icon><Location /></el-icon>
      {{ $store.city }}
    </button>
    <div id="map"></div>
  </div>
</template>

<script setup>
/* 1.city jump */
import { jumpCity } from "./Hooks/useJumpCity.js";
import { useRouter } from "vue-router";
import { useCityStore } from "../../store/index.js";
import { onMounted, ref } from "vue";
import { gaodeMap } from "../../libs/gaode.js";
import { app } from "../../main.js";
import { getPolygon } from "../../libs/getPolygon.js";
import axios from "axios";
const $router = useRouter();
const $store = useCityStore();
var $adcode = ref("");
var $name = ref("");
/* 2.initMap */
onMounted(async () => {
  const map = new ol.Map({
    target: "map",
    layers: [gaodeMap],
    view: new ol.View({
      center: [114.3, 30.5],
      zoom: 5,
      projection: "EPSG:4326",
    }),
  });
  await getPolygon(map, $store.city);
});
</script>

<style lang="scss" >
#map {
  width: 100vw;
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
}
#current-city {
  position: absolute;
  top: 10px;
  left: 50px;
  width: auto;
  height: 50px;
  padding: 10px 10px;
  font-size: 16px;
  font-weight: bold;
  text-align: center;
  text-decoration: none;
  background-color: #64a5e2;
  color: #ffffff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  z-index: 100;
}
#current-city:hover {
  background-color: #12146b;
}
#popup {
  position: fixed;
  z-index: 10;
  left: 100px;
  top: 100px;
  width: 200px;
  height: auto;
  border: 1px solid rgb(170, 170, 170);
  background-color: rgba(255, 255, 255, 0.856);
  border-radius: 10px;
  box-shadow: 4px 4px 4px rgb(146, 195, 240);
  visibility: hidden;
  pointer-events: none;
}
#popup-content p {
  font-size: 14px;
  font-family: "微软雅黑";
  text-align: left;
  margin: 20px 0 20px 20px;
  position: relative;
}
#close-popup {
  text-decoration: none;
  position: absolute;
  top: 2px;
  right: 5px;
  cursor: pointer;
}
</style>