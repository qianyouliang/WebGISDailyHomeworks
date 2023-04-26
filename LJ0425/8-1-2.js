console.log("Hello World");

let c = 2;
let x = 22;

function f() {
    return c+x;
}
export {c, x, f};//将这两个变量导出，供其他模块使用
// 如果我们只想导出一个函数，可以这样写
// export default f;//默认导出，只能有一个