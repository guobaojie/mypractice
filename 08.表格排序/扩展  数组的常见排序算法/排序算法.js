var ary=[8,1,6,3,4,5,2,7];

Array.prototype.quickSort = function(){
    if(this.length == 0){
        return [];
    }
    var left = [];
    var right = [];
    var cur = this[0]; //永远拿出第一项作为基准点
    for(var i=1; i<this.length; i++){  //循环从第二项开始 i=1；
        cur>this[i]?  left.push(this[i]) : right.push(this[i]);
    }
    return (left.quickSort()).concat(cur,(right.quickSort()));
}


// console.log(ary.quickSort());

/**
 * 阮一峰博客： http://www.ruanyifeng.com/blog/2011/04/quicksort_in_javascript.html
 * 快速排序（Quicksort）的Javascript实现
 * 经典实现方式：生存中间的索引值，然后比较
 *  
 */

Array.prototype.quickSort2 = function () {
    if(this.length <= 1){
        return this;
    }
    var pivotIndex = Math.floor(this.length/2);
    var pivot = arr.splice(pivotIndex,1)[0]; //返回是个数组
    var left = [];
    var right = [];
    for(var i=0; i<this.length; i++){
        pivot > this[i]? left.push(this[i]) : right.push(this[i]);
    }
    return left.quickSort().concat(pivot, right.quickSort());
}
// console.log(ary.quickSort());


/**
 * 插入排序： 左手拿起一张牌     右手开始从第二张开始和 左手比较 
 */
Array.prototype.insertSort = function(){
    var tmp = [];

    tmp.push(this[0]);

    for(var i=1; i<this.length; i++){
        var cur = this[i];
        for(var j=tmp.length-1; j>=0; ){
            if(cur<tmp[j]){ //如果 刚拿来这一张牌， 比左手最后一张小。继续往前对比
                j--;  //j-- 放在判断之后执行；
                if(j === -1){
                    tmp.unshift(cur);
                    break;
                }
            }else{
                tmp.splice(j+1,0,cur);
                break;
            }
        }
    }
    return tmp;
}

console.log(ary.insertSort());

/**
 * 冒泡排序 : 前一项和后一项比较 前者大 就 和后者交换位置
 */

Array.prototype.BubbleSort = function(){
    for(var i=0; i<this.length; i++){
        var cur = this[i];
        for(var j=0; j<this.length-i; j++){
            if(cur> this[j+1]){
                var tmp  = this[j];
                    this[j] = this[j+1];
                    this[j+1] = tmp;
            }
        }
    }
    return this;
}

console.log(ary.BubbleSort());