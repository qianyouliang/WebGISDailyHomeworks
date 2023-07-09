/**
 * @param {Array} position  [[114,30],[115,50]]
 *@param {Array} attr [
    {name:"name",type:"string",value:"武汉"},
    {name:"id",type:"string",value:'1001'}
]
*@param {object} service {name:"xxx",layerId:}
 */
const LINE_STYLE = {
    "Color": 17,//线颜色
    /* 符号的编号  22-0 */
    "LinStyleID": 0,
    "LinStyleID2": 22,
    "LinWidth": 0.05, //线宽
    "Xscale": 10,
    "Yscale": 10
}
export class LineString {
    static add({
        position,
        attr,
        service,
        docLayer
    }) {
        /* 构建坐标集合 */
        var pointObj = position.map(item => {
            return new Zondy.Object.Point2D(item[0], item[1])
        })
        //构成折线的弧段
        var gArc = new Zondy.Object.Arc(pointObj);
        //构成线的折线
        var gAnyLine = new Zondy.Object.AnyLine([gArc]);
        //设置线要素的几何信息
        var gline = new Zondy.Object.GLine(gAnyLine);
        //设置要素的几何信息
        var fGeom = new Zondy.Object.FeatureGeometry({ LinGeom: [gline] });
        /* 1-2  style */
        var clineInfo = new Zondy.Object.CLineInfo(LINE_STYLE);
        //设置要素的图形参数信息
        var graphicInfo = new Zondy.Object.WebGraphicsInfo({
            InfoType: 2,
            LinInfo: clineInfo
        });
        /* 1-3、属性信息 */
        var attValue = attr.map(item => item.value);
        //创建一个线要素
        var newFeature = new Zondy.Object.Feature({
            fGeom: fGeom,
            GraphicInfo: graphicInfo,
            AttValue: attValue
        });
        //设置要素为线要素
        newFeature.setFType(2);
        /* 2、创建要素集添加要素 */
        var featureSet = new Zondy.Object.FeatureSet();
        var fldNumber = attr.length; //属性个数
        var fldName = attr.map(item => item.name);
        var fldType = attr.map(item => item.type);
        //创建属性结构设置对象
        var cAttStruct = new Zondy.Object.CAttStruct({
            FldName: fldName,
            FldNumber: fldNumber,
            FldType: fldType
        });
        //设置要素数据集的树形结构
        featureSet.AttStruct = cAttStruct;
        //将添加的线要素添加到属性数据集中
        featureSet.addFeature(newFeature);
        /* 3、调用编辑要素服务 */
        var editDocFeature = new Zondy.Service.EditDocFeature(service.name, service.layerId, {

        });
        editDocFeature.add(featureSet, this.onLineSuccess(docLayer));
    }
    static onLineSuccess(docLayer) {
        return function (data) {
            if (data.succeed) {
                alert("添加线要素成功！");
                docLayer.refresh();
            } else {
                alert("添加线要素失败！");
            }
        }
    }
}