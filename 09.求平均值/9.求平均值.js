var arr = [1,2,3]


function average(){
    var arr = [];
    for(var i=0; i<arguments.length; i++){
        arr.push(arguments[i]);
    }

    arr.sort(function(a,b){return a-b});
    //去掉一个最大值，去掉一个最小值
    arr.shift();
    arr.pop();
    return eval(arr.join('+'))/arr.length; 
}

