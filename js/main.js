/**
 * Created by 张强 on 2017-09-02.
 * 中秋节项目main页面js内容
 */


var reg = new RegExp('"',"g");  
var appId = 'wx0033267d6d347c18';
var currentUrl = location.href.split("#")[0]; // 当前页面url，不包含#号之后的内容
var openid = decodeURI(currentUrl.split('?')[1].split('&')[0].split('=')[1]);
// console.log(openid);
var headimg = decodeURI(currentUrl.split('?')[1].split('&')[1].split('=')[1]);
// console.log(headimg);
var energy = 0;
var timestamp,
    signature,
    nonceStr;


//  设定进度条
function setjindutioa(energy){
    // console.log("设定进度函数");
    var allEnergy = energy*10;
    // console.log("allEnergy: "+allEnergy);
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
            raised:''+allEnergy,
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
    if(x<25){
        $("#tree_image").attr("src","/zqweb/img/tree-" + 1 + ".png");
    }else if(x>=25 && x<50) {
        $("#tree_image").attr("src","/zqweb/img/tree-" + 2 + ".png");
    }else if (x>50 && x<75){
        $("#tree_image").attr("src","/zqweb/img/tree-" + 3 + ".png");
    } else if(x>=75 && x<95){
        $("#tree_image").attr("src","/zqweb/img/tree-" + 4 + ".png");
    }else{
        $("#tree_image").attr("src","/zqweb/img/tree-" + 5 + ".png");
    }
}

// 页面加载，获取能量值
function getInitEnerge(){
    // console.log("初始进度条");
    var url = "http://www.npxfxn.cn/zqtree/user/initTree";
    var data = {
        open_id : openid.replace(reg,'')
    };
    var successCallback = function(data) {
        // console.log(data);
        energy = data.detail.energy;
        $("#energy_num").text(data.detail.energy);
        setjindutioa(energy);
        checkTree(energy);
    }
    Utils.ajax(url,false,data,successCallback,null);
}

// 配置微信的JDK接口调用，返回值为对象，时间戳信息等等
function configShare (){
    var id = decodeURI(currentUrl.split('?')[1].split('&')[0].split('=')[1]);
    var image = decodeURI(currentUrl.split('?')[1].split('&')[1].split('=')[1]);
    var url = "http://www.npxfxn.cn/zqtree/user/configSDK";
    var mainurl = location.href;
    console.log(mainurl);
    var data = {
        url: mainurl
    };
    var successCallback = function(data) {
        // console.log(data.detail.timestamp+','+data.detail.nonceStr+','+data.detail.signature);
        timestamp = data.detail.timestamp;
        nonceStr = data.detail.nonceStr;
        signature = data.detail.signature;
    }
    Utils.ajax(url,false,data,successCallback,null);
}

// 立即签到
function addEnergy(){
    var url = "http://www.npxfxn.cn/zqtree/user/sign";
    var data = {
        open_id : openid.replace(reg,'')
    };
    var successCallback = function (data) {
        if(data.detail.flag){
            if(data.detail.energe >= 100){
                showMsg('您已经完成任务！','center');
                return;
            }
            $("#energy_num").text(''+data.detail.energy+'');
            setjindutioa(data.detail.energy);
            checkTree(data.detail.energy);
        }else{
            if(data.errorCode == 'success'){
                showMsg('签到已满','center');
            }else{
                showMsg('签到失败','center');
            }
        }
    };
    Utils.ajax(url,false,data,successCallback,null);
}

// 初始化
 $(function() {
     getInitEnerge();
     configShare();
     console.log(timestamp+','+nonceStr+','+signature);
     wx.config({
        debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        appId: 'wx0033267d6d347c18',
        timestamp: timestamp,
        nonceStr: nonceStr, 
        signature: signature,
        jsApiList: ['onMenuShareTimeline','onMenuShareAppMessage'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
     });
     // 通过ready接口处理成功验证
     wx.ready(function(){
       console.log('getit');
       // 分享到朋友圈
       wx.onMenuShareTimeline({
          title: '中秋节快乐！', // 分享标题
          link: 'http://npxfxn.cn/zqweb/views/share.jsp?'+'openid='+id+'&img='+image, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
          imgUrl: '', // 分享图标
          success: function () {
          },
          cancel: function () {
          }
       });
       
       // 分享到朋友
       wx.onMenuShareAppMessage({
          title: '中秋节快乐！', // 分享标题
          desc: '为他助力', // 分享描述
          link: 'http://npxfxn.cn/zqweb/views/share.jsp?'+'openid='+id+'&img='+image, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
          imgUrl: '', // 分享图标
          type: '', // 分享类型,music、video或link，不填默认为link
          dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
          success: function () {
          // 用户确认分享后执行的回调函数
          },
          cancel: function () {
          // 用户取消分享后执行的回调函数
         }
       });
   });
 })

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
                showMsg('很抱歉，您未能中奖！','center');
            }
        };
        Utils.ajax(url,false,data,successCallback,null);
    }else{
        showMsg('很抱歉，您未游戏。','center');
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


// 游戏介绍按钮
$(".intro").on("click",function () {
    $("#tab-box").css("display","block");
    $("#tab-box").show();
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


// 中奖之后，输入或者修改中奖人姓名 和 电话
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
           $('#dialogBg').fadeOut(200,function(){
           $('#dialog').addClass('bounceOutUp').fadeOut();
          }); 
          setTimeout(showMsg("信息修改成功","center"),1000);
      }else{     
           $('#dialogBg').fadeOut(200,function(){
           $('#dialog').addClass('bounceOutUp').fadeOut();
          });
        setTimeout(showMsg("信息修改失败，请重新输入!","center"),1000);
      }
   
    }
    if(!name || !phone ){
        $('#dialogBg').fadeOut(300,function(){
           $('#dialog').addClass('bounceOutUp').fadeOut();
          });
          setTimeout(showMsg('请填写全部信息','center'),1000);
        return;
    }else{
        Utils.ajax(url,false,data,successCallback,null)
    }
});


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