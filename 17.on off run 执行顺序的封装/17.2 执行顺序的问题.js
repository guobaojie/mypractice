function on(ele,typ,fn){
    if(ele.addEventListener){
        ele.addEventListener(type,fn,false);
        return;
    }


    if(!ele['my'+type]){
        ele['my'+type] = [];
        //如果不存在当前的绑定事件，就创建
        ele.attachEvent('on'+type,function(){
            run.call(ele);
        })
    }

    var a = ele['my'+type];
    for(var i=0; i<a.length; i++){
        if(a[i] === fn){
            return;
        }
    }
    a.push(fn);
}

function run(e){
    e = window.event;
    e.target = e.srcElement;
    e.pageX = (document.documentElement.scrollLeft||document.body.scrollLeft) + e.clientX;
    e.pageY = (document.documentElement.scrollTop || document.body.scrollTop) + e.clientY;
    e.stopPropagation = function (){  e.cancelBubble = true;  }
    e.preventDefault = function (){ e.returnValue = false; }
    var a = this['my'+type];
    if(a){
        for(var i=0; i<a.length; i++){
            if(typeof a[i] === 'function'){
                a[i].call(this,e);
            }else{
                a.splice(i,1);
                i--;
            }
        }
    }
}

function off(e){
    if(ele.removeEventListener){
        ele.removeEventListener(type,fn,false);
        return;
    }
    var a= ele['my'+type];
    if(a){
        for(var i=0; i<a.length; i++){
            if(a[i] === fn){
                a[i] = null;
                break;
            }
        }
    }
}