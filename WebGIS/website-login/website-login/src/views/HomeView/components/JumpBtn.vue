<template>
  <div class="currentCity" @click="jumpCity" :style="{ opacity: opacity }">
    {{ $store.currentCity }}
  </div>
</template>

<script setup>
import { onMounted, ref, onUpdated } from "vue";
import { useRouter } from "vue-router";
import { useMainStore } from "../../../stores/index.js";
const $store = useMainStore();
const $router = useRouter();
let isScrolled = ref(true);
let opacity = ref(0);

const jumpCity = () => {
  $router.push("/city");
};

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});

const handleScroll = () => {
  /* 获取滚动条距离顶部的高度 */
  let height = window.scrollY;
  /* 滚动条滚动到300px让滚动条完全显示 */
  let lengthScale = height / 400;
  if (lengthScale > 1) {
    isScrolled.value = false;
  } else {
    isScrolled.value = true;
  }
  opacity.value = lengthScale;
};
</script>

<style lang="scss" scoped>
.currentCity {
  width: auto;
  height: 30px;
  padding: 0 10px;
  line-height: 30px;
  text-align: center;
  border: 1px solid #ccc;
  border-radius: 5px;
  cursor: pointer;
  position: fixed;
  top: 10px;
  left: 20px;
  z-index: 100;
  color: #fff;
  box-sizing: border-box;
  opacity: 0;
}
</style>