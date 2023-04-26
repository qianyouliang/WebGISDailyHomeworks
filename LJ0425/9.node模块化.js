//这个文件是项目的入口文件 在nodejs中使用require()函数引入其他模块

//引入其他模块
//这里存放的是路径而非文件名
console.log(require('./9.node模块化-1.js'));//{ a: 1, b: 2 }
//可以通过解构来获取其中的值
let { a, b } = require('./9.node模块化-1.js');
console.log(a, b);//1 2