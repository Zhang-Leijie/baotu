<template>
	<div class="autoInsuranceManage">
		<el-breadcrumb separator="/">
		  	<el-breadcrumb-item>车险管理</el-breadcrumb-item>
		</el-breadcrumb>

		<div class="topBar">
			<el-select v-model="tenantId" placeholder="请选择" @change="tenantChange">
			    <el-option v-for="item in tenants" :label="item.label" :value="item.value"></el-option>
			</el-select>

			<el-select v-model="insurerId" placeholder="请选择" v-if="insurers[0] && !editing" @change="insurerChange">
			    <el-option v-for="item in insurers" :label="item.label" :value="item.value"></el-option>
			</el-select>
		</div>
		
		<div class="dataBox" v-if="formData1[0] && !editing">
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

		<el-row class="commonSet" v-if="insurerId && tenantId.employeeId && choosed && !editing">
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
			<!-- <el-col :span="2" style="padding-top:40px">
				<el-button @click="confirmSet" size="small">确认设置</el-button>
			</el-col>	 -->
		</el-row>

		<el-row class="tableBox" v-if="insurerId && tenantId.employeeId && choosed && !editing">
		    <el-col :span="24">
		        <el-table :data="tableData" border style="width: 100%">
		          	<el-table-column label="系数类型名">
		             	<template scope="scope">
		                	<span>{{scope.row.typeName}}</span>
		             	</template>
		            </el-table-column>
		            <el-table-column label="系数名称">
		             	<template scope="scope">
		                	<el-select v-model="scope.row.choosed" placeholder="请选择" @change="showCoefficient(scope.row)">
							    <el-option v-for="item in scope.row.coefficients" :label="item.name" :value="item.id"></el-option>
							</el-select>
		             	</template>
		            </el-table-column>
		           <!--  <el-table-column label="区间数值">
		             	<template scope="scope">
		                	<el-row v-if="scope.row.comparisonType === 1">
		                		<el-col :span="24">
		                			<span>>{{scope.row.comparisonValue}}</span>
		                		</el-col>
		                	</el-row>

		                	<el-row v-if="scope.row.comparisonType === 2">
		                		<el-col :span="24">
		                			<span>>={{scope.row.comparisonValue}}</span>
		                		</el-col>
		                	</el-row>

		                	<el-row v-if="scope.row.comparisonType === 3">
		                		<el-col :span="24">
		                			<span><{{scope.row.comparisonValue}}</span>
		                		</el-col>
		                	</el-row>

		                	<el-row v-if="scope.row.comparisonType === 4">
		                		<el-col :span="24">
		                			<span>=<{{scope.row.comparisonValue}}</span>
		                		</el-col>
		                	</el-row>

		                	<el-row v-if="scope.row.comparisonType === 5">
		                		<el-col :span="24">
		                			<span>{{isStr(scope.row.comparisonValue)?'equal ':'= '}}{{scope.row.comparisonValue}}</span>
		                		</el-col>
		                	</el-row>

		                	<el-row v-if="scope.row.comparisonType === 6">
		                		<el-col :span="24">
		                			<span>{{isStr(scope.row.comparisonValue)?'!equal ':'!= '}}{{scope.row.comparisonValue}}</span>
		                		</el-col>
		                	</el-row>

		                	<el-row v-if="scope.row.comparisonType === 7">
		                		<el-col :span="24">
		                			<span>( {{scope.row.comparisonValue.split(",")[0]}} , {{scope.row.comparisonValue.split(",")[1]}} )</span>
		                		</el-col>
		                	</el-row>

		                	<el-row v-if="scope.row.comparisonType === 8">
		                		<el-col :span="24">
		                			<span>[ {{scope.row.comparisonValue.split(",")[0]}} , {{scope.row.comparisonValue.split(",")[1]}} )</span>
		                		</el-col>
		                	</el-row>

		                	<el-row v-if="scope.row.comparisonType === 9">
		                		<el-col :span="24">
		                			<span>( {{scope.row.comparisonValue.split(",")[0]}} , {{scope.row.comparisonValue.split(",")[1]}} ]</span>
		                		</el-col>
		                	</el-row>

		                	<el-row v-if="scope.row.comparisonType === 10">
		                		<el-col :span="24">
		                			<span>{{scope.row.comparisonValue}} in</span>
		                		</el-col>
		                	</el-row>

		                	<el-row v-if="scope.row.comparisonType === 11">
		                		<el-col :span="24">
		                			<span>{{scope.row.comparisonValue}} not in</span>
		                		</el-col>
		                	</el-row>
		             	</template>
		            </el-table-column> -->
		            <el-table-column label="佣金增减">
		             	<template scope="scope">
		             		<el-row v-if="scope.row.choosed">
			               	 	<el-select v-model="scope.row.addORdec" placeholder="请选择">
								    <el-option v-for="item in addAnddec" :label="item.label" :value="item.value"></el-option>
								</el-select>
							</el-row>
		             	</template>
		            </el-table-column>
		            <el-table-column label="佣金比例">
		             	<template scope="scope">
		               		<el-row v-if="scope.row.choosed && scope.row.addORdec">
		               			<el-col :span="16" :offset="2">
		               				<el-input v-model="scope.row.rate"></el-input>
		               			</el-col>
		               			<el-col :span="2" :offset="2">
		               				<span>%</span>
		               			</el-col>
		               		</el-row>
		             	</template>
		            </el-table-column>
		        </el-table>
		    </el-col>
		</el-row>

		<el-row class="tableBox" v-if="tenantId.employeeId && editing">
		    <el-col :span="24">
		        <el-table :data="editData" border style="width: 100%">
		          	<el-table-column label="系数类型名">
		             	<template scope="scope">
		                	<span>{{scope.row.typeName}}</span>
		             	</template>
		            </el-table-column>
		            <el-table-column label="系数名称">
		             	<template scope="scope">
		                	<el-select v-model="scope.row.choosed" placeholder="请选择" @change="chooseOneCoefficient(scope.row)" v-if="scope.row.coefficients && !(isAdded && isAdded == scope.row.typeId) && !(isEdited && isEdited == scope.row.choosed)">
							    <el-option v-for="item in scope.row.coefficients" :label="item.name" :value="item.id"></el-option>
							</el-select>
							<el-input v-model="scope.row.name" v-if="(isEdited && isEdited == scope.row.choosed) || (isAdded && isAdded == scope.row.typeId)"></el-input>
		             	</template>
		            </el-table-column>
		            <el-table-column label="比较器类型">
		             	<template scope="scope">
		             		<span v-if="!(isAdded && isAdded == scope.row.typeId) && !(isEdited && isEdited == scope.row.choosed)">{{reComparisonName(scope.row.comparisonType)}}</span>
		             		<el-select v-model="scope.row.comparisonType" placeholder="请选择" v-if="(isEdited && isEdited == scope.row.choosed) || (isAdded && isAdded == scope.row.typeId)">
    							<el-option v-for="item in comparisons" :label="item.label" :value="item.value"></el-option>
  							</el-select>
		             	</template>
		            </el-table-column>
		            <el-table-column label="比较器数值">
		             	<template scope="scope">
		             		<span v-if="!(isAdded && isAdded == scope.row.typeId) && !(isEdited && isEdited == scope.row.choosed)">{{comparisonValueShow(scope.row)}}</span>
		             		<el-input v-model="scope.row.comparisonValue" placeholder="区间数值请用下划线 _ 隔开" v-if="(isEdited && isEdited == scope.row.choosed) || (isAdded && isAdded == scope.row.typeId)"></el-input>
		             	</template>
		            </el-table-column>
		            <el-table-column label="操作">
		             	<template scope="scope">
		               		<el-button type="text" @click="addOne(scope.row)" v-if="!isAdded && !isFull(scope.row) && !isEdited">新增</el-button>
		               		<el-button type="text" @click="confirmAdd(scope.row)" v-if="isAdded == scope.row.typeId">确认添加</el-button>
		               		<el-button type="text" @click="cancelAdd(scope.row)" v-if="isAdded == scope.row.typeId">取消添加</el-button>
		               		<el-button type="text" @click="editThisOne(scope.row)" v-if="!isEdited && scope.row.custom && !isAdded && scope.row.choosed">编辑</el-button>
		               		<el-button type="text" @click="confirmEdit(scope.row)" v-if="isEdited && (isEdited == scope.row.choosed)">确认编辑</el-button>
		               		<el-button type="text" @click="cancelEdit(scope.row)" v-if="isEdited && (isEdited == scope.row.choosed)">取消编辑</el-button>
		               		<el-button type="text" @click="deleteThisOne(scope.row)" v-if="scope.row.custom && !isEdited && !isAdded && scope.row.choosed">删除</el-button>
		             	</template>
		            </el-table-column>
		        </el-table>
		    </el-col>
		</el-row>

		<div class="confirmBoxL" v-if="tenantId.employeeId">
			<el-button type="primary" size="large" @click="editMode" v-if="!editing">编辑系数</el-button>
			<el-button size="large" @click="endEditMode" v-if="editing">完成编辑</el-button>
		</div>

		<div class="confirmBoxR" v-if="insurerId && tenantId.employeeId && choosed && !editing">
			<el-button type="danger" size="large" @click="confirmSetDelete">删除</el-button>
			<el-button type="primary" size="large" @click="confirmSetSave">保存</el-button>
		</div>
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
	  var   date = "0" + (now.getDate());   
	  var   hour = "0" + now.getHours();
	  var   min =  "0" + now.getMinutes();
	  return   year + "-" + month.substr(-2) + "-" + date.substr(-2) + ' ' + hour.substr(-2) + ':' + min.substr(-2)
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
	      tenantId: {},		//当前选择代理商ID	
	      tenants: [],			//代理商列表数据
	      insurerId: null,		//当前选择险企ID
	      insurers: [], 			//险企列表数据
	      addAnddec: [{
	      	value: 0,
	      	label: '取消关联'
	      },
	      {
	      	value: 1,
	      	label: '增加'
	      },
	      {
	      	value: 2,
	      	label: '减少'
	      }],
	      editing: false,	//系数编辑模式
	      editData: [],
	      isEdited: null,	//被编辑的系数id
	      isAdded: null,	//被添加的系数
	      comparisons: [
	      	{
	      		value: 1,
	      		label: "大于"
	      	},
	      	{
	      		value: 2,
	      		label: "大于等于"
	      	},
	      	{
	      		value: 3,
	      		label: "小于"
	      	},
	      	{
	      		value: 4,
	      		label: "小于等于"
	      	},
	      	{
	      		value: 5,
	      		label: "等于"
	      	},
	      	// {
	      	// 	value: 6,
	      	// 	label: "不等于"
	      	// },
	      	{
	      		value: 7,
	      		label: "开区间 ( )"
	      	},
	      	{
	      		value: 8,
	      		label: "前闭后开区间 [ )"
	      	},
	      	{
	      		value: 9,
	      		label: "前开后闭区间 ( ]"
	      	},
	      	// {
	      	// 	value: 10,
	      	// 	label: "在 ... 之中"
	      	// },
	      	// {
	      	// 	value: 11,
	      	// 	label: "不在 ... 之中"
	      	// }
	      ]
	    }
	  },
	  methods: {
	  	showCoefficient(row) {
	  		for (var i = 0; i < row.coefficients.length; i++) {
	  			if(row.coefficients[i].id === row.choosed) {
	  				row.comparisonType = row.coefficients[i].comparison;
	  				row.comparisonValue = row.coefficients[i].comparableValue;
	  				if (row.coefficients[i].rate) {
	  					row.rate = row.coefficients[i].rate / 10;
	  					if (row.coefficients[i].rate > 0) {
	  						row.addORdec = 1;
	  					}
	  					else {
	  						row.addORdec = 2;
	  					}
	  				}
	  				else
	  				{
	  					row.rate = null;
	  					row.addORdec = null;
	  				}
	  			}
	  		}
	  	},
	    //获取代理商列表
	    getTenanList() {
	    	commonApi({
	   			action: 'tenant_list',
	   			version: '1.0',
	   			client: 2		
	   		},window.localStorage.getItem('token')).then((res)=> {
	   			if (res.code == 0) {
	   				if (res.attach.audit[0]) {
	   					for (var i = 0; i < res.attach.audit.length; i++) {
		   					let buf = {
		   						value: {
		   							tid: null
		   						},
		   						label: null
		   					}
		   					buf.value.tid = res.attach.audit[i].tid;
		   					buf.label = res.attach.audit[i].tname + " (审核中)";
		   					this.tenants.push(buf);
		   				}
	   				}

	   				if (res.attach.own[0]) {
	   					for (var i = 0; i < res.attach.own.length; i++) {
		   					let buf = {
		   						value: {
		   							tid: null,
		   							employeeId: null
		   						},
		   						label: null
		   					}
		   					buf.value.tid = res.attach.own[i].tid;
		   					buf.value.employeeId = res.attach.own[i].employeeId;
		   					buf.label = res.attach.own[i].tname;
		   					this.tenants.push(buf);
		   				}
	   				}
		   				
       			}
	   		}) 
	    },

	    tenantChange(value) {				//选择商户  get:tid/employeeId
	  		this.getInsurerList(); 			//获取险企列表  need:tid  get:insurerId
	  		this.getRouteList();			//获取路由节点列表  need:employeeId  get:route
	  		this.getEditSetting();			//获取全局系数设置表
	    },

	    //获取险企列表
	    getInsurerList() {
	    	let tid = this.tenantId.tid;
			commonApi({
	   			action: 'insurer_list',
	   			version: '1.0',
	   			tid: tid, 						
	   			client: 2			
	   		},window.localStorage.getItem('token')).then((res)=> {
	   			if (res.code == 0) {
	   				if(res.attach[0]) {
	   					for (var i = 0; i < res.attach.length; i++) {
	   						let buf = {
	   							value: null,
	   							label: null
	   						}
	   						buf.value = res.attach[i].id;
	   						buf.label = res.attach[i].name;
	   						this.insurers.push(buf);
	   					}
	   				}
       			}
	   		})
	    },

	    insurerChange(value) {
	  		this.getSetting();				//获取表格设置列表	need:employeeId/insurerId/route
	    	//险企ID
	    },

	    //获取路由列表数据
	    getRouteList() {
	    	if(this.tenantId.employeeId) {
	    		let employeeId = this.tenantId.employeeId
	    		autoApi({
		   			action: 'vehicle_bonus_skeleton',
		   			version: '1.0',
		   			employeeId: employeeId,
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
	    	}
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
			this.getSetting();				//获取表格设置列表	need:employeeId/insurerId/route
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
			this.getSetting();				//获取表格设置列表	need:employeeId/insurerId/route
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
			this.getSetting();				//获取表格设置列表	need:employeeId/insurerId/route
	    },
	    //四级路由点击事件处理
	    enterTofifth(val) {
	    	this.choosed = val.value;
	    	this.chooseds[3] = val.value;
	    	this.getSetting();				//获取表格设置列表	need:employeeId/insurerId/route
	    },

	    //获取节点配置
	    getSetting() {
	    	if (this.choosed && this.insurerId) {
	    		let employeeId = this.tenantId.employeeId;
		    	let bonusSearcher = {
		    		 path: '',                        	// 路由节点id链接字符串
	   				 insurerId: null,          
		    	};
		    	
		    	bonusSearcher.insurerId = this.insurerId;			//险企ID
				//页面节点路径    	
				for (var i = 0; i < this.chooseds.length; i++) {
					if(this.chooseds[i] === this.choosed) {
						bonusSearcher.path = bonusSearcher.path + this.chooseds[i];
						break;
					}
					else
					{
						bonusSearcher.path = bonusSearcher.path + this.chooseds[i] + "_";
					}
				}

				bonusSearcher = JSON.stringify(bonusSearcher);
		    	autoApi({
		   			action: 'vehicle_coefficients',
		   			version: '1.0',
		   			employeeId: employeeId,
		   			bonusSearcher: bonusSearcher
		   		},window.localStorage.getItem('token')).then((res)=> {
		   			if (res.code == 0) {
		   				if (res.attach) {
		   					for (var i = 0; i < res.attach.length; i++) {
			   					res.attach[i]['choosed'] = null;			//当前选择的系数id
			   					res.attach[i]['comparisonValue'] = null;
			   					res.attach[i]['comparisonType'] = null;
			   					res.attach[i]['addORdec'] = null;
			   					res.attach[i]['rate'] = null;
			   				}
		   				}

		   				if (res.attach) {
		   					for (var j = 0; j < res.attach.length; j++) {
			   					if (res.attach[j].coefficients) {
			   						for (var i = 0; i < res.attach[j].coefficients.length; i++) {
				   						if (res.attach[j].coefficients[i].rate) {
				   							res.attach[j].choosed = res.attach[j].coefficients[i].id;
				   							res.attach[j].rate = res.attach[j].coefficients[i].rate / 10;
				   							res.attach[j].addORdec = res.attach[j].coefficients[i].rate?(res.attach[j].coefficients[i].rate > 0?1:2):0;
				   						}
				   					}
			   					}
			   				}
		   				}

		   				this.tableData = res.attach;
	       			}
		   		})
	    	}
	    },

	    isStr(val) {
	    	return isNaN(val);
	    },

	    confirmSetSave() {
	    	let bonusSearcher = 
				{
				    path: '',       					//页面节点路径                 
				    insurerId: null,                       //险企ID         
				    routeBody: {
			            commercialRate: null,           	//基础 - 商业  
			            compulsoryRate: null,            //基础 - 交强
			            commercialRetainRate: null,       //自留 - 商业
			            compulsoryRetainRate: null,       //自留 - 交强
			            commercialCommisionSpinner: {}
			        },
			        delete: false
				}
			//页面节点路径    	
			for (var i = 0; i < this.chooseds.length; i++) {
				if(this.chooseds[i] === this.choosed) {
					bonusSearcher.path = bonusSearcher.path + this.chooseds[i];
					break;
				}
				else
				{
					bonusSearcher.path = bonusSearcher.path + this.chooseds[i] + "_";
				}
			}
			
			//基础 - 商业
			bonusSearcher.routeBody.commercialRate = parseInt(this.baseCommission.shangye * 10);
			//基础 - 交强
			bonusSearcher.routeBody.compulsoryRate = parseInt(this.baseCommission.jiaoqiang * 10);
			//自留 - 商业
			bonusSearcher.routeBody.commercialRetainRate = parseInt(this.selfCommission.shangye * 10);
			//自留 - 交强
			bonusSearcher.routeBody.compulsoryRetainRate = parseInt(this.selfCommission.shangye * 10);
			//商业险系数绑定
			for (var i = 0; i < this.tableData.length; i++) {
				if (this.tableData[i].choosed) {
					bonusSearcher.routeBody.commercialCommisionSpinner[this.tableData[i].choosed] = this.tableData[i].addORdec?(this.tableData[i].addORdec === 1?parseInt(this.tableData[i].rate * 10):-parseInt(this.tableData[i].rate * 10)):0;
				}
			}
			
			//险企ID
			bonusSearcher.insurerId = this.insurerId;

			bonusSearcher = JSON.stringify(bonusSearcher);

			//代理商ID
			let employeeId = this.tenantId.employeeId;

			autoApi({
	   			action: 'vehicle_bonus_set',
	   			version: '1.0',
	   			employeeId: employeeId,
	   			bonusSearcher: bonusSearcher
	   		},window.localStorage.getItem('token')).then((res)=> {
	   			if (res.code == 0) {
	   				this.$message({
			            message: '修改的设置已保存',
			            type: 'success'
			        });
       			}
	   		})
	    },

	    confirmSetDelete () {
	    	let bonusSearcher = 
				{
				    path: '',       					//页面节点路径                 
				    insurerId: null,                       //险企ID         
				    delete: true
				}
			//页面节点路径    	
			for (var i = 0; i < this.chooseds.length; i++) {
				if(this.chooseds[i] === this.choosed) {
					bonusSearcher.path = bonusSearcher.path + this.chooseds[i];
					break;
				}
				else
				{
					bonusSearcher.path = bonusSearcher.path + this.chooseds[i] + "_";
				}
			}
			//险企ID
			bonusSearcher.insurerId = this.insurerId;

			bonusSearcher = JSON.stringify(bonusSearcher);
			
			//代理商ID
			let employeeId = this.tenantId.employeeId;

			this.$confirm('此操作将永久删除该系数, 是否继续?', '提示', {
	          confirmButtonText: '确定',
	          cancelButtonText: '取消',
	          type: 'warning'
	        }).then(() => {
	    		autoApi({
		   			action: 'vehicle_bonus_set',
		   			version: '1.0',
		   			employeeId: employeeId,
		   			bonusSearcher: bonusSearcher
		   		},window.localStorage.getItem('token')).then((res)=> {
		   			if (res.code == 0) {
		   				this.$message({
			            type: 'info',
			            message: '已删除节点'
			          });   
	       			}
		   		})
	        }).catch(() => {
	          this.$message({
	            type: 'info',
	            message: '已取消删除'
	          });          
	        });   	

	    },

	    //获取节点编辑配置
	    getEditSetting() {
	    	let employeeId = this.tenantId.employeeId;

	    	autoApi({
	   			action: 'vehicle_coefficients',
	   			version: '1.0',
	   			employeeId: employeeId,
	   			bonusSearcher: null
	   		},window.localStorage.getItem('token')).then((res)=> {
	   			if (res.code == 0) {
	   				if (res.attach) {
	   					for (var i = 0; i < res.attach.length; i++) {
		   					res.attach[i]['choosed'] = null;			//当前选择的系数id
			   				res.attach[i]['name'] = null;			//需要编辑/添加的系数名称
		   					res.attach[i]['comparisonValue'] = null;
		   					res.attach[i]['comparisonType'] = null;
		   					res.attach[i]['addORdec'] = null;
		   					res.attach[i]['rate'] = null;
		   				}
	   				}

	   				if (res.attach) {
	   					for (var j = 0; j < res.attach.length; j++) {
		   					if (res.attach[j].coefficients) {
		   						for (var i = 0; i < res.attach[j].coefficients.length; i++) {
			   						if (res.attach[j].coefficients[i].rate) {
			   							res.attach[j].choosed = res.attach[j].coefficients[i].id;
			   							res.attach[j].rate = res.attach[j].coefficients[i].rate / 10;
			   							res.attach[j].addORdec = res.attach[j].coefficients[i].rate?(res.attach[j].coefficients[i].rate > 0?1:2):0;
			   						}
			   					}
		   					}
		   				}
	   				}

	   				this.editData = res.attach;
       			}
	   		})
	    },
	    editMode() {
	    	this.editing = true;
	    },
	    endEditMode() {
	    	this.editing = false;
	    	this.getSetting();
	    },
	    editThisOne(row) {
	    	this.isEdited = row.choosed;
	    	for (var i = 0; i < row.coefficients.length; i++) {
	    		if (row.coefficients[i].id === row.choosed) {
	    			row.name = row.coefficients[i].name;
	    		}
	    	}
	    },
	    confirmEdit(row) {
	    	let checkChange = false;
	    	for (var i = 0; i < row.coefficients.length; i++) {
	    		if (row.coefficients[i].id === row.choosed) {
	    			if(row.coefficients[i].comparableValue == row.comparisonValue && row.coefficients[i].comparison == row.comparisonType && row.coefficients[i].name == row.name)
	    			{
	    				checkChange = false;
	    				this.$message({
				            message: "数值未修改",
				            type: 'info'
				        });
	    			}
	    			else
	    			{
	    				checkChange = true;
	    			}
	    		}
	    	}
	    	if (checkChange) {
	    		let employeeId = this.tenantId.employeeId;
		    	let coefficientType = row.typeId;
		    	let comparison = row.comparisonType;
		    	let name = row.name;
		    	let array = row.comparisonValue.split("_");
		    	let id = row.choosed;
		    	if (array[0] >= array[1]) {
		    		this.$message({
			            message: "区间数值应当从小到大排列,请检查输入",
			            type: 'error'
			        });
		    	}
		    	else
		    	{
		    		array = JSON.stringify(array);
		    		autoApi({
			   			action: 'vehicle_coefficient_edit',
			   			version: '1.0',
			   			employeeId: employeeId,
			   			crudType: 4,	//4:修改
			   			coefficientType: coefficientType,
			   			id: id,
			   			comparison: comparison,
			   			array: array,
			   			name: name,
			   		},window.localStorage.getItem('token')).then((res)=> {
			   			if (res.code == 0) {
			   				this.isEdited = null;
			    			this.getEditSetting();
			   				this.$message({
					            message: '系数编辑完成',
					            type: 'success'
					        });
		       			}
		       			else if (res.code == 7) {
		       				this.$message({
					            message: '操作失败,请检查输入',
					            type: 'error'
					        });
		       			}
			   		})
		    	}
	    	}
	    },
	    cancelEdit(row) {
	    	this.isEdited = null;
	    	// 重新填写选择的系数信息,因为只有在choosed的情况下才会编辑,所以不用对choosed做判断,coefficients也是一样,只有coefficients不为空时才可以choose
	    	for (var i = 0; i < row.coefficients.length; i++) {
	    		if (row.coefficients[i].id === row.choosed) {
	    			row.comparisonType = row.coefficients[i].comparison;
	    			row.comparisonValue = row.coefficients[i].comparableValue;
	    		}
	    	}
	    },
	    deleteThisOne(row) {
	    	this.$confirm('此操作将永久删除该系数, 是否继续?', '提示', {
	          confirmButtonText: '确定',
	          cancelButtonText: '取消',
	          type: 'warning'
	        }).then(() => {
	         	let employeeId = this.tenantId.employeeId;
		    	let coefficientType = row.typeId;
		    	let id = row.choosed;
	    		autoApi({
		   			action: 'vehicle_coefficient_edit',
		   			version: '1.0',
		   			employeeId: employeeId,
		   			crudType: 8,	//4:修改
		   			coefficientType: coefficientType,
		   			id: id,
		   		},window.localStorage.getItem('token')).then((res)=> {
		   			if (res.code == 0) {
		    			this.getEditSetting();
		   				this.$message({
				            message: '系数已删除',
				            type: 'success'
				        });
	       			}
	       			else if (res.code == 7) {
	       				this.$message({
				            message: '操作失败,请检查输入',
				            type: 'error'
				        });
	       			}
		   		})
	        }).catch(() => {
	          this.$message({
	            type: 'info',
	            message: '已取消删除'
	          });          
	        });   	
	    },
	    addOne(row) {
	    	this.isAdded = row.typeId;
	    	row.name = null;
	    	row.comparisonType = null;
	    	row.comparisonValue = null;
	    },
	    confirmAdd(row) {
	    	let employeeId = this.tenantId.employeeId;
	    	let coefficientType = this.isAdded;
	    	let comparison = row.comparisonType;
	    	let name = row.name;
	    	let array = row.comparisonValue.split("_");
	    	if (array[0] >= array[1]) {
	    		this.$message({
		            message: "区间数值应当从小到大排列,请检查输入",
		            type: 'error'
		        });
	    	}
	    	else
	    	{
	    		array = JSON.stringify(array);
	    		autoApi({
		   			action: 'vehicle_coefficient_edit',
		   			version: '1.0',
		   			employeeId: employeeId,
		   			crudType: 1,	//1:添加
		   			coefficientType: coefficientType,
		   			comparison: comparison,
		   			array: array,
		   			name: name,
		   		},window.localStorage.getItem('token')).then((res)=> {
		   			if (res.code == 0) {
		   				this.isAdded = null;
		    			this.getEditSetting();
		   				this.$message({
				            message: '添加了新的系数',
				            type: 'success'
				        });
	       			}
	       			else if (res.code == 7) {
	       				this.$message({
				            message: '操作失败,请检查输入',
				            type: 'error'
				        });
	       			}
		   		})
	    	}
		    		
	    },
	    cancelAdd(row) {
	    	this.isAdded = null;
	    	//重新填写选择的数据,根据是否选择有两种处理方法
	    	if(row.choosed) {
	    		for (var i = 0; i < row.coefficients.length; i++) {
		    		if (row.coefficients[i].id === row.choosed) {
		    			row.comparisonType = row.coefficients[i].comparison;
		    			row.comparisonValue = row.coefficients[i].comparableValue;
		    		}
		    	}
	    	}
	    	else
	    	{
	    		row.name = null;
	    		row.comparisonType = null;
	    		row.comparisonValue = null;
	    	}
	    },
	    isFull(row) {
	    	if (row.coefficients) {
	    		if (row.maxCustomNum <= row.coefficients.length) {
	    			return true;
	    		}
	    	}
	    	else
	    	{
	    		return false;
	    	}
	    },
	    chooseOneCoefficient(row) {
	    	for (var i = 0; i < row.coefficients.length; i++) {
	    		if (row.coefficients[i].id === row.choosed) {
	    			row.comparisonType = row.coefficients[i].comparison;
	    			row.comparisonValue = row.coefficients[i].comparableValue;
	    		}
	    	}
	    },
	    reComparisonName(val) {
	    	switch(val)
	    	{
				case 1:
					return "大于"
					break;
				case 2:
					return "大于等于"
					break;
				case 3:
					return "小于"
					break;
				case 4:
					return "小于等于"
					break;
				case 5:
					return "等于"
					break;
				// case 6:
				// 	return "不等于"
				// 	break;
				case 7:
					return "开区间"
					break;
				case 8:
					return "前闭后开区间"
					break;
				case 9:
					return "前开后闭区间"
					break;
				// case 10:
				// 	return "在 ... 之中"
				// 	break;
				// case 11:
				// 	return "不在 ... 之中"
				// 	break;
	    	}
	    	
	    },
	    comparisonValueShow(row) {
	    	if(row.comparisonValue)
	    	{
	    		let value = row.comparisonValue.split("_");
		    	if (value[1]) {
		    		switch(row.comparisonType)
		    		{
		    			case 7:
		    				return "( " + value[0] + " , " + value[1] + " )"
		    				break;
		    			case 8:
		    				return "[ " + value[0] + " , " + value[1] + " )"
		    				break;
		    			case 9:
		    				return "( " + value[0] + " , " + value[1] + " ]"
		    				break;
		    			default:
		    				return row.comparisonValue
		    		}
		    	}
		    	else 
		    	{
		    		return row.comparisonValue
		    	}
	    	}
	    }
	  },
	  mounted() {
	  	this.getTenanList(); //获取代理商列表
	  }
	}
</script>
<style lang="less">
.autoInsuranceManage{
	.topBar {
		margin: 10px;
	}
	.dataBox {
		width: 1000px;
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
					cursor: pointer;
				}
			}
		  	.choosedList {
		  		color: #ffffff !important;
		  		background-color: #00E5EE;
		  	}
		}
	}
	.commonSet {
		margin-top: 10px;
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

	.confirmBoxL {
		margin-top: 20px;
		position: relative;
		float: left;
	}

	.confirmBoxR {
		margin-top: 20px;
		position: relative;
		float: right;
	}
}
</style>