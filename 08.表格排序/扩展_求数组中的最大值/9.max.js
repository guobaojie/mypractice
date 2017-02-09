var arr = [55,11,33,22];

//1.用sort排序法
arr.sort(function(a,b){
    return a-b;
});
console.log(arr[arr.length-1]);

//2.用 for循环比较
var max = 0;
for(var i=0; i<arr.length; i++){
    if(arr[i]>max){
        max = arr[i];
    }
}
console.log(max);

//3.用Math.max 数学函数
// arr.join -->转行出来的是 字符串所以不可以直接使用
var res = Math.max(eval(arr.join()));
console.log(res);
