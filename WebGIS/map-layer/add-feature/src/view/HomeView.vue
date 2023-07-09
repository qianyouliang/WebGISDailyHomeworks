<template>
  <div>
    <el-dialog v-model="dialogTableVisible" title="拉框查询结果" draggable>
      <el-table :data="tableData">
        <el-table-column property="FID" label="FID" />
        <el-table-column property="ftype" label="ftype" />
      </el-table>
    </el-dialog>
    <button @click="activePointDraw(map, source, docLayer)" class="draw-point">
      绘制点
    </button>
    <button
      @click="activeLineStringDraw(map, source, docLayer)"
      class="draw-line-string"
    >
      绘制线
    </button>
    <button
      @click="activePolygonDraw(map, source, docLayer)"
      class="draw-polygon"
    >
      绘制区
    </button>
    <select
      name="draw-query"
      class="draw-query"
      v-model="id"
      @change="activeQueryDraw(map, id)"
    >
      <option value="none">无</option>
      <option value="0">点查询</option>
      <option value="1">线查询</option>
      <option value="2">区查询</option>
    </select>
    <div id="map"></div>
    <div class="layer-collapse" :style="{ display: isShowed }">
      <button class="close" @click="close">X</button>
      <el-collapse v-model="activeName" accordion>
        <el-collapse-item title="图层目录" name="layerCatalog" class="header">
          <el-tree
            :data="layerMsg"
            ref="tree"
            show-checkbox
            default-expand-all
            node-key="id"
            highlight-current
            :check-strictly="true"
            :props="defaultProps"
            :default-checked-keys="[0, 1, 2]"
            @check-change="checkChange"
          >
            <template #default="{ node, data }">
              <img :src="getImgUrl(data.label)" />&nbsp;
              {{ node.label }}
            </template>
          </el-tree>
        </el-collapse-item>
      </el-collapse>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { gaode } from "../libs/gaode.js";
import { activePointDraw } from "./Hooks/activePointDraw.js";
import { activeLineStringDraw } from "./Hooks/activeLineStringDraw.js";
import { activePolygonDraw } from "./Hooks/activePolygonDraw.js";
import { layerCatalog } from "./Hooks/layerCatalog";
import { boxQuery } from "./Hooks/boxQuery.js";

var map;
var source;
var docLayer = new Zondy.Map.Doc("", "webgis", {});
var layer;
var id = ref("none");

const { checkChange, getImgUrl, close, layerMsg, isShowed, defaultProps } =
  layerCatalog("webgis", docLayer);

const { activeQueryDraw, dialogTableVisible, tableData } = boxQuery();

// var { checkChange, layerMsg } = layerCatalog("webgis");
onMounted(() => {
  map = new ol.Map({
    target: "map",
    layers: [gaode, docLayer],
    view: new ol.View({
      projection: "EPSG:4326",
      center: [114.3, 30.5],
      zoom: 4,
    }),
  });
  source = new ol.source.Vector({});
  const layer = new ol.layer.Vector({
    source,
  });
  map.addLayer(layer);
});
</script>

<style lang="scss" scoped>
#map {
  width: 100vw;
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
}
.draw-point {
  width: 100px;
  height: 30px;
  line-height: 30px;
  position: absolute;
  top: 10px;
  left: 50px;
  z-index: 100;
}
.draw-line-string {
  width: 100px;
  height: 30px;
  line-height: 30px;
  position: absolute;
  top: 10px;
  left: 170px;
  z-index: 100;
}
.draw-polygon {
  width: 100px;
  height: 30px;
  line-height: 30px;
  position: absolute;
  top: 10px;
  left: 290px;
  z-index: 100;
}
.draw-query {
  width: 100px;
  height: 30px;
  line-height: 30px;
  position: absolute;
  top: 10px;
  left: 410px;
  z-index: 100;
}
.disabled {
  cursor: not-allowed;
}
::v-deep(.el-dialog__header) {
  background-color: #409eff;
  margin: 0;

  height: 40px;
  line-height: 40px;
  padding: 0;
  span {
    color: #fff;
    font-size: 16px;
    margin-left: 30px;
  }
  .el-dialog__headerbtn{
    height: 40px;
    line-height: 40px;
  }
}
.layer-collapse {
  width: 250px;
  height: auto;
  position: absolute;
  top: 10px;
  right: 30px;
  .close {
    border: none;
    background-color: #409eff;
    position: absolute;
    right: 8px;
    top: 8px;
    color: #fff;
  }
  ::v-deep(.el-collapse-item__header) {
    background-color: #409eff;
    cursor: move;
    padding-left: 20px;
    height: 30px;
    line-height: 30px;
    background-color: #409eff;
    color: #fff;
    font-size: 13px;
    border-radius: 3px 3px 0 0;
    -webkit-box-shadow: 2px 2px 3px 0 #dcdcdc;
    box-shadow: 2px 2px 3px 0 #dcdcdc;
    i {
      margin-right: 30px;
    }
  }
}
</style>