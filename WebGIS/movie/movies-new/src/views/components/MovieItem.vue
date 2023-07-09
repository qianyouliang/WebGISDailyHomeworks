<template>
  <div class="movie" @click="jumpToDetail(movie.id)">
    <div><img :src="movie.pic" alt="" /></div>
    <div class="movie-msg">
      <div class="title">{{ movie.title }}</div>
      <div class="score">
        评分:<span>{{ movie.raiting }}</span
        ><span><el-rate v-model="movie.score" disabled /></span>
      </div>
      <div class="type">
        <span>{{ movie.labels.join("/") }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";

const $router = useRouter();
const props = defineProps({
  movie: {
    type: Object,
  },
});
const jumpToDetail = (id) => {
  $router.push(`/detail?id=${id}`);
};
</script>

<style lang="scss" scoped>
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
</style>