<template>
  <div class="eventControl">
    <button @click="activeMap">激活地图事件</button>
    <button @click="removeMap">清除地图事件</button>
  </div>
  <div class="mapConvert">
    <img src="../assets/线划.png" alt="" @click="convertToMap" />
    <img src="../assets/影像.png" alt="" @click="convertToImage" />
  </div>
</template>

<script setup>
import { inject, onMounted, ref } from "vue";
import { gaodeMap, gaodeImage } from "../libs/gaode.js";
import { setCanvas } from "../libs/point.js";
var activeMap = ref("");
var removeMap = ref("");
onMounted(() => {
  const $map = inject("$map");
  let canvas = setCanvas($map);
  const style = new ol.style.Style({
    image: new ol.style.Icon({
      img: canvas,
      imgSize: [canvas.width, canvas.height],
    }),
  });
  const source = new ol.source.Vector({});
  const layer = new ol.layer.Vector({
    source,
    style,
  });
  $map.addLayer(layer);
  const handleMap = (evt) => {
    let position = evt.coordinate;
    const point = new ol.Feature({
      geometry: new ol.geom.Point(position),
    });
    source.addFeature(point);
  };
  activeMap.value = function () {
    $map.on("click", handleMap);
  };

  removeMap.value = function () {
    $map.un("click", handleMap);
    source.clear();
  };
});

const convertToImage = () => {
  gaodeMap.setVisible(false);
  gaodeImage.setVisible(true);
};
const convertToMap = () => {
  gaodeMap.setVisible(true);
  gaodeImage.setVisible(false);
};
</script>

<style lang="scss" scoped>
.eventControl {
  position: absolute;
  top: 0;
  right: 60px;
  button{
    width: 100px;
    height: 35px;
    border-radius: 5px;
    background-color: rgb(62, 117, 161);
    color: white;
    margin-top: 5px;
    margin-right: 10px;
    border: 3px solid rgba(255, 255, 255, 0.178);
  }
}
.mapConvert {
  display: flex;
  gap: 30px;
  position: absolute;
  right: 250px;
  bottom: 30px;
  z-index: 100;
}
img {
  width: 100px;
  height: 100px;
}
</style>