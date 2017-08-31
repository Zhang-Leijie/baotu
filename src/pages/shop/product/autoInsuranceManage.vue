<template>
	<div class="autoInsuranceManage">
		<el-breadcrumb separator="/">
		  	<el-breadcrumb-item>车险管理</el-breadcrumb-item>
		</el-breadcrumb>
		<div v-if="switchBox"></div>

		<span class="labelText">请选择保险公司</span>
		<div class="topBar">
			<el-select v-model="insurerId" placeholder="请选择" @change="insurerChange">
			    <el-option v-for="item in insurers" :label="item.label" :value="item.value"></el-option>
			</el-select>
			<el-button type="primary" @click="" style="margin-left:20px; float:right" :disabled="true">是否关联佣金调整系数</el-button>
		</div>

		<div v-if="insurerId">
			<span class="labelText">请选择车型</span>
			<div class="dataBox">
				<div class="dataBoxCol" v-for="formData,index in formRouterData" v-if="formData[0]">
					<ul>
						<li v-for="i in formData" @click="enterToNext(i,index)" :class="chooseds[index] === i.value?'choosedList':''">{{i.label}}</li>
					</ul>
				</div>
			</div>
		</div>

		<el-row class="commonSet" v-if="insurerId">
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

		<div v-if="insurerId">
			<span style="font-size: 20px; margin-top:20px; display: inline-block">佣金调整系数</span>

			<el-menu class="el-menu-demo" mode="horizontal" @select="selectMenu" @open="openMenu" menu-trigger="click" default-active="defaultRange">
			  <el-menu-item :index="item.cfgCoefficientId.toString()" v-for="item in tableData" v-if="!item.children[0]">{{item.name}}</el-menu-item>
			  <el-submenu :index="item.cfgCoefficientId.toString()" v-for="item in tableData" v-if="item.children[0]">
			    <template slot="title">{{item.name}}</template>
			    <el-menu-item :index="child.cfgCoefficientId.toString()" v-for="child in item.children">{{child.name}}</el-menu-item>
			  </el-submenu>
			</el-menu>

			<span>当前系数：</span>
			<span style="font-weight: bold; font-size:20px;">{{currentRange.name}}</span>

			<div class="toolBoxR" v-if="isCustom">
				<el-button type="primary" size="large" @click="dialogAddVisible = true">新增</el-button>
			</div>
		</div>

		
		<div class="tableBox" v-if="insurerId">
			<el-table :data="rangeData" border style="width: 100%;font-size:12px;">
			    <!-- <el-table-column prop="id" label="序号"></el-table-column> -->
			    <el-table-column prop="name" label="系数名称"></el-table-column>
			    <el-table-column label="佣金比例">
			    	<template scope="scope">
			    		<span v-if="!(editedRatio.id == scope.row.id)">{{scope.row.rate}}</span>
			    		<el-input v-if="editedRatio.id && (editedRatio.id == scope.row.id)"></el-input>
			    	</template>
			    </el-table-column>
			    <el-table-column label="操作">
			    	<template scope="scope">
			    		<el-button @click="editRange(scope.row)" v-if="isCustom">编辑</el-button>
			    		<el-button @click="deleteRange(scope.row)" v-if="isCustom">删除</el-button>
			    		<!-- <el-button @click="confirmEditRatio(scope.row)" v-if="editedRange.id && (editedRange.id == scope.row.id)">确认</el-button> -->
			    	</template>
			    </el-table-column>
			</el-table>
		</div>

		<div class="confirmBoxR" v-if="insurerId && choosed">
			<el-button type="danger" size="large" @click="confirmSetDelete">删除</el-button>
			<el-button type="primary" size="large" @click="confirmSetSave">保存</el-button>
		</div>

		<el-dialog :title="'新增系数 - '+ currentRange.name" :visible.sync="dialogAddVisible" size="small" :before-close="handleAddClose">
			<el-row>
				<el-col :span="8">
	  				<el-select v-model="addedRange.comparison" placeholder="请选择">
						<el-option v-for="item in comparisons" :label="item.label" :value="item.value"></el-option>
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
						<el-option v-for="item in comparisons" :label="item.label" :value="item.value"></el-option>
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

