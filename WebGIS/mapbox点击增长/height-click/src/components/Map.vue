<template>
  <div id="map" @mousedown.left="heightAdd" @mouseup.left="heightAddStop"></div>
</template>

<script setup>
import { onMounted, ref } from "vue";

var heightAdd = ref();
var heightAddStop = ref();
onMounted(() => {
  mapboxgl.accessToken = import.meta.env.VITE_API_TOKEN;
  const map = new mapboxgl.Map({
    container: "map", // container ID
    /* style-layer */
    style: "mapbox://styles/mapbox/streets-v12", // style URL
    center: [114.4, 30.465],
    zoom: 16,
    pitch: 45,
  });
  /* 禁止双击地图放大 */
  map.doubleClickZoom.disable();
  //定义数据api
  var data = "http://39.103.151.139:8000/gis/zhongdi";
  map.on("load", () => {
    map.addLayer({
      id: "zhongdi",
      type: "fill-extrusion",
      source: {
        type: "geojson",
        data,
      },
      paint: {
        "fill-extrusion-color": "#ff2d51",
        "fill-extrusion-height": 200,
        "fill-extrusion-opacity": 0.6,
      },
    });
  });

  //定义定时器
  let timer = null;
  heightAdd.value = () => {
    timer = setInterval(() => {
      var value = map.getPaintProperty("zhongdi", "fill-extrusion-height");
      value += 10;
      map.setPaintProperty("zhongdi", "fill-extrusion-height", value);
    }, 20);
  };
  heightAddStop.value = () => {
    clearInterval(timer);
  };
});
</script>

<style lang="scss" scoped>
#map {
  width: 100vw;
  height: 100vh;
}
</style>