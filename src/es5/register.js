'use strict';

$(function () {
    //在验证那跟随鼠标旋转
    function rotate() {
        var iRotate = 0;
        $(document).on('mousemove', function (ev) {
            var ev = ev || window.event;
            var disX = $('.follow').offset().left;
            var disY = $('.follow').offset().top;
            var a = ev.clientX - disX;
            var b = ev.clientY - disY;
            var c = Math.sqrt(a * a + b * b);
            if (a > 0 && b > 0) {
                iRotate = Math.asin(b / c) + 90 * Math.PI / 180;
            } else if (a > 0) {
                iRotate = Math.asin(a / c);
            }
            if (a < 0 && b > 0) {
                iRotate = -(Math.asin(b / c) + 90 * Math.PI / 180);
            } else if (a < 0) {
                iRotate = Math.asin(a / c);
            }
            $('.follow').css('transform', 'rotate(' + iRotate + 'rad)');
        });
    }
    rotate();

    $('.res-verify').on('mouseover', function () {
        var isok = true;
        $(document).off('mousemove');
        $('.follow em').css('display', 'none');
    });
    $('.res-verify').on('mouseout', function () {
        $('.follow em').css('display', 'block');
        rotate();
    });

    function chaj() {
        imgVer({
            el: '$("#imgVer")',
            width: '260',
            height: '160',
            img: ['../img/ver.png', '../img/ver-1.png', '../img/ver-2.png', '../img/ver-3.png'],
            success: function success() {
                //alert('执行登录函数');
                // $(".login").css({
                //     "left": "0",
                //     "opacity": "1"
                // });
                $(".attestation").css({
                    "opacity": "0",
                    'top': '-999px'
                });

                $('.res-verify').css({
                    'background': '#eefff5',
                    'border': '1px solid #f2f2f2',
                    'color': '#1cd569'
                });
                $('.res-verify').find('.follow-wrap').css('display', 'none');
                $('.res-verify').find('.written').text('验证成功');
                // $(".tips").html('你是不是不知道账号密码！？？？');
                // $("#logo").attr("src", 'images/login-err.png')
            },
            error: function error() {
                //alert('错误什么都不执行')
            }
        });
    }
    chaj();

    // 点击出现图片验证,点击周围隐藏
    function onverify() {
        var isok = $('.res-verify').attr('data-isok');
        if (isok == 'on') {
            $('.res-verify').on('click', function (ev) {
                var ev = ev || window.event;
                $('.attestation').css('display', 'block');
                $('.res-verify').attr('data-isok', 'off');
                $(document).click(function () {
                    $(".attestation").css('display', 'none');
                    $('.res-verify').attr('data-isok', 'on');
                });
                ev.stopPropagation();
            });
        }

        //点击周围隐藏


        // $(".attestation").click(function (ev) {
        //     var ev = ev || window.event;
        //     ev.stopPropagation();

        // });
    }
    onverify();

    //点击验证手机号
    $('.res-phone').on('blur', function () {
        var inner = $('.res-phone').val();
        // 非空验证
        if (inner) {
            //正则验证
            if (checkReg.tel(inner)) {
                $('.res-phone').next('.res-message').css('display', 'none');
                $('.res-phone').attr('data-isok', 'yes');
                $.ajax({
                    type: 'post',
                    url: '../api/Username.php',
                    data: {
                        m: 'index',
                        val: inner
                    },
                    success: function success(str) {
                        var arr = JSON.parse(str);
                        if (arr.code == 0) {
                            $('.res-phone').attr('data-isok', 'yes');
                        } else {
                            $('.res-phone').next('.res-message').css('display', 'block');
                            $('.res-phone').attr('data-isok', 'no');
                            $('.res-phone').next('.res-message').text('此号码已被注册');
                        }
                    }
                });
            } else {
                $('.res-phone').next('.res-message').css('display', 'block');
                $('.res-phone').attr('data-isok', 'no');
                $('.res-phone').next('.res-message').text('请填写有效11位手机号码');
            }
        } else {
            $('.res-phone').next('.res-message').css('display', 'block');
            $('.res-phone').attr('data-isok', 'no');
            $('.res-phone').next('.res-message').text('请填写手机号码');
        }
    });

    //验证密码
    $('.res-psw').on('blur', function () {
        var inner = $('.res-psw').val();
        // 非空验证
        if (inner) {
            //正则验证
            if (checkReg.psweasy(inner)) {
                $('.res-psw').next('.res-message').css('display', 'none');
                $('.res-psw').attr('data-isok', 'yes');
            } else {
                $('.res-psw').next('.res-message').css('display', 'block');
                $('.res-psw').attr('data-isok', 'no');
                $('.res-psw').next('.res-message').text('6-16位字母和数字的组合');
            }
        } else {
            $('.res-psw').next('.res-message').css('display', 'block');
            $('.res-psw').attr('data-isok', 'no');
            $('.res-psw').next('.res-message').text('请填写密码');
        }
    });

    // 密码验证
    $('.res-psw2').on('blur', function () {
        var inner = $('.res-psw').val();
        var inner2 = $('.res-psw2').val();
        // 非空验证
        if (inner2) {
            //正则验证
            if (checkReg.pwwagain(inner, inner2)) {
                $('.res-psw2').next('.res-message').css('display', 'none');
                $('.res-psw2').attr('data-isok', 'yes');
            } else {
                $('.res-psw2').next('.res-message').css('display', 'block');
                $('.res-psw2').attr('data-isok', 'no');
                $('.res-psw2').next('.res-message').text('两次输入不一致');
            }
        } else {
            $('.res-psw2').next('.res-message').css('display', 'block');
            $('.res-psw2').attr('data-isok', 'no');
            $('.res-psw2').next('.res-message').text('请填写确认密码');
        }
    });

    // 点击注册
    $('#register-btn').on('click', function () {
        //判断上面的信息是否完整
        if ($('.res-phone').attr('data-isok') == 'yes') {
            if ($('.res-verify').find('.written').text() == '验证成功') {
                if ($('.res-psw2').attr('data-isok') == 'yes') {
                    if ($('.agreement input').prop('checked')) {
                        $.ajax({
                            type: 'post',
                            url: '../api/Register.php',
                            data: {
                                m: 'insert',
                                val: $('.res-phone').val(),
                                paw: $('.res-psw2').val()
                            },
                            success: function success(str) {
                                var arr = JSON.parse(str);
                                if (arr) {
                                    if (confirm('注册成功是否跳转至到登录界面')) {
                                        location.href = 'login.html';
                                    }
                                } else {
                                    alert('注册失败');
                                }
                            }
                        });
                    } else {
                        alert('请查看用户协议');
                    }
                }
            }
        }
    });
});