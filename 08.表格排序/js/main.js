var table = document.getElementsByTagName('table')[0];
var ths = table.tHead.rows[0].cells;
var tBody = table.tBodies[0];
var tBodyRows = tBody.rows;
var data = null;

//ajax 获取数据
;(function(){
    var xhr = new XMLHttpRequest;
    xhr.open('GET','data/myData.json',false);
    xhr.onreadystatechange = function(){
        if(xhr.status == 200){
            if(xhr.readyState == 4){
                data = xhr.responseText;
                console.log(data);
                data = 'JSON' in window ? JSON.parse(data) : eval('('+data+')');
            }
        }
    }
    xhr.send(null);
})();

//DOM绑定数据
;(function bindData(){
    if(data){
        var frg = document.createDocumentFragment();
        for(var i=0; i<data.length; i++){
            var curData = data[i];
            var tr = document.createElement('tr');
            for(var key in curData){
                var td = document.createElement('td');
                    td.innerHTML = curData[key];
                    tr.appendChild(td);
            }
            frg.appendChild(tr);
        }
        tBody.appendChild(frg);
        frg = null;
    }
})();

//点击表格头排序
;(function bindEvent(){
    for(var i=0; i<ths.length; i++){
       
            ths[i].index = i;
            ths[i].onclick = function(){
                 console.log(this.index);
                sort.call(this,this.index);
            }
        
    }
})();
//封装排序
function sort(n){
    var tBodyRowsAry = Array.prototype.slice.call(tBodyRows);
    
    tBodyRowsAry.sort(function(a,b){
        var _a = a.cells[n].innerHTML;
        var _b = b.cells[n].innerHTML;
        console.log(_a+';'+_b);
        if(isNaN(_a) || isNaN(_b)){
            return (_a.localeCompare(_b));
        }
        return (_a - _b);
    });
    
    //将排好顺序的数组重新放入到tBody中
    var frg = document.createDocumentFragment();
    for(var i=0; i<tBodyRowsAry.length; i++){
        frg.appendChild(tBodyRowsAry[i]);
    }
    
    tBody.appendChild(frg);
    frg = null;

}