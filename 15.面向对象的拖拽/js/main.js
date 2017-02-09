/**
 * 面向对象的封装---拖拽
 * 
 */
function Drag(ele){
    this.ele = ele;
    this.l = null;
    this.t = null;

    var that = this;
    this.DOWN = function(e){
       //这里的this是 this.ele,所以要修改this为原构造函数的this
        that.down.call(that,e)
    }

    this.ele.onmousedown = this.DOWN;
    this.MOVE = function(e){ that.move.call(that,e);}
    this.UP = function(e){ that.up.call(that,e); }
}

Drag.prototype.down = function(e){
    this.l = e.pageX - this.ele.offsetLeft;
    this.t = e.pageY - this.ele.offsetTop;
    //要修改　move 和 up  中的this指向
    document.onmousemove = this.MOVE;
    document.onmouseup = this.UP;
}

Drag.prototype.move = function(e){
    var l = e.pageX - this.l;
    var t = e.pageY - this.t; 
    this.ele.style.left = l + 'px';
    this.ele.style.top = t + 'px';
    e.preventDefault();
}

Drag.prototype.up = function(e){
    document.onmousemove =   document.onmouseup = null;
}