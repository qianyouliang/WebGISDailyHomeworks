/**
 * @param {Array} position  [[114,30],[115,50]]
 *@param {Array} attr [
    {name:"name",type:"string",value:"武汉"},
    {name:"id",type:"string",value:'1001'}
]
*@param {object} service {name:"xxx",layerId:}
 */
const regionStyle = {
    EndColor: 1,
    FillColor: Math.floor(Math.random() * 1502 + 1),
    FillMode: 0,
    OutPenWidth: 1,
    OverMethod: 0,
    PatAngle: 1,
    PatColor: 1,
    PatHeight: 1,
    PatID: 27,
    PatWidth: 1
}
export class Polygon {
    static add({
        position,
        attr,
        service,
        docLayer
    }) {
        /* 构建坐标集合 */
        var pointObj = position.map(item => {
            return new Zondy.Object.Point2D(item[0], item[1])
        });
        var gArc = new Zondy.Object.Arc(pointObj);
        //构成区要素折线
        var gAnyLine = new Zondy.Object.AnyLine([gArc]);
        //构成区要素
        var gRegion = new Zondy.Object.GRegion([gAnyLine]);
        //构成区要素的几何信息
        var fGeom = new Zondy.Object.FeatureGeometry({ RegGeom: [gRegion] });
        //设置区要素的图形参数信息
        var cRegionInfo = new Zondy.Object.CRegionInfo(regionStyle);
        //要素图形参数信息
        var graphicInfo = new Zondy.Object.WebGraphicsInfo({ InfoType: 3, RegInfo: cRegionInfo });

        //设置区要素的属性信息
        var attValue = attr.map(item => item.value);
        //创建一个新的区要素
        var feature = new Zondy.Object.Feature({
            AttValue: attValue,
            fGeom: fGeom,
            GraphicInfo: graphicInfo
        });

        feature.setFType(3);

        //创建一个要素数据集
        var featureSet = new Zondy.Object.FeatureSet();
        // var fldNumber = 6;
        // var fldType = [];
        // var fldName = [];
        // var cAttValue = new Zondy.Object.CAttStruct({ FldNumber: fldNumber, FldType: fldType, FldName: fldName });
        // featureSet.AttStruct = cAttValue;
        featureSet.addFeature(feature);

        /* 3、调用编辑要素服务 */
        var editServiceFeature = new Zondy.Service.EditDocFeature(service.name, service.layerId, {});
        editServiceFeature.add(featureSet, this.onPloySuccess(docLayer));
    }
    //添加区要素回调函数
    static onPloySuccess(docLayer) {
        return function (data) {
            if (data.succeed) {
                alert("添加区要素成功！");
                docLayer.refresh();
            } else {
                alert("添加区要素失败！");
            }
        }

    }

}