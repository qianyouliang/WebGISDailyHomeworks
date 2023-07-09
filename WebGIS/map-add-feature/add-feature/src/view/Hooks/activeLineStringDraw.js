import { LineString } from "../../libs/LineString.js";
import { createDraw } from "../../libs/createDraw.js";

export const activeLineStringDraw = (map, source, docLayer) => {
    let draw = createDraw({
        type: "LineString", source
    });
    map.addInteraction(draw);
    /* 监听画笔 */
    draw.on("drawend", evt => handleDraw(evt, map, docLayer))
    $("#draw-line-string").attr("disabled", true).addClass("disabled")

}

function handleDraw(evt, map, docLayer) {
    map.getInteractions().pop();
    const position = evt.feature.getGeometry().getCoordinates();
    const attr = [];
    const service = {
        name: "webgis",
        layerId: 1,
    };

    LineString.add({
        position,
        attr,
        service,
        docLayer,
    });
    $("#draw-line-string").attr("disabled", false).removeClass("disabled")

};


