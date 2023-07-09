<template>
  <div
    v-for="movie in movieList"
    :key="movie.id"
    class="movie-list"
    :movie="movie"
  >
    <div class="movie" @click="jumpToDetail(movie.id)">
      <div><img :src="movie.pic" alt="" /></div>
      <div class="movie-msg">
        <div class="title">{{ movie.title }}</div>
        <div class="score">
          观众评分:<span>{{ movie.raiting }}</span
          ><span><el-rate v-model="movie.score" disabled /></span>
        </div>
        <div class="type">
          <span>{{ movie.labels.join("/") }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { getFilmInThreat } from "@/api/index.js";
import { useRouter } from "vue-router";

const $router = useRouter();

const movieList = ref([]);
onMounted(async () => {
  const res = await getFilmInThreat();
  const data = res.data.result;
  movieList.value = data.map((item) => ({
    id: item.id,
    pic: item.pic,
    title: item.title,
    raiting: item.raiting,
    score: parseFloat(item.raiting) / 2.0, //增加一个打分机制(0-5)
    slogo: item.slogo,
    labels: item.labels,
  }));
});

const jumpToDetail = (id) => {
  $router.push(`/detail?id=${id}`);
};
</script>

<style lang="scss" scoped>
.movie-list {
  width: 100%;
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