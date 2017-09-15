 var reg = new RegExp('"',"g");  
 var appId = 'wx0033267d6d347c18';
 var share_url = 'http://npxfxn.cn/webtest/views/share.jsp';
 var currentUrl = location.href.split("#")[0];
 var friend_openid = decodeURI(currentUrl.split('?')[1].split('&')[1].split('=')[1]);
 var openid, imgUrl;
 var energy = 10;


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

$(function() {
    //alert(friend_openid);
    AccessCode();
    if(friend_openid == openid){
    	window.location.href='http://npxfxn.cn/zqweb/views/main.jsp?openid=' + openid + '&img=' + imgUrl;
    }
    $("#btn-canyu").attr('href', 'http://npxfxn.cn/zqweb/views/main.jsp?openid=' + openid + '&img=' + imgUrl);
    getInitEnerge();
})

function setjindutioa(energy){
  console.log("设定进度函数");
  var allEnergy = energy*10;
  console.log("allEnergy: "+allEnergy);
  var screenwidth = document.documentElement.clientWidth;
  var screenheight = document.documentElement.clientHeight;
  if(screenheight < 510 || screenwidth <= 320){
    $('#jqmeter-container').jQMeter({
      goal:'$1,000',
      raised:'%'+allEnergy,
      meterOrientation:'vertical',
      width:'20px',
      height:'120px',
      barColor: 'rgb(255, 26, 26)',
      displayTotal: false,
      animationSpeed: 500
    });
  }else{
    $('#jqmeter-container').jQMeter({
      goal:'1,000',
      raised:'%'+allEnergy,
      meterOrientation:'vertical',
      width:'25px',
      height:'160px',
      barColor: 'rgb(255, 26, 26)',
      displayTotal: false,
      animationSpeed: 500
    });
  }
}

// 根据能量值，变换树的变化
function checkTree(x){
 console.log(x);
 if(x<20){
   $("#tree_image").attr("src","/webtest/img/tree-" + 1 + ".png");
   $("#lantern1").css("background-image","url(http://www.npxfxn.cn:80/zqweb/img/lantern1-1.png)");
   $("#lantern2").css("background-image","url(http://www.npxfxn.cn:80/zqweb/img/lantern2-1.png)");
   $("#lantern3").css("background-image","url(http://www.npxfxn.cn:80/zqweb/img/lantern3-1.png)");
   $("#lantern4").css("background-image","url(http://www.npxfxn.cn:80/zqweb/img/lantern4-1.png)");
 }else if(x>=20 && x<40) {
   $("#tree_image").attr("src","/webtest/img/tree-" + 2 + ".png");
   $("#lantern1").css("background-image","url(http://www.npxfxn.cn:80/zqweb/img/lantern1-2.png)");
   $("#lantern2").css("background-image","url(http://www.npxfxn.cn:80/zqweb/img/lantern2-1.png)");
   $("#lantern3").css("background-image","url(http://www.npxfxn.cn:80/zqweb/img/lantern3-1.png)");
   $("#lantern4").css("background-image","url(http://www.npxfxn.cn:80/zqweb/img/lantern4-1.png)");
 }else if (x>=40 && x<60){
   $("#tree_image").attr("src","/webtest/img/tree-" + 3 + ".png");
   $("#lantern1").css("background-image","url(http://www.npxfxn.cn:80/zqweb/img/lantern1-2.png)");
   $("#lantern2").css("background-image","url(http://www.npxfxn.cn:80/zqweb/img/lantern2-2.png)");
   $("#lantern3").css("background-image","url(http://www.npxfxn.cn:80/zqweb/img/lantern3-1.png)");
   $("#lantern4").css("background-image","url(http://www.npxfxn.cn:80/zqweb/img/lantern4-1.png)");
 } else if(x>=60 && x<80){
   $("#tree_image").attr("src","/webtest/img/tree-" + 4 + ".png");
   $("#lantern1").css("background-image","url(http://www.npxfxn.cn:80/zqweb/img/lantern1-2.png)");
   $("#lantern2").css("background-image","url(http://www.npxfxn.cn:80/zqweb/img/lantern2-2.png)");
   $("#lantern3").css("background-image","url(http://www.npxfxn.cn:80/zqweb/img/lantern3-2.png)");
   $("#lantern4").css("background-image","url(http://www.npxfxn.cn:80/zqweb/img/lantern4-1.png)");
 }else{
   $("#tree_image").attr("src","/webtest/img/tree-" + 5 + ".png");
   $("#lantern1").css("background-image","url(http://www.npxfxn.cn:80/zqweb/img/lantern1-2.png)");
   $("#lantern2").css("background-image","url(http://www.npxfxn.cn:80/zqweb/img/lantern2-2.png)");
   $("#lantern3").css("background-image","url(http://www.npxfxn.cn:80/zqweb/img/lantern3-2.png)");
   $("#lantern4").css("background-image","url(http://www.npxfxn.cn:80/zqweb/img/lantern4-2.png)");
 }
}


function getInitEnerge(){
  console.log("初始进度条");
  var url = "http://www.npxfxn.cn/zqtree/user/initTree";
  var data = {
    open_id : friend_openid
  };
  var successCallback = function(data) {
    console.log(data);
    energy = data.detail.energy;
    $("#energy_num").text(data.detail.energy);
    setjindutioa(energy);
    checkTree(energy);
  }
  Utils.ajax(url,false,data,successCallback,null);
}


function AccessCode() {
    var code = location.search.split('?')[1].split('&')[0].split("=")[1];
    var url = "http://www.npxfxn.cn/zqtree/user/userBinding";
    var data = {
        code : code
    };
    var successCallback = function(data) {
        console.log(data);
        openid = data.detail.openid;
        imgUrl =  data.detail.headimgurl;
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

//$(".share").on("click",function () {
 // shareMsg('点击右上角分享快乐！','center');
//})

$("#btn-jiaoshui").on('click', function(){
  console.log("assist");
  var url = "http://www.npxfxn.cn/zqtree/user/assist";
  var data = {
    sender : openid,
    receiver : friend_openid
  };
  var successCallback = function(data) {
    if (data.detail.flag == 1) {
	$("#energy_num").text(data.detail.energy);
	setjindutioa(data.detail.energy);
	checkTree(data.detail.energy);
	showMsg('助力成功！', 'center');
} else if (data.detail.flag == 2) {s
	showMsg('他已经完成任务！', 'center');
} else {
	showMsg('已经为他助力过！', 'center');
}
  }
  Utils.ajax(url,false,data,successCallback,null);
})