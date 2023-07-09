<template>
  <div class="head-bar" :style="{ opacity: opacity }">
    <div class="back-home" @click="backHome">
      <el-icon><ArrowLeft /></el-icon>
    </div>
    <div class="movie-name">{{ movie.title }}</div>
  </div>
  <div>
    <div class="container">
      <div class="pic">
        <img :src="movie.pic" :alt="movie.title" />
      </div>
      <div class="slogo">{{ movie.slogo }}</div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, onBeforeMount } from "vue";
import { useRoute, useRouter } from "vue-router";
import { getMovieDetail } from "../api/index.js";

const $router = useRouter();
const $route = useRoute();
let movie = ref({});
let isScrolled = ref(true);
let opacity = ref(0);

/* 全局事件的监听和解绑 */
onMounted(async () => {
  /* 获取页面的id参数值 */
  const { id } = $route.query;
  //获取详情页数据
  const res = await getMovieDetail(id);
  movie.value = res.data.result;
  //页面挂载后添加全局window对象的滚动监听事件，用以实现顶部栏的渐变
  window.addEventListener("scroll", handleScroll);
});

//页面挂在前移除全局window对象的滚动监听事件，避免
onBeforeMount(() => {
  window.removeEventListener("scroll", handleScroll);
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

const backHome = () => {
  $router.back();
};
</script>

<style lang="scss" scoped>
.head-bar {
  height: 60px;
  position: fixed;
  width: 100%;
  top: 0px;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #2f61dd;
  color: white;
  height: 60px;
  opacity: 0;

  .back-home {
    position: absolute;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    border: 2px solid white;
    left: 30px;
    text-align: center;
    line-height: 33px;
  }
}

.container {
  display: flex;
  height: 2000px;
  flex-direction: column;
  align-items: center;
  margin-top: 200px;
  .pic img {
    width: 400px; /* Adjust the width as needed */
  }
  .slogo {
    margin-top: 30px;
    font-family: "楷体", "KaiTi", serif;
    font-size: 20px;
  }
}
</style>