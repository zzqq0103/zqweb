
// var tempOpenid = localStorage.getItem("openid");
// //console.log(typeof(tempOpenid));
// console.log(tempOpenid);
// var encodeOpenid = encodeURI(tempOpenid);
// //$("#btn").attr('href',"http://www.npxfxn.cn/zqweb/views/main.jsp?openid="+encodeOpenid);
// if(tempOpenid != null){
// 	window.location.href="http://www.npxfxn.cn/zqweb/views/main.jsp?openid="+encodeOpenid ;
// }

var openid,  // 用户唯一ID
    imgUrl,
    flag,
    appId = 'wx0033267d6d347c18'; // 公众号的唯一ID

//预先获取code
!function(){
    console.log(location.search)
    console.log(location.href)
    AccessCode()
}();

// 平台下的音乐播放器（自动播放、暂停/开始)
!function () {
    var e = document.getElementsByClassName("audio")[0], a = function (e, a) {
        var t = new RegExp("(^| )" + a + "( |$)");
        t.test(e.className) || (e.className = e.className.trim() + " " + a)
    }, t = function (e, a) {
        if (!e || 1 != e.nodeType)throw new Error("第一参数ele需要是一个DOM元素对象");
        if ("string" != typeof a)throw new Error("第二参数必须为string类型");
        var t = new RegExp("(?:^| )" + a + "(?: |$)", "g");
        e.className = e.className.replace(t, "").trim()
    };
    e.onclick = function () {
        var n = document.getElementById("media");
        null !== n && (n.paused ? (n.play(), a(e, "rotate")) : (n.pause(), t(e, "rotate")))
    }
}();

function AccessCode() {
    var code = location.search.split('?')[1].split('&')[0].split("=")[1];
    var url = "http://www.npxfxn.cn/zqtree/user/userBinding";
    var data = {
    	code : code
    };
    var successCallback = function(data) {
    	console.log(data);
        openid = data.detail.openid;
        imgUrl = data.detail.headimgurl;
        flag = data.detail.flag;
        redirect_url = "http://www.npxfxn.cn/zqweb/views/main.jsp?openid="+openid+"&img="+imgUrl;
        $("#btn").attr("href",redirect_url);
        if(flag){
            window.location.href=redirect_url;
        }
        else{
            $("#btn_qiandao").attr('href',redirect_url);
        }
    }
    Utils.ajax(url,false,data,successCallback,null);
}

// 点击关闭按钮，关闭tab
$("#tab-close").on("click",function () {
    $("#tab-box").hide();
})

// 游戏介绍图标点击
$(".intro").on("click",function () {
    $("#tab-box").css("display","block");
    $("#tab-box").show();
})




