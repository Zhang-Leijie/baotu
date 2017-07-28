<template>
	<div>
		<el-breadcrumb separator="/">
		  	<el-breadcrumb-item>统计管理</el-breadcrumb-item>
		</el-breadcrumb>

		<div id="main" style="width: 600px;height:400px;"></div>

	</div>
</template>
<script>
var echarts = require('echarts/lib/echarts');
// 引入地图
require('echarts');

	export default {
	  data() {
	    return {
	     
		}
	  },
	  methods: {
	  	initChart() {
	  		 var myChart = echarts.init(document.getElementById('main'));

	        // 指定图表的配置项和数据
	        var option = {
			    title: {
			        text: '保险公司保费月统计图',
			        subtext: '纯属虚构'
			    },
			    tooltip: {
			        trigger: 'axis'
			    },
			    xAxis:  {
			        type: 'category',
			        boundaryGap: false,
			        data: ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月']
			    },
			    yAxis: {
			        type: 'value',
			        axisLabel: {
			            formatter: '{value}'
			        }
			    },
			    series: [
			        {
			            name:'人保',
			            type:'line',
			            data:[11, 11, 15, 13, 12, 13, 10, 21, 13, 12, 13, 10],
			            // markLine: {
			            //     data: [
			            //         {type: 'average', name: '平均值'}
			            //     ]
			            // }
			        },
			        {
			            name:'整体',
			            type:'line',
			            data:[1, 2, 2, 5, 3, 2, 0, 2, 2, 5, 3, 2],
			            // markLine: {
			            //     data: [
			            //         {type: 'average', name: '平均值'},
			            //     ]
			            // }
			        }
			    ]
			};


	        // 使用刚指定的配置项和数据显示图表。
	        myChart.setOption(option);
	  	}
	  },
	  mounted() {
	  	this.initChart();
	  }
	}
</script>