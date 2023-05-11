let arr = {a:1,b:2,c:[1,2,3]}
/* 
    实现一个方法，可以拷贝数据
    拷贝一份arr的数据 对于一个基本值，这样做是可以的，但对于一个引用值而言，这样不对，请实现这一功能
*/
function clone(data) {
    if (typeof data !== 'object' || data === null) return data
  
    if (Array.isArray(data)) {
        let _data = []
        data.forEach(element => {
            _data.push(clone(element))
        })
        return _data

    } else {
        let _data = {}
        Object.keys(data).forEach(key => {
            _data[key] = clone(data[key])
        })
        return _data
    }

    
}
let _data = clone(arr) 
console.log(_data);
arr['c'][0] = 2
console.log(_data);
console.log(arr);