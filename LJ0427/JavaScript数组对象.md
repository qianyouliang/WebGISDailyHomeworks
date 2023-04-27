#### 基本介绍
| 方法名 | 描述 |
| ------ | ----------- |
| Concat () | 连接两个或更多的数组，并返回结果。 |
| CopyWithin () | 从数组的指定位置拷贝元素到数组的另一个指定位置中。 |
| Entries () | 返回数组的可迭代对象。 |
| Every () | 检测数值元素的每个元素是否都符合条件。 |
| Fill () | 使用一个固定值来填充数组。 |
| Filter () | 检测数值元素，并返回符合条件所有元素的数组。 |
| Find () | 返回符合传入测试（函数）条件的数组元素。 |
| FindIndex () | 返回符合传入测试（函数）条件的数组元素索引。 |
| ForEach () | 数组每个元素都执行一次回调函数。 |
| From () | 通过给定的对象中创建一个数组。 |
| Includes () | 判断一个数组是否包含一个指定的值。 |
| IndexOf () | 搜索数组中的元素，并返回它所在的位置。 |
| IsArray () | 判断对象是否为数组。 |
| Join () | 把数组的所有元素放入一个字符串。 |
| Keys () | 返回数组的可迭代对象，包含原始数组的键 (key)。 |
| LastIndexOf () | 搜索数组中的元素，并返回它最后出现的位置。 |
| Map () | 通过指定函数处理数组的每个元素，并返回处理后的数组。 |
| Pop () | 删除数组的最后一个元素并返回删除的元素。 |
| Push () | 向数组的末尾添加一个或更多元素，并返回新的长度。 |
| Reduce () | 将数组元素计算为一个值（从左到右）。 |
| ReduceRight () | 将数组元素计算为一个值（从右到左）。 |
| Reverse () | 反转数组的元素顺序。 |
| Shift () | 删除并返回数组的第一个元素。 |
| Slice () | 选取数组的一部分，并返回一个新数组。 |
| Some () | 检测数组元素中是否有元素符合指定条件。 |
| Sort () | 对数组的元素进行排序。 |
| Splice () | 从数组中添加或删除元素。 |
| ToString () | 把数组转换为字符串，并返回结果。 |
| Unshift () | 向数组的开头添加一个或更多元素，并返回新的长度。 |
| ValueOf () | 返回数组对象的原始值。 |
| Array.Of () | 将一组值转换为数组。 |
| Array.At () | 用于接收一个整数值并返回该索引对应的元素，允许正数和负数。负整数从数组中的最后一个元素开始倒数。 |
| Array.Flat () | 创建一个新数组，这个新数组由原数组中的每个元素都调用一次提供的函数后的返回值组成。 |
| Array.FlatMap () | 使用映射函数映射每个元素，然后将结果压缩成一个新数组。 |

