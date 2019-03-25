$(function () {



    // 点击商城首页
    // 跳转首页
    $('.ht-title').on('click', function () {
        location.href = 'index.html';
    });
    //轮播图
    function slideshow() {
        var iw = $('#slide-box li').eq(0).outerWidth();//获取宽度
        var timer = null;
        var now = 0;//移动值也是图片的下标
        timer = setInterval(next, 1500);
        function next() {
            // 如果now大于轮播图片的个数时, 他就为0;
            now = ++now >= $('#slide-box li').length ? 0 : now;
            // 移动时，移动距离*移动个数
            $('#slide-box').stop().animate({ 'left': -iw * now }, 800, 'linear');
            if (now == 0) {
                // 当now等于0时，移动速度加快
                $('#slide-box').stop().animate({ 'left': 0 }, 200, 'linear');
            }
            focus();
        }

        function prev() {
            // 如果now小于轮播图片的个数时, 他就为图片个数;
            now = --now < 0 ? $('#slide-box li').length - 1 : now;
            // 移动距离 * 移动个数
            $('#slide-box').stop().animate({ 'left': -iw * now }, 800, 'linear');
            if (now == $('#slide-box li').length) {
                // 当now等于图片个数时，移动速度加快
                $('#slide-box').stop().animate({ 'left': -iw * $('#slide-box li').length }, 200, 'linear');
            }
            focus();
        }

        //移入停止，移出开始
        $('#bb-slide').on('mouseover', function () {
            clearInterval(timer);
        });
        $('#bb-slide').on('mouseout', function () {
            clearInterval(timer);
            timer = setInterval(next, 1500);
        });
        //点击按钮
        $('#bb-slide .prev').on('click', function () {
            prev();
        });
        $('#bb-slide .next').on('click', function () {
            next();
        });

        //渲染节点+焦点移动
        function focus() {
            var spans = '';
            for (var i = 0; i < $('#slide-box li').length; i++) {
                spans += '<span></span>';
            }
            $('#bb-slide .point').html(spans);
            $('#bb-slide .point span').eq(0).attr('class', 'active');
            $('#bb-slide .point span').attr('class', '');
            $('#bb-slide .point span').eq(now).attr('class', 'active');
        }
        focus();
        //点击焦点改变播放图片
        function onfocus() {
            $('#bb-slide .point').on('mouseover', 'span', function () {
                var index = $(this).index();
                $('#slide-box').stop().animate({ 'left': -iw * index }, 800, 'linear');
                now = index;
                focus();
            });
        }
        onfocus();

    }
    slideshow();//l轮播图
    // //下拉菜单--全部分类那
    pullDown('hnav-menu', 'sub-Menus', 'onmouseover');




    //获取精品团数据表
    $.ajax({
        type: 'post',   //请求方式
        url: 'api/goodlist.php',
        // async: true, //异步:默认是异步，可以不写
        data: {
            dbsql: 'quality_goods',
            page: '',
            num: ''
        },
        success: function (str) {
            quality(str);
        }

    });

    // 精品团渲染+lunbo
    function quality(str) {
        var arr = JSON.parse(str);
        var data = arr.data;
        // var li = '';
        var divinner = '';
        // //创建li节点
        // for (var i = 0; i < data.length; i++) {
        //     li += '<li data-id=li_' + (i + 1) * 1 + '></li>'
        // }
        // 精品团渲染
        divinner = data.map(function (item) {
            return ` <li>
                                <div class="qb-pic">
                                    <a href="javascript:;">
                                        <img src="img/${item.picture}" alt="">
                                        <span>立省${(item.original * 1) - (item.current * 1)}</span>
                                    </a>
                                </div>
                                <section class="qb-title">
                                    <a href="javascript:;">${item.Tradename}</a>
                                </section>
                                <section class="qb-price">
                                    <span class="qb-p-current">￥${item.current}</span>
                                    <span class="qb-p-original">￥${item.original}</span>
                                </section>
                                <section class="qb-shop">
                                    <a href="javascript:;">${item.shop}</a>
                                </section>
                                <section class="qb-time">
                                    <p>
                                        <span>剩余：</span>&nbsp;
                                        <em>--</em>天
                                        <em>--</em>时
                                        <em>--</em>分
                                        <em>--</em>秒
                                    </p>
                                </section>
                                <a href="javascript:;" id="qb-btn">
                                    立即抢购
                                </a>
                            </li>`
        }).join('');
        $('.qb-slide').html(divinner);
        // 倒计时时间
        setInterval(function () {
            var date = new Date().getTime();
            for (var i = 0; i < data.length; i++) {
                var time = (data[i].time * 1) - date;
                var times = getDuration(time);
                $('.qb-slide li').eq(i).find('.qb-time').html(`<p>
                                        <span>剩余：</span>
                                        <em>${toDB(times[0])}</em>天
                                        <em>${toDB(times[1])}</em>时
                                        <em>${toDB(times[2])}</em>分
                                        <em>${toDB(times[3])}</em>秒
                                    </p>`);
            }
        }, 1000);

        // 轮播
        function qb_slide() {
            //初始化
            var iw = $('.qb-slide li').eq(0).outerWidth();
            var timer = null;
            timer = setInterval(next, 3000);
            //下一张
            function next() {
                $('.qb-slide').stop().animate({ 'left': -iw }, 800, function () {
                    //将第一张截掉放到最后一张的末尾，作为下一个兄弟节点
                    $('.qb-slide li:first').insertAfter($('.qb-slide li:last'));
                    $('.qb-slide').css('left', 0);
                });

            }
            // 上一张
            function prev() {
                //找到最后一张，剪切放回头部
                $('.qb-slide li:last').insertBefore($('.qb-slide li:first'));
                $('.qb-slide').css('left', -iw);
                $('.qb-slide').stop().animate({ 'left': 0 }, 600, 'linear');
            }

            // 触摸停止
            $('.quality').on('mouseover', function () {
                clearInterval(timer);
            });
            //移出重新开始
            $('.quality').on('mouseout', function () {
                clearInterval(timer);
                timer = setInterval(next, 3000);
            });
            //点击上一张
            var isClick = true;
            $('.quality-title').on('click', '.prev', function () {
                if (isClick) {
                    isClick = false;
                    //事件
                    prev();
                    //定时器
                    setTimeout(function () {
                        isClick = true;
                    }, 800);//一秒内不能重复点击
                }

            });
            //点击下一张
            $('.quality-title').on('click', '.next', function () {
                next();
            });
        }
        qb_slide();
    }

    // 吸顶菜单
    function ceiling() {

        var it = $('#today-title').offset().top;

        $(window).scroll(function () {

            var scrollT = $(document).scrollTop();
            if (scrollT >= it) {
                $('#today-title').attr('class', 'today-ceiling');
            } else if (scrollT < it) {
                $('#today-title').attr('class', '');;
            }
        });
    }
    ceiling();

    // 选项卡点击渲染
    function onoption() {
        $('#today-title .tt-nav').on('click', 'li', function () {
            $('#today-title .tt-nav li').find('a').attr('class', '');
            $(this).find('a').attr('class', 'active');
        });
    }
    onoption();


    //今日购获取数据
    $.ajax({
        type: 'post',   //请求方式
        url: 'api/goodlist.php',
        // async: true, //异步:默认是异步，可以不写
        data: {
            dbsql: 'rush',
            page: '1',
            num: '24'
        },
        success: function (str) {
            todayList(str);
        }
    });

    //今日购渲染
    function todayList(str) {
        var arr = JSON.parse(str);
        var data = arr.data;
        var inner = data.map(function (item) {
            return ` <li data-id='${item.id}'>
                            <a href="javascript:;">
                                <!-- 商品图片 -->
                                <div class="gn-pic">
                                    <img src="img/${item.pic}" alt="">
                                </div>
                                <!-- 商品概要 -->
                                <div class="gn-brief">
                                    <!-- 名字 -->
                                    <p class="gn-name">${item.goodsName}</p>
                                    <p class="gn-intro">${item.intro}</p>
                                    <!-- 价格购买 -->
                                    <div class="gn-detail">
                                        <div class="detail-left">
                                            <span class="gn-current">￥${item.current}</span>
                                            <span class="gn-original">￥${item.original}</span>
                                            <span class="gn-save">立省${(item.original - item.current) * 1}</span>
                                        </div>
                                        <span class="gn-btn">
                                            马上抢
                                        </span>
                                    </div>
                                </div>
                                <!-- 倒计时时间 -->
                                <div class="gn-time">
                                    <span>剩余：
                                        <em>00</em>天
                                        <em>00</em>时
                                        <em>00</em>分
                                        <em>00</em>秒</span>
                                </div>
                            </a>
                        </li>`;
        }).join('');
        $('#goods-nav').html(inner);
        //倒计时时间
        setInterval(function () {
            var date = new Date().getTime();
            for (var i = 0; i < data.length; i++) {
                var time = (data[i].time * 1) - date;
                var times = getDuration(time);
                $('#goods-nav li').eq(i).find('.gn-time').html(`
                                        <span>剩余：
                                        <em>${toDB(times[0])}</em>天
                                        <em>${toDB(times[1])}</em>时
                                        <em>${toDB(times[2])}</em>分
                                        <em>${toDB(times[3])}</em>秒
                                        </span>
                                    `);
            }
        }, 1000);
    }

    // 点击选项更改渲染内容
    // 点击默认
    $('.tt-default').on('click', function () {
        $.ajax({
            type: 'post',   //请求方式
            url: 'api/goodlist.php',
            // async: true, //异步:默认是异步，可以不写
            data: {
                dbsql: 'rush',
                page: '1',
                num: '24'
            },
            success: function (str) {
                todayList(str);
            }
        });


        $('body,html').animate({
            scrollTop: 1000 + 'px'
        }, 100);
    });

    //点击最新团购
    $('.tt-newest').on('click', function () {
        $.ajax({
            type: 'post',   //请求方式
            url: 'api/goodlist.php',
            // async: true, //异步:默认是异步，可以不写
            data: {
                dbsql: 'rush',
                page: '1',
                num: '24'
            },
            success: function (str) {
                todayList(str);
            }
        });
        $('body,html').animate({
            scrollTop: 1000 + 'px'
        }, 100);
    });

    //点击销量按最高排序
    $('.tt-sales').on('click', function () {
        $.ajax({
            type: 'post',   //请求方式
            url: 'api/sort.php',
            // async: true, //异步:默认是异步，可以不写
            data: {
                dbsql: 'rush',
                page: '1',
                num: '24',
                sort: 'descend',
                demand: 'sales'
            },
            success: function (str) {
                todayList(str);
            }
        });
        $('body,html').animate({
            scrollTop: 1000 + 'px'
        }, 100);
    });

    //点击价格按最低排列
    $('.tt-price').on('click', function () {
        $.ajax({
            type: 'post',   //请求方式
            url: 'api/sort.php',
            // async: true, //异步:默认是异步，可以不写
            data: {
                dbsql: 'rush',
                page: '1',
                num: '24',
                sort: 'ascend',
                demand: 'current'
            },
            success: function (str) {
                todayList(str);
            }
        });
        $('body,html').animate({
            scrollTop: 1000 + 'px'
        }, 100);
    });

    //滑动到一定距离出现回到顶部的小组件和点击回到顶部
    //返回顶部
    function BacktoTop() {
        $(window).scroll(function () {
            var ws = $(window).scrollTop();
            var hs = $('#today-title').offset().top;
            var stop1 = $('#quality').offset().top;
            if (ws >= hs) {
                // $('#widget').css('opacity', '1');
                $('#widget').css('display', 'block');
                $('#widget').stop().animate({ 'opacity': 1 }, 300);

            } else {
                // $('#widget').css('opacity', '0');

                $('#widget').stop().animate({ 'opacity': 0 }, 300, function () {
                    $('#widget').css('display', 'none');
                });

            }
        });
        $('#widget').click(function () {
            $('body,html').animate({
                scrollTop: 0 + 'px'
            }, 500, 'linear');
        });
    }
    BacktoTop();

    //获取网址存cookie
    // 获取URL?号后面部分
    // function setURL() {
    //     var url = window.location.search;
    //     if (url) {
    //         var url1 = url.substring(1);
    //         var arr = url1.split('=');
    //         var storages = window.localStorage;
    //         storages.setItem(arr[0], arr[1]);
    //     }

    // }
    // setURL();

    //根据cookie来检测登录状态
    function getURL() {
        var storages = window.localStorage;
        var res = storages.getItem('username');
        // var res = cookie.get('name');
        if (res) {
            // var res1 = res.split('=')[1];
            $('.ht-login').find('i').text('您好，' + res);
            $('.ht-login').find('a').css('display', 'none');
            $('.ht-res').css('display', 'none');
            $('.ht-quit').css('display', 'inline');

            // 获取购物车数据
            $.ajax({
                type: 'post',
                url: 'api/goodlist.php',
                data: {
                    dbsql: 'cart',
                    user: res
                },
                success: function (str) {
                    var arr = JSON.parse(str);
                    $('.ht-nav li:eq(2)').find('a').html('购物车' + arr.total1 + '件');
                    $('.qe-cart').find('em').html(arr.total1);
                    $('.ht-nav li:eq(2)').on('click', function () {
                        location.href = 'html/cart.html';
                    });
                    $('.qe-cart').on('click', function () {
                        location.href = 'html/cart.html';
                    });

                }
            });
        } else {
            $('.ht-login').find('i').text('Hi~欢迎来到Z商城，请');
            $('.ht-login').find('a').css('display', 'inline');
            $('.ht-res').css('display', 'inline');
            $('.ht-quit').css('display', 'none');
            // 点击跳转到列表页
            // $('.sub-Menus li').on('click', function () {
            //     location.href = 'html/list1.html';
            // });


        }
    }
    getURL();

    $('.sub-Menus li').on('click', function () {
        var type = $(this).find('a span').attr('data-type');
        location.href = 'html/list1.html?type=' + type;

    });
    //点击更多
    $('#gn-more').on('click', function () {
        location.href = 'html/list1.html';
    });

    //退出登录 logout
    // function delCookie(name) {//为cookie name
    //     var date = new Date();
    //     date.setTime(date.getTime() - 10000);
    //     document.cookie = name + "=a; expires=" + date.toGMTString();
    // }
    function logout() {
        $('.ht-quit').on('click', function () {
            var storages = window.localStorage;
            storages.clear();
        });
    }
    logout();

    //点击登录获取地址并传过去
    $('.ht-login a').on('click', function () {
        var site = window.location.pathname;
        location.href = 'html/login.html?' + site;
    });

    $('#goods-nav').on('click', 'li', function () {
        var pid = $(this).attr('data-id');
        location.href = 'html/detail.html?id=' + pid;
    });

    // 未登陆状态下的购物车按钮
    $('.qe-cart').on('click', function () {
        var site = window.location.pathname;
        location.href = 'html/login.html?' + site
    });

    $('.ht-nav li:eq(2)').on('click', function () {
        var site = window.location.pathname;
        location.href = 'html/login.html?' + site
    });


    $('#search-text').focus(function () {
        $(this).val('');
        $(this).attr('placeholder', '找找你想要的商品');
    });



});