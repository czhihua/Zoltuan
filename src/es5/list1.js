'use strict';

$(function () {

    // 跳转首页
    tiaozhuang();
    // //下拉菜单--全部分类那
    pullDown('hnav-menu', 'sub-Menus', 'onmouseover');
    //吸顶菜单
    function ceiling() {
        var it = $('#today-title').offset().top;
        $(window).scroll(function () {
            var scrollT = $(document).scrollTop();
            if (scrollT >= it) {
                $('#today-title').attr('class', 'today-ceiling');
                $('.tt-tab').css('margin', '0');
            } else if (scrollT < it) {
                $('#today-title').attr('class', '');
                $('.tt-tab').css('margin-bottom', '10px');
            }
        });
    }
    ceiling();

    //点击然后添加class名
    onoption();

    //今日购获取数据
    // 先判断是否地址栏有信息再进行渲染
    function URLtype() {
        var url = window.location.search;
        if (url) {
            var typeArr = ['手机', '电脑', 'DIY', '数码', '外设', '智能', '其他'];
            var url1 = url.substring(1);
            var arr = url1.split('=');
            if (arr[0] == 'type') {
                $.ajax({
                    // async: false,
                    type: 'post',
                    url: '../api/query.php',
                    data: {
                        dbsql: 'rush',
                        name: 'type',
                        query: typeArr[arr[1] - 1],
                        page: 1,
                        num: 24,
                        now: arr[1]
                    },
                    success: function success(str) {
                        todayList(str);
                        $('.tt-type').find('a').attr('class', '');
                        $('.tt-type').find('a').eq(arr[1]).attr('class', 'active');

                        judge();
                        ontab(str); //点击事件 
                    }
                });
            }
        } else {
            $.ajax({
                type: 'post', //请求方式
                url: '../api/goodlist.php',
                // async: true, //异步:默认是异步，可以不写
                data: {
                    dbsql: 'rush',
                    page: '1',
                    num: '24'
                },
                success: function success(str) {
                    todayList(str);
                }
            });
        }
        judge();
    }
    URLtype();

    //今日购渲染
    function todayList(str) {

        var arr = JSON.parse(str);
        if (arr.total) {
            var data = arr.data;
            var inner = data.map(function (item) {
                return ' <li data-id=\'' + item.id + '\'>\n                            <a href="javascript:;">\n                                <!-- \u5546\u54C1\u56FE\u7247 -->\n                                <div class="gn-pic">\n                                    <img src="../img/' + item.pic + '" alt="">\n                                </div>\n                                <!-- \u5546\u54C1\u6982\u8981 -->\n                                <div class="gn-brief">\n                                    <!-- \u540D\u5B57 -->\n                                    <p class="gn-name">' + item.goodsName + '</p>\n                                    <p class="gn-intro">' + item.intro + '</p>\n                                    <!-- \u4EF7\u683C\u8D2D\u4E70 -->\n                                    <div class="gn-detail">\n                                        <div class="detail-left">\n                                            <span class="gn-current">\uFFE5' + item.current + '</span>\n                                            <span class="gn-original">\uFFE5' + item.original + '</span>\n                                            <span class="gn-save">\u7ACB\u7701' + (item.original - item.current) * 1 + '</span>\n                                        </div>\n                                        <span class="gn-btn">\n                                            \u9A6C\u4E0A\u62A2\n                                        </span>\n                                    </div>\n                                </div>\n                                <!-- \u5012\u8BA1\u65F6\u65F6\u95F4 -->\n                                <div class="gn-time">\n                                    <span>\u5269\u4F59\uFF1A\n                                        <em>00</em>\u5929\n                                        <em>00</em>\u65F6\n                                        <em>00</em>\u5206\n                                        <em>00</em>\u79D2</span>\n                                </div>\n                            </a>\n                        </li>';
            }).join('');
            $('#goods-nav').html(inner);
            //倒计时时间
            setInterval(function () {
                var date = new Date().getTime();
                for (var i = 0; i < data.length; i++) {
                    var time = data[i].time * 1 - date;
                    var times = getDuration(time);
                    $('#goods-nav li').eq(i).find('.gn-time').html('\n                                        <span>\u5269\u4F59\uFF1A\n                                        <em>' + toDB(times[0]) + '</em>\u5929\n                                        <em>' + toDB(times[1]) + '</em>\u65F6\n                                        <em>' + toDB(times[2]) + '</em>\u5206\n                                        <em>' + toDB(times[3]) + '</em>\u79D2\n                                        </span>\n                                    ');
                }
            }, 1000);

            //渲染页码
            if (arr.total > arr.num) {
                var pagen = '';
                var pagenum = Math.ceil(arr.total / arr.num);
                if (pagenum > 1) {
                    for (var n = 1; n <= 2; n++) {
                        pagen += '<span>' + n + '</span>';
                    }
                    $('#gn-paging').html(pagen);
                    $('#gn-paging span').eq(arr.page - 1).attr('class', 'active');
                    $('#gn-paging').append('<span>下一页</span>');
                }
            } else {
                $('#gn-paging').html('');
            }
        } else {
            var inner = '<div style="height:600px; font-size:30px;">没有相关商品</div>';
            $('#goods-nav').html(inner);
        }
    }

    // 点击选项更改渲染内容
    // 点击默认
    function judge() {
        var isac = $('.tt-type a').eq(0).attr('class');
        if (isac == 'active') {
            $('.tt-default').on('click', function () {
                $.ajax({
                    type: 'post', //请求方式
                    url: '../api/goodlist.php',
                    // async: true, //异步:默认是异步，可以不写
                    data: {
                        dbsql: 'rush',
                        page: '1',
                        num: '24'
                    },
                    success: function success(str) {
                        todayList(str);
                    }
                });
            });

            //点击最新团购
            $('.tt-newest').on('click', function () {
                $.ajax({
                    type: 'post', //请求方式
                    url: '../api/goodlist.php',
                    // async: true, //异步:默认是异步，可以不写
                    data: {
                        dbsql: 'rush',
                        page: '1',
                        num: '24'
                    },
                    success: function success(str) {
                        todayList(str);
                    }
                });
            });

            //点击销量按最高排序
            $('.tt-sales').on('click', function () {
                $.ajax({
                    type: 'post', //请求方式
                    url: '../api/sort.php',
                    // async: true, //异步:默认是异步，可以不写
                    data: {
                        dbsql: 'rush',
                        page: '1',
                        num: '24',
                        sort: 'descend',
                        demand: 'sales'
                    },
                    success: function success(str) {
                        todayList(str);
                        var arr = JSON.parse(str);
                    }
                });
            });

            //点击价格按最低排列
            $('.tt-price').on('click', function () {
                $.ajax({
                    type: 'post', //请求方式
                    url: '../api/sort.php',
                    // async: true, //异步:默认是异步，可以不写
                    data: {
                        dbsql: 'rush',
                        page: '1',
                        num: '24',
                        sort: 'ascend',
                        demand: 'current'
                    },
                    success: function success(str) {
                        todayList(str);
                    }
                });
            });

            //点击分页和下一页
            $('#gn-paging').on('click', 'span', function () {
                var isact = $('.tt-nav .tt-default a').attr('class');
                var isact2 = $('.tt-nav .tt-newest').find('a').attr('class');
                var isact3 = $('.tt-nav .tt-sales a').attr('class');
                var isact4 = $('.tt-nav .tt-price').find('a').attr('class');
                $('body,html').stop().animate({
                    scrollTop: 0 + 'px'
                }, 0);
                $('.lanjiaz').css('display', 'block');
                $('#goods-nav').css('display', 'none');
                setTimeout(function () {
                    $('.lanjiaz').css('display', 'none');
                    $('#goods-nav').css('display', 'block');
                }, 1000);
                if (isact || isact2) {
                    if ($(this).index() != $('#gn-paging span').length - 1) {
                        $.ajax({
                            type: 'post', //请求方式
                            url: '../api/goodlist.php',
                            // async: true, //异步:默认是异步，可以不写
                            data: {
                                dbsql: 'rush',
                                page: $(this).index() + 1,
                                num: '24'
                            },
                            success: function success(str) {
                                todayList(str);
                            }
                        });
                    } else if ($(this).index() == $('#gn-paging span').length - 1) {
                        var now = $('#gn-paging').find('.active').text();
                        var now2 = ++now > $('#gn-paging span').length - 1 ? now - 1 : now;
                        $.ajax({
                            type: 'post', //请求方式
                            url: '../api/goodlist.php',
                            // async: true, //异步:默认是异步，可以不写
                            data: {
                                dbsql: 'rush',
                                page: now2,
                                num: '24'
                            },
                            success: function success(str) {
                                todayList(str);
                            }
                        });
                    }
                } else if (isact3 || isact4) {
                    var Demand = $('.tt-nav li .active').find('span').text();
                    var Demand1 = Demand == '销售' ? 'sales' : 'current';
                    var Sort = Demand == '销售' ? 'descend' : 'ascend';
                    console.log(Demand, Sort);
                    if ($(this).index() != $('#gn-paging span').length - 1) {
                        console.log($(this).index() + 1);
                        $.ajax({
                            type: 'post', //请求方式
                            url: '../api/sort.php',
                            // async: true, //异步:默认是异步，可以不写
                            data: {
                                dbsql: 'rush',
                                page: $(this).index() + 1,
                                num: '24',
                                sort: Sort,
                                demand: Demand1
                            },
                            success: function success(str) {
                                todayList(str);
                                // console.log(str);
                            }
                        });
                    } else if ($(this).index() == $('#gn-paging span').length - 1) {
                        var now = $('#gn-paging').find('.active').text();
                        var now2 = ++now > $('#gn-paging span').length - 1 ? now - 1 : now;
                        $.ajax({
                            type: 'post', //请求方式
                            url: '../api/sort.php',
                            // async: true, //异步:默认是异步，可以不写
                            data: {
                                dbsql: 'rush',
                                page: now2,
                                num: '24',
                                sort: Sort,
                                demand: Demand1
                            },
                            success: function success(str) {
                                todayList(str);
                            }
                        });
                    }
                }
            });
        } else if (!isac) {
            $('.tt-default').off('click');
            $('.tt-newest').off('click');
            $('.tt-sales').off('click');
            $('.tt-price').off('click');
            $('#gn-paging').off('click');
        }
    }
    judge();

    //点击切换class名 分页
    $('#gn-paging').on('click', 'span', function () {
        $('#gn-paging').find('span').attr('class', '');
        $(this).attr('class', 'active');
        $('#gn-paging').find('span:last-child').attr('class', '');
        $('body,html').stop().animate({
            scrollTop: 0 + 'px'
        }, 0);
        $('.lanjiaz').css('display', 'block');
        $('#goods-nav').css('display', 'none');
        setTimeout(function () {
            $('.lanjiaz').css('display', 'none');
            $('#goods-nav').css('display', 'block');
        }, 1000);
        judge();
    });
    // 点击下一页
    $('#gn-paging').on('click', 'span:last-child', function () {
        $('body,html').stop().animate({
            scrollTop: 0 + 'px'
        }, 0);
        var now = $('#gn-paging').find('.active').text();
        $('#gn-paging').find('span').attr('class', '');
        now = ++now > $('#gn-paging span').length - 1 ? $('#gn-paging span').length - 1 : now;
        $('#gn-paging').find('span').eq(now).attr('class', 'active');
        $('.lanjiaz').css('display', 'block');
        $('#goods-nav').css('display', 'none');
        setTimeout(function () {
            $('.lanjiaz').css('display', 'none');
            $('#goods-nav').css('display', 'block');
        }, 1000);
        judge();
    });

    // 懒加载
    setTimeout(function () {
        $('.lanjiaz').css('display', 'none');
        $('#goods-nav').css('display', 'block');
    }, 1000);

    // 分类类型渲染
    //主类型渲染
    function type() {
        //获取需要知道数量的值

        for (var i = 1; i < $('.tt-type a').length; i++) {
            var text = $('.tt-type a').eq(i).find('span').text();
            $.ajax({
                // async: false,
                type: 'post',
                url: '../api/query.php',
                data: {
                    query: text,
                    dbsql: 'rush',
                    name: 'type',
                    now: i

                },
                success: function success(str) {
                    var arr = JSON.parse(str);
                    typetext(arr);
                }
            });
        }
        // 渲染到页面
        function typetext(arr) {
            $('.tt-type a').eq(arr.now).append($('<i>(' + arr.total + ')</i>'));
        }
    }
    type();

    // 副类型
    function type2() {
        for (var i = 1; i < $('.tt-deputy:eq(0) a').length; i++) {
            var text = $('.tt-deputy:eq(0) a').eq(i).find('span').text();
            $.ajax({
                // async: false,
                type: 'post',
                url: '../api/query.php',
                data: {
                    query: text,
                    dbsql: 'rush',
                    name: 'viceType',
                    now: i

                },
                success: function success(str) {
                    var arr = JSON.parse(str);
                    typetext2(arr);
                }
            });
        }
    }
    type2();
    // 渲染到页面
    function typetext2(arr) {
        $('.tt-deputy:eq(0) a').eq(arr.now).append($('<i>(' + arr.total + ')</i>'));
    }

    function type3() {
        for (var i = 1; i < $('.tt-deputy:eq(1) a').length; i++) {
            var text = $('.tt-deputy:eq(1) a').eq(i).find('span').text();
            $.ajax({
                // async: false,
                type: 'post',
                url: '../api/query.php',
                data: {
                    query: text,
                    dbsql: 'rush',
                    name: 'viceType',
                    now: i

                },
                success: function success(str) {
                    var arr = JSON.parse(str);
                    typetext3(arr);
                }
            });
        }
    }
    type3();
    function typetext3(arr) {
        $('.tt-deputy:eq(1) a').eq(arr.now).append($('<i>(' + arr.total + ')</i>'));
    }

    // 点击切换tt-tab,并渲染相关
    var isyes = true;
    $('.tt-type').on('click', 'a', function () {

        if (isyes && $(this).index() != 0) {
            var text = $(this).find('span').text();
            $('.tt-type').find('a').attr('class', '');
            $(this).attr('class', 'active');
            $('.tt-nav li').find('a').attr('class', '');
            $('.tt-nav li').eq(0).find('a').attr('class', 'active');
            $('.lanjiaz').css('display', 'block');
            $('#goods-nav').css('display', 'none');
            $('body,html').stop().animate({
                scrollTop: 0 + 'px'
            }, 0);
            isyes = false;
            $.ajax({
                // async: false,
                type: 'post',
                url: '../api/query.php',
                data: {
                    dbsql: 'rush',
                    name: 'type',
                    now: $(this).index(),
                    query: text,
                    page: 1,
                    num: 24
                },
                success: function success(str) {
                    todayList(str);
                    ontab(str); //点击事件
                }
            });
            setTimeout(function () {
                $('.lanjiaz').css('display', 'none');
                $('#goods-nav').css('display', 'block');
                isyes = true;
            }, 1000);
        }
        judge();
    });

    // tab点击事件
    function ontab(str) {
        var arr = JSON.parse(str);
        var now = arr.now;
        if (now) {
            // 点击默认
            $('.tt-default').on('click', function () {
                $.ajax({
                    type: 'post', //请求方式
                    url: '../api/query.php',
                    // async: true, //异步:默认是异步，可以不写
                    data: {
                        dbsql: 'rush',
                        page: '1',
                        num: '24',
                        query: arr.name,
                        now: now,
                        name: 'type'
                    },
                    success: function success(str) {
                        todayList(str);
                    }
                });
            });

            //点击最新团购
            $('.tt-newest').on('click', function () {
                $.ajax({
                    type: 'post', //请求方式
                    url: '../api/query.php',
                    // async: true, //异步:默认是异步，可以不写
                    data: {
                        dbsql: 'rush',
                        page: '1',
                        num: '24',
                        query: arr.name,
                        now: now,
                        name: 'type'
                    },
                    success: function success(str) {
                        todayList(str);
                    }
                });
            });

            //点击销量按最高排序
            $('.tt-sales').on('click', function () {
                $.ajax({
                    type: 'post', //请求方式
                    url: '../api/sort.php',
                    // async: true, //异步:默认是异步，可以不写
                    data: {
                        dbsql: 'rush',
                        page: '1',
                        num: '24',
                        sort: 'descend',
                        demand: 'sales',
                        query: arr.name,
                        name: 'type'
                    },
                    success: function success(str) {
                        todayList(str);
                    }
                });
            });

            //点击价格按最低排列
            $('.tt-price').on('click', function () {
                $.ajax({
                    type: 'post', //请求方式
                    url: '../api/sort.php',
                    // async: true, //异步:默认是异步，可以不写
                    data: {
                        dbsql: 'rush',
                        page: '1',
                        num: '24',
                        sort: 'ascend',
                        demand: 'current',
                        query: arr.name,
                        name: 'type'
                    },
                    success: function success(str) {
                        todayList(str);
                    }
                });
            });

            //点击分页和下一页
            $('#gn-paging').on('click', 'span', function () {
                if ($(this).index() != $('#gn-paging span').length - 1) {
                    $.ajax({
                        type: 'post', //请求方式
                        url: '../api/query.php',
                        // async: true, //异步:默认是异步，可以不写
                        data: {
                            dbsql: 'rush',
                            page: $(this).index() + 1,
                            num: '24',
                            query: arr.name,
                            now: now,
                            name: 'type'
                        },
                        success: function success(str) {
                            todayList(str);
                        }
                    });
                } else if ($(this).index() == $('#gn-paging span').length - 1) {
                    var now = $('#gn-paging').find('.active').text();
                    var now2 = ++now > $('#gn-paging span').length - 1 ? now - 1 : now;
                    $.ajax({
                        type: 'post', //请求方式
                        url: '../api/query.php',
                        // async: true, //异步:默认是异步，可以不写
                        data: {
                            dbsql: 'rush',
                            page: now2,
                            num: '24',
                            query: arr.name,
                            now: now,
                            name: 'type'
                        },
                        success: function success(str) {
                            todayList(str);
                        }
                    });
                }
            });
        }
    }

    //点击全部
    onall();
    var all = true;
    function onall() {

        $('.tt-type').on('click', 'a:eq(0)', function () {
            if (all) {
                all = false;
                $('.tt-nav li').find('a').attr('class', '');
                $('.tt-nav li').eq(0).find('a').attr('class', 'active');
                $('.tt-type a').attr('class', '');
                $(this).attr('class', 'active');
                $('body,html').stop().animate({
                    scrollTop: 0 + 'px'
                }, 0);
                $.ajax({
                    type: 'post', //请求方式
                    url: '../api/goodlist.php',
                    // async: true, //异步:默认是异步，可以不写
                    data: {
                        dbsql: 'rush',
                        page: '1',
                        num: '24'
                    },
                    success: function success(str) {
                        todayList(str);
                    }
                });
                $('.lanjiaz').css('display', 'block');
                $('#goods-nav').css('display', 'none');
                setTimeout(function () {
                    $('.lanjiaz').css('display', 'none');
                    $('#goods-nav').css('display', 'block');
                    all = true;
                }, 1000);
            }
            judge();
        });
    }

    // 回到顶部
    BacktoTop();

    //获取网址存cookie
    // 获取URL?号后面部分
    // setURL();

    function getURL() {
        var storages = window.localStorage;
        var res = storages.getItem('username');
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
                    // console.log(str);
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
            $('.qe-cart').on('click', function () {
                var site = window.location.pathname;
                location.href = 'login.html?' + site;
            });

            $('.ht-nav li:eq(2)').on('click', function () {
                var site = window.location.pathname;
                location.href = 'login.html?' + site;
            });
        }
    }

    getURL();

    //退出登录 logout
    logout();

    //点击登录获取地址并传过去
    $('.ht-login a').on('click', function () {
        var site = window.location.pathname;
        location.href = 'login.html?' + site;
    });

    //点击获取列表商品信息传入地址栏并传到详情页
    $('#goods-nav').on('click', 'li', function () {
        var dataid = $(this).attr('data-id');
        location.href = "../html/detail.html?id=" + dataid;
    });

    $('#search-text').focus(function () {
        $(this).val('');
        $(this).attr('placeholder', '找找你想要的商品');
    });
});