 //引入动画库
     function animate(ele,target,duration,fn){
         
        duration = duration || 2000;
        var begin = {};
        var change = {};
        for(var key in target){
            begin[key] = getCss(ele,key);
            change[key] = target[key] - begin[key];
        }
        var time = 0;
        var step = 10;
        if(ele.timer){
            clearInterval(ele.timer);
        }
        ele.timer = setInterval(function(){
            time += step;
            if(time >= duration ){
                // time = duration;
                setGroupCss(ele,target);
                
                clearInterval(ele.timer);
                fn&&fn();
                return;
            }
            for(var key in change){
                if(change[key]){
                    val = time / duration * change[key] + begin[key];
                    setCss(ele,key,val);
                }
            }           
        },10);

    };
      //动态获取样式增强版
    function getCss(ele,attr){
        var val = null;
        if(window.getComputedStyle){
            val = window.getComputedStyle(ele)[attr];
        }else{
            if(attr == 'opacity'){
                var reg = /alpha\(opacity=(\d+(\.\d+)?)\)/;
                val = ele.currentStyle.filter;
                val = reg.test(val)? reg.exec(val)[1]/100 : 1;
            }else{
                 val = ele.currentStyle[attr];
            }
           
        }
        var reg = /-?\d+(\.\d+)?(px|pt|em|rem|deg)?/;
        if(reg.test(val)){
            val = parseFloat(val);
        }
        return val;
    }

    //设置样式
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
    }

    //设置一堆样式
    function setGroupCss(ele,target){
        target = target || [];
        if(target.toString() == '[object Object]'){
            for(var key in target){
            setCss(ele,key,target[key]);
            }
        }
    }