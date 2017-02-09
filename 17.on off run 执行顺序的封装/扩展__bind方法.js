//bind的主要功能就是 改变当前函数的this指向，而不立即执行


//=======这种方式打印出来的都是10 因为延迟的缘故 i瞬间就加完了。

function getLog(i){ console.log(i) };
for(var i=0; i<10; i++){
    //bind 保证 gotLog 在定时器中只是绑定this,而并不执行
    setTimeout(function(){
        getLog(i);  
    },1000);
}

//===========利用 自执行函数先执行的特性 来给 定时器传参=======
for(var i=0; i<10; i++){
    (function(i){
        setTimeout(function(){
            console.log(i);
        },1000)
    })(i);
}

//=========利用bind的方法====简化流程  一行就搞定了 bind
for(var i=0; i<10; i++){
    setTimeout(getLog.bind(this,i),1000);
}







//======扩展==== 通过bind 允许你在多个步骤中传递参数
function add(a,b,c){
    return a+b+c;
}
var addAgain = add.bind(this,1,2);
var result = addAgain(3)
console.log(result);

//================================================
//============小结===============================

/**
 * bind 方法一个重要作用就是为一个函数绑定一个作用域，但是
 * bind 方法在低版本浏览器中不兼容，我们手动实现一下
 * 
 * 思路： bind 1.需要返回一个待执行的函数 return function(){}
 *             2.作用域的绑定需要call 和 apply 来实现
 *             3.参数的未确定性 需要applay 来传递数组
 */
//==========手动封装 bind 方法

Function.prototype.myBind = function(that){
    var _this = this;
    var args = Array.prototype.slice.apply(arguments,[1]);
    return function(){
        return _this.apply(that,
            args.concat(Array.prototype.slice.apply(arguments,[0]))
        );
    }
}

var test = function(a,b){
    console.log('作用域绑定 '+ this.value)
    console.log('testBind参数传递 '+ a.value2)
    console.log('调用参数传递 ' + b)
}
var obj = {
    value:'ok'
}
var fun_new = test.myBind(obj,{value2:'also ok'}) 
fun_new ('hello bind') 