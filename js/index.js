
// 获取到用户的唯一的openid 
var useropenid = localStorage.getItem("openid");
var userimg = localStorage.getItem("userimg");
console.log("useropenid:"+useropenid);
console.log("userimg:"+userimg);
// 为了不让重复调用微信的获取token调用。
var guard = localStorage.getItem("guard"); 
var search = location.href.split("?")[1];
if(guard){
    if(useropenid && userimg){
        console.log("直接进入main页面");
        //alert("直接进入main页面");
        var encodeOpenid = encodeURI(useropenid);
        window.location.href="http://www.npxfxn.cn/zqweb/views/main.jsp?openid="+encodeURI(useropenid)+"&img="+encodeURI(userimg);
    }else{
        if(search && search.split('=')[0] == 'code'){
            console.log("guard为真但是没有openid 和 用户头像存储，并且url地址后面跟有code字段");
            //alert("guard为真但是没有openid 和 用户头像存储，并且url地址后面跟有code字段");
            AccessCode();        
        }else{
            console.log("guard为真但是没有openid 和 用户头像存储，而且url地址后面没有code字段可供截取，所以直接重调微信的接口");
            //alert("guard为真但是没有openid 和 用户头像存储，而且url地址后面没有code字段可供截取，所以直接重调微信的接口");
            getConnectWechat();
        }
    }    
}else{
    console.log("guard 为假，重调微信函数");
    //alert("guard 为假，重调微信函数");
    getConnectWechat();
}

function getConnectWechat(){
    // 微信公众号唯一的appid
    var appId = 'wx0033267d6d347c18'; // 公众号的唯一ID
    var redirect_url = 'http://npxfxn.cn/zqweb/views/index.jsp';
    localStorage.setItem("guard",true);
    window.location.href = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=" + appId + "&redirect_uri=" + redirect_url + "&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect";
}

function AccessCode() {
    var code = location.search.split('?')[1].split('&')[0].split("=")[1];
    var url = "http://www.npxfxn.cn/zqtree/user/userBinding"; // 获取用户信息接口（openid & headimg）
    var data = {
    	code : code
    };
    //  成功回调函数
    var successCallback = function(data) {
        localStorage.setItem("userimg",JSON.stringify(data.detail.headimgurl));
        localStorage.setItem("openid",JSON.stringify(data.detail.openid));
	    var urlopenid = encodeURI(JSON.stringify(data.detail.openid));
        var img = encodeURI(JSON.stringify(data.detail.headimgurl));
        $("#btn").attr('href',"http://www.npxfxn.cn/zqweb/views/main.jsp?openid="+urlopenid+"&img="+img);
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

// 平台下的音乐播放器（自动播放、暂停/开始) ，js中最后加载
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


