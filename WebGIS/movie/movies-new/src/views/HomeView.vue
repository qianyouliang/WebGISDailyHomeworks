<template>
  <div class="movieList">
    <el-scrollbar>
      <movie-item
        v-for="movie in movieList"
        :key="movie.id"
        class="scrollbar-demo-item"
        :movie="movie"
      ></movie-item>
    </el-scrollbar>
  </div>
</template>

<script setup>
import { onActivated, onUnmounted, onDeactivated } from "vue";
import MovieItem from "./components/MovieItem.vue";
import {useMovieHttp} from "./hooks/movieListHttp.js"

/* 获取 */
const { movieList } = useMovieHttp();
var scrollPosition = 0;

</script>

<style lang="scss" scoped>
.movieList {
  width: 100vw;
  .scrollbar-demo-item {
    margin-bottom: 20px;
  }
}
</style>