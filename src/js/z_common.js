//zol
// 选项卡点击渲染
function onoption() {
    $('#today-title .tt-nav').on('click', 'li', function () {
        $('#today-title .tt-nav li').find('a').attr('class', '');
        $(this).find('a').attr('class', 'active');
        $('body,html').stop().animate({
            scrollTop: 0 + 'px'
        }, 0);
        $('.lanjiaz').css('display', 'block');
        $('#goods-nav').css('display', 'none');
        setTimeout(function () {
            $('.lanjiaz').css('display', 'none');
            $('#goods-nav').css('display', 'block');
            all = true;
        }, 1000);
    });
}


//滑动到一定距离出现回到顶部的小组件和点击回到顶部
//返回顶部
function BacktoTop() {
    $(window).scroll(function () {
        var ws = $(window).scrollTop();
        var hs = $('#today-title').offset().top;
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



// 获取网址存cookie
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




// //根据cookie来检测登录状态
// function getURL() {
//     var storages = window.localStorage;
//     var res = storages.getItem('username');
//     // console.log(res0);
//     // var res = cookie.get('name');
//     if (res) {
//         // var res1 = res0.split('=')[1];
//         $('.ht-login').find('i').text('您好，' + res);
//         $('.ht-login').find('a').css('display', 'none');
//         $('.ht-res').css('display', 'none');
//         $('.ht-quit').css('display', 'inline');
//     } else {
//         $('.ht-login').find('i').text('Hi~欢迎来到Z商城，请');
//         $('.ht-login').find('a').css('display', 'inline');
//         $('.ht-res').css('display', 'inline');
//         $('.ht-quit').css('display', 'none');
//     }
// }



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

function tiaozhuang() {
    // 点击商城首页
    // 跳转首页
    $('.ht-title').on('click', function () {
        location.href = '../index.html';
    });
}









