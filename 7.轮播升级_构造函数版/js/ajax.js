function ajax(opts){
    var defaults = {
        method:'GET',
        url:null,
        async:true,
        cache:true,
        data:null,
        dataType:'text',
        success:null,
        error:null
    }
    
    for(var key in opts){
        defaults[key] = opts[key];
    }

    if(!defaults.cache){
        defaults.url = defaults.url + (defaults.url.indexOf('?') == -1 ? '?' : '&') + Math.random();
    }

    if(defaults.data && typeof defaults.data == 'object'){
        defaults.data = JSON.stringify(defaults.data);
    }

    
    var xhr = new XMLHttpRequest;
    xhr.open(defaults.method, defaults.url, defaults.async);
    xhr.onreadystatechange = function(){   
        if(/^2\d{2}$/.test(xhr.status)){
            if(xhr.readyState === 4 ){
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