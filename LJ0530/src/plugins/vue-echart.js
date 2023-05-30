import Vue from "vue";
import vcharts from "vue-echarts";
import * as echarts from "echarts";
Vue.prototype.$echarts = echarts;
Vue.component("VChart", vcharts); //注册一个全局组件 组件名称 v-chart
