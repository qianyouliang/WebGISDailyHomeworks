import { Polygon } from "../../libs/Polygon.js";
import { createDraw } from "../../libs/createDraw.js";

export const activePolygonDraw = (map, source, docLayer) => {
    let draw = createDraw({
        type: "Polygon", source
    });
    map.addInteraction(draw);
    /* 监听画笔 */
    draw.on("drawend", evt => handleDraw(evt, map, docLayer))
    $("#draw-polygon").attr("disabled", true).addClass("disabled")

}

function handleDraw(evt, map, docLayer) {
    map.getInteractions().pop();
    const position = evt.feature.getGeometry().getCoordinates()[0];
    const attr = [];
    const service = {
        name: "webgis",
        layerId: 2,
    };

    Polygon.add({
        position,
        attr,
        service,
        docLayer,
    });
    $("#draw-polygon").attr("disabled", false).removeClass("disabled")

};

