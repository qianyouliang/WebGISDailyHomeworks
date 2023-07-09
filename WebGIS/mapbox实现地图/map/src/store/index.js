import { defineStore } from "pinia";
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css' 
export const useStore = defineStore('main', {
    state: () => {
        return {
            map: null,
        }
    },
    getters: {},
    actions: {
        initMap() {
            mapboxgl.accessToken =
                "pk.eyJ1IjoiY2hlbmdiZW5jaGFvIiwiYSI6ImNsODU3aGRiODA0Y2UzcHBzZmFlcmdqZ2sifQ.8k59W_pB_Riwe6o-MneRlA";
            this.map = new mapboxgl.Map({
                /* 
                        openlayer -target
                        将实例化的地图挂载到对应的DOM元素上
                         */
                container: "map", // container ID
                /* style 相当于openlayer的layers */
                style: "mapbox://styles/mapbox/streets-v12", // style URL
                center: [114.3, 30.5], // starting position [lng, lat]
                zoom: 14, // starting zoom
                projection: "globe",
            });
            this.map.on("style.load", () => {
                /* map.setFog可以设置背景 */
                this.map.setFog({
                    /* 大气层 */
                });
            });
            /* 全屏控件 */
            this.map.addControl(new mapboxgl.FullscreenControl(), 'top-left')
            /* 放大缩小 导航 */
            this.map.addControl(
                new mapboxgl.NavigationControl()
            )
            /* 属性控件 */
            this.map.addControl(
                new mapboxgl.AttributionControl({
                    compact: true,
                    customAttribution: ["中地", "GIS", "mapbox"]
                })
            )
            /* 比例尺控件 */
            this.map.addControl(
                new mapboxgl.ScaleControl({
                })
            )

            /*  鹰眼控件 */
            this.map.addControl(
                new mapboxgl.Minimap({
                   id: 'mapboxgl-minimap',
                   width:'320px',
                   height: '180px',
                   style: 'mapbox://styles/tyy-sj/ck9c4cqa301rg1ipfeaiywr9x',
                   center: [119.23774842192483, 30.52603116857425],
                   zoom: 15,
                   // 应该是一个函数；将被绑定到小地图
                   zoomAdjust: null,
                   zoomLevels: [
                     [18, 11, 15],
                     [16, 10, 12],
                     [14, 8, 11],
                     [12, 6, 8],
                     [10, 4, 6]
                    ],
                   lineColor: '#08F',
                   lineWidth: 1,
                   lineOpacity: 1,
                   fillColor: '#F80',
                   fillOpacity: 0.25,
                   dragPan: false,
                   scrollZoom: false,
                   boxZoom: false,
                   dragRotate: false,
                   keyboard: false,
                   doubleClickZoom: false,
                   touchZoomRotate: false
                  }),
                   'bottom-left'
              )


            /* 获取鼠标位置 */
            this.map.on("mousemove", evt => {
                const { lng, lat } = evt.lngLat
                document.getElementById("mouse-position").innerHTML = `
            经度:${lng.toFixed(2)},纬度:${lat.toFixed(2)}
            `
            })
        },
        convertToImage() {
            this.map.setStyle("mapbox://styles/mapbox/satellite-streets-v12");
        },
        convertToMap() {
            this.map.setStyle("mapbox://styles/mapbox/streets-v12");
        }
    },
    
})