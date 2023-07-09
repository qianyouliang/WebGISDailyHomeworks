export const setCanvas = (map) => {
    let size = 50;
    const canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size;
    let radius = size / 4;
    const ctx = canvas.getContext("2d");
    let increase = true;

    function draw() {
        ctx.clearRect(0, 0, size, size);//清空画布
        ctx.beginPath();
        ctx.arc(size / 2, size / 2, radius, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fillStyle = "#59a98c";
        ctx.fill();
        if (radius > 25) {
            increase = false;
        }
        if (radius < 12) {
            increase = true;
        }
        if (increase) {
            radius++;
        } else {
            radius--;
        }
        setTimeout(draw, 20)
        map.render();
    }
    draw();
    return canvas;
}