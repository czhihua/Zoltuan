'use strict';

$(function () {

    // 跳转首页
    tiaozhuang();
    // //下拉菜单--全部分类那
    pullDown('hnav-menu', 'sub-Menus', 'onmouseover');

    // 获取页面高度,侧边栏
    function sideH() {
        var sH = $(window).height();
        $('.sidebar').css('height', sH);
        $('.sidebar-nav li').css('height', sH);
        $('.sidebar-nav').css('height', sH);
        $(window).resize(function () {
            sH = $(window).height();
            $('.sidebar').css('height', sH);
            $('.sidebar-nav li').css('height', sH);
            $('.sidebar-nav ').css('height', sH);
        });
    }
    sideH();
    // 侧边栏
    //触摸出现
    $('.tabbox div').hover(function () {
        $(this).find('span').stop().animate({ 'left': '-80px' });
    }, function () {
        $(this).find('span').stop().animate({ 'left': '37px' });
    });

    function sideLI() {
        var ist = true;
        var iis = false;
        $('.tabbox').on('click', 'div', function () {
            if (ist) {
                $('#sidebar').stop().animate({ 'right': 0 });
                var index = $(this).index();
                $('.tabbox div').attr('data-a', '');
                $(this).attr('data-a', index + 1);
                $('.sidebar-nav li').css({ 'top': '100%', 'opacity': 0 });
                $('.sidebar-nav li').eq($(this).index()).stop().animate({ 'top': '0', 'opacity': 1 });
                iis = true;
            } else {
                $('#sidebar').stop().animate({ 'right': '-253px' });
                ist = true;
            }
        });

        $('.tabbox div').on('click', function () {
            if (iis) {
                var data = $(this).attr('data-a');
                var datai = $(this).index() + 1;
                console.log(data, datai);
                if (data == datai) {
                    ist = false;
                } else {
                    $(this).stop().animate({});
                }
                $('.tabbox div').attr('data-a', '');
            }
        });

        $('.sn-btn').on('click', function () {
            $('#sidebar').stop().animate({ 'right': '-253px' });
            ist = true;
            $('.tabbox div').attr('data-a', '');
        });
    }
    sideLI();

    function getURL() {
        var storages = window.localStorage;
        var res = storages.getItem('username');
        // console.log(res0);
        // var res = cookie.get('name');
        // console.log(res);
        if (res) {
            // var res1 = res0.split('=')[1];
            $('.ht-login').find('i').text('您好，' + res);
            $('.ht-login').find('a').css('display', 'none');
            $('.ht-res').css('display', 'none');
            $('.ht-quit').css('display', 'inline');
            // 获取购物车数据
            $.ajax({
                type: 'post',
                url: '../api/goodlist.php',
                data: {
                    dbsql: 'cart',
                    user: res
                },
                success: function success(str) {
                    var arr = JSON.parse(str);
                    $('.ht-nav li:eq(2)').find('a').html('购物车' + arr.total1 + '件');
                    $('.qe-cart').find('em').html(arr.total1);
                    $('.ht-nav li:eq(2)').on('click', function () {
                        location.href = 'cart.html';
                    });
                    $('.qe-cart').on('click', function () {
                        location.href = 'cart.html';
                    });
                }
            });
        } else {
            $('.ht-login').find('i').text('Hi~欢迎来到Z商城，请');
            $('.ht-login').find('a').css('display', 'inline');
            $('.ht-res').css('display', 'inline');
            $('.ht-quit').css('display', 'none');

            // 未登陆状态下的购物车按钮
            // 未登陆状态下的购物车按钮
            $('.qe-cart').on('click', function () {
                var site = window.location.pathname;
                var site1 = window.location.search;
                location.href = 'login.html?' + site + site1;
            });

            $('.ht-nav li:eq(2)').on('click', function () {
                var site = window.location.pathname;
                var site1 = window.location.search;
                location.href = 'login.html?' + site + site1;
            });
        }
    }

    getURL();

    //退出登录 logout
    logout();

    // 获取地址栏的上的id
    function uid() {
        var url = window.location.search;
        if (url) {
            var url1 = url.substring(1);
            var arr = url1.split('=');
            $.ajax({
                type: 'post',
                url: '../api/detail.php',
                data: {
                    dbsql: 'rush',
                    id: arr[1]
                },
                success: function success(str) {
                    var arr = JSON.parse(str);
                    var data = arr[0];
                    var imgs = [data.pic, data.pic1];
                    var images = '';
                    for (var i = 0; i < imgs.length; i++) {
                        images += '<li class="">\n                            <div class="small-img">\n                                <img src="../img/' + imgs[i] + '" />\n                            </div>\n                        </li>';
                    }

                    $('.animation03').html(images);
                    $('.animation03 li').eq(0).attr('class', 'samll-active');

                    $('.animation03').on('click', 'li', function () {
                        $('.animation03 li').attr('class', '');
                        $(this).attr('class', 'samll-active');
                    });
                    // 放大镜
                    var magnifierConfig = {
                        magnifier: "#magnifier1", //最外层的大容器
                        width: 400, //承载容器宽
                        height: 400, //承载容器高
                        moveWidth: null, //如果设置了移动盒子的宽度，则不计算缩放比例
                        zoom: 2 //缩放比例
                    };

                    var _magnifier = magnifier(magnifierConfig);

                    /*magnifier的内置函数调用*/
                    /*
                        //设置magnifier函数的index属性
                        _magnifier.setIndex(1);
                                           //重新载入主图,根据magnifier函数的index属性
                        _magnifier.eqImg();
                    */

                    //渲染详情
                    var html = '<!-- \u5934\u90E8\u4FE1\u606F -->\n                        <div class="detail-title" data-id="' + data.productid + '">\n                            <!-- \u5546\u54C1\u540D\u5B57 -->\n                            <span class="goods-name">' + data.goodsName + '</span>\n                            <br>\n                            <!-- \u5546\u54C1\u4ECB\u7ECD -->\n                            <span class="goods-introduce">' + data.intro + '</span>\n                        </div>\n                        <!-- logo -->\n                        <div class="group-box">\n                            <div class="group-logo">\n                                <a class="mall-logo" href="javascript:;"></a>\n                                <i>|</i>\n                                <a class="g-logo" href="javascript:;"></a>\n                            </div>\n                            <!-- \u7ED3\u675F\u65F6\u95F4 -->\n                            <div class="over-time">\n                                \u8DDD\u7ED3\u675F\u8FD8\u5269\u4E0B\n                                <span>0\u5929</span>\n                                <span class="time-num">00</span>\n                                :\n                                <span class="time-num">00</span>\n                                :\n                                <span class="time-num">00</span>\n                            </div>\n\n\n                        </div>\n\n                        <!-- \u4EF7\u683C -->\n                        <div class="g-price">\n                            <dl class="sale-price">\n                                <dt>\n                                    <span>\u56E2\u8D2D\u4EF7\uFF1A</span>\n                                </dt>\n                                <dd>\n                                    <span>\uFFE5\n                                        <em>' + data.current + '</em>\n                                    </span>\n                                    <span class="g-original">\n                                        \uFFE5' + data.original + '\n                                    </span>\n                                    <span class="g-save">\n                                        \u7ACB\u7701' + (data.original - data.current) * 1 + '\u5143\n                                    </span>\n                                </dd>\n                            </dl>\n                        </div>\n\n                        <!-- \u8D2D\u4E70\u4FE1\u606F -->\n                        <div class="information">\n                            <!-- \u914D\u9001\u9009\u62E9 -->\n                            <div class="distribution">\n                                <dl>\n                                    <dt>\n                                        <span>\u914D\u9001</span>\n                                    </dt>\n                                    <dd>\n                                        <span class="site-name">\u5E7F\u4E1C\n                                            <i></i>\n                                        </span>\n                                        <span>\n                                            \u53EF\u9001\u8FBE\uFF0C\u5FEB\u9012\u5305\u88F9\n                                        </span>\n                                    </dd>\n                                </dl>\n\n                            </div>\n\n                            <!-- \u5E73\u4EF7\u548C\u4EA4\u6613\u8BB0\u5F55 -->\n\n                            <div class="evaluate">\n                                <dl>\n                                    <dt>\u8BC4\u4EF7</dt>\n                                    <dd>\n                                        <a href="javascript:;">\u8D2D\u4E70\u8BC4\u4EF7\n                                            <em>80</em>\n                                        </a>\n                                        <i>|</i>\n                                        <a href="javascript:;">\u6210\u4EA4\u8BB0\u5F55\n                                            <em>150</em>\n                                        </a>\n                                    </dd>\n                                </dl>\n                            </div>\n\n                            <!-- \u670D\u52A1\u4FDD\u969C -->\n                            <div class="serve">\n                                <dl>\n                                    <dt>\u670D\u52A1\u4FDD\u969C</dt>\n                                    <dd class="shop_serve">\u7531\n                                        <a href="javascript:;">' + data.shop + '</a>\n                                        \u53D1\u8D27\u5E76\u627F\u8BFA\u63D0\u4F9B\u4EE5\u4E0B\u670D\u52A1\u4FDD\u969C\n                                    </dd>\n                                    <br>\n                                    <dd class="serve-icon">\n                                        <a href="javascript:;">\n                                            <i></i>\u6B63\u54C1\u4FDD\u969C\n                                        </a>\n                                        <a href="javascript:;">\n                                            <i></i>\u53D1\u7968\u4FDD\u969C\n                                        </a>\n                                        <a href="javascript:;">\n                                            <i></i>\u65E0\u5FE7\u9000\u6362\n                                        </a>\n                                    </dd>\n                                </dl>\n                            </div>\n\n                            <!-- \u56E2\u8D2D\u5546\u54C1 -->\n                            <div class="group-form">\n                                <!-- \u56E2\u8D2D\u5546\u54C1 -->\n                                <div class="form-type">\n                                    <dl>\n                                        <dt>\u56E2\u8D2D\u5546\u54C1\uFF1A</dt>\n                                        <dd>\n                                            <i class="icon">\u56E2</i>\n                                            ' + data.color + '\n                                        </dd>\n                                    </dl>\n                                </div>\n                                <!-- \u989C\u8272 -->\n                                <div class="color-type">\n                                    <dl>\n                                        <dt>\u989C\u8272\u7C7B\u522B:</dt>\n                                        <dd>\n                                            <a class="check" href="javascript:;">' + data.color + '\n                                                <i></i>\n                                            </a>\n                                        </dd>\n                                    </dl>\n                                </div>\n\n                                <!-- \u5957\u88C5 -->\n                                <div class="suit suit-type">\n                                    <dl>\n                                        <dt>\u5957\u88C5</dt>\n                                        <dd>\n                                            <a class="check" href="javascript:;">\u5B98\u65B9\u6807\u914D\n                                                <i></i>\n                                            </a>\n                                        </dd>\n                                        <br>\n                                        <dd>\n                                            <div>\u5B98\u65B9\u6807\u914D\u8BF4\u660E\u5B98\u65B9\u6807\u914D\u8BF4\u660E\u5B98\u65B9\u6807\u914D\u8BF4\u660E\u5B98\u65B9\u6807\u914D\u8BF4\u660E\u5B98\u65B9\u6807\u914D\u8BF4\u660E</div>\n                                        </dd>\n                                    </dl>\n                                </div>\n\n                                <!-- \u8D2D\u4E70\u6570\u91CF -->\n                                <div class="quantity">\n                                    <dl>\n                                        <dt>\u8D2D\u4E70\u6570\u91CF</dt>\n                                        <dd>\n                                            <span class="prve">-</span>\n                                            <input type="number"  value="1">\n                                            <span class="next">+</span>\n                                            <i>\u4EF6</i>\n                                            <em>(\u9650\u8D2D\n                                                <b style="font-weight:normal;">' + data.quota + '</b>\u4EF6)</em>\n                                        </dd>\n                                    </dl>\n                                </div>\n\n                                <!-- \u6309\u94AE -->\n                                <div class="buy-btn">\n                                    <span id="promptly-btn">\u7ACB\u5373\u8D2D\u4E70</span>\n                                    <span id="addCart">\u52A0\u5165\u8D2D\u7269\u8F66</span>\n                                </div>\n                            </div>\n                        </div>';

                    $('.dbox-details').html(html);
                    function judge() {
                        var storages = window.localStorage;
                        var res = storages.getItem('username');
                        if (res) {
                            addcart();
                        } else {
                            $('#addCart,#promptly-btn').on('click', function () {
                                var site = window.location.pathname;
                                var site1 = window.location.search;
                                location.href = 'login.html?' + site + site1;
                            });
                        }
                    }
                    // 点击获取input框的数据

                    judge();
                    //倒计时时间
                    setInterval(function () {
                        var date = new Date().getTime();
                        var time = data.time * 1 - date;
                        var times = getDuration(time);
                        $('.over-time').html('\n                                        \u8DDD\u7ED3\u675F\u8FD8\u5269\u4E0B\n                                        <span>' + toDB(times[0]) + '\u5929</span>\n                                        <span class="time-num">' + toDB(times[1]) + '</span>\n                                        :\n                                        <span class="time-num">' + toDB(times[2]) + '</span>\n                                        :\n                                        <span class="time-num">' + toDB(times[3]) + '</span>\n                                    ');
                    }, 1000);

                    // 根据渲染出来的类型推荐相关的给用户
                    var num = 1;
                    $.ajax({
                        type: 'post',
                        url: '../api/query.php',
                        data: {
                            dbsql: 'rush',
                            page: num,
                            num: 3,
                            query: data.type,
                            name: 'type'
                        },
                        success: function success(str) {
                            var arr = JSON.parse(str);
                            var data1 = arr.data;
                            var html = data1.map(function (item) {
                                return '<li>\n                            <a class="re-pic" href="javascript:;">\n                                <img src="../img/' + item.pic + '" alt="">\n                            </a>\n                            <p class="re-name">\n                                <a href="javascript:;">' + item.goodsName + '</a>\n                            </p>\n                            <p class="re-price">\n                                <span class="re-current">\uFFE5' + item.current + '</span>\n                                <span class="re-original">\uFFE5' + item.original + '</span>\n                            </p>\n                        </li>';
                            });
                            $('.re-list').html(html);
                            // 点击切换下一组
                            $('#re-tab').on('click', function () {
                                num = ++num > Math.ceil(arr.total / arr.num) ? 1 : num;
                                $.ajax({
                                    type: 'post',
                                    url: '../api/query.php',
                                    data: {
                                        dbsql: 'rush',
                                        page: num,
                                        num: 3,
                                        query: data.type,
                                        name: 'type'
                                    },
                                    success: function success(str) {
                                        var arr = JSON.parse(str);
                                        var data = arr.data;
                                        var html = data.map(function (item) {
                                            return '<li>\n                            <a class="re-pic" href="javascript:;">\n                                <img src="../img/' + item.pic + '" alt="">\n                            </a>\n                            <p class="re-name">\n                                <a href="javascript:;">' + item.goodsName + '</a>\n                            </p>\n                            <p class="re-price">\n                                <span class="re-current">\uFFE5' + item.current + '</span>\n                                <span class="re-original">\uFFE5' + item.original + '</span>\n                            </p>\n                        </li>';
                                        });
                                        $('.re-list').html(html);
                                    }
                                });
                            });
                        }
                    });
                }
            });
        }
    }

    uid();

    function addcart() {
        // $('.quantity input').val('2');
        var num = $('.quantity input').val();
        var xnum = $('.quantity b').text();
        // var
        $('.quantity .prve').on('click', function () {
            num = --num <= 0 ? 1 : num;
            $('.quantity input').val(num);
        });
        $('.quantity .next').on('click', function () {
            num = ++num >= xnum ? xnum : num;
            $('.quantity input').val(num);
        });

        $('.quantity input').on('blur', function () {
            console.log();
            var num = $('.quantity input').val();
            if (num <= 0 || !num) {
                $('.quantity input').val(1);
            }
        });
        //点击加入购物车
        $('#addCart,#promptly-btn').on('click', function () {
            var idb = $('.dbox-details .detail-title').attr('data-id');
            var inputN = $('.quantity input').val();
            var storages = window.localStorage;
            var res = storages.getItem('username');
            $.ajax({
                type: 'post',
                url: '../api/insertcart.php',
                data: {
                    dbsql: 'rush',
                    todbsql: 'cart',
                    goodsnum: inputN,
                    pid: idb,
                    user: res

                },
                success: function success(str) {
                    if (str == 0) {
                        $('#goodsremind').css('display', 'block');
                        $('.gocart').on('click', function () {
                            location.href = 'cart.html';
                        });
                        $('.continue').on('click', function () {
                            $('#goodsremind').css('display', 'none');
                        });
                        $('.remind .colse').on('click', function () {
                            $('#goodsremind').css('display', 'none');
                        });
                        $.ajax({
                            type: 'post',
                            url: '../api/goodlist.php',
                            data: {
                                dbsql: 'cart',
                                user: res
                            },
                            success: function success(str) {
                                var arr = JSON.parse(str);
                                // console.log(arr);
                                $('#cart-number').text(arr.total1);
                                var price = 0;
                                for (var i = 0; i < arr.data.length; i++) {
                                    price += arr.data[i].current * arr.data[i].num;
                                }
                                $('#total-price').text(price);
                            }
                        });
                    }
                }
            });
        });
    }

    //点击登录获取地址并传过去
    $('.ht-login a').on('click', function () {
        var site = window.location.pathname;
        var site1 = window.location.search;
        location.href = 'login.html?' + site + site1;
    });
    // setURL();
    // 退出
    function logout() {
        $('.ht-quit').on('click', function () {
            var type = window.location.search;
            var storages = window.localStorage;
            storages.clear();
            location.href = 'detail.html' + type;
        });
    }

    // 底部详情
    $('.detail-tab').on('click', 'li', function () {
        $('.detail-tab li').attr('class', '');
        $(this).attr('class', 'active');
        $('.tab-inner').find('div').css('display', 'none');
        $('.tab-inner').find('div').eq($(this).index()).css('display', 'block');
    });
});