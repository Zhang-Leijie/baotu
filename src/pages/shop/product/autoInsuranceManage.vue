<template>
	<div class="autoInsuranceManage">
		<el-breadcrumb separator="/">
		  	<el-breadcrumb-item>车险管理</el-breadcrumb-item>
		</el-breadcrumb>

		<el-select v-model="value" placeholder="请选择">
		    <el-option v-for="item in insurers" :label="item.label" :value="item.value"></el-option>
		</el-select>
		
		<div class="dataBox">
			<div class="dataBox1">
				<ul>
					<li v-for="i in formData1" @click="enterToSecond(i)" :class="chooseds[0] === i.value?'choosedList':''">{{i.label}}</li>
				</ul>
			</div>
			<div class="dataBox2" v-if="(formData2[0])">
				<ul>
					<li v-for="i in formData2" @click="enterToThird(i)" :class="chooseds[1] === i.value?'choosedList':''">{{i.label}}</li>
				</ul>
			</div>
			<div class="dataBox3" v-if="(formData3[0])">
				<ul>
					<li v-for="i in formData3" @click="enterTofourth(i)" :class="chooseds[2] === i.value?'choosedList':''">{{i.label}}</li>
				</ul>
			</div>
			<div class="dataBox4" v-if="(formData4[0])">
				<ul>
					<li v-for="i in formData4" @click="enterTofifth(i)" :class="choosed === i.value?'choosedList':''">{{i.label}}</li>
				</ul>
			</div>
		</div>

		<el-row class="commonSet">
			<el-col :span="11">
				<label class="titleLabel">基础佣金设置</label>
				<el-row>
					<el-col :span="4">
						<span class="titleNext">商业险佣金比例</span>
					</el-col>
					<el-col :span="8">
						<el-input-number v-model="baseCommission.shangye" :min="0" :max="100" :step="0.1" :debounce="100" size="small" class="countTool"></el-input-number> %
					</el-col>
					<el-col :span="4">
						<span class="titleNext">交强险佣金比例</span>
					</el-col>
					<el-col :span="8">
						<el-input-number v-model="baseCommission.jiaoqiang" :min="0" :max="100" :step="0.1" :debounce="100" size="small" class="countTool"></el-input-number> %
					</el-col>
				</el-row>
			</el-col>	
			<el-col :span="11">
				<label class="titleLabel">自留佣金设置</label>
				<el-row>
					<el-col :span="4">
						<span class="titleNext">商业险佣金比例</span>
					</el-col>
					<el-col :span="8">
						<el-input-number v-model="selfCommission.shangye" :min="0" :max="100" :step="0.1" :debounce="100" size="small" class="countTool"></el-input-number> %
					</el-col>
					<el-col :span="4">
						<span class="titleNext">交强险佣金比例</span>
					</el-col>
					<el-col :span="8">
						<el-input-number v-model="selfCommission.jiaoqiang" :min="0" :max="100" :step="0.1" :debounce="100" size="small" class="countTool"></el-input-number> %
					</el-col>
				</el-row>
			</el-col>
			<el-col :span="2" style="padding-top:40px">
				<el-button @click="changeCommission" size="small">确认设置</el-button>
			</el-col>	
		</el-row>

		<el-row class="tableBox">
		    <el-col :span="24">
		        <el-table :data="tableData" border style="width: 100%">
		          	<el-table-column label="系数类型">
		             	<template scope="scope">
		                
		             	</template>
		            </el-table-column>
		        	<el-table-column label="操作">
		            	<template scope="scope">
		              		<el-button size="small">编辑</el-button>
		              		<el-button size="small">确定</el-button>
		            	</template>
		          	</el-table-column>
		        </el-table>
		    </el-col>
		</el-row>
	</div>
</template>
<script>

