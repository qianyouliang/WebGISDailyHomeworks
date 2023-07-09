const mockjs = require("mockjs");
const Random = mockjs.Random;
module.exports = () => {
    //数据模板中的每个属性由 3 部分构成：属性名、生成规则、属性值：
    return mockjs.mock({ //单个数据用大括号表示一个数据对象，多个需要用方括号数组表示，这里的dev|10表示生成10个数据，dev表示数据对象的名称
        "music|300": [
            {
                "id": "@id()",
                'musicName': () => Random.cname(),//随机生成一个常见的中文姓名。使用函数需要调用才能多次生成，避免生成一样的
                "musicSheet|1": ["网易云音乐", "云音乐艺人精选", "云音乐官方歌单","云音乐歌单之友",() => Random.cname()],//数据模板之间不能有空格，否则会报错
                "pic": () => Random.image("140x140", Random.color(), "music"),
                "playbackVolume|1-1000": 1000,
            }
        ],
    })
}