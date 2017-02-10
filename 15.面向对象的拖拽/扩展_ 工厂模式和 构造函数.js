/** 
 * 思考：什么是对象？
 *      简单的事说：对象是一个整体，对外提供一些操作
 *      什么是面向对象?
 *      （只是一种编程思想）使用对象时只关注对象的功能，不关注内部细节。
 *      > 面向对象的特点： 不考虑内部实现，只考虑功能使用  
 *                        从已有的对象上，继承出新的对象 
 *      > 组成：方法 + 属性
 * 
 * 
 * 思考1： 什么是工厂模式？
 * 简单的说就是函数的封装：常用的功能函数 封装在一个函数体中。在需要是时候调用
 * 扩展：
 *      var a = function (){ alert('ok')};
 *      相当于： var a = new Function(){ alert('ok') };
 * 
 */
//例如：-------> 扩展： 看见函数体。。。先去想想或者看看  return。。！！！！！
function person(name,age){
    var obj = new Object();

    obj.name = name;;
    obj.age = age;

    obj.showName = function(){ alert(this.name) };
    obj.showAge = function(){ alert(this.age) };

    return obj;
}


//重复调用
var p1 = person('tom',5);
var p2 = person('jerry',6);

/**
 * 缺点： 不断的开辟新的内存空间。 
 *      p1 和 p2 虽然功能全都一样，但是绝不相等
 */

/**
 * 思考2： 构造函数的方式
 * 
 * 利用new 方法产生 新函数的方法
 * 简单的事说就是利用原型 prototype---扩展出更多的共有功能
 */

//例如：----->利用原型。节省内存，还可以实现继承

function Person(name,age){
    this.name = name;
    this.age = age;
}
Person.prototype.say = function(){
    console.log(this.name);
}
var p3 = new Person('mary',6);
var p4 = new Person('jack',7);
console.log(p3.name); //mary
console.log(p3.say == p4.say); //true

// 扩展：去掉前后空格
String.prototype.trim = function(){
    return this.replace(/^\s+|\s+$/g,'');
}

var str = '  a b  c  ';
console.log(str.trim());