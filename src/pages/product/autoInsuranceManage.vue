<template>
	<div class="autoInsuranceManageBody">
		<el-breadcrumb separator="/">
		  	<el-breadcrumb-item>车险管理</el-breadcrumb-item>
		</el-breadcrumb>
		<div v-if="switchBox"></div>

		<span class="labelText">请选择保险公司</span>
		<div class="topBar">
			<el-select v-model="insurerId" placeholder="请选择" @change="insurerChange">
			    <el-option v-for="item in insurers" :label="item.label" :value="item.value" :key="item.value"></el-option>
			</el-select>
		</div>

		<div v-if="insurerId">
			<span class="labelText">请选择车型</span>
			<div class="dataBox">
				<div class="dataBoxCol" v-for="formData,index in formRouterData" v-if="formData[0]" :key="index">
					<ul>
						<li v-for="i in formData" @click="enterToNext(i,index)" :class="chooseds[index] === i.value?'choosedList':''" :key="i.value">{{i.label}}</li>
					</ul>
				</div>
			</div>
		</div>

		<el-row class="commonSet" v-if="insurerId && choosed">
			<el-col :span="11">
				<label class="titleLabel">基础佣金设置</label>
				<el-row>
					<el-col :span="12">
						<span class="titleNext">商业险佣金比例： </span>
						<el-input v-model="baseCommission.shangye" class="countTool"></el-input> %
					</el-col>
					<el-col :span="12">
						<span class="titleNext">交强险佣金比例： </span>
						<el-input v-model="baseCommission.jiaoqiang" class="countTool"></el-input> %
					</el-col>
				</el-row>
			</el-col>	
			<el-col :span="11">
				<label class="titleLabel">自留佣金设置</label>
				<el-row>
					<el-col :span="12">
						<span class="titleNext">商业险佣金比例： </span>
						<el-input v-model="selfCommission.shangye" class="countTool"></el-input> %
					</el-col>
					<el-col :span="12">
						<span class="titleNext">交强险佣金比例： </span>
						<el-input v-model="selfCommission.jiaoqiang" class="countTool"></el-input> %
					</el-col>
				</el-row>
			</el-col>
		</el-row>

		<div v-if="insurerId && choosed" v-show="tagData[0][0]">
			<span style="font-size: 20px; margin-top:20px; display: inline-block">佣金调整系数</span>
			<el-button :type="isRateEffective?'danger':'primary'" size="large" @click="isRateEffective = !isRateEffective;confirmSetSave()">{{isRateEffective?'取消关联佣金调整系数':'关联佣金调整系数'}}</el-button>

			<div v-for="tagList,level in tagData" class="listBox" v-show="tagData[level][0]" :key="level">
				<el-menu mode="horizontal" menu-trigger="click" :default-active="currentRange.id.toString()" v-if="tagList[0]">
				  <el-menu-item :index="item.id.toString()" v-for="item,index in tagList" @click="selectMenu(item,level,index)" :key="index">{{item.name}}</el-menu-item>
				</el-menu>
			</div>
		</div>

		<div class="toolBox" v-if="currentRange.name && insurerId && choosed">
			<span>当前系数：</span>
			<span style="font-weight: bold; font-size:20px;">{{currentRange.name}}</span>
			<span>{{isRateEffective?"(当前调整系数生效中)":"(调整系数未生效)"}}</span>

			<div class="toolBoxR" v-if="currentRange.isCustom">
				<el-button type="primary" size="large" @click="dialogAddVisible = true">新增</el-button>
			</div>
		</div>
		
		<div class="tableBox" v-if="insurerId && choosed && currentRange.id">
			<el-table :data="rangeData" border style="width: 100%;font-size:12px;">
			    <!-- <el-table-column prop="id" label="序号"></el-table-column> -->
			    <el-table-column prop="name" label="系数名称"></el-table-column>
			    <el-table-column label="佣金比例">
			    	<template scope="scope">
			    		<span v-if="!(editedRatio.id == scope.row.id)">{{scope.row.rate?scope.row.rate:''}}</span>
			    		<el-input v-if="editedRatio.id && (editedRatio.id == scope.row.id)" v-model="editedRatio.rate"></el-input>
			    		<span v-if="scope.row.rate || (editedRatio.id && (editedRatio.id == scope.row.id))">%</span>
			    	</template>
			    </el-table-column>
			    <el-table-column label="操作">
			    	<template scope="scope">
			    		<el-button @click="editRange(scope.row)" v-if="currentRange.isCustom">编辑系数</el-button>
			    		<el-button @click="deleteRange(scope.row)" v-if="currentRange.isCustom">删除</el-button>
			    		<el-button @click="editRatio(scope.row)" v-if="!editedRatio.id">调整比例</el-button>
			    		<el-button @click="confirmEditRatio(scope.row)" v-if="editedRatio.id && (editedRatio.id == scope.row.id)">确认</el-button>
			    		<el-button @click="cancelEditRatio(scope.row)" v-if="editedRatio.id && (editedRatio.id == scope.row.id)">取消调整</el-button>
			    	</template>
			    </el-table-column>
			</el-table>
		</div>

		<div class="confirmBoxR" v-if="insurerId && choosed">
			<el-button type="primary" size="large" @click="confirmSetSave">保存</el-button>
		</div>

		<el-dialog :title="'新增系数 - '+ currentRange.name" :visible.sync="dialogAddVisible" size="small" :before-close="handleAddClose">
			<el-row>
				<el-col :span="8">
	  				<el-select v-model="addedRange.comparison" placeholder="请选择">
						<el-option v-for="item in comparisons" :label="item.label" :value="item.value" :key="item.value"></el-option>
					</el-select>
	  			</el-col>
	  			<el-col :span="9">
	  				<el-row>
	  					<el-col :span="6">
	  						<span style="line-height: 30px;">区间数值: </span>
	  					</el-col>
	  					<el-col :span="16">
			  				<el-row v-if="(addedRange.comparison == 'bteween' || addedRange.comparison == 'lbteween' || addedRange.comparison == 'rbteween')">
			  					<el-col :span="10">
			  						<el-input v-model="addedRange.comparableValueA" style="width: 100%"></el-input>
			  					</el-col>
			  					<el-col :span="4" style="display: flex; justify-content:center;">
			  						<span style="line-height: 36px;">--</span>
			  					</el-col>
			  					<el-col :span="10">
			  						<el-input v-model="addedRange.comparableValueB" style="width: 100%"></el-input>
			  					</el-col>
			  				</el-row>
	  						<el-input v-model="addedRange.comparableValue" style="width: 100%" class="inputPercent" v-if="!(addedRange.comparison == 'bteween' || addedRange.comparison == 'lbteween' || addedRange.comparison == 'rbteween')"></el-input>
	  					</el-col>
	  				</el-row>
	  			</el-col>
	  			<el-col :span="7">
	  				<span class="dataFont">系数名称: </span>
	  				<el-input v-model="addedRange.name" style="width: 120px;"></el-input>
	  			</el-col>
			</el-row>
		    <div slot="footer" class="dialog-footer">
		        <el-button @click="handleAddClose">取 消</el-button>
		        <el-button type="primary" @click="confirmAddRange">确 定</el-button>
		    </div>
		</el-dialog>

		<el-dialog title="编辑系数" :visible.sync="dialogEditVisible" size="small" :before-close="handleEditClose">
			<el-row>
				<el-col :span="8">
	  				<el-select v-model="editedRange.comparison" placeholder="请选择">
						<el-option v-for="item in comparisons" :label="item.label" :value="item.value" :key="item.value"></el-option>
					</el-select>
	  			</el-col>
	  			<el-col :span="9">
	  				<el-row>
	  					<el-col :span="6">
	  						<span style="line-height: 30px;">区间数值: </span>
	  					</el-col>
	  					<el-col :span="16">
			  				<el-row v-if="(editedRange.comparison == 'bteween' || editedRange.comparison == 'lbteween' || editedRange.comparison == 'rbteween')">
			  					<el-col :span="10">
			  						<el-input v-model="editedRange.comparableValueA" style="width: 100%"></el-input>
			  					</el-col>
			  					<el-col :span="4" style="display: flex; justify-content:center;">
			  						<span style="line-height: 36px;">--</span>
			  					</el-col>
			  					<el-col :span="10">
			  						<el-input v-model="editedRange.comparableValueB" style="width: 100%"></el-input>
			  					</el-col>
			  				</el-row>
	  						<el-input v-model="editedRange.comparableValue" style="width: 100%" class="inputPercent" v-if="!(editedRange.comparison == 'bteween' || editedRange.comparison == 'lbteween' || editedRange.comparison == 'rbteween')"></el-input>
	  					</el-col>
	  				</el-row>
	  			</el-col>
	  			<el-col :span="7">
	  				<span class="dataFont">系数名称: </span>
	  				<el-input v-model="editedRange.name" style="width: 120px;"></el-input>
	  			</el-col>
			</el-row>
		    <div slot="footer" class="dialog-footer">
		        <el-button @click="handleEditClose">取 消</el-button>
		        <el-button type="primary" @click="confirmEditRange">确 定</el-button>
		    </div>
		</el-dialog>

	</div>
