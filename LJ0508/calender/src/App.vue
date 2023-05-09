<template>
  <div id="app">
    <LeftBar
      :dateMessage="dateMessage"
      :year="year"
      :month="month"
      :date="date"
    ></LeftBar>
    <RightBar :date_message="dateMessage"></RightBar>
  </div>
</template>
<script>
import { queryDay } from "./request/api.js";
import LeftBar from "./components/leftBar/leftBar.vue";
import RightBar from "./components/rightBar/rightBar.vue";
export default {
  data() {
    return {
      dateMessage: {
        animalsYear: "兔",
        weekday: "星期日",
        lunarYear: "癸卯年",
        lunar: "三月十八",
        year_month: "2023-5",
        date: "2023-5-7",
        suit: "合婚订婚.开业.动土.祈福.纳畜.祭祀.求医.治病",
        avoid: "结婚.安葬",
        holiday: "",
        desc: "",
      },
      year: new Date().getFullYear(),
      month: new Date().getMonth() + 1,
      date: new Date().getDate(),
    };
  },

  components: {
    LeftBar,
    RightBar,
  },
  methods: {
    returnToday() {
      const today = new Date();
      this.year = today.getFullYear();
      this.month = today.getMonth() + 1; // getMonth() 返回的月份从 0 开始，所以我们需要加 1
      this.date = today.getDate();
    },
    selectDate(date) {
      this.$set(this, "date", date);
      queryDay(`${this.year}-${this.month}-${this.date}`).then((res) => {
        this.dateMessage = res;
      });
    },
    yearChanged(year) {
      this.$set(this, "year", year);
    },
    monthChanged(month) {
      this.$set(this, "month", month);
    },
    reCalcDays() {
      this.days = [];
      const dayTimes = new Date(this.year, this.month, 0).getDate();
      const firstDayOfWeek = new Date(this.year, this.month - 1, 1).getDay();

      for (let i = 0; i < firstDayOfWeek; i++) {
        this.days.push("");
      }
      for (let i = 1; i <= dayTimes; i++) {
        this.days.push(i);
      }
    },
  },

  provide() {
    return {
      dateMessage: this.dateMessage,
      returnToday: this.returnToday,
      year: this.year,
      month: this.month,
      date: this.date,
      selectDate: this.selectDate,
      yearChanged: this.yearChanged,
      monthChanged: this.monthChanged,
      reCalcDays: this.reCalcDays,
    };
  },
};
</script>

<style>
#app {
  width: 80%;
  height: 50vh;
  margin: auto;
  border: 2px solid blue;
  border-radius: 15px;
  box-shadow: 0 0 5px blue;
  display: flex;
  justify-content: space-between;
  overflow: hidden;
}
</style>