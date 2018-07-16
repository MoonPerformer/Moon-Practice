$(function () {
    var page = 1;
    var pageSize = 5;
    var key = getSearch().key;
    $(".lt_search input").val(key);
    render();
    // 获取地址栏参数
    function getSearch() {
        var search = location.search;
        search = decodeURI(search);
        search = search.slice(1);
        var arr = search.split("&");
        var obj = {};
        arr.forEach(function (item) {
            var k = item.split("=")[0];
            var v = item.split("=")[1];
            obj[k] = v;
        });
        // console.log(obj);
        return obj;
    }
    
    function render() {
        var obj = {
            page: page,
            pageSize: pageSize,
            proName: key
        }
        var $now = $(".lt_sort a.active");
        // console.log($now);
        if ($now.length === 1) {
            var type = $now.data("type");
            var value = $now.find(".fa").hasClass("fa-angle-down") ? 2 : 1;
        }
        obj[type] = value;
        $.ajax({
            type: 'get',
            url: '/product/queryProduct',
            data: obj,
            success: function (info) {
                $(".lt_product").html(template("tpl", info));
            }
        });
    }
    // 搜索
    $(".btn_search").on("click", function () {
        key = $(".lt_search input").val().trim();
        render();
    });
    // 排序
    $(".lt_sort a[data-type]").on("click", function () {

        if ($(this).hasClass("active")) {
            $(this).find(".fa").toggleClass("fa-angle-down").toggleClass("fa-angle-up");
        } else {
            $(this).addClass("active").siblings().removeClass("active");
            $(".lt_sort .fa").removeClass("fa-angle-up").addClass("fa-angle-down");
        }
        render();
    });
});