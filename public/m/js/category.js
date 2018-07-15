$(function () {
    function renderTop() {
        $.ajax({
           type: 'get',
           url: '/category/queryTopCategory',
           success: function (info) {
            $('.catel_ul').html(template("tpl1", info));
            renderSecond(info.rows[0].id);
           } 
        })
    }
    renderTop();

    $(".catel_ul").on("click", "li", function () {
        $(this).addClass("active").siblings().removeClass("active");
        var id = $(this).data("id");
        renderSecond(id);
    });

    function renderSecond(id) {
        $.ajax({
            type: 'get',
            url: '/category/querySecondCategory',
            data: {id: id},
            success: function (info) {
                $(".cater_ul").html(template("tpl2", info));
            }
        });
    }

});