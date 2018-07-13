$(function () {
    // 获取数据并渲染到页面
    var page = 1;
    var pageSize = 5;

    function render() {
        $.ajax({
            type: 'get',
            url: '/category/queryTopCategoryPaging',
            data: {
                page: page,
                pageSize: pageSize
            },
            success: function (info) {
                console.log(info);
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

    // 添加功能
    $(".btn_add").click(function () {
        $("#addModal").modal("show");
    });
    // 校验
    $("#form").bootstrapValidator({
        //设置小图标
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },

        //设置校验规则
        fields: {
            categoryName: {
                validators: {
                    notEmpty: {
                        message: "请输入一级分类的名称",
                    },
                }
            },
        }

    });
    // 添加
    $("#form").on('success.form.bv', function (e) {
        e.preventDefault();
        //使用ajax提交逻辑
        $.ajax({
            type: 'post',
            url: '/category/addTopCategory',
            data: $("#form").serialize(),
            success: function (info) {
                if (info.success) {
                    $("#addModal").modal("hide");
                    page = 1;
                    render();
                    $("#form").data("bootstrapValidator").resetForm();
                    $("#form")[0].reset();
                }
            },
        });
    });
});