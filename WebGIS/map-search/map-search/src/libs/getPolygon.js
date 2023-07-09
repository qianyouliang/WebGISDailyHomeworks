import axios from "axios";


export const getPolygon = async (map, $city) => {
    var url = `https://restapi.amap.com/v3/geocode/geo?address=${$city}&key=f84a737ff36c1dfc31d601765df5cced`;

    const res = await axios.get(url);
    // 设置中心点- 加载geojson
    const { adcode, location } = res.data.geocodes[0];
    /* [[114,30],[115,30]] */
    /* parseFloat */
    var positions = location.split(",");
    var midpoint = turf.point(positions);
    let center = midpoint.geometry.coordinates;
    if (center) {
        map.getView().animate({
            center,
            zoom: 9,
            duration: 2000,
        });
    }
    var source = new ol.source.Vector({});
    var features = new ol.format.GeoJSON().readFeatures(midpoint);

    // 在 var style = new ol.style.Style({ ... }) 中定义样式
    var pointStyle = new ol.style.Style({
        // 形状
        image: new ol.style.Circle({
            radius: 10, // 圆的半径
            fill: new ol.style.Fill({
                color: "yellow", // 填充颜色
            }),
            stroke: new ol.style.Stroke({
                color: "black", // 描边颜色
                width: 2, // 描边宽度
            }),
        }),
    });
    var areaStyle = new ol.style.Style({
        // 形状
        fill: new ol.style.Fill({
            color: "rgba(100, 100, 100, 0.1)",
        }),
        /* 描边 */
        stroke: new ol.style.Stroke({
            color: "black",
            width: 1,
        }),
    });
    var highLightStyle = new ol.style.Style({
        // 高亮时的填充颜色
        fill: new ol.style.Fill({
            color: 'rgba(5, 0, 200, 0.6)',
        }),
        // 高亮时的边框样式
        stroke: new ol.style.Stroke({
            color: 'yellow',
            width: 1,
        }),
    });
    features.forEach((feature) => {
        feature.setStyle(pointStyle);
    });
    source.addFeatures(features);
    var layer = new ol.layer.Vector({
        source,
        zIndex: 100,
    });
    var geojson_url;//在 try 块内定义的 geojson_url 变量在 try 块外部是不可访问的。为了解决这个问题，可以在 try 块外部提前声明 geojson_url 变量，并在 try 块内赋值
    setTimeout(async () => {
        map.addLayer(layer);

        /* 加载区域数据实现 */

        await axios.get(`https://geo.datav.aliyun.com/areas_v2/bound/${adcode}_full.json`)
            .then((res) => {
                geojson_url = `https://geo.datav.aliyun.com/areas_v3/bound/${adcode}_full.json`;
                console.log(res.data);

            }
            ).catch(() => {
                geojson_url = `https://geo.datav.aliyun.com/areas_v3/bound/${adcode}.json`;
            })


        var areaSource = new ol.source.Vector({
            format: new ol.format.GeoJSON(),
            url: geojson_url,
        });
        var areaLayer = new ol.layer.Vector({
            source: areaSource,
            style: areaStyle,
        });
        map.addLayer(areaLayer);
        //为map添加鼠标移动事件监听,当鼠标移动到元素上的时候会显示手型
        map.on("pointermove", function (e) {
            var pixel = map.getEventPixel(e.originalEvent);
            var hit = map.hasFeatureAtPixel(pixel);
            map.getTargetElement().style.cursor = hit ? "pointer" : "";
        });

        var popup = document.querySelector("#popup");
        /* 点击元素，获取坐标 */
        map.on("pointermove", function (e) {
            // 获取当前点击的点是否存在要素, 并返回
            const feature = map.forEachFeatureAtPixel(
                //
                e.pixel,
                function (feature, layer) {
                    if (feature.getGeometry() instanceof ol.geom.Polygon || feature.getGeometry() instanceof ol.geom.MultiPolygon) {
                        return feature;
                    }
                }
            );

            if (feature) {
                // 移除之前高亮的要素样式
                var highlightedFeatures = areaSource.getFeatures();
                highlightedFeatures.forEach(function (highlightedFeature) {
                    highlightedFeature.setStyle(areaStyle);
                });
                feature.setStyle(highLightStyle);
                var position = feature.getGeometry().flatCoordinates;
                // popup.setPosition(position)
                var pixel = map.getPixelFromCoordinate(position); //获取要素在以屏幕左上角为起点的页面像素坐标
                popup.style.visibility = "visible";
                popup.style.left = pixel[0] + "px";
                popup.style.top = pixel[1] + "px";
                popup.innerHTML = `<div id="popup-content">
            
            <p>adcode:&nbsp;&nbsp;${feature.get("adcode")}</p>
            <p>name:&nbsp;&nbsp;${feature.get("name")}</p>
            <p>level:&nbsp;&nbsp;${feature.get("level")}</p>
            </div>`;

                $("#close-popup").click(function () {
                    popup.style.visibility = "hidden";
                });
            } else {
                // 移除之前高亮的要素样式
                var highlightedFeatures = areaSource.getFeatures();
                highlightedFeatures.forEach(function (highlightedFeature) {
                    highlightedFeature.setStyle(areaStyle);
                });
                popup.style.visibility = "hidden";
            }

        });



    }, 2000);



}