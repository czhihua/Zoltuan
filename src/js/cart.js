$(function () {
    // 跳转首页
    tiaozhuang();
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
                    $('.ht-nav li:eq(2)').on('click', function () {
                        location.href = 'cart.html';
                    });
                }
            });



        } else {
            $('.ht-login').find('i').text('Hi~欢迎来到Z商城，请');
            $('.ht-login').find('a').css('display', 'inline');
            $('.ht-res').css('display', 'inline');
            $('.ht-quit').css('display', 'none');


            // $('.ht-nav li:eq(2)').on('click', function () {
            var site = window.location.pathname;

            location.href = 'login.html?' + site;
            // });


        }
    }

    getURL();
    // function logout() {
    //     $('.ht-quit').on('click', function () {
    //         var storages = window.localStorage;
    //         storages.clear();
    //         var site = window.location.search;
    //         location.href = 'login.html?' + site;
    //     });
    // }
    logout();


    // 购物车渲染
    function Cart() {
        var storages = window.localStorage;
        var res = storages.getItem('username');
        $.ajax({
            type: 'post',
            url: '../api/goodlist.php',
            data: {
                dbsql: 'cart',
                user: res
            },
            success: function (str) {
                setcart(str);
            }
        });
    }
    Cart();

    //渲染
    function setcart(str) {
        var arr = JSON.parse(str);
        // 渲染顶部的购物车状态和总计
        var status = arr.total1;//状态
        var sum = 0;//总计
        var shopName = [];//需要装店铺名

        for (var i = 0; i < arr.data.length; i++) {
            sum += arr.data[i].current * 1;
            shopName.push(arr.data[i].shop);
        }
        // sum.toFixed(2)
        $('.shopping_be').prepend(`
            <div class="cart_title">
                        <p>购物车状态
                            <span>(${status}/30)</span>
                        </p>
                        <div class="cart-total">
                            <span>总计(不含运费)
                                <em>￥${sum}</em>
                            </span>
                            <a href="javascript:;">去结算</a>
                        </div>
                    </div>
        `);
        var shopN = uniq(shopName);//数组去重


        // 渲染出部分不依赖数据的节点
        $('.shopping_be').append(`
            <div class="cart_list">
                <div class="cl-title">
                        <span class="Goods">所有商品</span>
                        <span class="price">单价（元）</span>
                        <span class="number">数量</span>
                        <span class="time">优惠</span>
                        <span class="subtotal">小计（元）</span>
                        <span class="operation">操作</span>
                 </div>
            </div>
        `);

        // 渲染出以店铺为主的区域
        var inner = shopN.map(function (item) {
            return `<div class="clt-inner">
                        <div class="clt-shop">
                            <p>
                                <input class="check_all" type="checkbox">
                                <span>店铺：</span>
                                <a href=" javascript:; ">
                                    ${item}
                                </a>
                            </p>
                        </div> 
                    </div>`
        });
        $('.shopping_be .cart_list').append(inner);


        // 渲染店铺下的商品
        var times = [];
        for (var j = 0; j < shopN.length; j++) {
            $.ajax({
                type: 'post',
                url: '../api/query.php',
                async: false,
                data: {
                    dbsql: 'cart',
                    query: shopN[j],
                    name: 'shop',
                    now: j
                },
                success: function (str) {
                    var arr = JSON.parse(str);
                    var data1 = arr.data;
                    var now = arr.now;//下标
                    var list = data1.map(function (item) {
                        times.push(item.time);
                        return `<div class="ctl_list" data-id="${item.productid}">
                                    <div class="ctl-details">

                                        <input class="choice" type="checkbox">

                                        <div class="ct-pic ">
                                            <img src="../img/${item.pic} " alt=" ">
                                        </div>
                                        <div class="ct-intro ">
                                        <a href="javascript:; " class="goodsName ">${item.goodsName}</a>
                                        <p class="support ">
                                            <i></i>
                                        </p>
                                        <p class="color ">
                                            颜色：${item.color}
                                        </p>
                                        <p class="color ">
                                            套装：官方标配
                                        </p>
                                        </div>

                                    </div>

                                    <div class="unit_price ">
                                        <p class="original ">${(item.original * 1).toFixed(2)}</p>
                                        <p class="current ">${(item.current * 1).toFixed(2)}</p>
                                    </div>

                                    <div class="input_num ">

                                        <a href="javascript:; " class="minus ">-</a>
                                        <input type="number" value="${item.num}" data-xg="${item.quota}">
                                        <a href="javascript:; " class="add ">+</a>

                                    </div>

                                    <div class="group-time ">
                                        <span>团购</span>
                                        <p>
                                            <em>00</em>小时
                                            <em>00</em>分
                                            <em>00</em>秒
                                        </p>
                                    </div>

                                    <div class="goods_subtotal ">
                                        ${item.current * item.num}
                                    </div>

                                    <div class="list_operation">
                                        <a href="javascript:; ">移入收藏夹</a>
                                        <a class="onDel" href="javascript:; ">删除</a>
                                    </div>

                                </div>`;
                    });

                    // $('.shopping_be .ctl-inner:eq(' + j + ')').append(123456);
                    $('.shopping_be .clt-inner').eq(now).append(list);
                }
            });
        }


        // 渲染倒计时时间
        //获取商品货码
        function time() {
            for (var i = 0; i < times.length; i++) {
                var date = new Date().getTime();
                var time = times[i] * 1 - date;
                var myTime = xiaoshi(time);
                $('.cart_list').eq(i).find('.group-time').html(`
                             <span>团购</span>
                                <p>
                                    <em>${toDB(myTime[0])}</em>小时
                                    <em>${toDB(myTime[1])}</em>分
                                    <em>${toDB(myTime[2])}</em>秒
                                </p>
                `)
            }
        }
        // time();
        setInterval(time, 1000);

        // 渲染按钮组
        $('.cart_list').append(`
            <div class="clt-bottom">

                        <div class="clt-top">
                            <p class="clt-total">
                                商品总价
                                <i>（不含运费）：</i>
                                <em>￥0</em>
                            </p>
                        </div>

                        <div class="clt-accounts">
                            <p class="ca-left">
                                <a class="colse-btn" href="javascript:;">批量删除</a>
                            </p>
                            <p class="ca-right">
                                <a class="continue" href="javascript:;">
                                    <<继续购物 </a>
                                        <span class="accounts-btn">去结算</span>
                            </p>
                        </div>
                    </div>
        `);

        // 点击店铺全选
        $('.check_all').on('click', function () {
            if ($(this).prop('checked')) {
                $(this).parent().parent().siblings(".ctl_list").find('.choice').prop('checked', 'checked');
            } else {
                $(this).parent().parent().siblings(".ctl_list").find('.choice').prop('checked', '');
            }
            totalVal();
        });

        // 判断店铺范围内商品是否都被勾上，是店铺就勾上
        $('.shopping_be').on('click', '.choice', function () {
            var check = $(this).parent().parent().parent().find('.choice').length;
            // console.log(check);
            var isck;
            var isck2;
            var isck3 = true;
            for (var i = 0; i < check; i++) {
                isck = $(this).parent().parent().parent().find('.choice').eq(i).prop('checked');
                if (!isck) {
                    isck3 = false;
                }
                // console.log(isck);
            }
            for (var j = check - 1; j >= 0; j--) {
                isck2 = $(this).parent().parent().parent().find('.choice').eq(j).prop('checked');
                if (!isck) {
                    isck3 = false;
                }
            }

            if (isck && isck2 && isck3) {
                $(this).parent().parent().parent().find('.check_all').prop('checked', 'checked');
            } else {
                $(this).parent().parent().parent().find('.check_all').prop('checked', '');
            }
            totalVal();
        });

        // 更改数量 加
        $('.shopping_be').on('click', '.add', function () {
            var val = $(this).prev().val();
            var quota = $(this).prev().attr('data-xg');
            val = ++val >= quota * 1 ? quota * 1 : val;
            var pid = $(this).parent().parent().attr('data-id');
            $(this).prev().val(val);
            // 更改小计
            // 获取单价
            var price = $(this).parent().prev().find('.current').html();
            var total = (price) * val;
            $(this).parent().next().next().html(total);
            $.ajax({
                type: 'post',
                url: '../api/alterCart.php',
                data: {
                    Id: pid,
                    num: val,
                    dbsql: 'cart'
                },
                success: function (str) {

                }
            });
            totalVal();
        });

        // 更改数量 减
        $('.shopping_be').on('click', '.minus', function () {
            var val = $(this).next().val();
            val = --val <= 0 ? 1 : val;
            var pid = $(this).parent().parent().attr('data-id');
            $(this).next().val(val);

            // 更改小计
            // 获取单价
            var price = $(this).parent().prev().find('.current').html();
            var total = (price) * val;
            $(this).parent().next().next().html(total);
            totalVal();

            $.ajax({
                type: 'post',
                url: '../api/alterCart.php',
                data: {
                    Id: pid,
                    num: val,
                    dbsql: 'cart'
                },
                success: function (str) {

                }
            });
        });

        $('.shopping_be').on('blur', '.input_num input', function () {
            var val = $(this).val();
            var quota = $(this).attr('data-xg');
            var pid = $(this).parent().parent().attr('data-id');
            console.log(quota * 1);
            if (val >= quota * 1) {
                $(this).val(quota);
            } else if (val <= 0) {
                $(this).val(1);
            }
            var price = $(this).parent().prev().find('.current').html();
            var total = (price) * val;
            $(this).parent().next().next().html(total);
            $.ajax({
                type: 'post',
                url: '../api/alterCart.php',
                data: {
                    Id: pid,
                    num: val,
                    dbsql: 'cart'
                },
                success: function (str) {

                }
            });
        });

        // 删除单个
        $('.shopping_be').on('click', '.onDel', function () {
            var res = confirm('你确定要删除选中商品吗？');
            if (res) {
                var pid = $(this).parent().parent().attr('data-id');

                $(this).parent().parent().remove();


                there();
                exists();
                totalVal();
                $.ajax({
                    type: 'post',
                    url: '../api/delete.php',
                    data: {
                        delete: 'cart',
                        Id: pid
                    },
                    success: function (str) {

                    }

                });
            }

        });

        // 判断clt-inner里是否还有商品，如果没有就删除
        function there() {
            var inner = $('.shopping_be .clt-inner').length;
            for (var i = 0; i < inner; i++) {
                var lenum = $('.shopping_be .clt-inner').eq(i).find('.ctl_list').length;
                if (lenum == 0) {
                    $('.shopping_be .clt-inner').eq(i).remove();
                }
            }
        }

        // 判断商品是否已全部清空
        function exists() {
            var inner2 = $('.shopping_be').find('.clt-inner').length;
            if (inner2 == 0) {
                $('.shopping_be').css('display', 'none');
                $('.empty').css('display', 'block');
            }
        }


        // 批量处理
        // 当全部勾选时将商品总价放入下面的总价
        function totalVal() {
            // 获取所有商品详情
            var len = $('.shopping_be').find('.ctl_list').length;
            var total = 0;
            for (var i = 0; i < len; i++) {
                var ischeck = $('.shopping_be').find('.ctl_list').eq(i).find('.ctl-details input').prop('checked');
                if (ischeck) {
                    total += $('.shopping_be').find('.ctl_list').eq(i).find('.current').html() * 1;
                }
            }
            $('.clt-total').find('em').html('￥' + total);
        }


        // 批量删除
        // $('.colse-btn').on('click', function () {
        //     // console.log($('.shopping_be').find('.ctl_list .ctl-details input').length);
        //     // 获取被勾选的下标
        //     var res = confirm('你确定要删除选中的商品吗？');
        //     if (res) {
        //         var index = [];
        //         var len = $('.shopping_be').find('.ctl_list .ctl-details input').length;
        //         for (var i = len; i >= 0; i--) {
        //             var isok = $('.shopping_be').find('.ctl_list .ctl-details input').eq(i).prop('checked');
        //             if (isok) {
        //                 index.push(i);
        //             }
        //         }

        //         for (var j = 0; j < index.length; j++) {
        //             var pid = $('.shopping_be').find('.ctl_list').eq(index[j]).attr('data-id');
        //             var isok = $('.shopping_be').find('.ctl_list').eq(index[j]).remove();
        //             $.ajax({
        //                 type: 'post',
        //                 url: '../api/delete.php',
        //                 data: {
        //                     delete: 'cart',
        //                     Id: pid
        //                 },
        //                 success: function (str) {

        //                 }

        //             });
        //         }
        //         there();
        //         exists();
        //         totalVal();
        //     }

        // });
        // 批量删除
        $('.colse-btn').on('click', function () {
            // console.log($('.shopping_be').find('.ctl_list .ctl-details input').length);
            // 获取被勾选的下标
            // var res = confirm('你确定要结算选中的商品吗？');

            var index = [];
            var len = $('.shopping_be').find('.ctl_list .ctl-details input').length;
            for (var i = len; i >= 0; i--) {
                var isok = $('.shopping_be').find('.ctl_list .ctl-details input').eq(i).prop('checked');
                if (isok) {
                    index.push(i);
                }
            }
            if (index.length > 0) {
                var res = confirm('你确定要删除选中的商品吗？');
                if (res) {
                    for (var j = 0; j < index.length; j++) {
                        var pid = $('.shopping_be').find('.ctl_list').eq(index[j]).attr('data-id');
                        var isok = $('.shopping_be').find('.ctl_list').eq(index[j]).remove();
                        $.ajax({
                            type: 'post',
                            url: '../api/delete.php',
                            data: {
                                delete: 'cart',
                                Id: pid
                            },
                            success: function (str) {

                            }

                        });
                    }
                    there();
                    exists();
                    totalVal();
                }

            } else if (index.length <= 0) {
                alert('请勾选商品');
            }
        });




        $('.accounts-btn').on('click', function () {
            // console.log($('.shopping_be').find('.ctl_list .ctl-details input').length);
            // 获取被勾选的下标
            // var res = confirm('你确定要结算选中的商品吗？');

            var index = [];
            var len = $('.shopping_be').find('.ctl_list .ctl-details input').length;
            for (var i = len; i >= 0; i--) {
                var isok = $('.shopping_be').find('.ctl_list .ctl-details input').eq(i).prop('checked');
                if (isok) {
                    index.push(i);
                }
            }
            if (index.length > 0) {
                var res = confirm('你确定要结算选中的商品吗？');
                if (res) {
                    for (var j = 0; j < index.length; j++) {
                        var pid = $('.shopping_be').find('.ctl_list').eq(index[j]).attr('data-id');
                        var isok = $('.shopping_be').find('.ctl_list').eq(index[j]).remove();
                        $.ajax({
                            type: 'post',
                            url: '../api/delete.php',
                            data: {
                                delete: 'cart',
                                Id: pid
                            },
                            success: function (str) {
                                alert('已购买成功');
                            }

                        });
                    }
                    there();
                    exists();
                    totalVal();
                }
                there();
                exists();
                totalVal();

            } else if (index.length <= 0) {
                alert('请勾选商品');
            }
        });
        there();
        exists();
    }

    $('.ht-quit').on('click', function () {
        var storages = window.localStorage;
        storages.clear();
        var site = window.location.pathname;
        location.href = 'login.html?' + site;
    });
});