import { autoApi,commonApi } from '@/ajax/post.js'

	function formatDate(time){
	  var   x = time - 0
	  console.log(x)
	  var   now = new Date(x) 
	  var   year = now.getFullYear();     
	  var   month = "0" + (now.getMonth()+1);     
	  var   date = "0" +(now.getDate());   
	  var   hour = "0" +now.getHours();
	  var   min =  "0" +now.getMinutes();
	  return   year+"-"+month.substr(-2)+"-"+date.substr(-2)+'   '+ hour.substr(-2) +':'+min.substr(-2)
	}

	export default {
	  data() {
	    return {
	      originData: [],		//路由原始数据
	      choosed: null,		//当前路由选择
	      chooseds: [],			//路由选择列表
	      formData1: [],		//1-4级路由数据
	      formData2: [],
	      formData3: [],
	      formData4: [],
	      baseCommission: {		//基础佣金
	      	shangye: null,
	      	jiaoqiang: null
	      },
	      selfCommission: {		//自留佣金
	      	shangye: null,
	      	jiaoqiang: null
	      },
	      tableData: [],
	      insurerId: null,		//当前选择险企ID
	      insurers: [] 			//险企列表数据
	    }
	  },
	  methods: {
	 	//获取路由列表数据
	    getRouteList() {
	    	autoApi({
	   			action: 'vehicle_bonus_skeleton',
	   			version: '1.0',
	   			employeeId: '5',
	   		},window.localStorage.getItem('token')).then((res)=> {
	   			if (res.code == 0) {
	   				this.originData = res.attach;
	   				for(let one in res.attach.children) {
	   					let databuf = {
	   						value: null,
	   						label: null,
	   						data: null
	   					}
	   					databuf.value = res.attach.children[one].id;
	   					databuf.label = res.attach.children[one].title;
	   					databuf.data = res.attach.children[one];
	   					this.formData1.push(databuf);
	   				}
       			}
	   		})
	    },
	    //一级路由点击事件处理
	    enterToSecond(val) {
	    	this.formData2 = [];
	    	this.formData3 = [];
	    	this.formData4 = [];
	    	this.choosed = val.value;
	    	this.chooseds[0] = val.value;
	    	this.chooseds[1] = null;
	    	this.chooseds[2] = null;
			for(let two in val.data.children) {
				let databuf = {
					value: null,
					label: null,
					data: null
				}
				databuf.value = val.data.children[two].id;
				databuf.label = val.data.children[two].title;
				databuf.data = val.data.children[two];
				this.formData2.push(databuf);
			}
	    },
	    //二级路由点击事件处理
	    enterToThird(val) {
			this.formData3 = [];
	    	this.formData4 = [];
	    	this.choosed = val.value;
	    	this.chooseds[1] = val.value;
	    	this.chooseds[2] = null;
	    	for(let three in val.data.children) {
				let databuf = {
					value: null,
					label: null,
					data: null
				}
				databuf.value = val.data.children[three].id;
				databuf.label = val.data.children[three].title;
				databuf.data = val.data.children[three];
				this.formData3.push(databuf);
			}
	    },
	    //三级路由点击事件处理
	    enterTofourth(val) {
			this.formData4 = [];
	    	this.choosed = val.value;
	    	this.chooseds[2] = val.value;
	    	for(let four in val.data.children) {
				let databuf = {
					value: null,
					label: null,
					data: null
				}
				databuf.value = val.data.children[four].id;
				databuf.label = val.data.children[four].title;
				databuf.data = val.data.children[four];
				this.formData4.push(databuf);
			}
	    },
	    //四级路由点击事件处理
	    enterTofifth(val) {
	    	this.choosed = val.value;
	    	this.chooseds[3] = val.value;
	    	console.log(this.chooseds);
	    },
	    //获取险企列表
	    getinsurerList() {
	    	let tid = window.localStorage.getItem('userId'); 		//商户id
			commonApi({
	   			action: 'insurer_list',
	   			version: '1.0',
	   			tid: tid, 						
	   			client: 2			
	   		},window.localStorage.getItem('token')).then((res)=> {
	   			if (res.code == 0) {
	   				
       			}
	   		})
	    },

	    changeCommission() {
	    	// this.baseCommission
	    	// this.selfCommission
	    	let bonusSearcher = 
				{
				    path: '',       					//页面节点路径                 
				    insurerId: 1,                       //险企ID         
				    routeBody: {
			            commercialRate: 200,           	//基础 - 商业  
			            compulsoryRate: 200,            //基础 - 交强
			            commercialRetainRate: 50,       //自留 - 商业
			            compulsoryRetainRate: 50,       //自留 - 交强
			            commercialCommisionSpinner: {     
			                "1": 5,
			                "2": -5
			            },
			            delete: "false"
			        }    
				}
			//页面节点路径    	
			for (var i = 0; i < this.chooseds.length; i++) {
				if(i < this.chooseds.length - 1) {
					bonusSearcher.path = bonusSearcher.path + this.chooseds[i] + "_";
				}
				else
				{
					bonusSearcher.path = bonusSearcher.path + this.chooseds[i];
				}
			}
			//基础 - 商业
			bonusSearcher.routeBody.commercialRate = this.baseCommission.shangye;
			//基础 - 交强
			bonusSearcher.routeBody.compulsoryRate = this.baseCommission.jiaoqiang;
			//自留 - 商业
			bonusSearcher.routeBody.commercialRetainRate = this.selfCommission.shangye;
			//自留 - 交强
			bonusSearcher.routeBody.compulsoryRetainRate = this.selfCommission.shangye;
			//险企ID
			bonusSearcher.insurerId = this.insurerId;

			autoApi({
	   			action: '',
	   			version: '1.0',
	   			employeeId: '5',
	   			bonusSearcher: bonusSearcher
	   		},window.localStorage.getItem('token')).then((res)=> {
	   			if (res.code == 0) {
	   				
       			}
	   		})
	    },

	    getInfo() {
	    	
	    }
	  },
	  mounted() {
	  	this.getRouteList();
	  	this.getinsurerList();
	  }
	}
</script>
<style lang="less">
.autoInsuranceManage{
	.dataBox {
		width: 1000px;
		margin-top: 20px;
		overflow-x: hidden;
		.dataBox1, .dataBox2, .dataBox3, .dataBox4 {
			float: left;
			width: 23%;
			height: 200px;
			overflow-y: scroll;
			padding: 20px 0;
			border: 1px solid #333333;
			margin-left: 10px;
			ul {
				li {
					line-height: 30px;
					padding-left: 20px;
					list-style-type:none;
				}
			}
		  	.choosedList {
		  		background-color: #00E5EE;
		  	}
		}
	}
	.commonSet {
		margin-top: 20px;
		.titleLabel {
			line-height: 40px;
			font-weight: bold;
		}
		.titleNext {
			line-height: 30px;
		}
		.countTool {
			width: 80% !important;
		}
	}

	.tableBox {
		margin-top: 20px;
	}
}
</style>