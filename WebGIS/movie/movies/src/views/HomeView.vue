<template>
  <div class="movieList">
    <el-scrollbar>
      <div
        v-for="movie in movieStore.movieList"
        :key="movie.id"
        class="scrollbar-demo-item"
      >
        <div class="movie" @click="movieStore.jumpToDetail(movie)">
          <div><img :src="movie.pic" alt="" /></div>
          <div class="movie-msg">
            <div class="title">{{ movie.title }}</div>
            <div class="score">
              评分:<span>{{ movie.raiting }}</span
              ><span><el-rate v-model="movie.raiting" disabled /></span>
            </div>
            <div class="type">
              <span>{{ movie.labels[0] }}</span
              >/<span>{{ movie.labels[1] }}</span
              >/<span>{{ movie.labels[2] }}</span>
            </div>
          </div>
        </div>
      </div>
    </el-scrollbar>
  </div>
</template>

<script setup>
import { useMovieStore } from "../store/index.js";
import { onActivated } from "vue";
import { onBeforeRouteLeave } from "vue-router";
let movieStore = useMovieStore();
var scrollPosition = 0;

// 离开该路由前
onBeforeRouteLeave(() => {
  scrollPosition = window.screenY || 0;
});
// 进入该路由时
onActivated(() => {
    // 滚动到之前保存的位置
    window.scrollTo(0, scrollPosition);
});
</script>

<style lang="scss" scoped>
.movieList {
  width: 100vw;
  .scrollbar-demo-item {
    margin-bottom: 20px;
  }

  .movie {
    display: flex;
    align-items: center;
    cursor: pointer;
    padding: 10px;
    border-bottom: 1px solid #f5f5f5;
    img {
      width: 100px;
      height: 150px;
      object-fit: cover;
      margin-right: 10px;
    }
    .movie-msg {
      flex: 1;
    }
    .title {
      font-size: 18px;
      font-weight: bold;
      margin-bottom: 5px;
      color: #2f61dd;
    }
    .score {
      display: flex;
      align-items: center;
      margin-bottom: 5px;
      span {
        margin: 0 10px;
        font-weight: 700;
      }
    }
    .type span {
      margin-right: 10px;
      color: gray;
    }
  }
  .movie:hover {
    background-color: rgb(221, 216, 216);
  }
}
</style>