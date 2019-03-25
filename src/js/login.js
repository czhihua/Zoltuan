$(function () {
    // 切换角色登录
    $('.lr-tab').on('click', 'h3', function () {
        $('.lr-tab').find('h3').css('border-bottom-color', '#E6E6E6');
        $(this).css('border-bottom-color', '#DE3030');
        $('.login-content').css('display', 'none');
        $('.login-content').eq($(this).index()).css('display', 'block');
    });

    // 点击登录
    $('.lg-btn').on('click', function () {
        var user = $('.userName').val();
        var Psw = $('.password').val();
        if (user) {
            if (Psw) {
                $.ajax({
                    type: 'post',
                    url: '../api/login.php',
                    data: {
                        m: 'login',
                        val: user,
                        paw: Psw
                    },
                    success: function (str) {
                        var arr = JSON.parse(str);
                        if (arr.code) {
                            alert(arr.message);
                            var setu = setURL();
                            if (!setu) {
                                location.href = '../index.html';
                            } else {
                                var url = setURL();
                                location.href = '..' + url;
                            }
                            function setURLls() {
                                var storages = window.localStorage;
                                storages.setItem('username', user);

                            }
                            setURLls();

                        } else {
                            alert(arr.message + ',请确认账号密码是否正确');
                        }
                    }
                });
            } else {
                alert('请填写用户名密码');
            }
        } else {
            alert('请填写用户名密码');
        }
    });



    function setURL() {
        var url = window.location.search;
        if (url) {
            var url1 = url.substring(1);
            var arr = url1.split('/');
            // var aar=url1.split()
            var arr1 = '';
            for (var i = 3; i < arr.length; i++) {
                arr1 += '/' + arr[i];
            }
            return arr1;

        }
    }
    setURL();





});