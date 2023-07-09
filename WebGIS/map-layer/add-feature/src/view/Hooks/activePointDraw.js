import { Point } from "../../libs/Point.js";
import { createDraw } from "../../libs/createDraw.js";

export const activePointDraw = (map, docLayer) => {
    let draw = createDraw({
        type: "Point"
    });
    map.addInteraction(draw);
    /* 监听画笔 */
    draw.on("drawend", evt => handleDraw(map, evt, docLayer))
    $(".draw-point").attr("disabled", true).addClass("disabled")

}

function handleDraw(map, evt, docLayer) {
    map.getInteractions().pop();
    const position = evt.feature.getGeometry().getCoordinates();
    const attr = [];
    const service = {
        name: "webgis",
        layerId: 0,
    };

    Point.add({
        position,
        attr,
        service,
        docLayer,
    });
    $(".draw-point").attr("disabled", false).removeClass("disabled")

};

