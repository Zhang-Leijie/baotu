<template>
	<div class="statisticManageBody">
		<el-breadcrumb separator="/">
		  	<el-breadcrumb-item>统计管理</el-breadcrumb-item>
		</el-breadcrumb>

		<div class="blankCol"></div>

		<el-tabs type="border-card">
		  <el-tab-pane>
		    <span slot="label"><i class="el-icon-picture"></i> 统计图表</span>
		    <div class="table1">
				<el-select v-model="option1" placeholder="请选择车险">
				    <el-option v-for="item in options" :label="item.label" :value="item.value" :key="item.value"></el-option>
				</el-select>

				<el-select v-model="optionMultiple" multiple placeholder="请选择险企">
				    <el-option v-for="item in optionsMultiple" :label="item.label" :value="item.value" :key="item.value"></el-option>
				</el-select>

				<div class="datePicker">
					<el-date-picker v-model="date1" type="daterange" align="right" placeholder="选择日期范围" :picker-options="pickerOptions1"></el-date-picker>
				</div>
			
				<div id="main" style="width: 1200px;height:400px;"></div>
			</div>
		  </el-tab-pane>
		  <el-tab-pane label="保险公司报表">
		  	<div class="table2">
				<label class="title">保险公司报表</label>
				<el-select v-model="option2" placeholder="请选择">
				    <el-option v-for="item in options" :label="item.label" :value="item.value" :key="item.value"></el-option>
				</el-select>
				<el-date-picker v-model="date2" type="daterange" align="right" placeholder="选择日期范围"></el-date-picker>

				<el-table :data="tableData2" border style="width: 100%;font-size:12px; margin-top:10px">
					<el-table-column prop="demo" label="保险公司"></el-table-column>
					<el-table-column prop="demo" label="保单数"></el-table-column>
					<el-table-column prop="demo" label="保费"></el-table-column>
				</el-table>

				<el-pagination v-if="pageCount2" @current-change="pageChange2" :current-page="currentPage2" :page-size="pageSize" layout="total , prev, pager, next, jumper" :page-count='pageCount2' style="margin:20px auto;text-align:center"></el-pagination>
			</div>
		  </el-tab-pane>
		  <el-tab-pane label="业务员报表" v-if="!isAdmin">
		  	<div class="table3">
				<label class="title">业务员报表</label>
				<el-select v-model="option3" placeholder="请选择">
				    <el-option v-for="item in options" :label="item.label" :value="item.value" :key="item.value"></el-option>
				</el-select>
				<el-date-picker v-model="date3" type="date" align="right" placeholder="选择日期范围" :picker-options="pickerOptions2"></el-date-picker>

				<el-table :data="tableData3" border style="width: 100%;font-size:12px; margin-top:10px" @sort-change="sortChange">
					<el-table-column prop="demo" label="保险公司" sortable="custom"></el-table-column>
					<el-table-column prop="demo" label="报价数量" sortable="custom"></el-table-column>
					<el-table-column prop="demo" label="成交数量" sortable="custom"></el-table-column>
					<el-table-column prop="demo" label="成交率" sortable="custom"></el-table-column>
					<el-table-column prop="demo" label="保费" sortable="custom"></el-table-column>
				</el-table>

				<el-pagination v-if="pageCount3" @current-change="pageChange3" :current-page="currentPage3" :page-size="pageSize" layout="total , prev, pager, next, jumper" :page-count='pageCount3' style="margin:20px auto;text-align:center"></el-pagination>
			</div>
		  </el-tab-pane>
		  <el-tab-pane label="保单列表" v-if="!isAdmin">
		  	<div class="table4">
				<label class="title">保单列表</label>
				<el-date-picker v-model="date4" type="date" align="right" placeholder="选择日期范围" :picker-options="pickerOptions2"></el-date-picker>
				<el-input placeholder="使用性质" icon="search" v-model="SearchState" :on-icon-click="SearchData" style="width: 150px"></el-input>
				<el-input placeholder="保险公司" icon="search" v-model="SearchCompany" :on-icon-click="SearchData" style="width: 150px"></el-input>

				<el-table :data="tableData2" border style="width: 100%;font-size:12px; margin-top:10px">
					<el-table-column prop="demo" label="险种"></el-table-column>
					<el-table-column prop="demo" label="车主"></el-table-column>
					<el-table-column prop="demo" label="车牌号"></el-table-column>
					<el-table-column prop="demo" label="签单日期"></el-table-column>
					<el-table-column prop="demo" label="保费"></el-table-column>
					<el-table-column prop="demo" label="佣金"></el-table-column>
					<el-table-column prop="demo" label="到期日期"></el-table-column>
					<el-table-column prop="demo" label="使用性质"></el-table-column>
					<el-table-column prop="demo" label="业务员"></el-table-column>
					<el-table-column prop="demo" label="保单号"></el-table-column>
					<el-table-column prop="demo" label="保险公司"></el-table-column>
				</el-table>

				<el-pagination v-if="pageCount4" @current-change="pageChange4" :current-page="currentPage4" :page-size="pageSize" layout="total , prev, pager, next, jumper" :page-count='pageCount4' style="margin:20px auto;text-align:center"></el-pagination>
			</div>
		  </el-tab-pane>
		</el-tabs>
	</div>