#### 应用案例：
* 1.**Concat ()** 连接两个或更多的数组，并返回结果
```Js
const arr1 = ['apple', 'banana']; 
const arr2 = ['orange', 'pear']; 
const arr3 = arr1.concat(arr2); 
console.log(arr3); // ['apple', 'banana', 'orange', 'pear'] 
```
* 2.**CopyWithin()** 从数组的指定位置拷贝元素到数组的另一个指定位置中。 
```JS
const arr = [1, 2, 3, 4, 5];

// 从下标2开始复制到下标0的位置
arr.copyWithin(0, 2, 3);

console.log(arr); // [3, 2, 3, 4, 5]

```
* 3.**Entries()**  返回数组的可迭代对象。 
```Js
const arr = ['apple', 'banana', 'orange'];

const iterator = arr.entries();

for (const [index, value] of iterator) {
  console.log(index, value);
}

// 0 'apple'
// 1 'banana'
// 2 'orange'

```
* 4.**Every()** 检测数值元素的每个元素是否都符合条件。
```js
const arr = [1, 2, 3, 4, 5];

const isPositive = (num) => num > 0;

console.log(arr.every(isPositive)); // true

const hasEvenNumber = (num) => num % 2 === 0;

console.log(arr.every(hasEvenNumber)); // false

```
* 5.**Fill()** 使用一个固定值来填充数组。 
```js
const arr = [1, 2, 3, 4, 5];

// 用0填充数组
arr.fill(0);

console.log(arr); // [0, 0, 0, 0, 0]

```
* 6.**Filter()** 检测数值元素，并返回符合条件所有元素的数组.
```js
const arr = [1, 2, 3, 4, 5];

const filteredArr = arr.filter(num => num % 2 === 0);

console.log(filteredArr); // [2, 4]

```
* 7.**Find()** 返回符合传入测试（函数）条件的数组元素。
```js
const arr = [1, 2, 3, 4, 5];

const found = arr.find(num => num > 3);//这里的函数是箭头函数，也可以另行定义函数，返回函数只返回第一个符合条件的值，不会返回所有值

console.log(found); // 4
```
* 8.**FindIndex()** 返回符合传入测试（函数）条件的数组元素索引。
```js
const arr = [1, 2, 3, 4, 5];

const foundIndex = arr.findIndex(num => num > 3);

console.log(foundIndex); // 3
```
* 8.**ForEach()** 数组每个元素都执行一次回调函数。
```js
const arr = ['apple', 'banana', 'orange'];

arr.forEach((item, index) => {
  console.log(`[${index}]: ${item}`);
});

// [0]: apple
// [1]: banana
// [2]: orange
```
* 9.**From ()**  方法通过给定的对象创建一个数组。如果对象是数组，则将其转换为数组，否则，将对象的迭代器对象作为参数，从中生成一个新的数组实例。
```js
// 将字符串转换为数组
const str = 'hello';
const arr = Array.from(str);
console.log(arr); // ["h", "e", "l", "l", "o"]

// 将 Set 转换为数组
const set = new Set([1, 2, 3, 4, 5]);
const arr2 = Array.from(set);
console.log(arr2); // [1, 2, 3, 4, 5]

// 使用 map 函数将每个元素乘以 2，然后转换为数组
const arr3 = Array.from([1, 2, 3], x => x * 2);
console.log(arr3); // [2, 4, 6]
```
* 10.**Includes ()** 方法用来判断一个数组是否包含一个指定的值，返回一个布尔值。
```js
const arr = [1, 2, 3, 4, 5];

console.log(arr.includes(2)); // true
console.log(arr.includes(6)); // false
console.log(arr.includes(1, 1)); // false，从索引 1 开始查找，找不到 1
console.log(arr.includes(3, 1)); // true，从索引 1 开始查找，找到 3

```
* 11.**indexOf()** 方法用来搜索数组中的元素，并返回它所在的位置。如果数组中不存在该元素，则返回 -1。参数 1 是要查找的元素值，参数 2 是从哪个索引位置开始查找；
```js
const arr = [1, 2, 3, 4, 5];

console.log(arr.indexOf(2)); // 1
console.log(arr.indexOf(6)); // -1
console.log(arr.indexOf(1, 1)); // -1，从索引 1 开始查找，找不到 1
console.log(arr.indexOf(3, 1)); // 2，从索引 1 开始查找，找到 3
```
* 12.**isArray()** 方法用来判断对象是否为数组，返回一个布尔值。
```js
console.log(Array.isArray([])); // true
console.log(Array.isArray([1, 2, 3])); // true
console.log(Array.isArray({})); // false
console.log(Array.isArray(null)); // false
```
* 13.**Join()** 方法，它将数组中所有元素连接成一个字符串。该方法接受一个可选的参数，该参数为字符串，表示每个数组元素之间应插入的分隔符。如果不提供分隔符参数，则默认使用逗号作为分隔符。
```js
const array = ['a', 'b', 'c'];
const separator = ' - ';

const result = array.join(separator);

console.log(result); // 'a - b - c'
```
* 14.**Keys()** 方法返回一个包含数组所有键的迭代器对象，该迭代器按照数组索引的顺序返回。可以使用 for...of 循环来遍历该迭代器，获取数组的键值。
```js
const array = ['a', 'b', 'c'];
const keys = array.keys();

for (const key of keys) {
  console.log(key); // 0, 1, 2
}
```
* 15.**LastIndexOf ()** 方法，该方法返回指定元素在数组中最后出现的位置的索引，如果数组中不包含该元素，则返回 -1。
>参数：
SearchElement：要查找的元素值。
FromIndex（可选）：从该索引位置开始向前搜索元素。
```js
const array = [2, 5, 9, 2];
const element = 2;

const lastIndex = array.lastIndexOf(element);

console.log(lastIndex); // 3

```
* 16.**Map ()** 该方法创建一个新数组，其元素是原始数组元素调用函数处理后的结果。该方法接受一个函数作为参数，该函数接受原始数组中的每个元素作为参数，并返回一个处理后的新元素。
>参数：
Callback：函数，该函数接受原始数组中的每个元素作为参数，并返回一个处理后的新元素。
```js
const numbers = [1, 2, 3, 4, 5];

const squaredNumbers = numbers.map(num => num ** 2);//对所有元素求平方

console.log(squaredNumbers); // [1, 4, 9, 16, 25]
```
* 17.**Pop ()** 方法说明：删除数组的最后一个元素并返回删除的元素。
```js
const numbers = [1, 2, 3, 4, 5];

const lastNumber = numbers.pop();

console.log(lastNumber); // 5
console.log(numbers); // [1, 2, 3, 4]
```
* 18.**Push ()** 方法说明：向数组的末尾添加一个或更多元素，并返回新的长度; 多个元素需要用逗号隔开。
```js
const numbers = [1, 2, 3];

const newLength = numbers.push(4, 5);

console.log(newLength); // 5
console.log(numbers); // [1, 2, 3, 4, 5]
```
* 19.**Reduce ()** 方法说明：将数组元素计算为一个值（从左到右）。
>参数说明：
>* Callback: 用于处理每个元素的函数。该函数需要返回计算结果。
>* InitialValue（可选）：作为第一次调用回调函数时的第一个参数的值。如果没有提供初始值，则将使用数组中的第一个元素作为初始值。
```js
const numbers = [1, 2, 3, 4, 5];

const sum = numbers.reduce((accumulator, currentValue) => accumulator + currentValue, 0);

console.log(sum); // 15
```
* 20.**ReduceRight ()** 方法说明：将数组元素计算为一个值（从右到左）。
>参数说明：
>* Callback: 用于处理每个元素的函数。该函数需要返回计算结果。
>* InitialValue（可选）：作为第一次调用回调函数时的第一个参数的值。如果没有提供初始值，则将使用数组中的最后一个元素作为初始值。
```js
const numbers = [1, 2, 3, 4, 5];

const reverseString = numbers.reduceRight((accumulator, currentValue) => accumulator + currentValue, "");//字符串格式相加就是字符串拼接，从右向左移动，即54321

console.log(reverseString); // "54321"
```
* 21.**Reverse ()** 方法说明：反转数组的元素顺序。
```js
const numbers = [1, 2, 3, 4, 5];

numbers.reverse();

console.log(numbers); // [5, 4, 3, 2, 1]
```
* 22.**Shift ()** 方法说明：删除并返回数组的第一个元素。
```js
const numbers = [1, 2, 3, 4, 5];

const firstNumber = numbers.shift();

console.log(firstNumber); // 1
```
* 23.**Some ()** 方法检测数组中是否有至少一个元素符合指定的条件，如果有，则返回 true，否则返回 false。该方法接受一个回调函数作为参数，该回调函数会在数组的每个元素上执行一次，直到找到一个满足条件的元素。即数组中只要有一个满足条件的元素，就返回 ture;
>参数：callback (function)
>返回值：Boolean
```js
const numbers = [1, 2, 3, 4, 5];

// 检测是否有偶数
const hasEven = numbers.some(num => num % 2 === 0);

console.log(hasEven); // true
```
* 24. **Sort ()** 该方法对数组的元素进行排序。如果没有指定排序函数，则将元素按照 Unicode 码点升序排列。如果指定了排序函数，则将元素按照该函数的返回值进行排序。
* 排序函数接受两个参数，它们分别是要比较的元素。如果第一个元素应该排在第二个元素之前，那么该函数应该返回一个负数。如果第一个元素应该排在第二个元素之后，那么该函数应该返回一个正数。如果两个元素相等，则该函数应该返回 0。
>参数：compareFunction (function)
>返回值：Array
```js
const fruits = ["banana", "apple", "orange", "grape"];

// 按照字符串长度进行排序
fruits.sort((a, b) => a.length - b.length);//数值计算中直接a-b或b-a即可

console.log(fruits); // ["apple", "grape", "banana", "orange"]
```
* 25.**splice()** 方法从数组中添加或删除元素。它接受三个参数，第一个参数是要删除或添加元素的起始位置，第二个参数是要删除的元素数量，第三个参数以后是要添加到数组中的新元素。
* 如果指定了 deleteCount，splice() 方法将删除从 start 位置开始的 deleteCount 个元素，并返回一个包含被删除元素的新数组。如果没有指定 deleteCount，则从 start 位置开始删除所有元素。
* 如果指定了 items，则 splice() 方法会从 start 位置开始插入这些元素，并返回一个空数组。如果没有指定 items，则只删除元素。
>参数：start (number), deleteCount (number), ... Items (any)
>返回值：Array
```js
const fruits = ["banana", "apple", "orange", "grape"];

// 从数组中删除一个元素
const removed = fruits.splice(1, 1);
console.log(fruits); // ["banana", "orange", "grape"]
console.log(removed); // ["apple"]

// 从数组中插入一个元素
fruits.splice(2, 0, "kiwi");
console.log(fruits); // ["banana", "orange", "kiwi", "grape"]
```
* 26.**toString()** 方法将数组转换为字符串并返回该字符串。返回的字符串由数组中的每个元素组成，元素之间用逗号分隔。如果数组元素是 null 或 undefined，则该元素会被转换为字符串"null"或"undefined";
```js
const arr = [1, 2, "three", true];
console.log(arr.toString()); // "1,2,three,true"
```
* 27.**unshift()** 方法向数组的开头添加一个或多个元素，并返回新数组的长度。新元素将插入到数组的开始位置，并且现有元素将被移动到更高的索引位置。unshift()方法可以添加任意类型的元素。
```js
const arr = ["a", "b", "c"];
const newLength = arr.unshift("x", "y");
console.log(newLength); // 5
console.log(arr); // ["x", "y", "a", "b", "c"]
```
* 28.**valueOf()** 方法返回数组对象的原始值。在大多数情况下，valueOf()方法返回数组本身，与调用它的数组相同。但是，如果要将数组与其他数据类型进行比较或运算，则必须使用 valueOf()方法将其转换为原始值。
```js
const arr = [1, 2, 3];
console.log(arr.valueOf()); // [1, 2, 3]
```
* 29. **Array.of()** 方法用于将一组值转换为数组。与 Array 构造函数不同，Array.of()方法不会根据参数的数量或类型来创建数组。它总是创建一个包含提供的值的数组。
```js
console.log(Array.of(1, 2, 3)); // [1, 2, 3]
console.log(Array.of("hello")); // ["hello"]
```
* 30.**Array.at()** 方法用于接收一个整数值并返回该索引对应的元素，允许正数和负数。负整数从数组中的最后一个元素开始倒数。
```js
const arr = ["a", "b", "c", "d"];
console.log(arr.at(2)); // "c"
console.log(arr.at(-1)); // "d"
```
* 31.**Array.flat()** 方法用于将嵌套数组中的所有元素提取到一个新数组中。嵌套数组的深度可以通过指定参数来控制，或者可以使用默认深度1。
```js
const arr = [1, [2, 3], [4, [5, 6]]];
console.log(arr.flat()); // [1, 2, 3, 4, [5, 6]]
console.log(arr.flat(2)); // [1, 2, 3, 4, 5, 6]
```
32.**Array.FlatMap()** 方法使用映射函数映射每个元素，然后将结果压缩成一个新数组。
>语法：array.FlatMap (callback[, thisArg])
>参数说明：
>* callback：对数组中的每个元素执行的函数。该函数返回一个数组，数组中的元素将被压缩到最终的数组中；
>* thisArg：可选，执行 callback 函数时使用的 this 值。
```js
const arr = [1, 2, 3];
console.log(arr.flatMap(x => [x * 2])); // [2, 4, 6]
```
### 分类
以下是 JavaScript 数组方法的分类及其作用：

