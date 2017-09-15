//var openid = decodeURI(location.search('?')[1].split('=')[1]),
  //  sendid;
var appId = 'wx0033267d6d347c18';
var currentUrl = location.href.split("#")[0];
var openid = decodeURI(currentUrl.split('?')[1].split('&')[0].split('=')[1]);
var headimg = decodeURI(currentUrl.split('?')[1].split('&')[1].split('=')[1]);
var nickname;
var share_url = 'http://npxfxn.cn/zqweb/views/sharecontent.jsp'
var redirect_url = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid='+ appId 
                    +'&redirect_uri=' + share_url
                    +'&response_type=code&scope=snsapi_userinfo&state=' + openid


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


$(function(){
    AccessUser();
    console.log(openid);
    console.log(headimg);
    $("#friend_img").attr('src', headimg);
    //$("#invite_name").html('好友 ' + nickname + ' <br/> 邀请您进入游戏！');
    $("#btn").attr('href', redirect_url);
})


// 获取code账号
function getCode(){
    var search_code = window.location.search;
    console.log(search_code);
    // url 无search内容
    if(!search_code){
        getConnectWechat();
    }else{
        //截取code & 发送
        AccessCode();
    }
}

function AccessUser() {
    var url = "http://www.npxfxn.cn/zqtree/user/obtainUserInfo";
    var data = {
    	open_id : openid
    };
    var successCallback = function(data) {
    	console.log(data);
	nickname = data.detail.user.nickname;
	headimg = data.detail.user.headimgurl;
    }
    Utils.ajax(url,false,data,successCallback,null);
}

// 点击关闭按钮，关闭tab
$("#tab-close").on("click",function () {
    $("#tab-box").hide();
})

$(".intro").on("click",function () {
    $("#tab-box").show();
})


//$("#btn").attr('href',"http://www.npxfxn.cn/zqweb/views/main.jsp?openid="+openid);