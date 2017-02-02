/** 
 * 复习 封装 ajax
 */
function ajax(opts){
    var defaults = {
        url:null,
        method:'get',
        dataType:'text',
        data:null,
        async:true,
        cache:true,
        success:null,
        error:null
    };
    //自定义opts设置覆盖defaults设置
    for(var key in opts){
        if(opts.hasOwnProperty(key)){
            defaults[key] = opts[key];
        }
    }
    //判断cache 网页是否 缓存？
    !defaults.cache ? defaults.url += (defaults.url.indexOf('?') === -1 ? '?':'&')+ '_='+Math.random() : null;
    //post请求 一定是会带上【请求体】的所以要处理一下 defaults.data
    if( defaults.data && typeof defaults.data === 'object'){
        defaults.data = JSON.stringify(defaults.data);
    }   
    //正式进入ajax 流程（四部曲）
    var xhr = new XMLHttpRequest;
    xhr.open(defaults.method, defaults.url, defaults.async);
    xhr.onreadystatechange = function(){   
        //状态成功就获取数据。否则，就输出错误信息呗！
        if(/^2\d{2}$/.test(xhr.status)){
            if(xhr.readyState === 4 ){
                //判断dataType -->转换成需要的数据类型
                var val = xhr.responseText;
                switch(defaults.dataType){
                    case 'json':
                        val = 'JSON'in window ? JSON.parse(val) : eval('('+val+')');
                        break;
                    case 'xml':
                        val = xhr.responseXML;
                        break;
                }
                defaults.success && defaults.success.call(xhr,val);
            }
        }else{
            defaults.error && defaults.error.call(xhr, xhr.responseText);
        }
    }
    xhr.send(defaults.data);
}