$(function () {
    // 1.渲染页面
    render();
    function getHistory() {
       var arr = JSON.parse(localStorage.getItem("se_history")) || [];
       return arr; 
    }
    function render() {
        var history = getHistory();
        $(".lt_history").html(template("tpl", {history: history}));
    }

    // 2.清空记录
    $(".lt_history").on("click", ".btn_clear", function () {
        mui.confirm("您确定要清空记录吗?", "温馨提示", ["否", "是"], function (e) {
            if (e.index === 1) {
                localStorage.removeItem("se_history");
                render();
            }
        });
    });

    // 3.删除记录
    $(".lt_history").on("click", ".btn_delete", function () {
        var index = $(this).data("index");
        mui.confirm("您确定要删除此项吗?", "温馨提示", ["取消", "确定"], function (e) {
            if (e.index === 1) {
                var arr = getHistory();
                arr.splice(index, 1);
                localStorage.setItem("se_history", JSON.stringify(arr));
                render();
            }
        });
    });

    // 4.添加记录
    $(".btn_search").on("click", function () {
        var arr = getHistory();
        var val = $(".lt_search input").val();
        if (!val.trim()) {
            mui.toast('您想搜索什么内容呢?',{ duration:'short', type:'div' });
            return;
        }
        $(".lt_search input").val("");
        var index = arr.indexOf(val);
        if (index !== -1) {
            arr.splice(index, 1);
        }
        if (arr.length > 9) {
            arr.pop();
        }
        arr.splice( 0, 0, val);
        localStorage.setItem("se_history", JSON.stringify(arr));
        location.href = "searchList.html?key=" + val;
    });






});