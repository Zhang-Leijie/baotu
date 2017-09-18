<template>
	<div class="statisticManageBody">
		<el-breadcrumb separator="/">
		  	<el-breadcrumb-item>统计管理</el-breadcrumb-item>
		</el-breadcrumb>

		<div style="margin: 10px;"></div>

		<el-tabs type="border-card" @tab-click="changeTab" value="first">
			<el-tab-pane name="first">
				<span slot="label"><i class="el-icon-picture"></i> 统计图表</span>
				<div class="table1">
					<el-select v-model="data1.option" placeholder="请选择车险" @change="option1Change">
					    <el-option v-for="item,index in options" :label="item.label" :value="item.value" :key="index"></el-option>
					</el-select>

					<el-select v-model="data1.optionMultiple" multiple placeholder="整体" @change="optionMultiple1Edit">
					    <el-option v-for="item,index in optionsMultiple" :label="item.label" :value="item.value" :key="index"></el-option>
					</el-select>

					<div class="toolBarR">
						<el-date-picker v-model="data1.dateStart" type="month" align="right" placeholder="选择日期范围" :picker-options="pickerDisableStart" @change="date1Change"></el-date-picker>
						<span>-</span>
						<el-date-picker v-model="data1.dateEnd" type="month" align="right" placeholder="选择日期范围" :picker-options="pickerDisableEnd" @change="date1Change"></el-date-picker>
					</div>

					<div ref="main" style="width: 1200px;height:400px;"></div>
				</div>
			</el-tab-pane>

			<el-tab-pane label="保险公司报表" name="second">
				<div class="table2">
					<label class="title">保险公司报表</label>
					<el-select v-model="data2.option" placeholder="请选择" @change="option2Change">
					    <el-option v-for="item in options" :label="item.label" :value="item.value" :key="item.value"></el-option>
					</el-select>
					
					<div class="toolBarR">
						<el-radio-group v-model="data2.rangeType" @change="rangeType2Change">
					    	<el-radio :label="0">昨天</el-radio>
					    	<el-radio :label="1">今天</el-radio>
					    	<el-radio :label="10">日</el-radio>
					    	<el-radio :label="100">月</el-radio>
					    	<el-radio :label="1000">年</el-radio>
						</el-radio-group>
						<el-date-picker v-model="data2.dateBuf" type="date" align="right" placeholder="请选择某一天" v-show="data2.rangeType == '10'" @change="date2Change"></el-date-picker>
						<el-date-picker v-model="data2.dateBuf" type="month" align="right" placeholder="请选择某一月" v-show="data2.rangeType == '100'" @change="date2Change"></el-date-picker>
						<el-date-picker v-model="data2.dateBuf" type="year" align="right" placeholder="请选择某一年" v-show="data2.rangeType == '1000'" @change="date2Change"></el-date-picker>
					</div>

					<el-table :data="data2.formData" border style="width: 100%;font-size:12px; margin-top:10px">
						<el-table-column prop="insurerName" label="保险公司"></el-table-column>
						<el-table-column prop="total" label="保单数"></el-table-column>
						<el-table-column prop="premium" label="保费">
							<template scope="scope">
					    		<span>{{scope.row.premium?scope.row.premium + '元':''}}</span>
					    	</template>
						</el-table-column>
					</el-table>

					<div class="toolBarR">
						<el-pagination v-if="data2.pageCount" @current-change="pageChange2" :current-page="data2.currentPage" :page-size="data2.pageSize" :total="data2.length" layout="total , prev, pager, next, jumper" :page-count='data2.pageCount' style="margin:20px auto;text-align:center" v-show="data2.length"></el-pagination>
					</div>

					<div class="toolBarL">
						<el-button @click="downloadExcel2(data2.tableData)" style="margin:20px auto;">导出数据</el-button>
					</div>
				</div>
			</el-tab-pane>
			<el-tab-pane label="业务员报表" name="third">
				<div class="table3">
					<label class="title">业务员报表</label>
					<el-select v-model="data3.option" placeholder="请选择">
					    <el-option v-for="item in options" :label="item.label" :value="item.value" :key="item.value"></el-option>
					</el-select>
					<el-date-picker v-model="data3.date" type="date" align="right" placeholder="选择日期范围" :picker-options="pickerOptions2"></el-date-picker>

					<el-table :data="data3.formData" border style="width: 100%;font-size:12px; margin-top:10px" @sort-change="sortChange">
						<el-table-column prop="demo" label="保险公司" sortable="custom"></el-table-column>
						<el-table-column prop="demo" label="报价数量" sortable="custom"></el-table-column>
						<el-table-column prop="demo" label="成交数量" sortable="custom"></el-table-column>
						<el-table-column prop="demo" label="成交率" sortable="custom"></el-table-column>
						<el-table-column prop="demo" label="保费" sortable="custom"></el-table-column>
					</el-table>

					<el-pagination v-if="data3.pageCount" @current-change="pageChange3" :current-page="data3.currentPage" :page-size="data3.pageSize" :total="data3.length" layout="total , prev, pager, next, jumper" :page-count='data3.pageCount' style="margin:20px auto;text-align:center" v-show="data3.length"></el-pagination>
				</div>
			</el-tab-pane>
		</el-tabs>

		<a href="" download="表单.xlsx" id="hf"></a>
	</div>