</template>
<script>

import { autoApi } from '@/ajax/post.js'

	function formatDate(time){
	  var   x = time - 0
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
	      choosed: null,		//当前路由选择
	      chooseds: [],			//路由选择列表
	      formRouterData: [],
	      baseCommission: {		//基础佣金
	      	shangye: null,
	      	jiaoqiang: null
	      },
	      selfCommission: {		//自留佣金
	      	shangye: null,
	      	jiaoqiang: null
	      },
	      isRateEffective: false,
	      tagData: [],
	      rangeData: [],	//选中系数的数据
	      rateData: {},		//选中节点的手续费配置
	      currentRange: {	//当前选中系数的名称
	      	id: 1,
	      	name: null,
	      	isCustom: false,
	      	maxmiumCustom: 0,	
	      	depth: 0,
	      },	
	      tenantId: {},		//当前选择代理商ID	
	      insurerId: null,		//当前选择险企ID
	      insurers: [], 			//险企列表数据
	      editedRatio: {	//被编辑的系数比例
	      	id: null,
	      	rate: null,
	      },
	      addedRange: {
	      	name: null,
	      	comparison: null,
	      	comparableValue: null,
	      	comparableValueA: null,
	      	comparableValueB: null,
	      },
	      editedRange: {
	      	name: null,
	      	comparison: null,
	      	comparableValue: null,
	      	comparableValueA: null,
	      	comparableValueB: null,
	      },
	      dialogAddVisible: false,
	      dialogEditVisible: false,
	      switchBox: false,	//强行让vue组件重新刷新渲染的投机工具
	      comparisons: [
	      	{
	      		value: 'gt',
	      		label: "大于"
	      	},
	      	{
	      		value: 'gte',
	      		label: "大于等于"
	      	},
	      	{
	      		value: 'lt',
	      		label: "小于"
	      	},
	      	{
	      		value: 'lte',
	      		label: "小于等于"
	      	},
	      	{
	      		value: 'eq',
	      		label: "等于"
	      	},
	      	{
	      		value: 'bteween',
	      		label: "前后不含区间"
	      	},
	      	{
	      		value: 'lbteween',
	      		label: "前含后不含区间"
	      	},
	      	{
	      		value: 'rbteween',
	      		label: "前不含后含区间"
	      	},
	      ],
	    }
	  },
	  methods: {
	    init() {							//初始化页面
	  		this.getInsurerList(); 			//获取险企列表  need:tid  get:insurerId
	  		this.getInfo();
	  		for (let i = 0; i < 10; i++) {	
	  			this.chooseds[i] = null;	
	  			this.formRouterData[i] = [];
	  			this.tagData[i] = [];
	  			//需要修改tagData的结构,[0]为第一层系数类型列表,[1]位第二层系数类型列表
	  		}
	    },

	    //获取险企列表
	    getInsurerList() {
	    	let payload = {
	    		employeeId: this.tenantId.employeeId
	    	};
	    	payload = JSON.stringify(payload);
			autoApi({
	   			action: 'insurers',
	   			version: '1.0',
	   			payload: payload			
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

	    //获取路由节点信息
	    getInfo() {
	    	let payload = {
	    		employeeId: window.localStorage.getItem('employeeId'),
	    	};
	    	payload = JSON.stringify(payload);
	    	autoApi({
	   			action: 'poundage_documents',
	   			version: '1.0',
	   			payload: payload			
	   		},window.localStorage.getItem('token')).then((res)=> {
	   			if (res.code == 0) {
	   				if (res.attach) {
	   					this.turnData(res.attach);
	   				}
       			}
	   		})
	    },

	    //处理获取的路由节点数据并初始化路由节点列表
	    turnData(data) {
	    	// 转换数据
	    	//将路由节点层级转换成数组对象
	    	function formatChildren(data,formData) {
	    		for (let item in data) {
	    			let buf = {
	    				value: data[item].node.id,
	    				label: data[item].node.name,
	    				children: [],
	    			}
	    			formData.push(buf);
	    			if (data[item].children) {
	    				for (let i = 0; i < formData.length; i++) {
		    				if (formData[i].value == item) {
			    				formatChildren(data[item].children,formData[i].children);
			    			}
		    			}
	    			}
	    		}
	    	}
	    	let formData = [];
	    	formatChildren(data,formData);
	    	this.formRouterData[0] = formData;
	    	for (var i = 1; i < this.formRouterData.length; i++) {
	    		this.formRouterData[i] = [];
	    	}
	    	this.switchBox = !this.switchBox;
	    },

	    insurerChange(value) {
	  		this.getInfo();	//路由节点列表数据刷新并初始化
	  		//清除已有的页面选中记录
	  		//清空所选节点下级所有的选中状态
	    	for (let j = 0; j < this.chooseds.length; j++) {
	    		this.chooseds[j] = null;
	    	}
	    	this.choosed = null;
	    	//清空系数列表
	    	for (let j = 0; j < this.tagData.length; j++) {
	    		this.tagData[j] = [];
	    	}
	    	//清空当前系数
	    	this.currentRange.id = null;
	    	this.currentRange.name = null;
	    	this.currentRange.isCustom = false;
	    	this.currentRange.maxmiumCustom = 0;
	    	this.currentRange.depth = 0;
	    	//清空表格数据
	    	this.rangeData = [];
	    	//清空全局系数
	    	this.baseCommission.shangye = null;
	    	this.baseCommission.jiaoqiang = null;
	    	this.selfCommission.shangye = null;
	    	this.selfCommission.jiaoqiang = null;
	    	this.isRateEffective = false;
	    },

	    enterToNext(val,index) {
	    	this.choosed = val.value;
	    	this.chooseds[index] = val.value;
	    	//实现只显示当前选择的直接子集的功能
	    	for (let j = index + 2; j < this.formRouterData.length; j++) {
	    		this.formRouterData[j] = [];
	    	}
	    	//清空所选节点下级所有的选中状态
	    	for (let j = index + 1; j < this.chooseds.length; j++) {
	    		this.chooseds[j] = null;
	    	}
	    	//清空系数列表
	    	for (let j = 0; j < this.tagData.length; j++) {
	    		this.tagData[j] = [];
	    	}
	    	//清空当前系数
	    	this.currentRange.id = null;
	    	this.currentRange.name = null;
	    	this.currentRange.isCustom = false;
	    	this.currentRange.maxmiumCustom = 0;
	    	this.currentRange.depth = 0;
	    	//清空编辑状态
	    	this.editedRatio.id = null;
	    	this.editedRatio.rate = null;
	    	//清空全距系数配置
	    	this.baseCommission.jiaoqiang = null;
	    	this.baseCommission.shangye = null;
	    	this.selfCommission.jiaoqiang = null;
	    	this.selfCommission.shangye = null;
	    	this.isRateEffective = false;

	    	let child_index = index + 1
	    	this.formRouterData[child_index] = val.children;
	    	// post
	    	let payload = {
	    		employeeId: window.localStorage.getItem('employeeId'),
	    		id: val.value,
	    	};
	    	payload = JSON.stringify(payload);
			autoApi({
	   			action: 'coefficient_documents',
	   			version: '1.0',
	   			payload: payload			
	   		},window.localStorage.getItem('token')).then((res)=> {
	   			if (res.code == 0) {
	   				if(res.attach) {
	   					this.formatTableData(res.attach);
	   				}
       			}
	   		})
	    },
	 
	    //格式化系数类型列表数据并显示
	    formatTableData(data) {
	    	function formatChildren(data,formData) {
	    		for (let item in data) {
	    			let buf = {
	    				id: data[item].node.id,
	    				name: data[item].node.name,	
	    				maxmiumCustom: data[item].node.maxmiumCustom,	
	    				custom: data[item].node.custom,	
	    				children: [],
	    			}
	    			formData.push(buf);
	    			if (data[item].children) {//说明有二级系数表
	    				for (let i = 0; i < formData.length; i++) {
	    					if (formData[i].id == item) {
	    						formatChildren(data[item].children,formData[i].children);
	    					}
	    				}
	    			}
	    		}
	    	}	
	    	let formData = [];
	    	formatChildren(data,formData);
	    	this.tagData[0] = formData;
	    	for (let i = 1; i < this.tagData.length; i++) {
	    		this.tagData[i] = [];
	    	}
	    	
	    	if (this.currentRange.id && formData[0]) {	
	    		for (let i = 0; i < formData.length; i++) {
	    			if (formData[i].id == this.currentRange.id) {
				    	this.currentRange.name = formData[i].name;
				    	this.currentRange.id = formData[i].id;
				    	this.currentRange.isCustom = formData[i].custom;
				    	this.currentRange.maxmiumCustom = formData[i].maxmiumCustom;
	    				this.currentRange.depth = 0;
	    			}
	    		}
	    	}
	    	else
	    	{//默认显示第一条系数类型的数据
		    	this.currentRange.name = formData[0]?formData[0].name:'';
		    	this.currentRange.id = formData[0]?formData[0].id:'';
		    	this.currentRange.isCustom = formData[0]?formData[0].custom:false;
		    	this.currentRange.maxmiumCustom = formData[0]?formData[0].maxmiumCustom:0;
		    	this.currentRange.depth = 0;
	    	}

	    	this.getRanges(this.currentRange.id);
	    },

	    selectMenu(val,level,index) {//val:被点击的结构体, level:选中路由所在的层级数, index:选中路由在自身列表的位置
    		
	   		this.currentRange.id = val.id;
	   		this.currentRange.name = val.name;
	   		this.currentRange.isCustom = val.custom;
	   		this.currentRange.maxmiumCustom = val.maxmiumCustom;
	   		this.currentRange.depth = level;

	    	var child_level = level + 1;
	    	if (val.children[0]) {
	    		this.tagData[child_level] = val.children;
	    		for (let i = level + 2; i < this.tagData.length; i++) {
	    			this.tagData[i] = [];
	    		}
	    	}
	    	else
	    	{
	    		for (let i = level + 1; i < this.tagData.length; i++) {
	    			this.tagData[i] = [];
	    		}
	    	}
	    	this.getRanges(val.id);
	    },

	    getRanges(id) {
	    	this.rangeData = [];
	    	this.editedRatio.id = null;
	    	this.editedRatio.rate = null;
	    	// post
	    	let payload = {
	    		employeeId: window.localStorage.getItem('employeeId'),
	    		id: id,
	    	};
	    	payload = JSON.stringify(payload);
			autoApi({
	   			action: 'coefficient_ranges',
	   			version: '1.0',
	   			payload: payload			
	   		},window.localStorage.getItem('token')).then((res)=> {
	   			if (res.code == 0) {
	   				if(res.attach) {
	   					for (let item in res.attach) {
	   						let buf = res.attach[item];
	   						buf.rate = null;
	   						this.rangeData.push(buf);
	   					}
	    				this.getRates(this.choosed);
	   				}
       			}
	   		})
	    },

	    getRates(id) {
	    	this.rateData = {};
	    	// post
	    	let payload = {
	    		employeeId: window.localStorage.getItem('employeeId'),
	    		insurerId: this.insurerId,
	    		nodeId: id,
	    		coefficientId: this.currentRange.id,
	    	};
	    	payload = JSON.stringify(payload);
			autoApi({
	   			action: 'poundage_config',
	   			version: '1.0',
	   			payload: payload			
	   		},window.localStorage.getItem('token')).then((res)=> {
	   			if (res.code == 0) {
	   				if(res.attach) {
	   					this.baseCommission.shangye = res.attach.cmRate / 10;
	   					this.baseCommission.jiaoqiang = res.attach.cpRate / 10;
	   					this.selfCommission.shangye = res.attach.cmRetainRate / 10;
	   					this.selfCommission.jiaoqiang = res.attach.cpRetainRate / 10;
	   					this.isRateEffective = res.attach.effective;
	   					this.rateData = res.attach.ratios?res.attach.ratios:{};
	   					this.fixData();	//展示中的系数与rate数据
	   				}
       			}
	   		})
	    },

	    fixData() {		//将现有的rateData整合进rangeData里
    		for (let i = 0; i < this.rangeData.length; i++) {
    			if (this.rateData[this.rangeData[i].id]) {
    				this.rangeData[i].rate = this.rateData[this.rangeData[i].id] / 10;
    			}
    			else
    			{
    				this.rangeData[i].rate = 0;
    			}
    		}
	    },

	    handleAddClose() {
	    	this.dialogAddVisible = false;
	    },

	    handleEditClose() {
	    	this.dialogEditVisible = false;
	    },

	    isLegalNumber(val) {
	    	return (-100 <= val && val <= 100)?true:false;
	    },

	    confirmSetSave() {
			//post
			if (this.isLegalNumber(this.baseCommission.shangye) && this.isLegalNumber(this.baseCommission.jiaoqiang) && this.isLegalNumber(this.selfCommission.shangye) && this.isLegalNumber(this.selfCommission.jiaoqiang) && this.isLegalNumber(this.editedRatio.rate)) {
				let payload = {
		    		employeeId: window.localStorage.getItem('employeeId'),
	    			insurerId: this.insurerId,
		    		nodeId: this.choosed,
		    		config: {
		    			cmRate: this.baseCommission.shangye?parseInt(this.baseCommission.shangye * 10):0,
		    			cpRate: this.baseCommission.jiaoqiang?parseInt(this.baseCommission.jiaoqiang * 10):0,
		    			cmRetainRate: this.selfCommission.shangye?parseInt(this.selfCommission.shangye * 10):0,
		    			cpRetainRate: this.selfCommission.jiaoqiang?parseInt(this.selfCommission.jiaoqiang * 10):0,
		    			effective: this.isRateEffective,
		    		}
		    	}
		    	
			   	payload = JSON.stringify(payload);
		    	autoApi({
		   			action: 'poundage_config_edit',
		   			version: '1.0',
		   			payload: payload,
		   		},window.localStorage.getItem('token')).then((res)=> {
		   			if (res.code == 0) {
		   				this.getRanges(this.currentRange.id);
				    	this.$message({
				    		message: '设置已保存',
				    		type: 'success',
				    	})
	       			}
		   		})
			}
			else
			{
		    	this.$message({
		    		message: '输入非法,请检查输入(正确输入范围是-100到100,小数将只保留一位)',
		    		type: 'error',
		    	})
		    }
	    },
	    editRange(row) {
	    	this.dialogEditVisible = true;
	    	this.editedRange.id = row.id;
	    	this.editedRange.name = row.name;
	    	for (let i = 0; i < this.comparisons.length; i++) {
	    		if (this.reComparisonName(row.comparison) == this.comparisons[i].label) {
	    			this.editedRange.comparison = this.comparisons[i].value;
	    		}
	    	}
	    	if (row.comparableValue.split('_')[1]) {
	    		this.editedRange.comparableValueA = row.comparableValue.split('_')[0];
	    	this.editedRange.comparableValueB = row.comparableValue.split('_')[1];
	    	}
	    	else {
	    		this.editedRange.comparableValue = row.comparableValue;
	    	}
	    	
	    },
	    confirmEditRange() {
	    	if ((this.editedRange.comparableValue || this.editedRange.comparableValueA) && this.editedRange.name && this.editedRange.comparison) {
	    		var payload = {
	    			id: this.editedRange.id,
		    		employeeId: window.localStorage.getItem('employeeId'),
		    		coefficientId: this.currentRange.id,
		    		name: this.editedRange.name,
		    		val: [],
		    		symbol: this.editedRange.comparison,
		    	}
		    	if (this.editedRange.comparison == "bteween" || this.editedRange.comparison == "lbteween" || this.editedRange.comparison == "rbteween") {
		    		payload.val[0] = this.editedRange.comparableValueA;
		    		payload.val[1] = this.editedRange.comparableValueB;
		    	}
		    	else
		    	{
		    		payload.val[0] = this.editedRange.comparableValue;
		    	}
			   	payload = JSON.stringify(payload);
		    	autoApi({
		   			action: 'coefficient_range_edit',
		   			version: '1.0',
		   			crudType: 4,
		   			payload: payload,
		   		},window.localStorage.getItem('token')).then((res)=> {
		   			if (res.code == 0) {
		   				this.editedRange.id = null;
				    	this.editedRange.name = null;
				    	this.editedRange.comparison = null;
				    	this.editedRange.comparableValue = null;
				    	this.editedRange.comparableValueA = null;
				    	this.editedRange.comparableValueB = null;
				    	this.getRanges(this.currentRange.id);
				    	this.$message({
				    		message: '编辑已保存',
				    		type: 'success',
				    	});
	       			}
		   		})
	    	}
	    	else
	    	{
	    		this.$message({
	    			message: '编辑的数据不完整,已取消修改',
	    			type: 'error',
	    		});
	    	}
		   	this.dialogEditVisible = false;
	    },
	    deleteRange(row) {
	    	//post
	    	this.$confirm('此操作将永久删除该系数, 是否继续?', '提示', {
	          confirmButtonText: '确定',
	          cancelButtonText: '取消',
	          type: 'warning'
	        }).then(() => {
	    		autoApi({
		   			action: 'bonus_poundage_config_edit',
		   			version: '1.0',
		   			payload: payload
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

	    	let payload = {
	    			id: row.id,
		    		employeeId: window.localStorage.getItem('employeeId'),
		    		coefficientId: this.currentRange.id,
		    	}
		   	payload = JSON.stringify(payload);
	    	autoApi({
		   			action: 'coefficient_range_edit',
		   			version: '1.0',
		   			crudType: 8,
		   			payload: payload,
		   		},window.localStorage.getItem('token')).then((res)=> {
		   			if (res.code == 0) {
		   				this.getRanges(this.currentRange.id);
				    	this.$message({
				    		message: '删除成功',
				    		type: 'success',
				    	});
	       			}
		   		})
	    },
	    editRatio(row) {
	    	this.editedRatio.id = row.id;
	    	this.editedRatio.rate = row.rate;
	    },
	    cancelEditRatio(row) {
	    	this.editedRatio.id = null;
	    	this.editedRatio.rate = null;
	    },
	    confirmEditRatio() {
	    	//post
		    if (this.isLegalNumber(this.baseCommission.shangye) && this.isLegalNumber(this.baseCommission.jiaoqiang) && this.isLegalNumber(this.selfCommission.shangye) && this.isLegalNumber(this.selfCommission.jiaoqiang) && this.isLegalNumber(this.editedRatio.rate)) {
		    	let payload = {
		    		employeeId: window.localStorage.getItem('employeeId'),
	    			insurerId: this.insurerId,
		    		nodeId: this.choosed,
		    		config: {
		    			cmRate: this.baseCommission.shangye?parseInt(this.baseCommission.shangye * 10):0,
		    			cpRate: this.baseCommission.jiaoqiang?parseInt(this.baseCommission.jiaoqiang * 10):0,
		    			cmRetainRate: this.selfCommission.shangye?parseInt(this.selfCommission.shangye * 10):0,
		    			cpRetainRate: this.selfCommission.jiaoqiang?parseInt(this.selfCommission.jiaoqiang * 10):0,
		    			effective: this.isRateEffective,
		    			coefficientId: this.currentRange.id,
		    			rangeId: this.editedRatio.id,
		    			rangeRate: this.editedRatio.rate?parseInt(this.editedRatio.rate * 10):0,
		    		}
		    	}
		    	
			   	payload = JSON.stringify(payload);
		    	autoApi({
			   			action: 'poundage_config_edit',
			   			version: '1.0',
			   			payload: payload,
			   		},window.localStorage.getItem('token')).then((res)=> {
			   			if (res.code == 0) {
			   				this.getRanges(this.currentRange.id);
					    	this.$message({
					    		message: '设置已保存',
					    		type: 'success',
					    	})
		       			}
			   		})
		    	this.editedRatio.id = null;
		    	this.editedRatio.rate = null;
		    }
		    else
		    {
		    	this.$message({
		    		message: '输入非法,请检查输入',
		    		type: 'error',
		    	})
		    }
	    },
	    confirmAddRange() {
	    	//post add
		    if ((this.addedRange.comparison || this.addedRange.comparableValueA) && this.addedRange.name && this.addedRange.comparison) {
		    	var payload = {
			    		employeeId: window.localStorage.getItem('employeeId'),
			    		coefficientId: this.currentRange.id,
			    		name: this.addedRange.name,
			    		val: [],
			    		symbol: this.addedRange.comparison,
			    	}
		    	if (this.addedRange.comparison == "bteween" || this.addedRange.comparison == "lbteween" || this.addedRange.comparison == "rbteween") {
		    		payload.val[0] = this.addedRange.comparableValueA;
		    		payload.val[1] = this.addedRange.comparableValueB;
		    	}
		    	else
		    	{
		    		payload.val[0] = this.addedRange.comparableValue;
		    	}
			   	payload = JSON.stringify(payload);
		    	autoApi({
		   			action: 'coefficient_range_edit',
		   			version: '1.0',
		   			crudType: 1,
		   			payload: payload,
		   		},window.localStorage.getItem('token')).then((res)=> {
		   			if (res.code == 0) {
		   				this.addedRange.name = null;
		   				this.addedRange.comparison = null;
		   				this.addedRange.comparableValue = null;
		   				this.addedRange.comparableValueA = null;
		   				this.addedRange.comparableValueB = null;
		   				this.getRanges(this.currentRange.id);
		   				this.$message({
		   					message: '新增成功',
		   					type: 'success',
		   				});
	       			}
		   		})
		    }
		    else
		    {
		    	this.$message({
		    		message: '提交数据不完整,添加已取消',
		    		type: 'error',
		    	});
		    }
		   	this.dialogAddVisible = false;
	    },
	    //判断系数数量是否达到了最大值
	    isFull(row) {
	    	if (row.coefficients && row.maxmiumCustom) {//最大值为0表示无上限
	    		if (row.maxmiumCustom <= row.coefficients.length) {
	    			return true;
	    		}
	    	}
	    	else
	    	{
	    		return false;
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
				case 4:
					return "小于"
					break;
				case 8:
					return "小于等于"
					break;
				case 16:
					return "等于"
					break;
				case 32:
					return "前后不含区间"
					break;
				case 64:
					return "前含后不含区间"
					break;
				case 128:
					return "前不含后含区间"
					break;
				case 'gt':
					return "大于"
					break;
				case 'gte':
					return "大于等于"
					break;
				case 'lt':
					return "小于"
					break;
				case 'lte':
					return "小于等于"
					break;
				case 'eq':
					return "等于"
					break;
				case 'bteween':
					return "前后不含区间"
					break;
				case 'lbteween':
					return "前含后不含区间"
					break;
				case 'rbteween':
					return "前不含后含区间"
					break;
	    	}
	    },
	     reComparisonValue(val) {
	    	switch(val)
	    	{
	    		case '大于':
					return 'gt'
					break;
				case '大于等于':
					return 'gte'
					break;
				case '小于':
					return 'lt'
					break;
				case '小于等于':
					return 'lte'
					break;
				case '等于':
					return 'eq'
					break;
				case '前后不含区间':
					return 'bteween'
					break;
				case '前含后不含区间':
					return 'lbteween'
					break;
				case '前不含后含区间':
					return 'rbteween'
					break;
				default:
					return val
					break;
	    	}
	    },
	    comparisonValueShow(row) {	//不修改参数,只是优化表现的函数
	    	if(row.comparableValue)
	    	{
	    		let value = row.comparableValue.split("_");
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
		    				return row.comparableValue
		    		}
		    	}
		    	else if ((row.name == "男" || row.name == "女") && (row.comparableValue == "0" || row.comparableValue == "1")) {
		    		switch(row.comparableValue)
		    		{
		    			case 1:
		    				return "女"
		    				break;
		    			case '1':
		    				return "女"
		    				break;
		    			case 0:
		    				return "男"
		    				break;
		    			case '0':
		    				return "男"
		    				break;
		    			default:
		    				return row.comparableValue
		    		}
		    	}
		    	else
		    	{
		    		return row.comparableValue
		    	}
	    	}
	    }
	  },
	  mounted() {
	  	this.tenantId.employeeId = window.localStorage.getItem('employeeId');
	  	this.tenantId.tid = window.localStorage.getItem('tid');
	  	this.init(); //初始化
	  }
	}
</script>
<style lang="less">
.autoInsuranceManageBody{
	min-width: 1000px;
	.labelText {
		font-size: 16px;
		font-weight: bold;
	}
	.topBar {
		margin: 10px;
	}
	.dataBox {
		width: 100%;
		overflow-x: hidden;
		.dataBoxCol {
			float: left;
			width: 14%;
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
		  		background-color: #87CECB;
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
			width: 100px;
			display: inline-block;
		}
	}
	
	.confirmBoxR {
		margin-top: 20px;
		position: relative;
		float: right;
	}

	.toolBox {
		margin: 20px 0 ;
		.toolBoxR {
			position: relative;
			float: right;
		}
	}

	.listBox {
		border-bottom: 1px solid #20a0ff;
	}

}
</style>