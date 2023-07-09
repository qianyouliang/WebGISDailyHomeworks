<template>
  <div id="map"></div>
</template>

<script setup>
import { onMounted } from "vue";
import { gaodeMap, gaodeImage } from "../libs/gaode";
import { app } from "../main";
onMounted(() => {
  const map = new ol.Map({
    target: "map",
    layers: [gaodeMap, gaodeImage],
    view: new ol.View({
      center: [114.3, 30.5],
      zoom: 5,
      projection: "EPSG:4326",
    }),
  });
  const source = new ol.source.Vector({});
  const layer = new ol.layer.Vector({
    source,
  });
  /* 设置全局变量map */
  app.provide("$source", source);
  app.provide("$layer", layer);
  app.provide("$map", map);
  map.addLayer(layer);
});
</script>

<style lang="scss">
#map {
  width: 100vw;
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
  .ol-control button {
    background-color: rgb(92, 156, 182);
    color: white;
  }
  .ol-custom-overviewmap {
    right: 0;
    bottom: 0;
    top: auto;
    left: auto;
  }
  .ol-overviewmap-box {
    border: 1px solid #ff2d51;
  }
  .ol-zoomslider {
    top: 120px;
  }
  .ol-overviewmap {
    width: 200px;
    height: 200px;
    .ol-overviewmap-map {
      width: 200px;
      height: 200px;
    }
  }
  .custom-mouse-position{
    z-index: 100;
    position: absolute;
    bottom: 10px;
    left: 200px;
    color: white;
  }
}
</style>