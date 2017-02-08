var arr = [11,11,22,33];

//第一种，通过indexOf 判断没有就放入
Array.prototype.unique1 = function(){
    tmp =[];
    for(var i=0; i<this.length; i++){
        if(tmp.indexOf(this[i])=== -1){
            tmp.push(this[i]);
        }
    }
    return tmp;
}

//第二种，对象标记法
Array.prototype.unique2 = function(){
    var obj ={};
    var tmp=[];
    for(var i=0; i<this.length; i++){
        if(!obj[this[i]]){
            obj[this[i]] = 1;
            tmp.push(this[i]);
        }
    }
    return tmp;
}

//第三种，判断位置。当前位置正确就返回
Array.prototype.unique1 = function(){
    tmp =[this[0]];
    for(var i=1; i<this.length; i++){
        if(this.indexOf(this[i])=== i){
            tmp.push(this[i]);
        }
    }
    return tmp;
}

//第四种，排序后 从临时数组的最后一位开始对比

