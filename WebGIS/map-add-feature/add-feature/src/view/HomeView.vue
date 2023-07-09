<template>
  <div>
    <button @click="activePointDraw(map, source, docLayer)" class="draw-point">
      绘制点
    </button>
    <button
      @click="activeLineStringDraw(map, source, docLayer)"
      class="draw-line-string"
    >
      绘制线
    </button>
    <button
      @click="activePolygonDraw(map, source, docLayer)"
      class="draw-polygon"
    >
      绘制区
    </button>
    <div id="map"></div>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { gaode } from "../libs/gaode.js";
import { activePointDraw } from "./Hooks/activePointDraw.js";
import { activeLineStringDraw } from "./Hooks/activeLineStringDraw.js";
import { activePolygonDraw } from "./Hooks/activePolygonDraw.js";
var map;
var source;
var docLayer;
var source;
var layer;
onMounted(() => {
  docLayer = new Zondy.Map.Doc("", "webgis", {});
  map = new ol.Map({
    target: "map",
    layers: [gaode, docLayer],
    view: new ol.View({
      projection: "EPSG:4326",
      center: [114.3, 30.5],
      zoom: 4,
    }),
  });
  source = new ol.source.Vector({});
  const layer = new ol.layer.Vector({
    source,
  });
  map.addLayer(layer);
});
</script>

<style lang="scss" scoped>
#map {
  width: 100vw;
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
}
.draw-point {
  width: 100px;
  height: 30px;
  line-height: 30px;
  position: absolute;
  top: 10px;
  left: 50px;
  z-index: 100;
}
.draw-line-string {
  width: 100px;
  height: 30px;
  line-height: 30px;
  position: absolute;
  top: 10px;
  left: 170px;
  z-index: 100;
}
.draw-polygon {
  width: 100px;
  height: 30px;
  line-height: 30px;
  position: absolute;
  top: 10px;
  left: 290px;
  z-index: 100;
}
.disabled {
  cursor: not-allowed;
}
</style>