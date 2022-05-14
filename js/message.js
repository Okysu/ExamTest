var right_id = 0;
var On_Bg = false;
var Grade = new Array(101).fill(0);
var Finished = 0;

function randomNum(minNum, maxNum) {
    switch (arguments.length) {
        case 1:
            return parseInt(Math.random() * minNum + 1, 10);
            break;
        case 2:
            return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10);
            break;
        default:
            return 0;
            break;
    }
}
/**
 * 消息提示组件
 * 
 * 1.调用
 * 字符串类型参数： $.message('成功');
 * 对象型参数：$.message({});
 * 
 * 2.参数详解
 *  message:' 操作成功',    //提示信息
    time:'2000',           //显示时间（默认：2s）
    type:'success',        //显示类型，包括4种：success.error,info,warning
    showClose:false,       //显示关闭按钮（默认：否）
    autoClose:true,        //是否自动关闭（默认：是）
 * 
 * type:success,error,info,warning
 */

$.extend({
    message: function (options) {
        var defaults = {
            message: ' 操作成功',
            time: '2000',
            type: 'success',
            showClose: false,
            autoClose: true,
            onClose: function () {}
        };

        if (typeof options === 'string') {
            defaults.message = options;
        }
        if (typeof options === 'object') {
            defaults = $.extend({}, defaults, options);
        }
        //message模版
        var templateClose = defaults.showClose ? '<a class="c-message--close">×</a>' : '';
        var template = '<div class="c-message messageFadeInDown">' +
            '<i class=" c-message--icon c-message--' + defaults.type + '"></i>' +
            templateClose +
            '<div class="c-message--tip">' + defaults.message + '</div>' +
            '</div>';
        var _this = this;
        var $body = $('body');
        var $message = $(template);
        var timer;
        var closeFn, removeFn;
        //关闭
        closeFn = function () {
            $message.addClass('messageFadeOutUp');
            $message.one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
                removeFn();
            })
        };
        //移除
        removeFn = function () {
            $message.remove();
            defaults.onClose(defaults);
            clearTimeout(timer);
        };
        //移除所有
        $('.c-message').remove();
        $body.append($message);
        //居中
        $message.css({
            'margin-left': '-' + $message.width() / 2 + 'px'
        })
        //去除动画类
        $message.one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
            $message.removeClass('messageFadeInDown');
        });
        //点击关闭
        $body.on('click', '.c-message--close', function (e) {
            closeFn();
        });
        //自动关闭
        if (defaults.autoClose) {
            timer = setTimeout(function () {
                closeFn();
            }, defaults.time)
        }
    }
});

function Right(id) {
    if (id == right_id) {
        Fresh();
        return;
    }
    $.message({
        message: '再想想吧？',
        type: 'error',
        time: '600'
    });
}

function Fresh() {
    var Q_Type = Math.floor(Math.random() * 10);
    var BG_ID = randomNum(1, 9999999);
    $.ajax({
        type: "POST", //请求方式
        url: "CreateTest.php", //请求的url
        data: "type=" + Q_Type,
        dataType: "json", //后台数据返回类
        success: function (res) { //响应成功执行的
            if (Q_Type >= 5) {
                right_id = res.Q_ANS;
                $("#A").html(res.Q_O1);
                $("#B").html(res.Q_O2);
                $("#C").html(res.Q_O3);
                $("#D").html(res.Q_O4);
                $("#Q").html(res.Q_CON);
                document.getElementById("C").style.display = "";
                document.getElementById("D").style.display = "";
                $('#LookArea').css('display', '');
            } else {
                right_id = res.Q_ANS;
                $("#A").html("A.正确");
                $("#B").html('B.错误');
                $("#Q").html(res.Q_CON);
                document.getElementById("C").style.display = "none";
                document.getElementById("D").style.display = "none";
                $('#LookArea').css('display', 'none');
            }
            if (On_Bg !== false) {
                $("#Bg").attr("style", 'background-image: url("https://api.uomg.com/api/rand.img2?random' + BG_ID + ') ');
            }
        }
    });
}

function Fresh_Rem() {
    var Q_Type = Math.floor(Math.random() * 10);
    $.ajax({
        type: "POST", //请求方式
        url: "RemQuestion.php", //请求的url
        data: "type=" + Q_Type,
        dataType: "text", //后台数据返回类
        success: function (res) { //响应成功执行的
            $("#Rem_Q").html(res);
        }
    });
}