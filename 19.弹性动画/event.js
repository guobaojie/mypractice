function on(ele,type,fn){
    if(ele.addEventListener){
        ele.addEventListener(type,fn,false);
        return;
    }
    if(!ele['my'+type]){
        ele['my'+type] = [];
        ele.attacheEvent('on'+type, function(){ run.call(ele)});
    }
    var a = ele['my'+type];

    for(var i=0; i<a.length; i++){
        if(a[i]=== fn){
            return;
        }
    }
    
    var tmpFn = function(){
        fn.call(ele);
    }
    a.push(tmpFn);
}

function run(e){
    e = window.event;
    e.target = e.srcElement;
    e.pageX = (document.documentElement.scrollLeft || document.body.scrollLeft) + e.clientX;
    e.pageY = (document.documentElement.scrollTOp || document.documentElement.scrollTop) + e.clientY;
    e.preventDefault = function(){ e.returnValue = false;}
    e.stopPropagation = function(){ e.cancelBubble = true; }

    var a = this['my'+e.type];
    if(a){
        for(var i=0; i<a.length; i++){
            if(typeof a === 'function'){
                a[i].call(this,e);
            }else{
                a[i].splice(i,1);
                i--;
            }
        }
    }
}

function off(ele,type,fn){
    if(ele.removeEventListener){
        ele.removeEventListener(type,fn,false);
        return;
    }

    var a = ele['my'+type];
    if(a){
        for(var i=0; i<a.length; i++){
            if(a[i] == fn){
                a[i] = null;
                break;
            }
        }
    }
}