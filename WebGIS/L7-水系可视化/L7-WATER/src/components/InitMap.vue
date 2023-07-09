<template>
  <div id="map"></div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";

onMounted(async () => {
  const scene = new L7.Scene({
    id: "map",
    map: new L7.GaodeMap({
      style: "satellite",
      center: [114.770672, 30.559869],
      pitch: 45,
    }),

    logoVisible: false,
  });
  scene.on("loaded", () => {
    scene.map.add(new window.AMap.TileLayer.Satellite());
  });
  const map = scene.map;
  const water_other = await getData();
  const changjiang = await getChangjiang();
  const waterOtherLayer = new L7.LineLayer()
    .source(water_other)
    .color("name", (item) => {
      if (item.endsWith("江")) {
        return "#00FFFF";
      } else if (item.endsWith("河")) {
        return "#00FF00";
      } else if (item.endsWith("溪")) {
        return "#0000FF";
      }
    });
  const changjiangLayer = new L7.LineLayer()
    .source(changjiang)
    .color("#FF0000");
  scene.addLayer(waterOtherLayer);
  scene.addLayer(changjiangLayer);
});
async function getData() {
  const res = await axios.get("./data/river-other.json");
  return res.data;
}
async function getChangjiang() {
  const res = await axios.get("./data/river-changjiang.json");
  return res.data;
}
</script>

<style lang="scss" scoped>
#map {
  width: 100%;
  height: 100%;
}
</style>