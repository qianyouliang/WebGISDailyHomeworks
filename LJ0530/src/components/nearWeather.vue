<template>
  <div class="nearWeather">
    <div class="weathers">
      <div class="weather" v-for="item in formattedNearWeather" :key="item.day">
        <span>{{ item.day }}</span>
        <span>{{ item.date }}</span>
        <span>{{ item.dayweather }}</span>
        <span>{{ item.daypower }}</span>
      </div>
    </div>
    <div class="chart">
      <v-chart :option="option"></v-chart>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState, mapActions } from "vuex";
export default {
  computed: {
    ...mapGetters(["formattedNearWeather"]),
    ...mapState(["nearWeather", "option"]),
  },
  methods: {
    ...mapActions(["getNearWeatherInfoAction"]),
  },
};
</script>

<style lang="scss" scoped>
.nearWeather {
  background-color: #004e71;
  margin: 8px auto;
  padding: 20px 40px 50px;
  height: 500px;
  width: 100%;
  border-radius: 10px;
  box-sizing: border-box;
  .weathers {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 60%;
    .weather {
      display: flex;
      flex-direction: column;
      justify-items: center;
      align-content: space-around;
      font-size: 16px;
      color: #ffffff;
      width: 100%;
      span {
        display: inline-block;
        width: 100%;
        height: 40px;
        font-size: 18px;
        line-height: 40px;
        text-align: center;
      }
    }
  }
  .chart {
    width: 80%;
    height: 200px;
    margin: 0 auto;
  }
}
</style>
