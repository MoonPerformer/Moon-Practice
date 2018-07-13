$(function () {
    //表单校验
    $("#form").bootstrapValidator({

        //设置小图标
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },

        //设置校验规则
        fields: {

            username: {
                validators: {
                    notEmpty: {
                        message: "用户名不能为空"
                    },
                    stringLength: {
                        min: 3,
                        max: 6,
                        message: "用户名长度必须在3-6之间"
                    },
                    callback: {
                        message: "用户名不存在"
                    }
                }
            },
            password: {
                validators: {
                    notEmpty: {
                        message: "用户名不能为空"
                    },
                    stringLength: {
                        min: 6,
                        max: 12,
                        message: "用户名长度必须在6-12之间"
                    },
                    callback: {
                        message: "密码错误"
                    }
                }
            }

        }

    });
    //登录
    $("#form").on('success.form.bv', function (e) {
        e.preventDefault();
        //使用ajax提交逻辑
        $.ajax({
            type: 'post',
            url: '/employee/employeeLogin',
            data: $(".form-horizontal").serialize(),
            success: function (info) {
                if (info.error === 1000) {
                    $("#form").data("bootstrapValidator").updateStatus("username", "INVALID", "callback");
                }
                if (info.error === 1001) {
                    $("#form").data("bootstrapValidator").updateStatus("password", "INVALID", "callback");
                }
                if (info.success) {
                    location.href = "index.html";
                }
            },
        });
    });
    //重置
    $("[type='reset']").on("click", function(){
        $("#form").data("bootstrapValidator").resetForm();
    });
});