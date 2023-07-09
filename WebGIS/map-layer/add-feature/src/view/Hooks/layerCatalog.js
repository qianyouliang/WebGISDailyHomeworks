import { ref, onMounted } from "vue";
import pointImg from "../../assets/point.png";
import lineStringImg from "../../assets/lineString.png";
import polygonImg from "../../assets/polygon.png";

var layerMsg = ref([]);
var isShowed = ref("block");

export const layerCatalog = (serviceName, docLayer) => {
    const defaultProps = {
        children: "children",
        label: "label",
        id: "id",
    };

    onMounted(() => {
        var docCatoLog = new Zondy.Catalog.MapDoc({
            docName: serviceName
        });
        var child = [];
        docCatoLog.getLayersInfo(data => {
            /* type,name,id */
            data.value.forEach(item => {
                let { Name, LayerIndex } = item;
                child.push({
                    id: parseInt(LayerIndex),
                    label: Name,
                })
            })
            layerMsg.value = [
                {
                    id: 100,
                    label: "地图文档",
                    children: [
                        {
                            id: 10,
                            label: "新地图1",
                            children: child
                        },
                    ],
                },
            ];
        })

    })
    const checkChange = (node, checked) => {
        docLayer.setLayerStatus(node.id, checked ? "include" : "exclude");
    };
    const getImgUrl = (label) => {
        let url = "";
        switch (label) {
            case "city": {
                url = pointImg;
                break;
            }
            case "road": {
                url = lineStringImg;
                break;
            }
            case "polygon": {
                url = polygonImg;
                break;
            }
            default:
                break;
        }
        return url;
    };

    const close = () => {
        isShowed.value = "none";
    };

    return { checkChange, getImgUrl, close, layerMsg, isShowed }
}


