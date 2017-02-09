// 原版 渐隐渐现发热轮播

// var oBox = document.getElementsByClassName('box')[0];
// var aDivs = oBox.getElementsByTagName('div');
// var aImgs = oBox.getElementsByTagName('img');
// var oUl = document.getElementById('indicator');
// var aLis = oUl.getElementsByTagName('li');

// ajax({
//     url:'data/data.json',
//     async:true,
//     cache:false,
//     dataType:'json',
//     success:function(val){
//         console.log(val);
//         InsertDom(val);
//         for(var i=0; i<val.length; i++){
//             imgDelay(i);
//         }
//     }
// });

// function InsertDom(data){
//     var strDiv = '';
//     var strLi = '';
//     for(var i=0; i<data.length; i++){
//         strDiv += `<div><img src="" realSrc="${data[i].src}" /></div>`;
//         strLi += i===0? '<li class="active"></li>' : '<li></li>';
//     }
//     oBox.innerHTML = strDiv;
//     oUl.innerHTML = strLi;
// };

// function imgDelay(i){
//     var curImg = aImgs[i];
//     var tmpImg = new Image;
//     tmpImg.src = curImg.getAttribute('realSrc');
//     tmpImg.onload = function(){
//         curImg.src = this.src;
//         i==0? setGroupCss(curImg.parentNode,{'opacity':1, 'zIndex':1}) : null;
//     }
// };

// var timer= null;
// var num = 0;
// timer = setInterval(autoMove,2000);

// function autoMove(){
//     num++;
//     if(num >= aDivs.length){
//         num =0;
//     }
    
//     for(var i=0; i<aDivs.length; i++){
//         if(i==num){
//             animate(aDivs[num],{ 'opacity':1, 'zIndex':1},300);
//             aLis[num].className = 'active';
//         }else{
//             animate(aDivs[i],{ 'opacity':0, },200,function(){
//                 setCss(this,'zIndex',0);
//             });
//             aLis[i].className = '';
//         }
//     }
    
// };


//构造函数版
function Banner(container,dataUrl,interval){
    this.interval = interval||2000;
    this.container = container;
    this.dataUrl = dataUrl;
    this.res = null;
    this.oBox = this.container.getElementsByClassName('.box')[0];
    this.Ul = this.container.getElementsByClassName('.indicator')[0];
    this.left = this.container.getElementsByTagName('a')[0];
    this.left = this.container.getElementsByTagName('a')[1];
    this.aImgs = this.oBox.getElementsByTagName('img');
    this.aLis = this.Ul.getElementsByTagName('li');
    this.timer = null;
    this.num = 0;

    //执行所有方法
    this.init();
};

Banner.prototype = { 
    constructor:Banner,
    getData:function(){
        var that = this;
        ajax({
            method:'GET',
            url:dataUrl,
            async:false,
            cache:false,
            dataType:'json',
            success:function(res){
                that.res = res;
            }
        })
    },
    bindData:function(){
        if(this.res){
            var strDivs = '';
            var strLis = '';
            for(var i=0; i<this.res.length; i++){
                strDivs = '<div><img src="" realSrc="'+'"/></div>';
                strLis += i === 0? '<li class="active"></li>':'<li></li>'
            }
            this.oBox.innerHTML = strDivs;
            this.Ul.innerHTML = strLis
        }
    },
    imgload:function(){
        var that = this;
        for(var i=0; i<this.aImgs.length; i++){
            ;(function(i){
                    var curImg = that.aImgs[i];
                    var tmpImg = new Image;
                    tmpImg.src = curImg.getAttribute('realSrc');
                    tmpImg.onload = function(){
                        curImg.src = this.src;
                        i==0? setGroupCss(curImg.parentNode,{'opacity':1, 'zIndex':1}) : null;
                    }
            })(i);
        }
    },
    autoMove:function(){
        this.num ++;
        if(this.num == this.res.length){
            this.num =0;
        }
        this.setImg();
    },
    setImg:function(){
        for(var i=0; i<this.aImgs.length; i++){
            var curImg = this.aImgs[i];
            if(i === this.num){
                animate(curImg.parentNode,{'opactiy':1},300);
                this.aLis[this.num].className = 'active';
            }else{
                 animate(curImg.parentNode[i],{ 'opacity':0, },200,function(){
                    setCss(this,'zIndex',0);
                });
                this.aLis[i].className = '';
            }
        }
    },
    mouseEvent:function(){
        var that = this;
        this.container.onmouseover = function(){
            window.clearInterval(that.timer);
            that.left.style.display = that.right.style.display = 'block';
        }
        this.container.onmouseout = function(){
            that.timer = window.setInterval(function(){
                that.autoMove();
            },that.interval);
            that.left.style.display = that.right.style.display = 'none';
        }
    },
    focusBindEvent:function(){
        var  that = this;
        for(var i=0; i<this.aLis.length; i++){
            var curLi = this.lis[i];
            curLi.index = i;
            curLi.onclick = function(){
                that.num = this.index;
                that.setImg();
            }
        }
    },
    buttonBindEvent:function(){
       var that = this;
       this.right.onclick = function(){
          that.num --;
          if(that.num == -1){
              that.num = that.res.length-1;
          }
          that.setImg()
           
       };
       this.right.onclick = function(){
           that.autoMove();
       }
    },
    init:function(){
        var that = this;
        this.getData();
        this.bindData();
        this.imgload();
        this.timer = setInterval(function(){
            that.autoMove();
        },this.interval);
        this.mouseEvent();
        this.focusBindEvent();
        this.buttonBindEvent();
    }

}