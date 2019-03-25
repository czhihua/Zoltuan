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
                    $(this).stop().animate({})
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
                success: function (str) {
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
                success: function (str) {
                    var arr = JSON.parse(str);
                    var data = arr[0];
                    var imgs = [data.pic, data.pic1];
                    var images = '';
                    for (var i = 0; i < imgs.length; i++) {
                        images += `<li class="">
                            <div class="small-img">
                                <img src="../img/${imgs[i]}" />
                            </div>
                        </li>`;
                    }

                    $('.animation03').html(images);
                    $('.animation03 li').eq(0).attr('class', 'samll-active');

                    $('.animation03').on('click', 'li', function () {
                        $('.animation03 li').attr('class', '');
                        $(this).attr('class', 'samll-active');
                    });
                    // 放大镜
                    var magnifierConfig = {
                        magnifier: "#magnifier1",//最外层的大容器
                        width: 400,//承载容器宽
                        height: 400,//承载容器高
                        moveWidth: null,//如果设置了移动盒子的宽度，则不计算缩放比例
                        zoom: 2//缩放比例
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
                    var html = `<!-- 头部信息 -->
                        <div class="detail-title" data-id="${data.productid}">
                            <!-- 商品名字 -->
                            <span class="goods-name">${data.goodsName}</span>
                            <br>
                            <!-- 商品介绍 -->
                            <span class="goods-introduce">${data.intro}</span>
                        </div>
                        <!-- logo -->
                        <div class="group-box">
                            <div class="group-logo">
                                <a class="mall-logo" href="javascript:;"></a>
                                <i>|</i>
                                <a class="g-logo" href="javascript:;"></a>
                            </div>
                            <!-- 结束时间 -->
                            <div class="over-time">
                                距结束还剩下
                                <span>0天</span>
                                <span class="time-num">00</span>
                                :
                                <span class="time-num">00</span>
                                :
                                <span class="time-num">00</span>
                            </div>


                        </div>

                        <!-- 价格 -->
                        <div class="g-price">
                            <dl class="sale-price">
                                <dt>
                                    <span>团购价：</span>
                                </dt>
                                <dd>
                                    <span>￥
                                        <em>${data.current}</em>
                                    </span>
                                    <span class="g-original">
                                        ￥${data.original}
                                    </span>
                                    <span class="g-save">
                                        立省${(data.original - data.current) * 1}元
                                    </span>
                                </dd>
                            </dl>
                        </div>

                        <!-- 购买信息 -->
                        <div class="information">
                            <!-- 配送选择 -->
                            <div class="distribution">
                                <dl>
                                    <dt>
                                        <span>配送</span>
                                    </dt>
                                    <dd>
                                        <span class="site-name">广东
                                            <i></i>
                                        </span>
                                        <span>
                                            可送达，快递包裹
                                        </span>
                                    </dd>
                                </dl>

                            </div>

                            <!-- 平价和交易记录 -->

                            <div class="evaluate">
                                <dl>
                                    <dt>评价</dt>
                                    <dd>
                                        <a href="javascript:;">购买评价
                                            <em>80</em>
                                        </a>
                                        <i>|</i>
                                        <a href="javascript:;">成交记录
                                            <em>150</em>
                                        </a>
                                    </dd>
                                </dl>
                            </div>

                            <!-- 服务保障 -->
                            <div class="serve">
                                <dl>
                                    <dt>服务保障</dt>
                                    <dd class="shop_serve">由
                                        <a href="javascript:;">${data.shop}</a>
                                        发货并承诺提供以下服务保障
                                    </dd>
                                    <br>
                                    <dd class="serve-icon">
                                        <a href="javascript:;">
                                            <i></i>正品保障
                                        </a>
                                        <a href="javascript:;">
                                            <i></i>发票保障
                                        </a>
                                        <a href="javascript:;">
                                            <i></i>无忧退换
                                        </a>
                                    </dd>
                                </dl>
                            </div>

                            <!-- 团购商品 -->
                            <div class="group-form">
                                <!-- 团购商品 -->
                                <div class="form-type">
                                    <dl>
                                        <dt>团购商品：</dt>
                                        <dd>
                                            <i class="icon">团</i>
                                            ${data.color}
                                        </dd>
                                    </dl>
                                </div>
                                <!-- 颜色 -->
                                <div class="color-type">
                                    <dl>
                                        <dt>颜色类别:</dt>
                                        <dd>
                                            <a class="check" href="javascript:;">${data.color}
                                                <i></i>
                                            </a>
                                        </dd>
                                    </dl>
                                </div>

                                <!-- 套装 -->
                                <div class="suit suit-type">
                                    <dl>
                                        <dt>套装</dt>
                                        <dd>
                                            <a class="check" href="javascript:;">官方标配
                                                <i></i>
                                            </a>
                                        </dd>
                                        <br>
                                        <dd>
                                            <div>官方标配说明官方标配说明官方标配说明官方标配说明官方标配说明</div>
                                        </dd>
                                    </dl>
                                </div>

                                <!-- 购买数量 -->
                                <div class="quantity">
                                    <dl>
                                        <dt>购买数量</dt>
                                        <dd>
                                            <span class="prve">-</span>
                                            <input type="number"  value="1">
                                            <span class="next">+</span>
                                            <i>件</i>
                                            <em>(限购
                                                <b style="font-weight:normal;">${data.quota}</b>件)</em>
                                        </dd>
                                    </dl>
                                </div>

                                <!-- 按钮 -->
                                <div class="buy-btn">
                                    <span id="promptly-btn">立即购买</span>
                                    <span id="addCart">加入购物车</span>
                                </div>
                            </div>
                        </div>`;

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
                        var time = (data.time * 1) - date;
                        var times = getDuration(time);
                        $('.over-time').html(`
                                        距结束还剩下
                                        <span>${toDB(times[0])}天</span>
                                        <span class="time-num">${toDB(times[1])}</span>
                                        :
                                        <span class="time-num">${toDB(times[2])}</span>
                                        :
                                        <span class="time-num">${toDB(times[3])}</span>
                                    `);

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
                        success: function (str) {
                            var arr = JSON.parse(str);
                            var data1 = arr.data;
                            var html = data1.map(function (item) {
                                return `<li>
                            <a class="re-pic" href="javascript:;">
                                <img src="../img/${item.pic}" alt="">
                            </a>
                            <p class="re-name">
                                <a href="javascript:;">${item.goodsName}</a>
                            </p>
                            <p class="re-price">
                                <span class="re-current">￥${item.current}</span>
                                <span class="re-original">￥${item.original}</span>
                            </p>
                        </li>`
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
                                    success: function (str) {
                                        var arr = JSON.parse(str);
                                        var data = arr.data;
                                        var html = data.map(function (item) {
                                            return `<li>
                            <a class="re-pic" href="javascript:;">
                                <img src="../img/${item.pic}" alt="">
                            </a>
                            <p class="re-name">
                                <a href="javascript:;">${item.goodsName}</a>
                            </p>
                            <p class="re-price">
                                <span class="re-current">￥${item.current}</span>
                                <span class="re-original">￥${item.original}</span>
                            </p>
                        </li>`
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
            console.log()
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
                success: function (str) {
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
                            success: function (str) {
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