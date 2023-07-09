export class Point {
  static add({
    position,
    attr,
    service,
    docLayer
  }) {
    /* 构建要素的几何信息  geometry */
    var gpoint = new Zondy.Object.GPoint(position[0], position[1]);
    //设置当前点要素的几何信息
    var fGeom = new Zondy.Object.FeatureGeometry({ PntGeom: [gpoint] });
    /* 构建样式信息  style */
    var pointInfo = new Zondy.Object.CPointInfo({
      Angle: 0,
      Color: 11, //子图颜色
      Space: 0,
      SymHeight: 12,//高度
      SymWidth: 12,//宽度
      SymID: 30 //子图号

    });
    //设置当前点要素的图形参数信息
    var webGraphicInfo = new Zondy.Object.WebGraphicsInfo({
      /* 1 Point 2 LineString 3Area */
      InfoType: 1,
      PntInfo: pointInfo
    });
    /* 属性信息 */
    var attValue = attr.map(item => item.value);
    //创建一个要素
    var feature = new Zondy.Object.Feature({
      /* geometry */
      fGeom: fGeom,
      /* setStyle */
      GraphicInfo: webGraphicInfo,
      /* values */
      AttValue: attValue
    });
    //设置要素为点要素
    feature.setFType(1);
    /* 2、构建要素集  new ol.source.Vector()*/
    var featureSet = new Zondy.Object.FeatureSet();
    //设置属性结构
    var cAttStruct = new Zondy.Object.CAttStruct({
      FldName: attr.map(item => item.name),
      FldNumber: 0,
      FldType: attr.map(item => item.type)
    });
    featureSet.AttStruct = cAttStruct;
    //添加要素到要素数据集
    featureSet.addFeature(feature);
    /* 3、调用服务 */
    var editService = new Zondy.Service.EditDocFeature(service.name, service.layerId, {

    });
    //执行添加点要素功能
    editService.add(featureSet, this.onPntSuccess(docLayer));
  }

  static onPntSuccess(docLayer) {
    return function (data) {
      if (data.succeed) {
        alert("添加点要素成功！");
        docLayer.refresh();
      } else {
        alert("添加点要素失败！");
      }
    }
  }
}