import { autoApi,commonApi } from '@/ajax/post.js'

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
	      tableData: [],
	      rangeData: [],	//选中系数的数据
	      currentRange: {	//当前选中系数的名称
	      	id: 1,
	      	name: null,
	      },	
	      isCustom: false,	//当前选中系数是否可编辑
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
	  	showCoefficient(row) {
	  		for (var i = 0; i < row.coefficients.length; i++) {
	  			if(row.coefficients[i].id === row.choosed) {
	  				row.comparisonType = row.coefficients[i].comparison;
	  				row.comparisonValue = row.coefficients[i].comparableValue;
	  				if (row.coefficients[i].rate) {
	  					row.rate = Math.abs(row.coefficients[i].rate / 10);
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
	    
	    init() {							//初始化页面
	  		this.getInsurerList(); 			//获取险企列表  need:tid  get:insurerId
	  		this.getInfo();
	  		for (let i = 0; i < 10; i++) {	
	  			this.chooseds[i] = null;	
	  			this.formRouterData[i] = {};
	  		}
	    },

	    getInfo() {
	    	let payload = {
	    		employeeId: window.localStorage.getItem('employeeId'),
	    	};
	    	payload = JSON.stringify(payload);
	    	autoApi({
	   			action: 'poundage_node_structure',
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

	    turnData(data) {
	    	// 转换数据
	    	//将路由节点层级转换成数组对象
	    	function formatChildren(data,formData) {
	    		for (let item in data) {
	    			let buf = {
	    				value: data[item].id,
	    				label: data[item].name,
	    				type: data[item].type,
	    				coefficientStructure: data[item].coefficientStructure?data[item].coefficientStructure:[],
	    				children: [],
	    			}
	    			formData.push(buf);
	    			for (let i = 0; i < formData.length; i++) {
	    				if (formData[i].value == item) {
		    				formatChildren(data[item].children,formData[i].children);
		    			}
	    			}
	    		}
	    	}
	    	let formData = [];
	    	formatChildren(data,formData);
	    	this.formRouterData[0] = formData;
	    	this.switchBox = !this.switchBox;
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

	    insurerChange(value) {
	  		// this.getSetting();				//获取表格设置列表	need:employeeId/insurerId/route
	    	//险企ID
	    },

	    enterToNext(val,index) {
	    	this.switchBox = !this.switchBox;	//刷新渲染
	    	this.choosed = val.value;
	    	this.chooseds[index] = val.value;
	    	//实现只显示当前选择的直接子集的功能
	    	for (let j = index + 2; j < this.formRouterData.length; j++) {
	    		this.formRouterData[j] = {};
	    	}
	    	//删除所选节点下级所有的选中状态
	    	for (let j = index + 1; j < this.chooseds.length; j++) {
	    		this.chooseds[j] = null;
	    	}

	    	var isSpecialPath = false;
	    	for (let i = index; i >= 0; i--) {
	    		if (this.chooseds[i] == 18) {
	    			isSpecialPath = true;
	    		}
	    	}
	    	if (isSpecialPath) {
	    		let payload = {
	    			type: 'NODE_CHILDREN',
	    			insurerId: this.insurerId,
	    			employeeId: window.localStorage.getItem('employeeId'),
	    			nodePath: [],
	    		}
	    		for (let i = 0; i < this.chooseds.length; i++) {
	    			if (this.chooseds[i]) {
	    				payload.nodePath[i] = this.chooseds[i];
	    			}
	    		}
	    		payload = JSON.stringify(payload);
	    		autoApi({
		   			action: 'poundage_node_children',
		   			version: '1.0',
		   			payload: payload
		   		},window.localStorage.getItem('token')).then((res)=> {
		   			if (res.code == 0) {
		   				//将路由节点层级转换成数组对象
				    	function formatChildren(data,formData) {
				    		for (let item in data) {
				    			let buf = {
				    				value: data[item].id,
				    				label: data[item].name,
				    				type: data[item].type,
				    				coefficientStructure: data[item].coefficientStructure?data[item].coefficientStructure:[],
				    				children: [],
				    			}
				    			formData.push(buf);
				    			for (let i = 0; i < formData.length; i++) {
				    				if (formData[i].value == item) {
					    				formatChildren(data[item].children,formData[i].children);
					    			}
				    			}
				    		}
				    	}
				    	let formData = [];
				    	formatChildren(res.attach,formData);
				    	this.switchBox = !this.switchBox;
		   				let child_index = index + 1;
				    	this.formRouterData[child_index] = formData;
				    	this.formatTableData(val.coefficientStructure);
	       			}
		   		})
	    	}
	    	else
	    	{	
	    		let child_index = index + 1
		    	this.formRouterData[child_index] = val.children;
		    	this.formatTableData(val.coefficientStructure);
	    	}
	    },
	 
	    //格式化表格数据
	    formatTableData(data) {
	    	function formatChildren(data,formData) {
	    		for (let item in data) {
	    			let buf = {
	    				name: data[item].name,	
	    				maxRanges: data[item].maxRanges,	
	    				custom: data[item].custom,	
	    				cfgCoefficientId: data[item].cfgCoefficientId,	
	    				type: data[item].type,	
	    				ranges: [],	
	    				children: [],
	    			}
	    			if (buf.ranges) {
	    				for (let col in data[item].ranges) {
	    					let buf_Children = {
	    						id: data[item].ranges[col].id,
	    						name: data[item].ranges[col].name,
	    						comparison: data[item].ranges[col].comparison,
	    						comparableValue: data[item].ranges[col].comparableValue,
	    					}
	    					buf.ranges.push(buf_Children);
	    				}
	    			}
	    			formData.push(buf);
	    			if (data[item].children) {//说明有二级系数表
	    				for (let i = 0; i < formData.length; i++) {
	    					if (formData[i].cfgCoefficientId == item) {
	    						formatChildren(data[item].children,formData[i].children);
	    					}
	    				}
	    			}
	    		}
	    	}	
	    	let formData = [];
	    	formatChildren(data.nodes,formData);
	    	this.tableData = formData;
	    	
	    	if (this.currentRange.id && formData[0]) {
	    		for (let i = 0; i < formData.length; i++) {
	    			if (formData[i].cfgCoefficientId == this.currentRange.id) {
	    				this.rangeData = formData[0].ranges;
				    	this.currentRange.name = formData[0].name;
				    	this.currentRange.id = formData[0].cfgCoefficientId;
				    	this.isCustom = formData[0].custom;
	    			}
	    		}
	    	}
	    	else
	    	{
	    		this.rangeData = formData[0]?formData[0].ranges:[{}];
		    	this.currentRange.name = formData[0]?formData[0].name:'';
		    	this.currentRange.id = formData[0]?formData[0].cfgCoefficientId:'';
		    	this.isCustom = formData[0]?formData[0].custom:false;
	    	}
	    },

	    selectMenu(index,path) {
	    	if (!path[1]) {		//说明点击的是一级系数
	    		for (let i = 0; i < this.tableData.length; i++) {
		    		if (this.tableData[i].cfgCoefficientId == index) {	//遍历tableData,对比id和函数返回的index判断当前要显示的系数
		    			if (this.tableData[i].custom) {//系数可编辑
		    				//post
		    				this.getEditedRangeData(index);
					   		this.currentRange.name = this.tableData[i].name;
					   		this.currentRange.id = this.tableData[i].cfgCoefficientId;
					   		this.isCustom = this.tableData[i].custom;
		    			}
		    			else
		    			{
			    			this.rangeData = this.tableData[i].ranges;
			    			this.currentRange.name = this.tableData[i].name;
					   		this.currentRange.id = this.tableData[i].cfgCoefficientId;
					   		this.isCustom = this.tableData[i].custom;
		    			}
		    		}
		    	}
	    	}
	    	else
	    	{
	    		//二级系数
	    		for (let i = 0; i < this.tableData.length; i++) {
		    		if (this.tableData[i].cfgCoefficientId == path[0]) {
		    			for (let j = 0; j < this.tableData[i].children.length; j++) {
		    				if (this.tableData[i].children[j].cfgCoefficientId == path[1]) {
	    						if (this.tableData[i].custom) {//系数可编辑
				    				//post
				    				this.getEditedRangeData(index);
	    							this.currentRange.name = this.tableData[i].children[j].name
					   				this.currentRange.id = this.tableData[i].children[j].cfgCoefficientId;
					   				this.isCustom = this.tableData[i].children[j].custom;
				    			}
				    			else
				    			{
					    			this.rangeData = this.tableData[i].children[j].ranges;
	    							this.currentRange.name = this.tableData[i].children[j].name;
					   				this.currentRange.id = this.tableData[i].children[j].cfgCoefficientId;
	    							this.isCustom = this.tableData[i].children[j].custom;
				    			}
		    				}
		    			}
		    		}
		    	}
	    	}
	    },

	    openMenu(index,path) {
	    	for (let i = 0; i < this.tableData.length; i++) {
	    		if (this.tableData[i].cfgCoefficientId == path[0]) {
	    			this.rangeData = this.tableData[i].ranges;
	    			this.currentRange.name = this.tableData[i].name;
	    			this.currentRange.id = this.tableData[i].cfgCoefficientId;
	    			this.isCustom = this.tableData[i].custom;
	    		}
	    	}
	    },

	    getEditedRangeData(index) {
	    	let payload = {
				employeeId: window.localStorage.getItem('employeeId'),
				id: index,
			}
			payload = JSON.stringify(payload);
			autoApi({
	   			action: 'poundage_coefficient_ranges',
	   			version: '1.0',
	   			payload: payload
	   		},window.localStorage.getItem('token')).then((res)=> {
	   			if (res.code == 0) {
	   				if (res.attach) {
	   					this.rangeData = res.attach;
	   				}
       			}
	   		})
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
		    if (this.isLegalNumber(this.baseCommission.shangye) && this.isLegalNumber(this.baseCommission.jiaoqiang) && this.isLegalNumber(this.selfCommission.shangye) && this.isLegalNumber(this.selfCommission.jiaoqiang)) {
		    	let payload = 
					{
					    path: '',								//页面节点路径 
		   				employeeId: this.tenantId.employeeId,                
					    insurerId: null, 						//险企ID         
					    routeBody: {
				            commercialRate: null,           	//基础 - 商业  
				            compulsoryRate: null, 				//基础 - 交强
				            commercialRetainRate: null,			//自留 - 商业
				            compulsoryRetainRate: null,			//自留 - 交强
				            commercialCommisionSpinner: {}
				        },
				        delete: false
					}
				//页面节点路径    	
				for (var i = 0; i < this.chooseds.length; i++) {
					if(this.chooseds[i] === this.choosed) {
						payload.path = payload.path + this.chooseds[i];
						break;
					}
					else
					{
						payload.path = payload.path + this.chooseds[i] + "_";
					}
				}
				
				//基础 - 商业
				payload.routeBody.commercialRate = parseInt(this.baseCommission.shangye * 10);
				//基础 - 交强
				payload.routeBody.compulsoryRate = parseInt(this.baseCommission.jiaoqiang * 10);
				//自留 - 商业
				payload.routeBody.commercialRetainRate = parseInt(this.selfCommission.shangye * 10);
				//自留 - 交强
				payload.routeBody.compulsoryRetainRate = parseInt(this.selfCommission.jiaoqiang * 10);
				//商业险系数绑定
				for (let i = 0; i < this.tableData.length; i++) {
					if (this.tableData[i].choosed) {
						payload.routeBody.commercialCommisionSpinner[this.tableData[i].choosed] = this.tableData[i].addORdec?(this.tableData[i].addORdec === 1?parseInt(this.tableData[i].rate * 10):-parseInt(this.tableData[i].rate * 10)):0;
						for (let j = 0; j < this.tableData[i].coefficients.length; j++) {
							if (this.tableData[i].coefficients[j].rate) {
								let ifHasBeenChanged = false;
								for (let id in payload.routeBody.commercialCommisionSpinner) {
									if (id == this.tableData[i].coefficients[j].id)
									{
										ifHasBeenChanged = true;
									}
								}
								if(!ifHasBeenChanged) {
									payload.routeBody.commercialCommisionSpinner[this.tableData[i].coefficients[j].id] = this.tableData[i].coefficients[j].rate
								}
							}
						}
					}
				}
				
				//险企ID
				payload.insurerId = this.insurerId;
				payload = JSON.stringify(payload);

				autoApi({
		   			action: 'bonus_poundage_config_edit',
		   			version: '1.0',
		   			payload: payload
		   		},window.localStorage.getItem('token')).then((res)=> {
		   			if (res.code == 0) {
		   				// this.getSetting();
		   				this.$message({
				            message: '修改的设置已保存',
				            type: 'success'
				        });
	       			}
		   		})
		    }
		    else
		    {
		    	this.$message({
		            message: '数值输入有误,请在-100到100的范围内输入',
		            type: 'error'
		        });
		    }
	    },

	    confirmSetDelete() {
	    	let payload = 
				{
				    path: '',       					//页面节点路径
		   			employeeId: this.tenantId.employeeId,                 
				    insurerId: null,                       //险企ID         
				    delete: true
				}
			//页面节点路径    	
			for (var i = 0; i < this.chooseds.length; i++) {
				if(this.chooseds[i] === this.choosed) {
					payload.path = payload.path + this.chooseds[i];
					break;
				}
				else
				{
					payload.path = payload.path + this.chooseds[i] + "_";
				}
			}
			//险企ID
			payload.insurerId = this.insurerId;

			payload = JSON.stringify(payload);

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
	    	this.editedRange.comparableValue = row.comparableValue;
	    	this.editedRange.comparableValueA = row.comparableValueA;
	    	this.editedRange.comparableValueB = row.comparableValueB;
	    },
	    confirmEditRange() {
	    	var payload = {
	    			id: this.editedRange.id,
		    		employeeId: window.localStorage.getItem('employeeId'),
		    		cfgCoefficientId: this.currentRange.id,
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
		   			action: 'poundage_coefficient_range_edit',
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
				    	this.getEditedRangeData(this.currentRange.id);
				    	this.$message({
				    		message: '编辑已保存',
				    		type: 'success',
				    	});
	       			}
		   		})
		   	this.dialogEditVisible = false;
	    },
	    deleteRange(row) {
	    	//post
	    	let payload = {
	    			id: row.id,
		    		employeeId: window.localStorage.getItem('employeeId'),
		    		cfgCoefficientId: this.currentRange.id,
		    	}
		   	payload = JSON.stringify(payload);
	    	autoApi({
		   			action: 'poundage_coefficient_range_edit',
		   			version: '1.0',
		   			crudType: 8,
		   			payload: payload,
		   		},window.localStorage.getItem('token')).then((res)=> {
		   			if (res.code == 0) {
				    	this.getEditedRangeData(this.currentRange.id);
				    	this.$message({
				    		message: '删除成功',
				    		type: 'success',
				    	});
	       			}
		   		})
	    },
	    confirmEditRatio() {
	    	// this.editedRatio.id = null;
	    	// this.editedRatio.rate = null;
	    	// this.getSetting();
	    },
	    confirmAddRange() {
	    	//post add
	    	var payload = {
		    		employeeId: window.localStorage.getItem('employeeId'),
		    		cfgCoefficientId: this.currentRange.id,
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
		   			action: 'poundage_coefficient_range_edit',
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
		   				this.getEditedRangeData(this.currentRange.id);
	       			}
		   		})
		   	this.dialogAddVisible = false;
	    },
	    //判断系数数量是否达到了最大值
	    isFull(row) {
	    	if (row.coefficients && row.maxCustomNum) {//最大值为0表示无上限
	    		if (row.maxCustomNum <= row.coefficients.length) {
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
	    reCoefficientType(val) {
	    	switch(val)
	    	{
				case 1:
					return "CLAIMS"
					break;
				case 2:
					return "NO_CLAIMS"
					break;
				case 3:
					return "GENDER"
					break;
				case 4:
					return "ZXB"
					break;
				case 5:
					return "SEAT_COUNT"
					break;
				case 6:
					return "LICENSE"
					break;
				case 7:
					return "VEHICLE_AGE"
					break;
				case 8:
					return "PURCHASE_PRICE"
					break;
				case 9:
					return "AGE"
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
.autoInsuranceManage{
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
	.el-menu-vertical-demo:not(.el-menu--collapse) {
	    width: 200px;
	    min-height: 400px;
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

	.toolBoxR {
		margin-bottom: 20px;
		position: relative;
		float: right;
	}

}
</style>