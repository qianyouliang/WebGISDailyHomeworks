<template>
  <select name="month" id="month" v-model="month" @change="monthChange(month)">
    <option v-for="month in Months" :key="month" :value="month">
      {{ month }}
    </option>
  </select>
</template>

<script>
export default {
  inject: ['monthChanged',],
  props: ["Month"],
  data() {
    return {
      Months: [],
      month:String
    };
  },

  created() {
    for (let i = 1; i <= 12; i++) {
      this.Months.push(i);
    }
    this.month = this.Month;
  },
  methods: {
    monthChange(month) {
     this.monthChanged(month);
    },
  },

};
</script>

<style lang="scss">
//这里的样式是scss格式的，嵌套写法，必须要声明scss
#month {
  display: inline-block;
  width: 120px;
  height: 30px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #fff;
  color: #000;
  option {
    width: 100%;
    height: 100%;
    padding: 10px;
  }
}
</style>