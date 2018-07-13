$(function () {
    
    document.onreadystatechange = function(){
        NProgress.start();
        console.log(document.readyState);
        if(document.readyState == "Uninitialized"){
          NProgress.set(1);
        }
        if(document.readyState == "Interactive"){
          NProgress.set(0.5);
        }
        if(document.readyState == "complete"){
          NProgress.done();
        }
    }    
    // 进度条
    $(document).ajaxStart(function () {
        NProgress.start();
    });
    $(document).ajaxStop(function () {
        setTimeout(function () {
            NProgress.done();
        }, 500);
    });

    // 侧边栏隐藏功能
    $(".aside_hide").click(function () {
        $(".lt_aside").toggleClass("active");
        $("body").toggleClass("active");
    });

    // 二级菜单
    $(".child").prev().on("click", function () {
        $(this).next().slideToggle(500);
    });

    // 退出功能
    $(".modal_show").click(function () {
        $("#logoutModal").modal('show');
    });
    $(".btn_logout").on("click", function () {
        $.ajax({
            type: 'get',
            url: '/employee/employeeLogout',
            success: function (info) {
                if (info.success) {
                    location.href = "login.html";
                }
            }
        });
    });




});