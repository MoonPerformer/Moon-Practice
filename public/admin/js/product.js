$(function () {
    // 获取数据并渲染到页面
    var page = 1;
    var pageSize = 2;

    function render() {
        $.ajax({
            type: 'get',
            url: '/product/queryProductDetailList',
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
                    //控制每个按钮显示的文字,通过返回值来控制
                    //每个按钮都会执行一次itemText函数，返回值就是这个按钮的内容
                    itemTexts: function (type, page, current) {
                        //console.log(type, page, current);
                        switch (type) {
                            case "first":
                                return "第一页";
                            case "prev":
                                return "上一页";
                            case "next":
                                return "下一页";
                            case "last":
                                return "最后一页";
                            case "page":
                                return page + "页";
                        }
                    },
                    tooltipTitles: function (type, page, current) {
                        switch (type) {
                            case "first":
                                return "第一页";
                            case "prev":
                                return "上一页";
                            case "next":
                                return "下一页";
                            case "last":
                                return "最后一页";
                            case "page":
                                return page + "页";
                        }
                    },
                    useBootstrapTooltip: true,
                    bootstrapTooltipOptions: {
                        placement: "bottom"
                    },
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
            url: '/category/querySecondCategoryPaging',
            data: {
                page: 1,
                pageSize: 100
            },
            success: function (info) {
                // console.log(info);
                $(".dropdown-menu").html(template("tpl2", info));
            }
        });
    });
    $(".dropdown-menu").on("click", "a", function () {
        var id = $(this).data("id");
        $("[name='brandId']").val(id);
        $(".drop_text").text($(this).text());
        $("#form").data("bootstrapValidator").updateStatus("brandId", "VALID");
    });
    // 上传图片并本地预览
    var imgs = [];
    $("#fileupload").fileupload({
        dataType: "json",
        done: function (e, data) {
            if (imgs.length === 3) {
                return;
            }
            imgs.push(data.result);
            $(".form_img").append('<img src="' + data.result.picAddr + '" alt="" width="100" height="100" style="display:inline-block;" >');
            if (imgs.length === 3) {
                $("#form").data("bootstrapValidator").updateStatus("brandLogo", "VALID");
            } else {
                $("#form").data("bootstrapValidator").updateStatus("brandLogo", "INVALID");
            }
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
            brandId: {
                validators: {
                    notEmpty: {
                        message: "请选择二级分类",
                    },
                }
            },
            proName: {
                validators: {
                    notEmpty: {
                        message: "请输入商品的名称",
                    },
                }
            },
            proDesc: {
                validators: {
                    notEmpty: {
                        message: "请输入商品的描述",
                    },
                }
            },
            num: {
                validators: {
                    notEmpty: {
                        message: "请输入商品的库存",
                    },
                    //正则校验
                    regexp: {
                        regexp: /^[1-9]\d{0,4}$/,
                        message: '请输入正确的库存(1-99999)'
                    }
                }
            },
            size: {
                validators: {
                    notEmpty: {
                        message: "请输入商品的尺码",
                    },
                    //正则校验
                    regexp: {
                        regexp: /^\d{2}-\d{2}$/,
                        message: '请输入正确的尺码,例如(32-46)'
                    }
                }
            },
            oldPrice: {
                validators: {
                    notEmpty: {
                        message: "请输入商品的原价",
                    },
                }
            },
            price: {
                validators: {
                    notEmpty: {
                        message: "请输入商品的价格",
                    },
                }
            },
            brandLogo: {
                validators: {
                    notEmpty: {
                        message: "请上传三张图片",
                    },
                }
            },

        }

    });
    // 添加
    $("#form").on('success.form.bv', function (e) {
        e.preventDefault();
        //使用ajax提交逻辑
        var prome = $("#form").serialize();
        prome += "&picName1=" + imgs[0].picName + "&picAddr1=" + imgs[0].picAddr;
        prome += "&picName2=" + imgs[1].picName + "&picAddr2=" + imgs[1].picAddr;
        prome += "&picName3=" + imgs[2].picName + "&picAddr3=" + imgs[2].picAddr;
        $.ajax({
            type: 'post',
            url: '/product/addProduct',
            data: prome,
            success: function (info) {
                if (info.success) {
                    $("#addModal").modal("hide");
                    page = 1;
                    render();
                    $("#form").data("bootstrapValidator").resetForm(true);
                    // $("#form")[0].reset();
                    $(".drop_text").text("请选择二级分类");
                    $(".form_img img").remove();
                    imgs = [];
                }
            },
        });
    });


});