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
function Banner(){

};

Banner.prototype = {
    //
    constructor:Banner,
    getData: funciton(){
        
    }
}