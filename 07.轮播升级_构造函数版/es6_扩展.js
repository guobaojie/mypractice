

class Point{
    constructor(x,y){
        this.x = x;
        this.y = y;
    }
    toString(){
        return '('+this.x+', '+this.y+')';
    }
}


var point = new Point(2,3);
console.log(point.toString());
/**
 * 记住这种格式
 * class Point{
 *      constructor(参数，参数){
 *          
 *      }
 *      原型上的方法
 *      init(){}
 *      fn(){}
 *      ...
 * }
 */

console.log(Point.name);



//我感觉相当于
function Point1(x,y){
    this.x = x;
    this.y = y;
    this.toString = function(){ 
        return '('+this.x+', '+this.y+')';
    }
}

var point1 = new Point1(1,2);
console.log(point1.toString());
/** 
 * 一样一样的，是吧！
 * 
 * 具体用法 ECMAScript 6教程 (三) Class和Module（类和模块）
 */

