<template>
  <div id="popup">
    <div id="popup-content">
      <div id="close-popup">X</div>
      <p>adcode:{{ adcode }}</p>
      <p>name:{{ name }}</p>
      <p>leval:{{ leval }}</p>
    </div>
  </div>
  <div class="draw-selector">
    <select
      name="draw"
      id="draw-selector"
      v-model="featureName"
      @change="selectDraw(featureName)"
    >
      <option value="none">无</option>
      <option value="Point">点</option>
      <option value="LineString">线</option>
      <option value="Polygon">多边形</option>
      <option value="Circle">圆</option>
      <option value="Square">正方形</option>
      <option value="Box">矩形</option>
    </select>
  </div>
  <button @click="removeFeature" class="remove-feature">清除要素</button>
  <button @click="loadLayer" class="load-layer">加载图层</button>
</template>

<script setup>
import { ref, onMounted, inject, computed } from "vue";
import { createDraw } from "../libs/createDraw";
let featureName = "none";
var $map = ref("");
var source = ref("");
var layer = ref("");
var adcode = ref("");
var name = ref("");
var leval = ref("");
let draw;
const selectDraw = (value) => {
  if (value !== "none") {
    const interactions = $map.value.getInteractions();
    interactions.clear(); //清除所有交互事件
    draw = createDraw({ type: value, source: source.value }); //定义画笔
    $map.value.addInteraction(draw); //添加画笔
  } else {
    const interactions = $map.value.getInteractions();
    interactions.clear(); //清除所有交互事件
    const mouseWheelZoomInteraction = new ol.interaction.MouseWheelZoom(); //定义视图缩放交互事件
    const dragPanInteraction = new ol.interaction.DragPan(); //定义视图拖拽事件
    $map.value.addInteraction(mouseWheelZoomInteraction); //添加视图缩放交互事件
    $map.value.addInteraction(dragPanInteraction); //添加视图拖拽事件
  }
};
//设置高亮样式
var highlightStyle = new ol.style.Style({
  stroke: new ol.style.Stroke({
    color: "red",
    width: 2,
  }),
  fill: new ol.style.Fill({
    color: "red",
  }),
});

onMounted(() => {
  $map.value = inject("$map");
  source.value = new ol.source.Vector({});
  layer.value = new ol.layer.Vector({
    source: source.value,
  });
  $map.value.addLayer(layer.value);
});
const removeFeature = () => {
  source.value.clear();
};

const loadLayer = () => {
  var networkSource = new ol.source.Vector({
    format: new ol.format.GeoJSON(),
    url: "https://geo.datav.aliyun.com/areas_v3/bound/420000_full.json",
  });
  // 创建一个选择器，用于记录当前被选中的要素
  var select = new ol.interaction.Select();

  // 监听选择器的 select 事件，当要素被选中时，设置要素的高亮样式
  select.on("select", function (event) {
    var selectedFeatures = event.target.getFeatures();

    // 移除之前高亮的要素的样式
    networkSource.getFeatures().forEach(function (feature) {
      feature.setStyle(null);
    });

    // 设置选中要素的高亮样式
    selectedFeatures.forEach(function (feature) {
      feature.setStyle(highlightStyle);
    });
  });

  // 将选择器添加到地图中
  $map.value.addInteraction(select);
  // 监听地图的 singleclick 事件，当鼠标点击时，判断是否点击到了要素，如果是，则触发要素的 select 事件
  $map.value.on("singleclick", function (event) {
    $map.value.forEachFeatureAtPixel(event.pixel, function (feature) {
      adcode.value = feature.values_.adcode;
      name.value = feature.values_.name;
      leval.value = feature.values_.level;
      select.getFeatures().clear();
      select.getFeatures().push(feature);
    });
  });
  
  //添加popup事件
  //为map添加鼠标移动事件监听,当鼠标移动到元素上的时候会显示手型
  $map.value.on("pointermove", function (e) {
    var pixel = $map.value.getEventPixel(e.originalEvent);
    var hit = $map.value.hasFeatureAtPixel(pixel);
    $map.value.getTargetElement().style.cursor = hit ? "pointer" : "";
  });

  var popup = document.querySelector("#popup");
  /* 点击元素，获取坐标 */
  $map.value.on("click", function (e) {
    // 获取当前点击的点是否存在要素, 并返回
    const feature = $map.value.forEachFeatureAtPixel(
      //
      e.pixel,
      function (feature, layer) {
        return feature;
      }
    );
    if (feature) {
      var position = feature.getGeometry().flatCoordinates;
      // popup.setPosition(position)
      var pixel = $map.value.getPixelFromCoordinate(position); //获取要素在以屏幕左上角为起点的页面像素坐标
      popup.style.visibility = "visible";
      popup.style.left = pixel[0] + "px";
      popup.style.top = pixel[1] + "px";
    }
  });
  $("#close-popup").click(function () {
    popup.style.visibility = "hidden";
  });
  layer.value.setSource(networkSource);
};
</script>

<style lang="scss" scoped>
.draw-selector {
  position: absolute;
  top: 10px;
  left: 50px;
  z-index: 100;
  #draw-selector {
    width: 100px;
    height: 30px;
    border: none;
    background-color: rgba(255, 255, 255, 0.582);
    border-radius: 5px;
  }
}
.remove-feature {
  position: absolute;
  top: 0;
  right: 280px;
  width: 100px;
  height: 35px;
  border-radius: 5px;
  background-color: rgb(62, 117, 161);
  color: white;
  margin-top: 5px;
  margin-right: 10px;
  border: 3px solid rgba(255, 255, 255, 0.178);
}
.load-layer {
  position: absolute;
  top: 0;
  right: 390px;
  width: 100px;
  height: 35px;
  border-radius: 5px;
  background-color: rgb(62, 117, 161);
  color: white;
  margin-top: 5px;
  margin-right: 10px;
  border: 3px solid rgba(255, 255, 255, 0.178);
}
#popup {
  position: fixed;
  z-index: 10;
  left: 100px;
  top: 100px;
  width: 200px;
  height: auto;
  border: 1px solid black;
  background-color: white;
  border-radius: 10px;
  box-shadow: 4px 4px 8px black;
  visibility: hidden;
}
#popup-content p {
  font-size: 14px;
  font-family: "微软雅黑";
  text-align: left;
  margin: 20px 0 20px 20px;
  position: relative;
}
#close-popup {
  text-decoration: none;
  position: absolute;
  top: 2px;
  right: 5px;
  cursor: pointer;
}
</style>