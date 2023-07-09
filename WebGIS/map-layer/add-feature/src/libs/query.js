/**
 * @param {object} feature.getGeometry()
 */
export class Query {
    /* 通过要素的几何信息 */
    static queryByGeom({
        geometry,
        service,
        callback
    }) {
        var queryStruct = new Zondy.Service.QueryFeatureStruct();
        //是否包含几何图形信息
        queryStruct.IncludeGeometry = true;
        //是否包含属性信息
        queryStruct.IncludeAttribute = true;
        //是否包含图形显示参数
        queryStruct.IncludeWebGraphic = false;
        //2、创建一个用于查询的区
        var geomObj = new Zondy.Object.Polygon();
        geomObj.setByOL(geometry);
        //指定查询规则
        var rule = new Zondy.Service.QueryFeatureRule({
            //是否将要素的可见性计算在内
            EnableDisplayCondition: false,
            //是否完全包含
            MustInside: false,
            //是否仅比较要素的外包矩形
            CompareRectOnly: false,
            //是否相交
            Intersect: true
        });
        //实例化查询参数对象
        var queryParam = new Zondy.Service.QueryParameter({
            geometry: geomObj,
            resultFormat: "json",
            struct: queryStruct,
            rule: rule
        });
        //设置查询分页号
        queryParam.pageIndex = 0;
        //设置查询要素数目
        queryParam.recordNumber = 10000;
        //实例化地图文档查询服务对象
        var queryService = new Zondy.Service.QueryDocFeature(queryParam, service.name, service.layerId, {

        });
        //执行查询操作，querySuccess为查询回调函数
        queryService.query(callback);
    }
}