</template>
<script>
import { autoApi } from '@/ajax/post.js'
var echarts = require('echarts/lib/echarts');

// 引入表格
require('echarts');

export default {
	data() {
	    return {
	    	myChart: null,
	    	data1: {
	    		option: null,
	    		dateStart: null,
	    		dateEnd: null,
	       	 	optionMultiple: [],
	    		chartData: {
	    			xAxis: ['1','2'],
	    			series: [{
			            name: null,
			            type: 'line',
			            data: [1,2],
			        }],
	    		}
	    	},
	    	data2: {
	    		option: null,
	    		date: null,
	    		dateBuf: null,
	    		rangeType: null,
	    		tableData: [],
	    		formData: [],
	    		currentPage: 1,
	       		pageSize: 10,
	       		pageCount: null,
	       		length: null,
	    	},
	    	data3: {
	    		option: null,
	    		date: null,
	    		tableData: [],
	    		formData: [],
	    		currentPage: 1,
	       		pageSize: 10,
	       		pageCount: null,
	       		length: null,
	       		sortType: false,
	       		sortCol: null,
	    	},
	    	options: [],
	    	optionsMultiple: [],
	        pickerOptions2: {},
	        pickerDisableStart: {},
	        pickerDisableEnd: {}
	    }
    },
    methods: {
	  	init() {
	  		this.options = [
	    	{
	    		value: 3,
	    		label: '非营业车'
	    	},
	    	{
	    		value: 12,
	    		label: '营业车'
	    	},
	    	{
	    		value: null,
	    		label: '整体车险'
	    	}];

	    	//获取险企列表
	    	let payload = {
	    		employeeId: window.localStorage.getItem('employeeId'),
	    	};
	    	payload = JSON.stringify(payload);
			autoApi({
	   			action: 'insurers',
	   			version: '1.0',
	   			payload: payload			
	   		},window.localStorage.getItem('token')).then((res)=> {
	   			if (res.code == 0) {
	   				this.optionsMultiple = [];
	   				if(res.attach[0]) {
	   					for (let i = 0; i < res.attach.length; i++) {
	   						let buf = {
	   							value: res.attach[i].id,
	   							label: res.attach[i].name,
	   						}
	   						this.optionsMultiple.push(buf);
	   					}
	   					let demoBuf = {
	   						value: 'all',
	   						label: '整体',
	   					}
	   					this.optionsMultiple.push(demoBuf);
	   				}
       			}
	   		})

	  		this.pickerOptions2 = {
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
	  		};
	  		var vm = this;
	  		this.pickerDisableStart = {
	  			disabledDate(day) {
	  				if (vm.data1.dateEnd) {
	  					let aaaa = vm.data1.dateEnd.getMonth();
	  					if ( (vm.data1.dateEnd.getMonth() - 1 < day.getMonth() && vm.data1.dateEnd.getFullYear() == day.getFullYear()) || (vm.data1.dateEnd.getFullYear() < day.getFullYear()) ) {
	  						return true;
	  					}
	  					else
	  					{
	  						return false;
	  					}
	  				}
	  				else
	  				{
	  					return false;
	  				}
	  			}
	  		},
	  		this.pickerDisableEnd = {
	  			disabledDate(day) {
	  				if (vm.data1.dateStart) {
	  					if ( (vm.data1.dateStart.getMonth() + 1 > day.getMonth() && vm.data1.dateStart.getFullYear() == day.getFullYear()) || (vm.data1.dateStart.getFullYear() > day.getFullYear()) ) {
	  						return true;
	  					}
	  					else
	  					{
	  						return false;
	  					}
	  				}
	  				else
	  				{
	  					return false;
	  				}
	  			}
	  		}

	  		this.data2.rangeType = 1;
	  		this.data2.date = new Date();

	  		this.myChart = echarts.init(this.$refs.main);
	  		this.getInfo(1);
	  		this.drawChart();
	  	},

	  	changeTab(val) {
	  		switch(val.name) {
	  			case 'first':
	  				this.getInfo(1);
	  				break;
	  			case 'second':
	  				this.getInfo(2);
	  				break;
	  			case 'third':
	  				this.getInfo(3);
	  				break;
	  			default:
	  				//
	  				break;
	  		}
	  	},

	  	drawChart() {
	        // 指定图表的配置项和数据
	        var option = {
			    title: {
			        text: '保险公司保费月统计图',
			    },
			    tooltip: {
			        trigger: 'axis'
			    },
			    xAxis:  {
			        type: 'category',
			        boundaryGap: false,
			        data: this.data1.chartData.xAxis,
			    },
			    yAxis: {
			        type: 'value',
			        axisLabel: {
			            formatter: '{value}'
			        }
			    },
			    series: this.data1.chartData.series,
			};
	        // 使用刚指定的配置项和数据显示图表。
	        this.myChart.setOption(option);
	  	},

	  	getInfo(num) {
	  		switch(num) {
	  			case 1:
				  	//获取y轴数据
	  				let payload1 = {
				  		employeeId: window.localStorage.getItem('employeeId'),
				  		insurers: this.data1.optionMultiple,
				  		timeType: 'MONTH',		//必选,时间维度
				  		statisticUsedMod: this.data1.option,	//统计使用性质模值	营利车:1+2 非营利车4+8
				  		beginTime: this.data1.dateStart?this.data1.dateStart.getTime() / 1000:null,		//开始时间
				  		endTime: this.data1.dateEnd?this.data1.dateEnd.getTime() / 1000:null,			//结束时间
				  		groupMod: this.data1.optionMultiple[0]?8:null,
				  	}
				  	payload1 = JSON.stringify(payload1)
				  	autoApi({
						action: 'policy_statistic_tenant',
						version: '1.0',
						payload: payload1
					},window.localStorage.getItem('token')).then((res)=> {
						if (res.code == 0) {
							if (res.attach) {
								var xArray = [];	
								var xANDy = [];		//和xArray数组保持同步,记录对应位的xArray代表的日期信息
								var insurerList = [];	//返回的数据里有哪些公司的数据

								//整理出数据中的险企列表
								for (var i = 0; i < res.attach.list.length; i++) {
									var isInList = false;
									for (var j = 0; j < insurerList.length; j++) {
										if (insurerList[j] == res.attach.list[i].insurerName) {
											isInList = true;
										}
									}
									if (!isInList) {
										insurerList.push(res.attach.list[i].insurerName);
									}
								}

								//对返回的数据按时间进行排序
								for (var i = 0; i < res.attach.list.length; i++) {
									for (var j = 0; j < res.attach.list.length - i - 1; j++) {
										if (((res.attach.list[j].month > res.attach.list[j+1].month) && (res.attach.list[j].year == res.attach.list[j+1].year) || (res.attach.list[j].year > res.attach.list[j+1].year))) {
											let buf = res.attach.list[j];
											res.attach.list[j] = res.attach.list[j+1];
											res.attach.list[j+1] = buf;
										}
									}
								}

								//生成x轴数据
								for (var i = 0; i < res.attach.list.length; i++) {
									if ((i > 0) && !((res.attach.list[i].month == res.attach.list[i-1].month) && (res.attach.list[i].year == res.attach.list[i-1].year))) {
										let monthCount = res.attach.list[i].month + 1;	//用于显示的月份
										xArray.push(res.attach.list[i].year + '年' + monthCount + '月');	
										let buf = {
											month: res.attach.list[i].month, 		//用于对比的月份
											year: res.attach.list[i].year,
										}
										xANDy.push(buf);
									}
									else if(i == 0) {
										let monthCount = res.attach.list[i].month + 1;	//用于显示的月份
										xArray.push(res.attach.list[i].year + '年' + monthCount + '月');
										let buf = {
											month: res.attach.list[i].month, 		//用于对比的月份
											year: res.attach.list[i].year,
										}
										xANDy.push(buf);
									}
									else
									{
										//当前循环的日期和上一个相同,因此不做处理
									}
								}
								this.data1.chartData.xAxis = xArray;
								
								//生成各组的y轴数据
								this.data1.chartData.series = [];
								for (var i = 0; i < insurerList.length; i++) {
									var serieBuf = {
										name: insurerList[i],
										type: 'line',
										data: [],
									};
									for (var j = 0; j < res.attach.list.length; j++) {	//遍历数据表
										if (res.attach.list[j].insurerName == insurerList[i]) {	//找到当前循环的险企名称对应的数据
											for (var k = 0; k < xANDy.length; k++) {		//找到本条符合名称的数据对应的x轴时间位置
												if ((xANDy[k].year == res.attach.list[j].year) && (xANDy[k].month == res.attach.list[j].month)) {
													serieBuf.data[k] = res.attach.list[j].premium;
												}
											}
										}
										else
										{
											//当前循环的数据不是想要的
										}
									}
									this.data1.chartData.series.push(serieBuf);
								}
								this.drawChart();
							}
						}
					})
	  			break;
	  			case 2:
	  				let payload2 = {
				  		employeeId: window.localStorage.getItem('employeeId'),
				  		timeType: (this.data2.rangeType == 1 || this.data2.rangeType == 0 || this.data2.rangeType == 10)?'DAY':(this.data2.rangeType == 100)?'MONTH':(this.data2.rangeType == 1000)?'YEAR':null,	//必选,时间维度
				  		statisticUsedMod: this.data2.option,	//统计使用性质模值	营利车:1+2 非营利车4+8
				  		year: this.data2.date?this.data2.date.getFullYear():null,	//年
				  		month: (this.data2.date && !(this.data2.rangeType == 1000))?this.data2.date.getMonth():null,	//月
				  		day: (this.data2.date && !(this.data2.rangeType == 100) && !(this.data2.rangeType == 1000))?this.data2.date.getDate() - 1:null,	//月中的天数
				  	}
				  	payload2 = JSON.stringify(payload2)
				    autoApi({
						action: 'policy_statistic_tenant',
						version: '1.0',
						payload: payload2
					},window.localStorage.getItem('token')).then((res)=> {
						if (res.code == 0) {
							if (res.attach) {
								//demo
								res.attach.list = [{insurerName:'名字',total:'12',premium:'450.00'}];res.attach.total = 1;
								this.data2.tableData = res.attach.list;
								this.data2.length = res.attach.total;
			   					this.data2.pageCount = parseInt((this.data2.length - 1) / this.data2.pageSize) + 1;
			   					this.showPage(2);
							}
						}
					})
	  			break;
	  			case 3:
	  				//
	  			break;
	  			default:
	  				//
	  			break;
	  		}
	  	},

	  	option1Change(val) {	//单选下拉框选择时获取数据
	  		this.getInfo(1);
	  	},

	  	optionMultiple1Edit(val) {
	  		for (let i = 0; i < val.length; i++) {
	  			if (val[i] == 'all') {
	  				this.data1.optionMultiple = [];
	  			}
	  		}
	  		this.getInfo(1);
	  	},

	  	date1Change(time) {	//时间范围的起止时间都有,或者都被清除的时候获取数据
	  		if ((this.data1.dateStart && this.data1.dateEnd) || (!this.data1.dateStart && !this.data1.dateEnd)) {
				this.getInfo(1);
	  		}
	  	},

	  	option2Change(val) {	//选择下拉框时获取数据
	  		this.getInfo(2);
	  	},

	  	rangeType2Change(val) {		//选择单选框时获取数据
	  		switch(val) {
	  			case 0:
	  				this.data2.date = new Date();
 					this.data2.date.setTime( this.data2.date.getTime() - 24*60*60*1000 );
 					this.getInfo(2);
	  				break;
	  			case 1:
	  				this.data2.date = new Date();
 					this.getInfo(2);
	  				break;
	  			default:
	  				this.data2.dateBuf = this.data2.date;	//选择时间选择器时显示当前筛选时间,并获取对应的数据
	  				this.getInfo(2);
	  				break;
	  		}
	  	},

	  	date2Change(time) {		//选择时间选择器时获取数据
	  		if (!(this.data2.date == this.data2.dateBuf)) {
	  			this.data2.date = this.data2.dateBuf;
	  			this.getInfo(2);
	  		}
	  	},

	  	searchData() {

	  	},

	  	showPage(num) {
	  		switch(num) {
	  			case 2:
	  				this.data2.formData = [];
			  		if(this.data2.length * this.data2.pageCount < this.data2.pageSize * this.data2.currentPage)
			  		{
			  			for (let i = 0; i < this.data2.tableData.length; i++) {
			  				if (i >= (this.data2.currentPage - 1) * this.data2.pageSize) {
			  					this.data2.formData.push(this.data2.tableData[i])
			  				}
			  			}
			  		}
			  		else
			  		{
			  			for (let i = 0; i < this.data2.tableData.length; i++) {
			  				if (i >= (this.data2.currentPage - 1) * this.data2.pageSize && i < this.data2.currentPage * this.data2.pageSize) {
			  					this.data2.formData.push(this.data2.tableData[i])
			  				}
			  			}
			  		}
	  				break;
	  			case 3:
	  				this.data3.formData = [];
			  		if(this.data3.length * this.data3.pageCount < this.data3.pageSize * this.data3.currentPage)
			  		{
			  			for (let i = 0; i < this.data3.tableData.length; i++) {
			  				if (i >= (this.data3.currentPage - 1) * this.data3.pageSize) {
			  					this.data3.formData.push(this.data3.tableData[i])
			  				}
			  			}
			  		}
			  		else
			  		{
			  			for (let i = 0; i < this.data3.tableData.length; i++) {
			  				if (i >= (this.data3.currentPage - 1) * this.data3.pageSize && i < this.data3.currentPage * this.data3.pageSize) {
			  					this.data3.formData.push(this.data3.tableData[i])
			  				}
			  			}
			  		}
	  				break;
	  			default:
	  				//
	  				break;
	  		}
	  	},

	  	pageChange2(pg) {
	  		this.data2.currentPage = pg;
	  		this.showPage(2);
	  	},

	  	pageChange3(pg) {
	  		this.data3.currentPage = pg;
	  		this.showPage(3);
	  	},

	  	sortChange(val) {
	  		val.order == "ascending"?this.data3.sortType = true:this.data3.sortType = false;

	  		if (val.prop == "demo") {
	    		this.data3.sortCol = "demo";
	    	}
	  	},

	  	downloadExcel2(jsonData, type) {
		    if (jsonData[0]) {
	  			let json = jsonData.concat([]);	//解决数组引用赋值的问题
		    	var tmpdata = json[0];
		        var vm = this;
				var tmpDown; //导出的二进制对象
		        json.unshift({});
		        var keyMap = []; //获取keys
		        for (var k in tmpdata) {
		            keyMap.push(k);
		            json[0][k] = k;
		        }
		      	tmpdata = [];//用来保存转换好的json 
		      	
	            json.map((v, i) => keyMap.map((k, j) => Object.assign({}, {
	                v: v[k],
	                position: (j > 25 ? vm.getCharCol(j) : String.fromCharCode(65 + j)) + (i + 1)
	            }))).reduce((prev, next) => prev.concat(next)).forEach((v, i) => tmpdata[v.position] = {
	                v: v.v
	            });
	            var outputPos = Object.keys(tmpdata); //设置区域,比如表格从A1到D10
	            var tmpWB = {
	                SheetNames: ['mySheet'], //保存的表标题
	                Sheets: {
	                    'mySheet': Object.assign({},
	                        tmpdata, //内容
	                        {
	                            '!ref': outputPos[0] + ':' + outputPos[outputPos.length - 1] //设置填充区域
	                        })
	                }
	            };
	            tmpWB.Sheets.mySheet['A1'].v = '保险公司';
	            tmpWB.Sheets.mySheet['B1'].v = '保单数';
	            tmpWB.Sheets.mySheet['C1'].v = '保费';
	            
	            tmpDown = new Blob([vm.s2ab(XLSX.write(tmpWB, 
	                {bookType: (type == undefined ? 'xlsx':type),bookSST: false, type: 'binary'}//这里的数据是用来定义导出的格式类型
	                ))], {
	                type: ""
	            }); //创建二进制对象写入转换好的字节流

		        var href = URL.createObjectURL(tmpDown); //创建对象超链接
		        document.getElementById("hf").href = href; //绑定a标签
		        document.getElementById("hf").click(); //模拟点击实现下载
		        setTimeout(function() { //延时释放
		            URL.revokeObjectURL(tmpDown); //用URL.revokeObjectURL()来释放这个object URL
		        }, 100);
		    }
		    else
		    {
		    	this.$message({
		    		message: '导出列表为空',
		    		type: 'info',
		    	});
		    }
	    },

	    s2ab(s) { //字符串转字符流
	        var buf = new ArrayBuffer(s.length);
	        var view = new Uint8Array(buf);
	        for (var i = 0; i != s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
	        return buf;
	    },
	     // 将指定的自然数转换为26进制表示。映射关系：[0-25] -> [A-Z]。
	    
	    getCharCol(n) {
	        let temCol = '',
	        s = '',
	        m = 0
	        while (n > 0) {
	            m = n % 26 + 1
	            s = String.fromCharCode(m + 64) + s
	            n = (n - m) / 26
	        }
	        return s
	    },
	  },
	  mounted() {
	  	this.init();
	  }
	}
</script>
<style lang="less">
.statisticManageBody {
	min-width: 1200px;
	.toolBarR {
		display: inline-block;
		position: relative;
		float: right;
	}
	.toolBarL {
		display: inline-block;
		position: relative;
		float: left;
	}
	.table1 {
		padding: 20px;
		background-color: #ffffff;
		width: 1200px;
	}
	.table2, .table3 {
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