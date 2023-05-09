<template>
  <div id="leftBar">
    <div id="topBar">
      <YearSelector :dateMessage="dateMessage" :Year="year" :month="month" :date="date"></YearSelector>
      <MonthSelector :dateMessage="dateMessage" :year="year" :Month="month" :date="date"></MonthSelector>
      <TodayBtn :dateMessage="dateMessage" :year="year" :month="month" :date="date"></TodayBtn>
    </div> 

    <div id="container">
      <Week :dateMessage="dateMessage" :year="year" :month="month" :date="date"></Week>
      <Days :dateMessage="dateMessage" :year="year" :month="month" :date="date"></Days>
    </div>
  </div>
</template>

<script>
import YearSelector from "./topBar.vue/YearSelector/YearSelector.vue";
import MonthSelector from "./topBar.vue/monthSelector/monthSelector";
import TodayBtn from "./topBar.vue/todayBtn/todayBtn.vue";
import Days from './container.vue/days.vue';
import Week from './container.vue/week.vue';
export default {
  components: {
    YearSelector,
    MonthSelector,
    TodayBtn,
    Days,
    Week
  },
  props:['dateMessage','year','month','date'],
};
</script>

<style lang="scss">
#leftBar {
  width: 85%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 50px;
  box-sizing: border-box;
  #topBar {
  width: 100%;
  height: 10%;
  display: flex;
  gap: 100px;
  justify-content: space-between;
  box-sizing: border-box;
  }
  #container{
  width: 90%;
  height: 90%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 5%;
}

}


</style>