<template>
  <div class="details">
    <p class="prompt">
      你正在预览{{ dailyWeather.name }}的天气信息{{
        isAdd == false ? "" : "，可以通过右上角的'+'号按钮保存起来"
      }}
    </p>
    <div class="detail">
      <p class="temp">当日气温是：{{ dailyWeather.temperature }}摄氏度</p>
      <p class="weather">当日天气是：{{ dailyWeather.weather }}</p>
      <p class="windDir">当日风向是：{{ dailyWeather.winddirection }}</p>
      <p class="windPow">当日风力是：{{ dailyWeather.windpower }}级</p>
    </div>
    <nearWeatherVue id="chart" />
  </div>
</template>

<script>
import nearWeatherVue from "../components/nearWeather.vue";
import { mapState, mapActions } from "vuex";
export default {
  computed: {
    ...mapState(["dailyWeather", "cityName", "isAdd"]),
  },
  components: {
    nearWeatherVue,
  },
  methods: {
    ...mapActions(["getDailyWeatherAction", "getNearWeatherInfoAction"]),
  },
  mounted() {
    const cityName = sessionStorage.getItem("cityName");
    console.log(cityName);
    this.getDailyWeatherAction(cityName);
  },
};
</script>

<style lang="scss" scoped>
.details,
.detail {
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-items: center;
  color: #ffffff;
  box-sizing: border-box;
  .detail {
    border-bottom: 0.2px solid rgba(255, 255, 255, 0.178);
  }
  .prompt {
    display: flex;
    align-items: center;
    background-color: #004e71;
    box-sizing: border-box;
    line-height: 40px;
    justify-content: center;
    font-size: 18px;
  }
  p {
    display: inline-block;
    line-height: 40px;
    height: 40px;
    font-size: 20px;
    text-align: center;
    padding: 8px;
  }
  #chart {
    width: 70%;
    text-align: center;
  }
}
</style>
