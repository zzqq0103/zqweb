/**
 * Created by 张强 on 2017-09-02.
 * 中秋节项目sharecontent页面js内容
 */


var reg = new RegExp('"',"g");  
var appId = 'wx0033267d6d347c18';
var currentUrl = location.href.split("#")[0]; // 当前页面url，不包含#号之后的内容
var openid = decodeURI(currentUrl.split('?')[1].split('&')[0].split('=')[1]);
// console.log(openid);
var senderopenid = decodeURI(currentUrl.split('?')[1].split('&')[1].split('=')[1]);
var img = decodeURI(currentUrl.split('?')[1].split('&')[2].split('=')[1]);
// console.log(headimg);
var energy = 0;


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
    // console.log(x);
    if(x<25){
        $("#tree_image").attr("src","/zqweb/img/tree-" + 1 + ".png");
    }else if(x>=25 && x<50) {
        $("#tree_image").attr("src","/zqweb/img/tree-" + 2 + ".png");
    }else if (x>500 && x<75){
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


// 立即浇水
function addEnergyForSender(){
    var url = "http://www.npxfxn.cn/zqtree/user/assist";
    var data = {
        sender : openid.replace(reg,''),
        receiver: senderopenid.replace(reg,'')
    };
    var successCallback = function (data) {
        if(data.detail.flag){
            if(data.detail.energe >= 100){
                showMsg('您已为TA助力成功！','center');
                return;
            }
            $("#energy_num").text(''+data.detail.energy+'');
            setjindutioa(data.detail.energy);
            checkTree(data.detail.energy);
        }else{
            if(data.errorCode == 'success'){
                showMsg('您已为TA助力成功','center');
            }else{
                showMsg('为TA助力成功','center');
            }
        }
    };
    Utils.ajax(url,false,data,successCallback,null);
}

// 初始化
 $(function() {
     getInitEnerge();
 })

// 立即签到按钮点击
$("#btn-jiaoshui").on("click",function () {
    // 增加能量
    addEnergyForSender();
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

//关闭弹窗
$('.claseDialogBtn').click(function(){
    $('#dialogBg').fadeOut(300,function(){
        $('#dialog').addClass('bounceOutUp').fadeOut();
    });
});

// 点击关闭按钮，关闭tab
$("#btn-canyu").on("click",function () {
    window.location.href="http://npxfxn.cn/zqweb/views/main.jsp?openid="+openid+"&img="+img;
})



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

