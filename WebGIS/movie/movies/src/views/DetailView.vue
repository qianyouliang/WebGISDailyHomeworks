<template>
  <div class="head-bar" :class="{ 'hide-bar': isScrolled }">
    <div class="back-home" @click="movieStore.backHome">
      <el-icon><ArrowLeft /></el-icon>
    </div>
    <div class="movie-name">{{ movieStore.movie.title }}</div>
  </div>
  <div>
    <div class="container">
      <div class="pic">
        <img :src="movieStore.movie.pic" :alt="movieStore.movie.title" />
      </div>
      <div class="slogo">{{ movieStore.movie.slogo }}</div>
    </div>
  </div>
</template>

<script setup>
import { useMovieStore } from "../store/index.js";
import { ref, onMounted, onUnmounted } from "vue";
let movieStore = useMovieStore();
const isScrolled = ref(false);
let prevScrollPosition = 0;
// 监听滚动事件
const handleScroll = () => {
  const scrollTop =
    window.pageYOffset ||
    document.documentElement.scrollTop ||
    document.body.scrollTop;
  isScrolled.value = scrollTop > prevScrollPosition;
  prevScrollPosition = scrollTop;
};

onMounted(() => {
  window.scrollTo(0, 0);
  window.addEventListener("scroll", handleScroll);
});
onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>

<style lang="scss" scoped>
.head-bar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #2f61dd;
  color: white;
  height: 60px;
  transition: transform 0.5s ease-in-out;
  transform: translateY(-100%);
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
.hide-bar {
  transform: translateY(0);
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