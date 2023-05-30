<template>
  <div class="header">
    <div class="head-bar">
      <div class="left">
        <p class="logo" @click="toHeadPage">
          <i class="fa-solid fa-sun"></i>&nbsp;&nbsp;新中地天气
        </p>
        <div class="cityInfo">
          <h4>{{ curWeather.name }}</h4>
          &nbsp;&nbsp;&nbsp;实时天气:<span
            >{{ curWeather.weather }}{{ curWeather.temperature }}°C</span
          ><span
            >{{ curWeather.winddirection }}风{{ curWeather.windpower }}级</span
          >
        </div>
      </div>
      <div class="right">
        <transition name="fade">
          <div class="overlay" v-if="showOverlay">
            <div class="overlay-content">
              <!-- 提示界面内容 -->
              <div class="tip">
                <h3>关于:</h3>
                <p>这个应用可以用来追踪你选择城市的当前天气</p>
              </div>
              <div class="tip">
                <h3>如何使用:</h3>
                <p>1.点击搜索框输入你希望追踪的城市</p>
                <p>2.在搜索结果中选中一个城市，你将获取当地最新的天气</p>
                <p>3.点击右侧的＋号可以将追踪城市的天气情况保存在首页</p>
              </div>
              <div class="tip">
                <h3>移除城市:</h3>
                <p>如果你不想在首页关注某个城市,可以通过底部的按钮删 除它</p>
              </div>
              <button @click="closeOverlay" class="close">关闭</button>
            </div>
          </div>
        </transition>

        <i class="fa-solid fa-circle-info" @click="openOverlay" id="help"></i>
        &nbsp;&nbsp;&nbsp;
        <i
          class="fa-solid fa-plus"
          @click="addCityToList(cityName)"
          v-if="isAdd"
          id="add"
        ></i>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapMutations } from "vuex";
export default {
  data() {
    return {
      showOverlay: false,
      showOverlayContent: false,
    };
  },
  methods: {
    getCurWeatherAction() {
      this.$store.dispatch("getCurWeatherAction");
    },
    ...mapMutations(["addCityToList"]),
    openOverlay() {
      this.showOverlay = true;

      this.showOverlayContent = true; // 延迟一小段时间后显示内容，触发渐变效果
    },
    closeOverlay() {
      this.showOverlayContent = false; // 延迟一小段时间后显示内容，触发渐变效果
      this.showOverlay = false; // 延时后再隐藏遮罩
    },
    toHeadPage() {
      if (this.$route.path !== "/") {
        this.$router.push("/");
      }
    },
  },
  computed: {
    ...mapState(["curWeather", "cityName", "isAdd"]),
    // ...mapGetters(["curWeather"]),
  },
  mounted() {
    this.getCurWeatherAction();
  },
};
</script>
<style lang="scss" scoped>
.header {
  width: 100%;
  height: 90px;
  box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
  .head-bar {
    display: flex;
    justify-content: space-between;
    margin: 0 157px;
    padding: 24px 160px;
    color: #ffffff;
    .left {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .logo {
        font-size: 1.5rem;
        line-height: 2rem;
        cursor: pointer;
      }
      .cityInfo {
        display: flex;
        align-items: center;
        margin-left: 20px;
        font-size: 18px;
        h4 {
          font-size: 1.25rem;
          line-height: 1.75rem;
          font-weight: 400;
        }
        span {
          font-size: 0.875rem;
          line-height: 1.25rem;
          margin-left: 20px;
        }
      }
    }
    .right {
      display: flex;
      height: 30px;
      justify-content: center;
      align-items: center;
      i {
        font-size: 1.5rem;
        color: #ffffff;
        border: none;
        transition: all 1s;
      }
      #help:hover {
        color: #004e71;
      }
      #add {
        cursor: pointer;
      }
      .overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5); /* 半透明黑色背景 */
        display: flex;
        justify-content: center;
        transition: background-color 1s ease-in-out, opacity 1s ease-in-out;
      }
      .overlay-content {
        background-color: #ffffff;
        width: 350px;
        height: 290px;
        color: #000000;
        padding: 16px;
        margin-top: 200px;
        transition: opacity 1s ease-in-out; /* 添加过渡效果 */
        .tip {
          margin-bottom: 16px;
          h3 {
            font-weight: 400;
            margin-bottom: 5px;
          }
          p {
            font-weight: 400;
            font-size: 14px;
          }
        }
        .close {
          display: inline-block;
          width: 80px;
          height: 30px;
          line-height: 15px;
          margin: 16px 0 0;
          padding: 8px 24px;
          background-color: #00668a;
          color: #ffffff;
          box-sizing: border-box;
        }
      }
      .fade-enter-active,
      .fade-leave-active {
        transition: opacity 1s;
      }

      .fade-enter,
      .fade-leave-to {
        opacity: 0;
      }
    }
  }
}
</style>
