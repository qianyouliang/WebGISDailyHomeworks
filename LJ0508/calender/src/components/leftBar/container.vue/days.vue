<template>
  <div id="days">
    <div
      class="day"
      v-for="day in days"
      id="day"
      name="day"
      :key="day.id"
      @click="selectDay(day)"
      :style="day.style"
    >
      {{ day.day }}
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      days: [],
      day: new Date().getDate(),
      localYear: this.year,
      localMonth: this.month,
      id: null,
    };
  },
  inject: ["selectDate"],
  props: ["year", "month", "date"],
  mounted() {
    const dayTimes = new Date(this.year, this.month, 0).getDate();
    const firstDayOfWeek = new Date(this.year, this.month - 1, 1).getDay();

    /* 计算上一个月的天数 */
    const lastMonthDayTimes = new Date(this.year, this.month - 1, 0).getDate();
    const lastMonthStart = lastMonthDayTimes - firstDayOfWeek + 1;
    for (let i = lastMonthStart; i < lastMonthDayTimes; i++) {
      this.days.push({ id: Date.now() + Math.random()-Math.random(), day: i ,style:"color:gray;"});
    }
    for (let i = 1; i <= dayTimes; i++) {
      this.days.push({ id: Date.now() + Math.random()-Math.random(), day: i ,style:"color:black;font-weight:bold;"});
    }
    /* 计算下一个月的天数 */
    for (let i = 1; i <= 42 - dayTimes - firstDayOfWeek + 1; i++) {
      this.days.push({ id: Date.now() + Math.random()-Math.random(), day: i ,style:"color:gray;"});
    }
  },
  methods: {
    selectDay(day) {
      this.selectDate(day); //使用inject传递的方法不能直接修改传递的值，只能通过调用方法修改，相当于做了一个中间层
    },
    updateDays() {
      this.days = [];
      const dayTimes = new Date(this.year, this.month, 0).getDate();
      const firstDayOfWeek = new Date(this.year, this.month - 1, 1).getDay();

      /* 计算上一个月的天数 */
      const lastMonthDayTimes = new Date(
        this.year,
        this.month - 1,
        0
      ).getDate();
      const lastMonthStart = lastMonthDayTimes - firstDayOfWeek + 1;
      for (let i = lastMonthStart; i < lastMonthDayTimes; i++) {
        this.days.push({ id: Date.now() + Math.random()-Math.random(), day: i ,style:"color:gray;" });
      }
      for (let i = 1; i <= dayTimes; i++) {
        this.days.push({ id: Date.now() + Math.random()-Math.random(), day: i ,style:"color:black; font-weight:bold;"});
      }
      /* 计算下一个月的天数 */
      for (let i = 1; i <= 42 - dayTimes - firstDayOfWeek + 1; i++) {
        this.days.push({ id: Date.now() + Math.random()-Math.random(), day: i ,style:"color:gray;"});
      }
    },
  },
  watch: {
    year(newYear) {
      this.localYear = newYear;
      this.updateDays();
    },
    month(newMonth) {
      this.localMonth = newMonth;
      this.updateDays();
    },
  },
};
</script>

<style>
#days {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-template-rows: repeat(7, 1fr);
  width: 100%;
  height: 90%;
}
.day {
  width: 100%;
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  box-sizing: border-box;
}
.day:hover {
  border: 1px solid #ccc;
}
</style>