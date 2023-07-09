const mockjs = require("mockjs");
const Random = mockjs.Random;
module.exports = () => {
    //数据模板中的每个属性由 3 部分构成：属性名、生成规则、属性值：
    return mockjs.mock({ //单个数据用大括号表示一个数据对象，多个需要用方括号数组表示，这里的dev|10表示生成10个数据，dev表示数据对象的名称
        "user|10": [
            {
                "id": "@id()",
                'username': () => Random.cname(),//随机生成一个常见的中文姓名。使用函数需要调用才能多次生成，避免生成一样的
                "password": /^\d{6}$/,
                "type|1": ["common", "admin", "traffic"],//数据模板之间不能有空格，否则会报错
                "time": () => Random.datetime(),
                "pic": () => Random.image("200x200", Random.color(), "image"),
                "isOnline|1-2": true,

            }
        ],
        "admin|3": [
            {
                "id": "@id()",
                "info": "中国人的第一款前端框架",
                "age": 8,
                "name": () => Random.cname()
            }
        ]
    })
}