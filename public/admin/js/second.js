$(function () {
    // 获取数据并渲染到页面
    var page = 1;
    var pageSize = 5;

    function render() {
        $.ajax({
            type: 'get',
            url: '/category/querySecondCategoryPaging',
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

    // 添加功能
    $(".btn_add").click(function () {
        $("#addModal").modal("show");
        $.ajax({
            type: 'get',
            url: '/category/queryTopCategoryPaging',
            data: {
                page: 1,
                pageSize: 100
            },
            success: function (info) {
                console.log(info);
                $(".dropdown-menu").html(template("tpl2", info));
            }
        });
    });
    $(".dropdown-menu").on("click", "a", function () {
        var id = $(this).data("id");
        $("[name='categoryId']").val(id);
        $(".drop_text").text($(this).text());
        $("#form").data("bootstrapValidator").updateStatus("categoryId", "VALID");
    });
    // 上传图片并本地预览
    $("#fileupload").fileupload({
        dataType:"json",
        done:function (e, data) {
            console.log(data);
            $("[name='brandLogo']").val(data.result.picAddr);
            $(".form_img img").attr("src", data.result.picAddr);
            $("#form").data("bootstrapValidator").updateStatus("brandLogo", "VALID");
        }
    });
    // 校验
    $("#form").bootstrapValidator({
        //设置小图标
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        //配置不做校验的类型
        excluded: [],
        //设置校验规则
        fields: {
            categoryId: {
                validators: {
                    notEmpty: {
                        message: "请选择一级分类",
                    },
                }
            },
            brandName: {
                validators: {
                    notEmpty: {
                        message: "请输入二级分类的名称",
                    },
                }
            },
            brandLogo: {
                validators: {
                    notEmpty: {
                        message: "请上传品牌图片",
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
            url: '/category/addSecondCategory',
            data: $("#form").serialize(),
            success: function (info) {
                if (info.success) {
                    $("#addModal").modal("hide");
                    page = 1;
                    render();
                    $("#form").data("bootstrapValidator").resetForm();
                    $("#form")[0].reset();
                    $(".drop_text").text("请选择一级分类");
                    $(".form_img img").attr("src", "./images/none.png");
                }
            },
        });
    });
});