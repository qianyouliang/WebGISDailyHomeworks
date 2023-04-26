console.log(1);

export let a = 1; //导出变量a，这样与直接导出变量的区别是，导出的变量可以被其他模块修改，而直接导出的变量不可以被其他模块修改
export let x = 11;  //导出变量x

// export {a, x};//将这两个变量导出，供其他模块使用
console.log(a);