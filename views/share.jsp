﻿<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
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
    <link href="<%=bp%>/css/style.css" rel="stylesheet">
    <link rel="stylesheet" href="<%=bp%>/css/jquery-weui.css">
</head>

<body onload="shareLoad()">
    <!-- 背景 div-->
    <div class="container" id="container-bg">

        <div class="content">
            <div class="image-avatar">
                <img id="avatar"/>
            </div>
            <p class="name"><br/> 邀请您进入游戏！</p>
            <!--<p class="info-invite"></p>-->
        </div>

        <!-- audio -->
        <div class="rotate audio">
            <audio src="<%=bp%>/audio/bg-music.mp3" id="media" autoplay loop preload></audio>
        </div>

        <div id="tab-box" style="display:none;">
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

        </div>

        <div id="info-div">

        </div>


        <!--游戏介绍-->
        <div class="intro">
            <img src="<%=bp%>/img/intro.svg"/>
            <span>游戏介绍</span>
        </div>

        <a class="myButton" id="btn">立即开始</a>

    </div>

    <script src="<%=bp%>/js/jquery-2.1.4.min.js"></script>
    <script src="<%=bp%>/js/Utils.js"></script>
    <script src="http://res.wx.qq.com/open/js/jweixin-1.2.0.js"></script>
    <script src="<%=bp%>/js/jquery-weui.js"></script>
    <script src="<%=bp%>/js/share.js"></script>
    <script src="<%=bp%>/js/js.js"></script>


</body>

</html>