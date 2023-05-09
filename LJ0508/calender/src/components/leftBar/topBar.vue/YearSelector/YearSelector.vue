<template>
  <select name="year" id="year" v-model="year" @change="yearChanged(year)">
    <option v-for="year in years" :key="year" :value="year">{{ year }}</option>
  </select>
</template>
  
  <script>
export default {
  inject: ["yearChanged",'reCalcDays'],
  props: ["Year"],
  data() {
    return {
      years: [],
      year: String,
    };
  },

  created() {
    for (let i = 1900; i < 2100; i++) {
      this.years.push(i);
    }
    this.year = this.Year;
  },
  methods: {
    YearChanged(year) {
      this.yearChanged(year);
    },
  },
  watch:{
    year(){
      this.reCalcDays();
    }
  }
};
</script>

<style>
#year {
  display: inline-block;
  width: 120px;
  height: 30px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #fff;
  color: #000;
}
</style>