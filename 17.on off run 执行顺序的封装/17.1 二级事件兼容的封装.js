//在元素上 绑定多个事件 // 处理 ie6--ie8 中事件的各种兼容问题
/**
 * 思路： 1.在元素身上扩展出一个数组【】
 *        2.将 事件都 放入（push) 空数组中
 *        3.为了保证 所有事件 都指向 元素 ---》通过call的方式创建一个临时tmpFn
 *        4.为了避免 重复绑定同一个事件 ，循环遍历，防止重复。
 */

function bind(ele,type,fn){
    //如果支持 dom2级 事件 就直接使用并返回
    if(ele.addEventListener){
        ele.addEventListener(type,fn);
        return;
    }

    //1.建立一个自定义的数组存放绑定事件
    if(!ele['my'+type]){
        ele['my'+type] = [];
    }
    var a = ele['my'+type];
        

    //3.处理 要绑定的事件，改变fn的this指向为ele
    var tmpFn = function(){
        fn.call(ele);
    }

    tmpFn.origin = fn;
    
    //4 .处理重复绑定
    for(var i=0; i<a.length; i++){
        if(a[i].origin === fn){
            return;
        }
    }
    //2. 事件都 放入（push) 空数组中
    a.push(tmpFn);

    ele.attachEvent('on'+ type, tmpFn);
}

/**
 * 解除绑定的封装
 */
function unBind(ele,type,fn){
    if(ele.removeEventListener){
        ele.removeEventListener(type,fn);
        return;
    }

    var a = ele['my'+type];

    if(a){
        for(var i=0; i<a.length; i++){
            
            if(a[i].origin === fn){
                a.splice(i,1);
                ele.detachEvent('on'+type, tmpFn);
                break;
            }
        }
    }
}