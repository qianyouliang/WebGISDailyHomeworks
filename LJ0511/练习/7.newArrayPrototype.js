//newArrayPrototype 本身是一个空对象，它的__proto__指向Array.prototype，这样就可以访问到Array.prototype上的方法
/* const newArrayPrototype = {} */
const oldArrayPrototype = Array.prototype;//原生数组的原型对象
newArrayPrototype.__proto__ = oldArrayPrototype;
const newArrayPrototype = Object.create(oldArrayPrototype);
console.log(newArrayPrototype);

let arrayLists = ['push', 'pop', 'shift', 'unshift', 'reverse', 'sort', 'splice'];
arrayLists.forEach(method => {
    newArrayPrototype[method] = function (...rest) {//将数组的方法
        //所有数组新增的属性需要触发视图更新
        //重写数组方法：1.实现原来数组的功能 2.额外实现更新逻辑
        const res = oldArrayPrototype[method].call(this, ...rest);//实现数组原来的功能
        //需要对新增的足迹方法(push,unshift,splice)追加进来的数据进行观测
        //push和unshift都是追加，追加的内容可能是对象类型，应该继续进行劫持
        //splice(0,1,xxx)第三个参数才是新增的内容
        let inserted;//当前插入的元素
        switch (method) {
            case 'push':
            case 'unshift':
                inserted = rest;
                break;
            case 'splice':
                inserted = rest.slice(2);
                break;
            default:
                break;
        }
        if(inserted){
            observeArray(inserted);

        }
        console.log('视图更新了');
        return res;
    }
})

/* newArrayPrototype.push = function (value) {
    //1.原来的push仍然有效
    //2.通知视图更新
} */
export default newArrayPrototype;


/* 

    这里解释一下，其重写原理
    这里的newArrayPrototype是一个空对象，它的__proto__指向Array.prototype，这样就可以访问到Array.prototype上的方法
    oldArrayPrototype是Array.prototype，是原生数组的原型对象，也就是说它可以使用数组的所有方法，这里指定oldArrayPrototype为
    newArrayPrototype的原型对象,使得newArrayPrototype可以使用数组的所有方法，这里的arrayLists是数组的所有方法，这里使用forEach来遍历这些方法名，
    重写这些方法，新方法的实现是：1.实现原来数组的功能 2.额外实现更新逻辑，oldArrayPrototype[method].call(this, ...rest);就是实现数组原来的功能，


*/