**1.  添加/删除元素**

-   Push()：向数组的末尾添加一个或多个元素，并返回新的长度。
-   Pop()：删除数组的最后一个元素并返回删除的元素。
-   Unshift()：向数组的开头添加一个或多个元素，并返回新的长度。
-   Shift()：删除并返回数组的第一个元素。
-   Splice()：从数组中添加或删除元素。

**2.  操作元素**

-   Concat()：连接两个或多个数组，并返回结果。
-   CopyWithin()：从数组的指定位置拷贝元素到数组的另一个指定位置中。
-   Fill()：使用一个固定值来填充数组。
-   Reverse()：反转数组的元素顺序。
-   Sort()：对数组的元素进行排序。

**3.  查询元素**

-   IndexOf()：搜索数组中的元素，并返回它所在的位置。
-   LastIndexOf()：搜索数组中的元素，并返回它最后出现的位置。
-   Includes()：判断一个数组是否包含一个指定的值。
-   Find()：返回符合传入测试（函数）条件的数组元素。
-   FindIndex()：返回符合传入测试（函数）条件的数组元素索引。

**4.  迭代元素**

-   ForEach()：数组每个元素都执行一次回调函数。
-   Map()：通过指定函数处理数组的每个元素，并返回处理后的数组。
-   Filter()：检测数值元素，并返回符合条件所有元素的数组。
-   Every()：检测数值元素的每个元素是否都符合条件。
-   Some()：检测数组元素中是否有元素符合指定条件。
-   Reduce()：将数组元素计算为一个值（从左到右）。
-   ReduceRight()：将数组元素计算为一个值（从右到左）。

