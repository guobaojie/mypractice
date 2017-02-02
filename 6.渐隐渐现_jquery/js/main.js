/*
 *jquery版本 轮播图 
 * es6 简单使用
 * 
 */    
//jquery获取数据
;(function getData(){
    $.ajax({
        type:'GET',
        url:'data/data.json',
        async:false, 
        dataType:'json',
        success:function(val){
            window.data = val;
        }
    })
})();



//DOM回流----> 遗憾的是 jquery 中没有dom回流，必须重新获取所有数据
InsertDom(data);
function InsertDom(data){
    let strDiv = '';
    let strLi = '';
    for(var i=0; i<data.length; i++){
        strDiv += `<div><img src="" realSrc="${data[i].src}" /></div>`
        strLi += i==0? '<li class="active"></li>' : '<li></li>';
    }
    $('.box').html(strDiv);
    $('ul').html(strLi);
    //---->没有dom回流，必须重新获取
    $aDivs = $('.box').children('div');
    $aImgs = $('.box').find('img');
    $aLis = $('ul').find('li');
};

//图片延迟加载
imgDelay();
function imgDelay(){  
    for(var i=0; i<$aImgs.length; i++){
        let curImg = $aImgs[i]; 
        //let tmpImg = new Image; //--这个也可以
        let tmpImg = document.createElement('img');
        tmpImg.src = curImg.getAttribute('realSrc');
        tmpImg.onload =()=>{
            $(curImg).attr('src',tmpImg.src);
            $aDivs.first().fadeIn().css('zIndex',1);
        }
    }
};

//自动轮播
var num = 0;
var timer = setInterval(function(){
    autoMove()
},2000);


function autoMove(){
    num ++;
    if(num >= $aDivs.length){
        num = 0;
    }
    carousel(num)
};
//封装 单张轮播 点击next ptev 时候用的到 
function carousel(num){
    for(let i=0; i<$aDivs.length; i++){
        if(i === num){
            $aDivs.eq(i).css('zIndex',1).fadeIn().siblings().fadeOut();
            $aLis[i].className = 'active';
        }else{
            $aDivs.eq(i).css('zIndex',0);
            $aLis[i].className = '';
        }
    }
}

//鼠标移动上去之后停止
$('.container').on('mouseover',function(){
    clearInterval(timer);
}).on('mouseout',function(){
    timer = setInterval(function(){
        autoMove();
    },2000);
})


// 左右按钮
Btns();
function Btns(){
    $('a').eq(1).on('click',autoMove);
    $('a').eq(0).on('click',function(){
        num --;
        if(num <0){
            num = $aDivs.length-1;
        }
        carousel(num);
    });
}


