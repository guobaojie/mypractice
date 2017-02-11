
f = function(){ return true;};
g = function(){ return false;};
;(function(){
    if(g() && [] == ![]){
        f = function f(){return false};
        function g(){return true};
    }
});


function fn(){ console.log(12)};
function fn2(){
    console.log(fn)
    fn=3;
    return;
    function fn(){
        console.log('ok')
    }
}

fn2();




console.log(a);
function a(n){ return n*2};
var a ='ok'
console.log(a);



var number = 2;
var obj = {
    number : 4,
    fn1 : ( function(){
        this.number *=2;  //window
            number = number*2;  
            
            var number = 3;
            return function(){
                alert(this); 
                this.number *= 2;
                number *= 3;
                console.log(number);
            }
    })(),
    db2:function(){this.number *= 2}
};

var  fn1 = obj.fn1;  //此处计算return 之前的部分  window.nubmer = 4;  fn1 = return fn(){}
console.log(number);   //window.nubmer = 4;
fn1();                //执行 返回的函数  window.num = 8/   私有number = 9
obj.fn1();        //因为obj.fn1 被fn1占用（一直存在于内存中切被执行过只留下一个返回函数）。所以此处
            // 直接执行 return 内的函数 。  obj是前缀。所以this 就是obj.   obj.number = 8;
            // //私有number  向上找 到 9 *3 = 27

console.log(window.number); //8
console.log(obj.number);  //8