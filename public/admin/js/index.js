// 柱形图
var myChart = echarts.init(document.getElementById('column_main'));
// 指定图表的配置项和数据
var col_option = {
    title: {
        text: '2018年注册人数'
    },
    tooltip: {},
    legend: {
        data: ['人数']
    },
    xAxis: {
        data: ["1月", "2月", "3月", "4月", "5月", "6月"]
    },
    yAxis: {},
    series: [{
        name: '人数',
        type: 'bar',
        data: [1222, 2311, 1167, 2011, 1444, 1801]
    }]
};
// 使用刚指定的配置项和数据显示图表。
myChart.setOption(col_option);


// 饼图
var myChart = echarts.init(document.getElementById('pie_main'));
// 指定图表的配置项和数据
var pie_option = {
    title : {
        text: '热门品牌销售',
        subtext: '2018年7月',
        x:'center'
    },
    tooltip : {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    legend: {
        orient: 'vertical',
        left: 'left',
        data: ['耐克','阿迪','新百伦','李宁','阿玛尼']
    },
    series : [
        {
            name: '访问来源',
            type: 'pie',
            radius : '55%',
            center: ['50%', '60%'],
            data:[
                {value:335, name:'耐克'},
                {value:310, name:'阿迪'},
                {value:234, name:'新百伦'},
                {value:135, name:'李宁'},
                {value:1548, name:'阿玛尼'}
            ],
            itemStyle: {
                emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
        }
    ]
};
// 使用刚指定的配置项和数据显示图表。
myChart.setOption(pie_option);