**5.  其他方法**

-   Slice()：选取数组的一部分，并返回一个新数组。
-   Join()：把数组的所有元素放入一个字符串。
-   ToString()：把数组转换为字符串，并返回结果。
-   ValueOf()：返回数组对象的原始值。
-   Entries()：返回数组的可迭代对象。
-   Keys()：返回数组的可迭代对象，包含原始数组的键（key）。
-   From()：通过给定的对象中创建一个数组。
-   Array.Of()：将一组值转换为数组。
-   Array.At()：用于接收一个整数值并返回该索引对应的元素，允许正数和负数。负整数从数组中的最后一个元素开始倒数。
-   Array.Flat()：创建一个新数组，这个新数组由原数组中的每个元素都调用一次提供的函数后的返回值组成。
-   Array.FlatMap()：使用映射函数映射每个元素，然后将结果压缩成一个新数组。

#### 关于数组排序函数的注意点：

##### 排序函数的作用
>- 排序函数用于对数组元素进行排序，常用于数据展示、数据分析等场景

##### 排序函数的实现原理
>- 排序函数常使用快速排序、归并排序等算法实现
>- 排序函数会将比较函数作为参数传入排序算法中，以便根据比较函数的返回值确定元素的排序顺序

##### 排序函数的使用
>- 排序函数的使用通常需要传入一个比较函数，该函数接受两个参数，并返回一个整数值
>- 当返回值小于 0 时，表示第一个参数应该排在第二个参数之前；返回值大于 0 时，表示第一个参数应该排在第二个参数之后；返回值等于 0 时，表示两个参数相等

