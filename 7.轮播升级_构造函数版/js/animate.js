function animate(ele,target,duration,fn){

    duration  = duration || 2000;
    var begin = {};
    var change = {};

    for(var key in target){
        begin[key] = getCss(ele,key);
        change[key] = target[key] - begin[key];
    }
    
    var time = 0;

    if(ele.timer){
        clearInterval(ele.timer);
    }

    ele.timer = setInterval(function(){
        time += 10;
        if(time >= duration){
            setGroupCss(ele,target);
            clearInterval(ele.timer);
            fn && fn.call(ele);
        }else{
            for(var key in change){
                var val = time / duration * change[key] + begin[key];
                setCss(ele,key,val);
            }
        }
    },10);

};


function getCss(obj,attr){
    var val = null;
    
    if(window.getComputedStyle){
        val = window.getComputedStyle(obj)[attr];
    }else{
        if(attr == 'opacity'){
            var reg = /alpha\(opacity=(\d+(\.\d+)?)\)/;
            val = ele.currentStyle.filter;
            val = reg.test(val)? reg.exec(val)[1]/100 : 1;
        }
        val = obj.currentStyle[attr];
    }
    var reg = /-?\d+(\.\d+)?(px|pt|em|rem|deg)/;
    if(reg.test(val)){
        val = parseFloat(val);
    }
    return val;
};

function setCss(ele,attr,val){
    if(attr == 'opacity'){
        ele.style.opacity = val;
        ele.style.filter = 'alpha(opacity='+val*100+')';
        return;
    }
    if(attr == 'float'){
        ele.style.cssFloat = val;
        ele.style.styleFloat = val;
        return;
    }
    var reg = /width|height|left|right|top|bottom(margin|padding)(Left|Right|Top|Bottom)?/;
    if(reg.test(attr)){
        if(!isNaN(val)){
            val += 'px';
        }
    }
    ele.style[attr] = val;
};

function setGroupCss(ele,target){
    target = target||[];
     if(target.toString() == '[object Object]'){
        for(var key in target){
            setCss(ele,key,target[key]);
        }
     }
}
