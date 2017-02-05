
// 非构造函数"的继承
var Chinese = {
    nation:'中国'
}

var Doctor = {
    career:'医生'
}

//让医生继承中国人


//1. object 方法
function object(o){
    function F(){}
    F.prototype = o;
    return new F();
}

var Doctor = object(Chinese);
Doctor.career = '医生';

