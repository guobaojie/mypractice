// 第一种： typeof
/**
 * 能验证的数据类型有：
 * number
 * boolean
 * string
 * object
 * undefined
 * function
 *   
 * 缺点： 不能很好的区分 引用数据类型 
 *        【引用数据类型】---> 返回的都是 object 
 */

//第二种： instanceof 
/**
 * (属于： 运算符)
 *  判断 实例 的 亲生父亲
 * （生成实例的类）是谁？
 * 
 * 例如：  
 *  [] instanceof Array -------> true
 *   9 instanceof Number ------> false
 *  缺点：判断 引用数据类型准确 ，判断基本数据类型 出错
 *  
 */

//第三种： costructor
/** 
 *  函数 原型上的指针 可以查看原型
 * 
 * 缺点：
 * 指针可以别修改指向
 * 
 */

//第四种： Object.prototype.toString = function(){}
/**
 *  结果中：第一个小写的object 是数据类型 ，第二个大写的是所属的类
 */

 console.log( Object.prototype.toString.call("") );
 //[object String]