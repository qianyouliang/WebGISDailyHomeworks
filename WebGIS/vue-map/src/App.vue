<template>
  <div>
    <open-map></open-map>
    <open-control></open-control>
    <open-toggle></open-toggle>
    <map-selector></map-selector>
  </div>
</template>

<script setup>
import OpenMap from "./components/OpenMap.vue";
import OpenControl from "./components/OpenControl.vue";
import OpenToggle from "./components/OpenToggle.vue";
import mapSelector from "./components/map-selector.vue";
</script>

<style lang="scss" scoped>
body {
  margin: 0;
  padding: 0;
  Map {
    width: 100%;
    height: 100%;
  }
}
</style>