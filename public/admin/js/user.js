$(function () {
    // 获取数据并渲染到页面
    var page = 1;
    var pageSize = 5;
    function render() {
        $.ajax({
            type: 'get',
            url: '/user/queryUser',
            data: {
                page: page,
                pageSize: pageSize
            },
            success: function (info) {
                // console.log(info);
                $("tbody").html(template("tpl", info));
                //分页的功能
                $("#paginator").bootstrapPaginator({
                    bootstrapMajorVersion: 3, //指定bootstrap的版本
                    size: 'small', //设置分页控件的大小
                    currentPage: page, //设置当前页
                    totalPages: Math.ceil(info.total / info.size), //设置总页数,需要计算
                    onPageClicked: function (a, b, c, p) {
                        //修改当前页
                        page = p;
                        //重新渲染
                        render();
                    }
                });
            }
        });
    }
    render();


    // 点击按钮改变状态
    $("tbody").on("click", "button", function () {
        var id = $(this).parent().data("id");
        var isDelete;
        if ($(this).hasClass("btn-success")) {
            isDelete = 1;
        } else {
            isDelete = 0;
        }
        $.ajax({
            type: 'post',
            url: '/user/updateUser',
            data: {
                id: id,
                isDelete: isDelete
            },
            success: function (info) {
                // console.log(info);
                render();
            }
        });
    });

});