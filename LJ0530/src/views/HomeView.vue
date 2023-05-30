<template>
  <div class="container">
    <div class="search">
      <searchWeather />
    </div>
    <div>
      <h2 class="title">近期天气</h2>
      <nearWeather />
    </div>
  </div>
</template>
<script>
import searchWeather from "../components/searchWeather.vue";
import nearWeather from "../components/nearWeather.vue";
import { mapActions } from "vuex";
export default {
  components: {
    searchWeather,
    nearWeather,
  },
  methods: {
    ...mapActions(["getNearWeatherInfoAction"]),
  },
  mounted() {
    this.getNearWeatherInfoAction("武汉");
  },
};
</script>
<style lang="scss" scoped>
.container {
  width: 85%;
  margin: 0 157px;
  padding: 0 160px;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  justify-items: center;
  h1 {
    font-size: 48px;
    width: 100%;
    font-weight: 400;
    color: #ffffff;
  }
  .search {
    widows: 100%;
  }
  .title {
    margin: 24px 0 10px;
    font-size: 18px;
    font-weight: 700;
    font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
    color: #ffffff;
  }
}
</style>
