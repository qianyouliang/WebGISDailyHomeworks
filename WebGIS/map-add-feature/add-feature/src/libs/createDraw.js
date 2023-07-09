/* Point Circle Polygon LineString  */
/* Square,Box */
/* 
    *@param {string} type 画笔的类型
    *@param {object} source 矢量数据源
*/

export const createDraw = function({
    type,
    source
}) {
    let geometryFunction = null;
    let maxPoints = null;
    if (type === "Square") {
        type = "Circle";
        geometryFunction = ol.interaction.Draw.createRegularPolygon(4)
    }
    if (type == "Box") {
        type = "LineString"
        geometryFunction = function (coordinates, geometry) {
            if (!geometry) {
                //多边形
                geometry = new ol.geom.Polygon(null)
            }
            var start = coordinates[0]
            var end = coordinates[1]
            geometry.setCoordinates([
                [start, [start[0], end[1]], end, [end[0], start[1]], start],
            ])
            return geometry
        };
        maxPoints = 2;
    }
    let draw = new ol.interaction.Draw({
        type,
        source,
        geometryFunction,
        maxPoints
    })
    return draw;

}