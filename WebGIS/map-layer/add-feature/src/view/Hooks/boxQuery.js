import { createDraw } from "../../libs/createDraw.js";
import { Query } from "../../libs/query.js"
import { ref } from "vue";


export const boxQuery = () => {
    var dialogTableVisible = ref(false)
    var tableData = ref([])
    const querySuccess = (data) => {
        tableData.value = data.SFEleArray;
        dialogTableVisible.value = !dialogTableVisible.value
    }
    const activeQueryDraw = (map, id) => {
        console.log(id);
        if (id == "none") {
            return
        }
        let draw = createDraw({
            type: "Box",
        });
        map.addInteraction(draw);
        /* 监听画笔 */
        draw.on("drawend", evt => handleDraw(map, evt, querySuccess, id))
        $(".draw-query").attr("disabled", true).addClass("disabled")
    }

    const handleDraw = (map, evt, querySuccess, id) => {
        
            console.log(id, typeof id);
            map.getInteractions().pop();
            const geometry = evt.feature.getGeometry();
            const service = {
                name: "webgis",
                layerId: parseInt(id),
            };
            Query.queryByGeom({
                geometry,
                service,
                callback: querySuccess,
            });
            $(".draw-query").attr("disabled", false).removeClass("disabled")

        

    };
    return { activeQueryDraw, dialogTableVisible, tableData };
}
