﻿<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%
	String bp = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ request.getContextPath();
%>
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <!-- 页面编码模式 -->
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width,initial-scale=1.0,maximum-scale=1.0,user-scalable=0" />
    <!--safari私有meta标签，它表示：允许全屏模式浏览-->
    <meta content="yes" name="apple-mobile-web-app-capable" />
    <!--iphone的私有标签，它指定的iphone中safari顶端的状态条的样式-->
    <meta content="black" name="apple-mobile-web-app-status-bar-style" />
    <title>中秋节快乐</title>
    <link href="<%=bp%>/css/index.css" rel="stylesheet">
    <link href="<%=bp%>/css/common.css" rel="stylesheet">
    <link href="<%=bp%>/css/style.css" rel="stylesheet">
</head>

<body>
    <!-- 背景 div-->
    <div class="container" id="container-bg" style="background-image: url(<%=bp%>/img/back.png)">

        <div id="lantern" style="background-image: url(<%=bp%>/img/latern.png)">

        </div>

        <div class="box">
            <div id="dialogBg"></div>
            <div id="dialog" class="animated">
                <img class="dialogIco" width="50" height="50" src="<%=bp%>/img/ico.png" alt="" />
                <div class="dialogTop">
                    <p style="font-size: 13px;text-align: center;margin-top: 15px;color:red;">恭喜您！您中奖啦！<br/>请您填写您的姓名和手机号码<br/>以便我们稍后联系您。</p>
                    <a href="javascript:;" class="claseDialogBtn">关闭</a>
                </div>
                <form action="" method="post" id="editForm">
                    <ul class="editInfos">
                        <li><label><font color="#ff0000">* </font>姓名：<input type="text" name="" required value="" class="ipt" id="username"/></label></li>
                        <li><label><font color="#ff0000">* </font>手机：<input type="text" name="" required value="" class="ipt" id="phone"/></label></li>
                        <li id="tijiao">
                            <input id="info_submit" type="button" value="提交号码" class="submitBtn"/>
                        </li>
                    </ul>
                </form>
            </div>
        </div>

        <!-- audio -->
        <div class="rotate audio">
            <audio src="<%=bp%>/audio/bg-music.mp3" id="media" autoplay loop preload></audio>
        </div>

        <!--游戏介绍-->
        <div class="intro">
            <img src="<%=bp%>/img/intro.svg"/>
            <span>游戏介绍</span>
        </div>

        <div id="tab-box" style="display:none;z-index:10;">
            <div class="tabs">
                <input type="radio" id="tab1" name="tab-control" checked>
                <input type="radio" id="tab2" name="tab-control">
                <div id="tab-close" style="float:right;padding-right:10px;padding-top:10px;">关闭</div>
                <ul>
                    <li title="Features">
                        <label for="tab1" role="button">
                            <span>游戏介绍</span>
                        </label>
                    </li>
                    <li title="Delivery Contents">
                        <label for="tab2" role="button">
                            <span>我的奖品</span>
                        </label>
                    </li>
                </ul>
                <div class="content">
                    <section>
                        <div>
                            <p style="margin-left:20px; color:red">活动奖品</p>
                            <p style="margin-left:25px;">一等奖: 价值100元礼包<br/>二等奖: 价值50元礼包<br/>三等奖: 价值10元礼包</p>

                            <p style="margin-left:20px; color:red">活动时间</p>
                            <p style="margin-left:25px;">2017年9月1号 -- 2017年9月30号</p>

                            <p style="margin-left:20px; color:red">主办单位</p>
                            <p style="margin-left:25px;">本次活动由XXX公司赞助，一切权利归XXX公司说明！</p>

                            <p style="margin-left:20px; color:red">兑奖说明</p>
                            <p style="margin-left:25px;">每人每天只可签到一次，在活动期间，能量值达到100的前200名<br/>用户可以获取XXX精美商品一份。</p>
                        </div>
                    </section>

                    <section>
                        <p style="padding-left: 20px;">
                            您暂时还未中奖！
                        </p>
                    </section>
                </div>
            </div>
            <div>

            </div>
        </div>

        <div id="tree">
            <img id="tree_image" src="<%=bp%>/img/tree-1.png"/>
        </div>

        <div id="energe">鸿运值<br/>&nbsp;&nbsp;&nbsp;<span id="energy_num"></span></div>
        <div id="jqmeter-container"></div>

        <a href="javascript:void(0)" class="myButton" id="btn-jiaoshui">立刻浇水</a>
        <a href="javascript:void(0)" class="myButton" id="btn-canyu">立刻参与</a>

    </div>

    <script src="<%=bp%>/js/jquery-2.1.4.min.js"></script>
    <script src="http://res.wx.qq.com/open/js/jweixin-1.2.0.js"></script>
    <script src="<%=bp%>/js/Utils.js"></script>
    <script src="<%=bp%>/js/sharecontent.js"></script>
    <script src="<%=bp%>/js/jqmeter.min.js"></script>
    <script src="<%=bp%>/js/js.js"></script>

    <script type="text/javascript">
        // 音乐播放
        function autoPlayMusic() {
            // 自动播放音乐效果，解决浏览器或者APP自动播放问题
            function musicInBrowserHandler() {
                musicPlay(true);
                document.body.removeEventListener('touchstart', musicInBrowserHandler);
            }
            document.body.addEventListener('touchstart', musicInBrowserHandler);

            // 自动播放音乐效果，解决微信自动播放问题
            function musicInWeixinHandler() {
                musicPlay(true);
                document.addEventListener("WeixinJSBridgeReady", function () {
                    musicPlay(true);
                }, false);
                document.removeEventListener('DOMContentLoaded', musicInWeixinHandler);
            }
            document.addEventListener('DOMContentLoaded', musicInWeixinHandler);
        }
        function musicPlay(isPlay) {
            var audio = document.getElementById('media');
            if (isPlay && audio.paused) {
                audio.play();
            }
            if (!isPlay && !audio.paused) {
                audio.pause();
            }
        }
        autoPlayMusic();
    </script>

</body>

</html>