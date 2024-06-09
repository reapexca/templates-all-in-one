var kbook = kbook || {};
kbook.bid = 0,    //书ID
kbook.uid = 0,
kbook.count = 1,        //当前第N章
kbook.curcid = 0,    //当前章节ID
kbook.nextcid = 0,        //下一章ID
kbook.prevcid = 0,        //上一章ID
kbook.lastcid = 0,        
kbook.lastvip = 0,
kbook.islocal = false,  //是否离线
kbook.sindex = [],
kbook.cindex = [],
kbook.bookname = "",
kbook.logflag = 0,
kbook.host = "../../../open.kanshu.com/ks_book/chapter/offLineLists@app_key=3838723524",
kbook.int = function(){
    if(typeof ks_bkid != "undefined")kbook.bid = ks_bkid;
    if(typeof ks_cid != "undefined")kbook.curcid = ks_cid;
    if(typeof ks_uid != "undefined")kbook.uid = ks_uid;
    if(typeof ks_loginflag != "undefined")kbook.logflag = ks_loginflag;
	var href = window.location.href;
	var cid = href.split("#")[1];
	if(cid)kbook.curcid = cid;		//解决刷新问题
    kbook.request(kbook.bid,kbook.curcid,kbook.processChapter,1);
    $("#t-b-n, #btn_next").on("click",kbook.getNextChap);
    $("#t-b-p, #btn_prev").on("click",kbook.getPrevChap);
    $("#t-b-o").on("click",kbook.getChapters);
},
kbook.getNextChap = function(){
    var content = "", ctitle = "";
    var p = /^[0-9]{1,10}/;
	var href = window.location.href;
    if((kbook.count+1)>=kbook.logflag && !kbook.uid){
        var cid = href.split("#")[1] || kbook.nextcid;
        var url = ks_host+'/content/'+kbook.bid +'-'+ cid +'.html@h5login=1';
		window.location.href = url;
        return 1;
    }
    if(kbook.lastcid == kbook.nextcid && kbook.lastvip){
        return 1;
    }
    if(!kbook.islocal){
        var localchap = kbook.readNext("kschapter",1);
        if(localchap){
            if(localchap.title){
                ctitle = localchap.title;
                content = localchap.content;
                kbook.count = localchap.order+1;
				if(kbook.bid=="12881")kbook.count-=25;
                kbook.showChapter(ctitle,kbook.bookname,content);
				window.location.href = href.split("#")[0] + "#" + kbook.curcid;
            }
        }
    }else{
        var localchaps = kbook.readNext("kschapters",0);
        if(localchaps){
            var curchap = kbook.findChap(localchaps,1);
            if(curchap.title){
                ctitle = curchap.title;
                content = curchap.content;
                kbook.count = parseInt(curchap.order)+1;
				if(kbook.bid=="12881")kbook.count-=25;
                kbook.showChapter(ctitle,kbook.bookname,content);
				window.location.href = href.split("#")[0] + "#" + kbook.curcid;
                rtools.hide();
                $(window).scrollTop(0);
                return !1
            }
        }
    }
    if(kbook.nextcid != "")kbook.request(kbook.bid,kbook.nextcid,kbook.processChapter,1);
    rtools.hide();
    $(window).scrollTop(0);
    kbook.recentRead();
    return !1
},
kbook.findChap = function(chaps,type){
    var nextcid = kbook.nextcid;
    var chaparr = kbook.cindex;
    var result;
    if(chaps.length>0){
        for(var i=0;i<chaps.length;i++){
            if(nextcid==chaps[i].id){
                for(var j=0;j<chaparr.length;j++){
                    if(nextcid==chaparr[j] && kbook.islocal){
                        var b = j+1;
                        kbook.prevcid = kbook.curcid;
                        kbook.curcid = kbook.nextcid;
                        kbook.nextcid = (b>=chaparr.length)? kbook.lastcid : chaparr[b];
                        break;
                    }
                }
                return chaps[i];
            }
        }
        kbook.islocal = false;
    }else return !1;
},
kbook.getPrevChap = function(){
    kbook.request(kbook.bid,kbook.prevcid,kbook.processChapter,1);
    rtools.hide();
    $(window).scrollTop(0);
    return !1
},
kbook.getChapters = function(){
    var html = '<p class="t_c"><br>正在离线后续20章...</p>';
    rtools.offline.hide();
    rtools.tips.getmsg(html);
    rtools.tips.show();
    kbook.request(kbook.bid,kbook.curcid,kbook.processChapter,0);
},
kbook.showChapter = function(a,b,c){
	var href = window.location.href;
	window.location.href = href.split("#")[0] + "#" + kbook.curcid;
    if(c)var c = c.replace(new RegExp("\n","g"),"<br>");
    $("#chaptitle").html(a);
    $("#chapbname").html(b);
    $("#chapcont").html(c);
    kbook.pagebtn();
	kbook.recentRead();
},
kbook.pagebtn = function(){
	var prevurl = ks_host+"/content/"+kbook.bid+"-"+kbook.prevcid+".html";
	var nexturl = ks_host+"/content/"+kbook.bid+"-"+kbook.nextcid+".html";
	if(kbook.prevcid==0)prevurl = ks_host+"/content/"+kbook.bid+".html";
	$("#t-b-n, #btn_next").each(function(){
		$(this).attr("href",nexturl)
	});
	$("#t-b-p, #btn_prev").each(function(){
		$(this).attr("href",prevurl)
	});
},
kbook.request = function(bid,cid,callback,type){
    var options = {
        type:"GET",
        dataType:"jsonp",
        url:kbook.host,
        data:{book_id:bid,chapter_id:cid,single_chapter:type},
        success:callback,
        error:null
    };
    $.ajax(options);
},
kbook.processChapter = function(data){
    var json = data,  
        request = json.result.status.code,
        msg = json.result.status.msg;
    var p = /^[0-9]{1,10}/;
    if(0 == request){
        var bkname = json.result.book_title || "",
            lastvip = json.result.last_chapter_vip,
            chaparr = json.result.chapter_id_index || [],
            chapdata = json.result.data || [];
        kbook.bookname = bkname;
        kbook.lastvip = lastvip;
        if(chaparr.length>0){
            if(chaparr.length<=2){
                kbook.sindex = chaparr;
                $("#t-b-n, #btn_next").off();
                $("#t-b-p, #btn_prev").off();
            }else if(chaparr.length==3){
                var content = chapdata[0].content;
                var ctitle = chapdata[0].title;
                kbook.sindex = chaparr;
                kbook.count = parseInt(chapdata[0].order)+1;
				if(kbook.bid=="12881")kbook.count-=25;
                kbook.prevcid = chaparr[0];
                kbook.curcid = chaparr[1];
                kbook.nextcid = chaparr[2];
                kbook.lastcid = chaparr[2];
                kbook.showChapter(ctitle,bkname,content);
            }else if(chaparr.length==4){
                var content = chapdata[0].content;
                var ctitle = chapdata[0].title;
                kbook.count = parseInt(chapdata[0].order)+1;
				if(kbook.bid=="12881")kbook.count-=25;
                kbook.sindex = chaparr;
                kbook.prevcid = chaparr[0];
                kbook.curcid = chaparr[1];
                kbook.nextcid = chaparr[2];
                kbook.lastcid = chaparr[3];
                kbook.showChapter(ctitle,bkname,content);
                kbook.restoreNext("kschapter",chapdata[1]);
            }else{
                kbook.islocal = true;
                kbook.cindex = chaparr;
                kbook.curcid = chaparr[0];
                kbook.nextcid = chaparr[1];
                kbook.lastcid = chaparr[chaparr.length-1];
                //var min = kbook.count+1, max = kbook.count+20;
                var html = '<p class="t_c"><br>离线成功(已缓存后续20章)</p>';
                kbook.restoreNext("kschapters",chapdata);
                //$("#t-o-c").show();
                rtools.offline.hide();
                rtools.tips.getmsg(html);
                rtools.tips.show();
            }
        }
    }else{
        alert(msg)
    }
},
kbook.recentRead = function(){
    var api_recent = ks_host + "/usercenter/addH5read";
    $.ajax({
        type: "GET",
        dataType: "jsonp",
        url: api_recent,
        data: {uid:kbook.uid, articleid:kbook.bid, chapterid:kbook.curcid},
        success: function(data) {
        }
    });
},
kbook.restoreNext = function(key,chap){
    if(key=="" && typeof key == undefined)return;
    var str = JSON.stringify(chap);
    if(str)window.localStorage.setItem(key,str)
    else return !1;
},
kbook.readNext = function(key){
    var last = window.localStorage.getItem(key);
    if(last)return JSON.parse(last);
    else return !1;
};
kbook.int();