</template>
<script>
var echarts = require('echarts/lib/echarts');
// 引入地图
require('echarts');

	export default {
	  data() {
	    return {
	    	option: null,
	    	options: [
	    	{
	    		value: '1',
	    		label: '非营业车'
	    	},
	    	{
	    		value: '2',
	    		label: '营业车'
	    	},
	    	{
	    		value: '3',
	    		label: '整体车险'
	    	}],
	    	optionsMultiple: [{
	    		value: '1',
	    		label: '太平洋保险'
	    	},
	    	{
	    		value: '2',
	    		label: '平安保险'
	    	},
	    	{
	    		value: '3',
	    		label: '阳光保险'
	    	}],
	        optionMultiple: [],
	        pickerOptions1: {
	          shortcuts: [{
	            text: '最近一周',
	            onClick(picker) {
	              const end = new Date();
	              const start = new Date();
	              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
	              picker.$emit('pick', [start, end]);
	            }
	          }, {
	            text: '最近一个月',
	            onClick(picker) {
	              const end = new Date();
	              const start = new Date();
	              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
	              picker.$emit('pick', [start, end]);
	            }
	          }, {
	            text: '最近三个月',
	            onClick(picker) {
	              const end = new Date();
	              const start = new Date();
	              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
	              picker.$emit('pick', [start, end]);
	            }
	          }]
	        },
	        pickerOptions2: {
	          shortcuts: [{
	            text: '今天',
	            onClick(picker) {
	              picker.$emit('pick', new Date());
	            }
	          }, {
	            text: '昨天',
	            onClick(picker) {
	              const date = new Date();
	              date.setTime(date.getTime() - 3600 * 1000 * 24);
	              picker.$emit('pick', date);
	            }
	          }, {
	            text: '一周前',
	            onClick(picker) {
	              const date = new Date();
	              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
	              picker.$emit('pick', date);
	            }
	          }]
	        },
	        date1: '',
	        date2: '',
	        date3: '',
	        date4: '',
	        tableData2: [],
	        tableData3: [],
	        tableData4: [],
	        currentPage2: 1,
	        currentPage3: 1,
	        currentPage4: 1,
	        pageSize: 10,
	        pageCount2: null,
	        pageCount3: null,
	        pageCount4: null,
	        sortType: false,
	        sortCol: null,
	        isAdmin: false,
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
			            data:[11, 11, 15, 13, 12, 13, 10, 21, 13, 12, 13, 10]
			        },
			        {
			            name:'整体',
			            type:'line',
			            data:[1, 2, 2, 5, 3, 2, 0, 2, 2, 5, 3, 2]
			        }
			    ]
			};
	        // 使用刚指定的配置项和数据显示图表。
	        myChart.setOption(option);
	  	},

	  	getInfo4() {

	  	},

	  	SearchData() {
	  		this.getInfo4();
	  	},

	  	pageChange2(pg) {
	  		this.currentPage2 = pg;
	  	},

	  	pageChange3(pg) {
	  		this.currentPage3 = pg;
	  	},

	  	pageChange4(pg) {
	  		this.currentPage4 = pg;
	  	},

	  	sortChange(val) {
	  		val.order == "ascending"?this.sortType = true:this.sortType = false;

	  		if (val.prop == "demo") {
	    		this.sortCol = "demo";
	    	}
	  	}
	  },
	  mounted() {
	  	this.initChart();
	  	this.isAdmin = window.localStorage.getItem('baotuUserType') == 'pingtai'?true:false;
	  }
	}
</script>
<style lang="less">
.statisticManageBody {
	.blankCol {
		margin: 10px 0 ;
	}
	.table1 {
		padding: 20px;
		background-color: #ffffff;
		width: 1200px;
		.datePicker {
			display: inline-block;
			position: relative;
			left: 450px;
		}
	}
	.table2, .table3, .table4 {
		padding: 0 20px 20px;
		background-color: #ffffff;
		.title {
			display: block;
			line-height: 40px;
			font-size: 20px;
		}
	}
}	
</style>