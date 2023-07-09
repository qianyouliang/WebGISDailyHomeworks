export const setCanvasStyle = function (map) {
    let size = 40;
    const canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size;
    let radius = size / 4;
    const ctx = canvas.getContext("2d");
    let increase = true;
    /* 设置路径 */
    /* 
    25~50
    大于  50 false  --
    小于  25  true  ++
     */
    function draw() {
        ctx.clearRect(0, 0, size, size) //清空画布
        ctx.beginPath();
        ctx.arc(size / 2, size / 2, radius, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fillStyle = "#5995F0";
        ctx.fill();
        if (radius > 15) {
            increase = false
        }
        if (radius < 12) {
            increase = true;
        }
        if (increase) {
            radius++;
        } else {
            radius--
        }
        setTimeout(draw, 100)
        map.render() //让地图重新渲染
    }
    draw();
    var style = new ol.style.Style({
        image: new ol.style.Icon({
            img: canvas,
            imgSize: [canvas.width, canvas.height]
        })
    });
    return style;
}