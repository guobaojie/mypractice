/** 
 * prototype 表示函数的原型(从哪里出生的？)
 *          也表示一个类成员的集合（在portotype身上添加公共的属性和方法）
 * 浏览器中输入
 * function a(){}
 * 
 * console.dir(a);
 * 打印出来结果是：
 *  arguments:null
 *  caller:null
 *  length:0
 *  name:"a"
 *  >--prototype:Object
 *  >--__proto__:function()
 *  >--<function scope>
 */

//构造函数---->参考阮一峰的博客 《Javascript 面向对象编程》
function CatGod(name,color){
    this.name = name;
    this.color = color;
}

//生成实例---->他们拥有神明的所有的 属性 和 功能
var cat1 = new CatGod('大毛','黄色');
var cat2 = new CatGod('二毛','黑色');

// 大毛 二毛的 创造者是 CatGod 吗？
console.log(cat1.constructor == CatGod);
console.log(cat2.constructor == CatGod);

//！！！！！内置 提供验证 DNA【运算符】 instanceof  // 注意是运算符
console.log(cat1 instanceof CatGod);
console.log(cat1 instanceof CatGod);


// 神明-->开了外挂。有个更多功能
CatGod.prototype.type = '猫科动物';
CatGod.prototype.eat = function(){ alert('吃老鼠')};
// 大毛 二毛 都会拥有这些外挂的功能


//！！！！！神明想知道 谁使用它的 外挂 用 isPrototypeOf
console.log(CatGod.prototype.isPrototypeOf(cat1));

//大毛 二毛 想知道哪些 属性 是神明自身的 哪些是外挂的 用 hasOwnProperty()
console.log(cat1.hasOwnProperty('name'));
console.log(cat1.hasOwnProperty('eat'));  //false  --外挂


//当然 只看 大毛、 二毛 都有哪些属性、方法  用  in 就行了
console.log('name' in cat1);
console.log('eat' in cat);