##### 写高效的排序函数的注意事项
> - 应避免使用嵌套循环等时间复杂度高的算法，以免造成性能瓶颈
> - 应尽量避免创建新的数组，以减少内存的使用
> - 应尽量使用现有的算法库，如 lodash 等，以避免重复造轮子
> - 应在排序前考虑数组的数据类型和长度等因素，选择合适的排序算法
> - 应在比较函数中使用位运算或异或运算等快速计算方法，以提高排序效率

##### 高效排序函数的例子
> - Array.Prototype.Sort ()函数本身已经是一种高效的排序函数，它使用的是快速排序算法，并采用了分治和递归的思想
> - 在比较函数中使用位运算或异或运算等快速计算方法，可以提高排序效率
> - 使用归并排序等稳定的排序算法可以保持元素的相对顺序不变

#### 数组展开运算符
>* 概念：数组展开运算符是 ES6引入的一个语法特性，它可以将一个数组展开成一个逗号分隔的值列表，可以在函数调用、数组字面量和对象字面量中使用。
```js
function myFunction(x, y, z) {
  console.log(x, y, z);
}

var args = [1, 2, 3];
myFunction(...args); // 输出：1 2 3
```
* 在数组字面量中，可以使用展开运算符将一个数组的元素展开到另一个数组中，如下所示：
```js
var arr1 = [1, 2, 3];
var arr2 = [...arr1, 4, 5, 6];

console.log(arr2); // 输出：[1, 2, 3, 4, 5, 6]
```
