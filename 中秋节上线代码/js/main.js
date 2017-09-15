/**
 * Created by 张强 on 2017-09-02.
 * 中秋节项目页面 内容页js内容
 */


 var reg = new RegExp('"',"g");  
 var appId = 'wx0033267d6d347c18';
 var share_url = 'http://npxfxn.cn/webtest/views/share.jsp';
 var currentUrl = location.href.split("#")[0];
 var openid = decodeURI(currentUrl.split('?')[1].split('&')[0].split('=')[1]);
 var headimg = decodeURI(currentUrl.split('?')[1].split('&')[1].split('=')[1]);
 var redirect_url = 'http://npxfxn.cn/zqweb/views/share.jsp' + '?openid=' + openid + '&headimg=' + headimg;
 var energy = 10;
 var local_energy;

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




// 页面加载，获取能量值
function getInitEnerge(){
  console.log("初始进度条");
  var url = "http://www.npxfxn.cn/zqtree/user/initTree";
  var data = {
    open_id : openid.replace(reg,'')
  };
  var successCallback = function(data) {
    console.log(data);
    energy = data.detail.energy;
    local_energy = data.detail.energy;
    $("#energy_num").text(data.detail.energy);
    setjindutioa(energy);
    checkTree(energy);
  }
  Utils.ajax(url,false,data,successCallback,null);
}



// 进度条的初始化
$(function() {
 getInitEnerge();
})




// 配置微信的JDK接口调用，返回值为对象，时间戳信息等等
$(function(){
  var id = decodeURI(currentUrl.split('?')[1].split('&')[0].split('=')[1]);
  var image = decodeURI(currentUrl.split('?')[1].split('&')[1].split('=')[1]);
  var url = "http://www.npxfxn.cn/zqtree/user/configSDK";
  var mainurl = "http://www.npxfxn.cn/zqweb/views/main.jsp?openid="+id+"&img="+image;
  console.log("http://www.npxfxn.cn/zqweb/views/main.jsp?openid="+id+"&img="+image);
  console.log("urlcurrent: "+ currentUrl );
  var data = {
    url: currentUrl
  };
  var successCallback = function(data) {
    // 注册微信config分享
    console.log(data.detail.timestamp+','+data.detail.nonceStr+','+data.detail.signature);
    wx.config({
           debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
           appId: 'wx0033267d6d347c18',
           timestamp: data.detail.timestamp,
           nonceStr: data.detail.nonceStr, 
           signature: data.detail.signature,
           jsApiList: ['onMenuShareTimeline','onMenuShareAppMessage'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
         });
  }
  wx.ready(function(){
    console.log('getit');
    wx.onMenuShareTimeline({
           title: '遇见你的海湾秋月', // 分享标题
           link: redirect_url, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
           imgUrl: 'http://www.npxfxn.cn/zqweb/img/logo.jpg', // 分享图标
           success: function () {
            console.log('MenuShare');
          },
          cancel: function () {
           console.log('MenuShare');
         }
       });
    wx.onMenuShareAppMessage({
          title: '遇见你的海湾秋月', // 分享标题
          desc: '海湾秋月，祈福种树，赢取丰厚奖品！', // 分享描述
          link: redirect_url, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
          imgUrl: 'http://www.npxfxn.cn/zqweb/img/logo.jpg', // 分享图标
          type: 'link', // 分享类型,music、video或link，不填默认为link
          dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
          success: function () { 
            //alert('finished')
              // 用户确认分享后执行的回调函数
            },
            cancel: function () { 
              //alert('canceled')
              // 用户取消分享后执行的回调函数
            }
    });
  });
  Utils.ajax(url,false,data,successCallback,null);
});


//  设定进度条
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




// 立即签到
function addEnergy(){
    //alert(openid);
    console.log(openid);
    var url = "http://www.npxfxn.cn/zqtree/user/sign";
    var data = {
      open_id : openid.replace(reg,'')
    };
    var successCallback = function (data) {
      if(data.detail.flag == "1"){
        $("#energy_num").text(data.detail.energy);
	local_energy = data.detail.energy;
        setjindutioa(data.detail.energy);
        checkTree(data.detail.energy);
        showMsg("签到成功","center");
      } else if (data.detail.flag == "2"){
        showMsg('您已经完成任务！','center');
      } else {
        showMsg('今天已经签到过！','center');
      }
    };
    Utils.ajax(url,false,data,successCallback,null);
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




// 中奖查询
function queryPrize(){
  if(typeof(openid) != undefined){
    var url = "http://www.npxfxn.cn/zqtree/user/rank";
    var data = {
      open_id : openid.replace(reg,'')
    };
    var successCallback = function (data) {
      if(data.detail.flag){
        className = $("#btn-start").attr('id');
        $('#dialogBg').fadeIn(300);
        $('#dialog').removeAttr('class').addClass('animated '+className+'').fadeIn();
      }else{
	if(local_energy==100){
            showMsg('很抱歉，您未能中奖！','center');
	}
	else{
	    showMsg('您的鸿运值未满','center');
	}
      }
    };
    Utils.ajax(url,false,data,successCallback,null);
  }else{
    showMsg('很抱歉，您未参与游戏。','center');
    location.assign("index.html");
  }
}



// 立即签到按钮点击
$("#btn-qiandao").on("click",function () {
    // 增加能量
    addEnergy();
  })



// 点击关闭按钮，关闭tab
$("#tab-close").on("click",function () {
  $("#tab-box").hide();
})




$(".intro").on("click",function () {
  $("#tab-box").css("display","block");
  $("#tab-box").show();
})

$(".share").on("click",function () {
  shareMsg('点击右上角分享快乐！','center');
})


// 中奖查询按钮点击
$("#btn-query").on("click",function () {
    // 中奖查询
    queryPrize();
  })




//关闭弹窗
$('.claseDialogBtn').click(function(){
  $('#dialogBg').fadeOut(300,function(){
    $('#dialog').addClass('bounceOutUp').fadeOut();
  });
});



$("#info_submit").on("click",function () {
  var name = $("#username").val();
  var phone = $("#phone").val();
  var url = "http://www.npxfxn.cn/zqtree/user/updateRankInfo";
  var data = {
    open_id : openid.replace(reg,''),
    phone : phone,
    name : name
  };
  var successCallback = function (data) {
    if(data.detail.flag){
     $('#dialogBg').fadeOut(300,function(){
       $('#dialog').addClass('bounceOutUp').fadeOut();
     }); 
     showMsg("信息修改成功","center");
   }else{     
     $('#dialogBg').fadeOut(300,function(){
       $('#dialog').addClass('bounceOutUp').fadeOut();
     });
     showMsg("信息修改失败，请重新输入!","center");
   }
   
 }
 if(!name || !phone ){
  $('#dialogBg').fadeOut(300,function(){
   $('#dialog').addClass('bounceOutUp').fadeOut();
 });
  showMsg('请填写全部信息','center');
  return;
}else{
  Utils.ajax(url,false,data,successCallback,null)
}
});


