// 原理：
// 因为：dom2级 绑定多个事件 不能按顺序执行
// 所以 采用 将多个事件 放入到数组 中，并让
// 这些 方法依次执行

function on(ele,type,fn){
    if(!ele['my'+type]){
        ele['my'+type] = [];
    }
    var a = ele['my'+type]; //为了简单操作而已
    // 循环去重复
    for(var i=0; i<a.length; i++){
        if(a[i] == fn){
            return ;
        }
    }

    //关键语句把事件放入到自定义数组中
    a.push(fn);
    bind(ele,type,fn);
}
