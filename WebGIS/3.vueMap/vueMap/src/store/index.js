import { Map, View } from "ol"; // 地图实例方法、视图方法
import Tile from "ol/layer/Tile"; // 瓦片渲染方法
import XYZ from "ol/source/XYZ"; // XYZ瓦片
import ZoomSlider from 'ol/control/ZoomSlider.js'
import ZoomToExtent from 'ol/control/ZoomToExtent.js'
import MousePosition from 'ol/control/MousePosition.js'
import ScaleLine from 'ol/control/ScaleLine.js'
import OverviewMap from 'ol/control/OverviewMap.js'
import FullScreen from 'ol/control/FullScreen.js'
import { createStringXY } from 'ol/coordinate.js'
import "ol/ol.css"; // 地图样式
import { defineStore } from "pinia"
import { saveAs } from 'file-saver';//文件下载

const useStore = defineStore('main', {
    state: () => {
        return {
            map: null,
        }
    },
    getters: {},
    actions: {
        initMap() {
            this.map = new Map({
                //地图容器div的ID
                target: "map",
                //地图容器中加载的图层
                layers: [
                    //加载瓦片图层数据
                    new Tile({
                        title: "高德地图",
                        source: new XYZ({
                            url: "http://wprd0{1-4}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&style=7&x={x}&y={y}&z={z}",
                            wrapX: false,
                        }),

                    }),
                    new Tile({
                        title: "高德地图",
                        source: new XYZ({
                            url: "http://wprd0{1-4}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&style=6&x={x}&y={y}&z={z}",
                            wrapX: false,
                        }),
                    }),
                ],
                //地图视图设置
                view: new View({
                    //地图初始中心点
                    center: [116, 34],
                    // 坐标系
                    projection: "EPSG:4326",
                    //地图初始显示级别
                    zoom: 4,
                }),
            });
            //缩放栏
            const zoomslider = new ZoomSlider();
            this.map.addControl(zoomslider);

            //书签栏
            const navControl = new ZoomToExtent({
                extent: [
                    100, 30,
                    140, 30
                ]
            })
            this.map.addControl(navControl);


            //坐标显示
            const mousePositionControl = new MousePosition({
                /* 坐标格式 */
                coordinateFormat: createStringXY(4),
                projection: 'EPSG:4326',
                /* 坐标信息显示样式类名,默认是'ol-mouse-position' */
                className: 'custom-mouse-position',
                target: document.getElementById('mouse-position'),
                undefinedHTML: '&nbsp'
            })
            this.map.addControl(mousePositionControl)

            //比例尺
            const scaleLineControl = new ScaleLine({
                /* 设置比例尺单位,degrees,imperial,us,nautical,metric */
                units: 'metric'
            })
            this.map.addControl(scaleLineControl)

            //鹰眼
            const overviewMapControl = new OverviewMap({
                /* 鹰眼控件样式  */
                className: 'ol-overviewmap ol-custom-overviewmap',
                layers: [this.map.getLayers().item(0), this.map.getLayers().item(1)],
                /* 鹰眼控件展开时功能按钮上的标识(网页的JS的字符编码) */
                collapseLabel: '\u00BB',
                /* 鹰眼控件折叠时功能按钮上的标识(网页的JS的字符编码) */
                label: '\u00AB',
                /* 初始为展开显示方式 */
                collapsed: false,
                view: new View({
                    projection: 'EPSG:4326',
                    minZoom: 8,
                    maxZoom: 18
                })
            })
            // this.map.addControl(overviewMapControl)

            //全屏控件
            const fullScreen = new FullScreen();
            this.map.addControl(fullScreen)
        },
        convertToImage() {
            this.map.getLayers().item(0).setVisible(false);
            this.map.getLayers().item(1).setVisible(true);
        },
        convertToMap() {
            this.map.getLayers().item(0).setVisible(true);
            this.map.getLayers().item(1).setVisible(false);
        },
        downloadMap() {
            console.log();
            this.map.once('postcompose', function (event) {
                const canvas = event.context.canvas
                canvas.toBlob(function (blob) {
                    saveAs(blob, 'map.png')
                })
            })
            this.map.renderSync()
        }
    },
})
export { useStore }