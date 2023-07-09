<template>
  <div class="musicList">
    <div
      v-for="(music, index) in store.musicList"
      :key="music.id"
      @click="store.deleteMusic(music.id)"
      :class="['music', index % 2 !== 0 ? 'red' : 'green']"
    >
      <div class="img"><img :src="music.coverImgUrl" alt="" /></div>
      <div class="name">{{ music.name }}</div>
    </div>
  </div>
</template>

<script setup>
import { useStore } from "../store/index.js";
import { onMounted, ref, onUpdated } from "vue";
const store = useStore();
onMounted(async () => {
  await store.getMusicList();
});
</script>

<style lang="scss" scoped>
.musicList {
  width: 100vw;
  height: 100vh;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  gap: 50px;
  box-sizing: border-box;
  padding: 30px;
  margin: 30px 0 0;
  .music {
    display: flex;
    flex-direction: column;
    justify-items: center;
    align-content: space-between;
    padding: 5px;
    border-radius: 20px;
    border: 1px solid black;
    transition: all 0.5s;
    img {
      width: 100%;
      object-fit: cover;
      border-radius: 20px;
    }
    .name {
      margin-top:10px;
      text-align: center;
    }
  }
  .music:hover{
    box-shadow: 2px 2px 8px black;
  }
  .red {
    border:1px solid red;
  }

  .green {
    border:2px solid rgb(60, 224, 60);
  }
}
</style>