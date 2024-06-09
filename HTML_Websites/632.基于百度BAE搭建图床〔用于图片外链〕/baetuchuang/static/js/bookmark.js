;(function(window){
    var d,i,c,clickHandler;
    if(window.weibotuchuangbyzythum){
        return false;
    }
    if(!window.FormData){
        return false;   
    }
    
    clickHandler = function(){
        d.parentNode && document.body.removeChild(d);
        c.removeEventListener('click',clickHandler);    
        d = i = c = null;
        delete window.weibotuchuangbyzythum;                
    }
    
    i = document.createElement('iframe');
    i.setAttribute('width','256');
    i.setAttribute('height','256');
    i.style.cssText = ';border:none;';
    i.src = 'http://tuchuang.duapp.com/drag';
    
    
    c = document.createElement('div');
    c.innerHTML = '&#x5173;&#x95ED';//关闭
    c.style.cssText = [
         ''
        ,'width:40px'
        ,'box-shadow:0 0 2px #333'
        ,'position:absolute'
        ,'top:0'
        ,'left:-40px'
        ,'line-height:25px'
        ,'padding:0'
        ,'margin:0'
        ,'border-radius:0'
        ,'border:none'
        ,'background:#515151'
        ,'z-index:99999'
        ,'text-align:center'
        ,'color:#aaa'
        ,'cursor:pointer'
        ,''
    ].join(';');
    c.addEventListener('click',clickHandler);

    d = document.createElement('div');
    d.style.cssText = [
         ''
         ,'width:258px'
         ,'height:258px'
         ,'box-shadow:0px 10px 10px #333333'
         ,'position:fixed'
         ,'top:0'
         ,'right:0'
         ,'z-index:1000000'
         ,'font-family:arial,sans-serif'
         ,'padding:0'
         ,'margin:0'
         ,'border-radius:0'
         ,'background:#515151'
         ,''
    ].join(';');
    d.appendChild(c);
    d.appendChild(i);
    document.body.appendChild(d);
    window.weibotuchuangbyzythum = d;

})(window);