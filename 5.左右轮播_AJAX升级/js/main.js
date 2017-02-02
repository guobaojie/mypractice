//获取所有的img节点
var Imgs = document.getElementsByTagName('img');
var oBox = document.getElementsByClassName('box')[0];
var oUl = document.getElementById('indicator');
var aLis = oUl.getElementsByTagName('li');
ajax({ //ajax 封装完毕增强版
    method:'get',
    url:'./data/data.json',
    dataType:'json',
    async:true,
    cache:true,
    success:function(res){ //异步操作；请在回调函数中处理数据
        bindData(res); //引用DOM回流
        for(var i=0; i<Imgs.length; i++){
            imgLoad(i); //引用 图片延迟加载
        }
    },
    error:function(){
        console.log('data is error');
    }
})

//封装DOM回流
function bindData(data){  
    if(data){ 
        var str = '';
        var strLi = '';
        for(var i=0; i<data.length; i++){
            str += '<img src="" realSrc="'+data[i].src+'"/>';
            if(i==data.length+1){ 
                strLi += '<li class="active"></li>'
            }else{
                strLi += '<li></li>';
            }
            
        }
        //在图片的末尾追加一张
         str += '<img src="" realSrc="'+data[0].src+'"/>'; 
    }
     oBox.innerHTML = str; 
     oUl.innerHTML = strLi;
};

//封装单张图片延迟加载
function imgLoad(i){
    var curImg = Imgs[i];
    var tmpImg = document.createElement('img');
        tmpImg.src = curImg.getAttribute('realSrc');
        tmpImg.onload = function(){
            curImg.src = this.src;
        }
}

//轮播
var num = 0; //设置开始的第一张图片
var timer = setInterval(move,2000);
function move(){
    if(num >= Imgs.length-1){
        setCss(oBox,'left',0);
            num = 0;
    }
    num++;
    animate(oBox,{'left':-600*num},500);

    // 如果到最后追加那张图。就直接让 指示点 回到第一个
    var tmpNum = num;
    if(num == Imgs.length-1){
            tmpNum = 0;
    }
    for(var i=0; i<aLis.length; i++){
        aLis[i].className = '';
    }
    aLis[tmpNum].className = 'active';
};

//设置 左右按钮
var container = document.getElementsByClassName('container')[0];
var prev = document.getElementsByTagName('a')[0];
var next = document.getElementsByTagName('a')[1];

prev.onclick = move;

next.onclick = function(){
    if(num <= 0){
        num = Imgs.length-1;
        setCss(oBox,'left',num*-600);
    }
    num --;     
    animate(oBox,{'left':num*-600},500);

    for(var i=0; i<aLis.length; i++){
    aLis[i].className = '';
    }
    
    aLis[num].className = 'active';
}

//鼠标移动上去动画停止
container.onmouseover = function(){
    clearInterval(timer);
}
container.onmouseout = function(){
    timer = setInterval(move,2000);
}