<template></template>

<script setup>
import { inject, onMounted } from "vue";
var $map = null;
onMounted(() => {
  $map = inject("$map");
  //缩放栏
  const zoomSlider = new ol.control.ZoomSlider();
  $map.addControl(zoomSlider);

  //书签栏
  const navControl = new ol.control.ZoomToExtent({
    extent: [100, 30, 140, 30],
  });
  $map.addControl(navControl);

  //坐标显示
  const mousePositionControl = new ol.control.MousePosition({
    /* 坐标格式 */
    coordinateFormat: new ol.coordinate.createStringXY(4),
    projection: "EPSG:4326",
    /* 坐标信息显示样式类名,默认是'ol-mouse-position' */
    className: "custom-mouse-position",
    target: document.getElementById("mouse-position"),
    undefinedHTML: "&nbsp",
  });
  $map.addControl(mousePositionControl);

  //比例尺
  const scaleLineControl = new ol.control.ScaleLine({
    /* 设置比例尺单位,degrees,imperial,us,nautical,metric */
    units: "metric",
  });
  $map.addControl(scaleLineControl);

  //鹰眼
  const overviewMapControl = new ol.control.OverviewMap({
    /* 鹰眼控件样式  */
    className: "ol-overviewmap ol-custom-overviewmap",
    layers: [$map.getLayers().item(0), $map.getLayers().item(1)],
    /* 鹰眼控件展开时功能按钮上的标识(网页的JS的字符编码) */
    collapseLabel: "\u00BB",
    /* 鹰眼控件折叠时功能按钮上的标识(网页的JS的字符编码) */
    label: "\u00AB",
    /* 初始为展开显示方式 */
    collapsed: false,
    view: new ol.View({
      projection: "EPSG:4326",
      minZoom: 5,
      maxZoom: 18,
    }),
  });
  $map.addControl(overviewMapControl);

  //全屏控件
  const fullScreen = new ol.control.FullScreen();
  $map.addControl(fullScreen);
});
</script>

<style lang="scss" scoped>
</style>