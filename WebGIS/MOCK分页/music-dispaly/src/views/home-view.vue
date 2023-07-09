<template>
  <div class="background">网易云音乐</div>
  <div class="container">
    <ul class="musicList">
      <li v-for="music in slicedMusicList" :key="music.id" class="music">
        <div class="music-body">
          <img :src="music.pic" />
          <div class="play-music">
            <div class="play-left">
              <span class="liston-music"
                ><el-icon><Headset /></el-icon
              ></span>
              &nbsp;
              <span class="play-count">{{ music.playbackVolume }}万</span>
            </div>
            <div class="play-right">
              <el-icon><VideoPlay /></el-icon>
            </div>
          </div>
        </div>
        <p class="music-name">
          <a>{{ music.musicName }}</a>
        </p>
        <p class="music-sheet">
          <span>by</span>
          {{ music.musicSheet }}
          <img
            src="https://p5.music.126.net/obj/wo3DlcOGw6DClTvDisK1/4761340159/e2c1/6fb5/f49b/353e6d1857f7c5f46426beb533427e53.png"
          />
        </p>
      </li>
    </ul>
    <div class="pagination">
      <el-pagination
        :page-size="pageSize"
        prev-text="上一页"
        next-text="下一页"
        background
        layout="prev, pager, next"
        :total="totalNum"
        :current-page="currentPage"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script setup>
import getData from "./hooks/getData.js";

const {
  pageSize,
  musicList,
  currentPage,
  totalNum,
  slicedMusicList,
  handleCurrentChange,
} = getData();
</script>

<style lang="scss" >
.background {
  position: fixed;
  top: 200px;
  height: 100px;
  width: 100%;
  background-color: red;
  color: #00000083;
  font-size: 60px;
  font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
  text-align: center;
  line-height: 100px;
  font-weight: bold;
  letter-spacing: 40px; //文字间距
}
.container {
  padding: 0;
  width: 60%;
  margin: 50px auto 10px;
  padding: 20px;
  border: 1px solid #000;
  .musicList {
    display: grid;
    position: relative;
    grid-template-columns: repeat(5, 1fr);
    gap: 20px;
    list-style: none;
    margin: 0 auto;
    box-sizing: border-box;
    padding-bottom: 60px;
    .music {
      width: 100%;
      position: relative;
      text-align: left;
      font-size: 14px;
      box-sizing: border-box;
      .music-body {
        position: relative;
        img {
          width: 100%;
          height: 100%;
        }
        .play-music {
          width: 100%;
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          background-color: rgba(0, 0, 0, 0.6);
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 5px;
          .play-left,
          .play-right {
            display: flex;
            align-items: center;
          }
        }
      }
      .music-name {
        margin-top: 5px;
        color: #000;
        font-weight: bold;
        text-decoration: none;
      }
      .music-sheet {
        color: #999;
        margin-top: 5px;
        font-size: 12px;
        img {
          height: 13px;
          width: 13px;
          display: inline-block;
          vertical-align: middle;
        }
        span {
          margin-right: 5px;
          color: #999;
        }
      }
    }
  }
}

.el-icon {
  color: #999;
}
.el-icon:hover {
  color: #fff;
}
.pagination {
  position: fixed;
  bottom: 5%;
  left: 35%;
}
</style>