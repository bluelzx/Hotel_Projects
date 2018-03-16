$(document).ready(function() {
    $(".Order1").css("background", "#5944C3");
    $(".Order1").css("color", "#FFFFFF");
    Listorder('', '', '', '', 1);
})
let img_url = "https://dev.apis.sh/P7G0PaMgO/static/";
$(".Order1").click(function() {
    $(".Order1").css("background", "#5944C3");
    $(".Order1").siblings().css("background", "");
    $(".Order1").css("color", "#FFFFFF");
    $(".Order1").siblings().css("color", "");
    Listorder('', '', '', '', 1);
});
//待付款
$(".Order2").click(function() {
    $(".Order2").css("background", "#5944C3");
    $(".Order2").siblings().css("background", "");
    $(".Order2").css("color", "#FFFFFF");
    $(".Order2").siblings().css("color", "");
    Listorder('待付款', '', '', '', 1);
});
//预定中
$(".Order3").click(function() {
    $(".Order3").css("background", "#5944C3");
    $(".Order3").siblings().css("background", "");
    $(".Order3").css("color", "#FFFFFF");
    $(".Order3").siblings().css("color", "");
    Listorder('预定中', '', '', '', 1);
});
//已完成
$(".Order4").click(function() {
    $(".Order4").css("background", "#5944C3");
    $(".Order4").siblings().css("background", "");
    $(".Order4").css("color", "#FFFFFF");
    $(".Order4").siblings().css("color", "");
    Listorder('已完成', '', '', '', 1);
});
//已取消
$(".Order5").click(function() {
    $(".Order5").css("background", "#5944C3");
    $(".Order5").siblings().css("background", "");
    $(".Order5").css("color", "#FFFFFF");
    $(".Order5").siblings().css("color", "");
    Listorder('已取消', '', '', '', 1);
});
$(".peravator").attr("src", img_url + localStorage.pit);

//发送get请求
function Listorder(status, orderNo, customerName, checkTime, page) {
    var token = localStorage.token;
    let img_url = "https://dev.apis.sh/P7G0PaMgO/static/";
    $.ajax("https://dev.apis.sh/P7G0PaMgO/v1/order/list", {
            method: "get", // get请求
            dataType: 'json', // 当服务器发来html元素时，需要如此设置，使ajax进行html解析
            data: {
                token: token,
                status: status,
                orderNo: orderNo,
                customerName: customerName,
                checkTime: checkTime,
                limit: '4',
                page: page
            },
            xhrFields: {
                withCredentials: true // 允许跨域名储存和访问cookie
            }
        })
        .done(function(data) { // 处理ajax成功的回调
            var olist = data.data.orderList;
            num = Math.ceil(data.data.count / 4);
            $(".li6").html(num);
            if (num == 3) {
                $(".li4").hide();
                $(".li5").hide();
                $(".li6").hide();
            } else if (num == 2) {
                $(".li3").hide();
                $(".li4").hide();
                $(".li5").hide();
                $(".li6").hide();
            } else if (num == 4) {
                $(".li5").hide();
                $(".li6").hide();
            } else if (num == 5) {
                $(".li5").hide();
            }
            var str = '';
            for (var i = 0; i < olist.length; i++) {
                str += '<div class="list">';
                str += '<span class="list1">' + olist[i].orderNo + '</span>';
                str += '<span class="list2">';
                str += '<span class="lists1">' + olist[i].hotel.name + '</span><br>';
                str += '<span class="lists2">' + olist[i].roomName + '</span>';
                str += '</span>';
                str += '<span class="list3">' + olist[i].create_time + '</span>';
                str += '<span class="list4">' + olist[i].customerName + '</span>';
                str += '<span class="list5">' + olist[i].amount + '</span>';
                str += '<span class="list6">' + olist[i].status + '</span>';
                str += '<a target = "_blank" href="Order_details.html?id=' + olist[i]._id + '">';
                str += '<span class="list7">查看</span>';
                str += '</a>';
                if (olist[i].status == '预定中') {
                    str += '<a target = "_blank" href="Cancellationorder.html?id=' + olist[i]._id + '"><span class="list8">取消预订</span> </a>';
                } else if (olist[i].status == '待支付') {
                    str += '<a target = "_blank" href="payment.html?id=' + olist[i]._id + '&hotelone=' + olist[i].hotel.name + '&House_big=' + olist[i].roomName + '&pay=' + olist[i].amount + '&src=' + img_url + olist[i].hotel.picture["0"] + '"> <span class="list9">去支付</span> </a>';
                } else if (olist[i].status == '已完成') {
                    str += '<a target = "_blank" href="evaluate.html?id=' + olist[i]._id + '"> <span class="list9">去评价</span> </a>';
                }
                str += '</div>';
                str += '<div class="hr"></div>';
            }
            $(".OrderLists").html(str);
            Intercept();

        })
}
//限制字符个数
function Intercept() {
    $(".lists1").each(function() {
        var maxwidth = 7;
        if ($(this).text().length > maxwidth) {
            $(this).text($(this).text().substring(0, maxwidth));
            $(this).html($(this).html() + '');
        }
    });
}
var num;
var i = 1;
var q = 2;
var w = 3;
var e = 4;
$(".liimg1").click(function() {
    addition();
});
//减
$(".liimg").click(function() {
    subtraction();
});
$(".li4").click(function() {
    addition();
})
$(".li1").click(function() {
    subtraction();
})

function subtraction() {
    if (i > 1) {
        for (var j = 0; j < 1; j++) {
            i--;
            q--;
            w--;
            e--;
        }
        $(".li1").html(i);
        $(".li2").html(q);
        $(".li3").html(w);
        $(".li4").html(e);

    }
    if (e < num && e > 1) {
        $(".li5").show();
        $(".li6").show();
    }
}

function addition() {
    if (e < num - 1) {
        for (var j = 0; j < 1; j++) {
            i++;
            q++;
            w++;
            e++;
        }
        $(".li1").html(i);
        $(".li2").html(q);
        $(".li3").html(w);
        $(".li4").html(e);
    }
    if (e == num - 1) {
        $(".li5").hide();

    }

}

$(".li1").click(function() {
    var on1 = $(this).text();
    console.log($(this).text());
    Listorder('', '', '', '', on1);

});
$(".li2").click(function() {
    var on2 = $(this).text();
    console.log($(this).text());
    Listorder('', '', '', '', on2);
});
$(".li3").click(function() {
    var on3 = $(this).text();
    console.log($(this).text());
    Listorder('', '', '', '', on3);
});
$(".li4").click(function() {
    var on4 = $(this).text();
    console.log($(this).text());
    Listorder('', '', '', '', on4);
});
$(".li6").click(function() {
    var on5 = $(this).text();
    console.log($(this).text());
    Listorder('', '', '', '', on5);
});

//查询按钮
$(".btn").click(function() {
    let order = $(".Order_number1").val();
    let orders = $(".Order_number2").val();
    let timers = $(".Order_number3").val();
    Listorder('', 'order', 'orders', '', 1);


});
//我的订单
$(".span1").click(function() {
    window.location.href = "Order_list.html"
});