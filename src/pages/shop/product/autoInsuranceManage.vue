<template>
	<div class="autoInsuranceManage">
		<el-breadcrumb separator="/">
		  	<el-breadcrumb-item>车险管理</el-breadcrumb-item>
		</el-breadcrumb>

		<span class="labelText" v-if="!editing">请选择保险公司</span>
		<div class="topBar">
			<el-select v-model="insurerId" placeholder="请选择" v-if="!editing" @change="insurerChange">
			    <el-option v-for="item in insurers" :label="item.label" :value="item.value"></el-option>
			</el-select>
			<el-button type="primary" @click="" style="margin-left:20px; float:right" :disabled="true">是否关联佣金调整系数</el-button>
		</div>

		<span class="labelText" v-if="!editing">请选择车型</span>
		<div class="dataBox" v-if="!editing">
			<div class="dataBoxCol" key="box1">
				<ul>
					<li v-for="i in formData1" @click="enterToSecond(i)" :class="chooseds[0] === i.value?'choosedList':''">{{i.label}}</li>
				</ul>
			</div>
			<div class="dataBoxCol" v-if="(formData2[0])" key="box2">
				<ul>
					<li v-for="i in formData2" @click="enterToThird(i)" :class="chooseds[1] === i.value?'choosedList':''">{{i.label}}</li>
				</ul>
			</div>
			<div class="dataBoxCol" v-if="(formData3[0])" key="box3">
				<ul>
					<li v-for="i in formData3" @click="enterTofourth(i)" :class="chooseds[2] === i.value?'choosedList':''">{{i.label}}</li>
				</ul>
			</div>
			<div class="dataBoxCol" v-if="(formData4[0])" key="box4">
				<ul>
					<li v-for="i in formData4" @click="enterTofifth(i)" :class="chooseds[3] === i.value?'choosedList':''">{{i.label}}</li>
				</ul>
			</div>
			<div class="dataBoxCol" v-if="(formData5[0])" key="box5">
				<ul>
					<li v-for="i in formData5" @click="enterToSixth(i)" :class="choosed === i.value?'choosedList':''">{{i.label}}</li>
				</ul>
			</div>
			<!-- <div class="dataBoxCol" v-for="formData,index in formRouterData">
				<ul>
					<li v-for="i in formData" @click="enterToNext(i,index)" :class="chooseds[index] === i.value?'choosedList':''">{{i.label}}</li>
				</ul>
			</div> -->
		</div>

		<!-- <el-row class="commonSet" v-if="!editing">
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
		</el-row> -->

		<span style="font-size: 20px; margin-top:20px; display: inline-block" v-if="!editing">佣金调整系数</span>

		<el-menu class="el-menu-demo" mode="horizontal" @select="selectMenu" @open="openMenu" menu-trigger="click">
		  <el-menu-item :index="item.cfgCoefficientId.toString()" v-for="item in tableData" v-if="!item.children[0]">{{item.name}}</el-menu-item>
		  <el-submenu :index="item.cfgCoefficientId.toString()" v-for="item in tableData" v-if="item.children[0]">
		    <template slot="title">{{item.name}}</template>
		    <el-menu-item :index="child.cfgCoefficientId.toString()" v-for="child in item.children">{{child.name}}</el-menu-item>
		  </el-submenu>
		</el-menu>

		<span>当前系数：{{currentRange}}</span>


		<!-- <div v-show="tableData[0]">
			<el-radio-group v-model="isCollapse" style="margin-bottom: 20px;">
			  <el-radio-button :label="false">展开</el-radio-button>
			  <el-radio-button :label="true">收起</el-radio-button>
			</el-radio-group>
			<el-menu mode="horizontal" :collapse="isCollapse" class="el-menu-vertical-demo" menu-trigger="click" :unique-opened="true" theme="dark" @select="selectMenu" @open="openMenu">
		      <el-submenu :index="item.cfgCoefficientId.toString()" v-for="item in tableData">
		        <template slot="title">
		          <i class="el-icon-setting"></i>
		          <span slot="title">{{item.name}}</span>
		        </template>
		        <template v-if="!item.children[0]">
		        	<el-menu-item-group>
			          <span slot="title">{{item.name}}</span>
			          <el-menu-item :index="range.id.toString()" v-for="range in item.ranges">{{range.name}}</el-menu-item>
			        </el-menu-item-group>
		        </template>
		        <template v-else>
		        	<el-menu-item-group>
		        		<span slot="title">{{item.name}}</span>
		        		<el-submenu :index="child.cfgCoefficientId.toString()" v-for="child in item.children" style="width: 200px">
					        <span slot="title">{{child.name}}</span>
				        	<el-menu-item-group>
				        		<span slot="title">{{child.name}}</span>
				        		<el-menu-item :index="range.id.toString()" v-for="range in child.ranges">{{range.name}}</el-menu-item>
				        	</el-menu-item-group>
				        </el-submenu>
		        	</el-menu-item-group>
		        </template>
		      </el-submenu>
		    </el-menu>
		</div> -->

		<div class="confirmBoxR" v-if="isCustom">
			<el-button type="danger" size="large" @click="dialogAddVisible">新增</el-button>
		</div>

		<div class="tableBox">
			<el-table :data="rangeData" border style="width: 100%;font-size:12px;">
			    <!-- <el-table-column prop="id" label="序号"></el-table-column> -->
			    <el-table-column prop="name" label="系数名称"></el-table-column>
			    <el-table-column label="佣金比例">
			    	<template scope="scope">
			    		<span v-if="!(editedRange.id == scope.row.id)">{{scope.row.rate}}</span>
			    		<el-input v-if="editedRange.id && (editedRange.id == scope.row.id)"></el-input>
			    	</template>
			    </el-table-column>
			    <el-table-column label="操作">
			    	<template scope="scope">
			    		<el-button @click="editRange(scope.row)" v-if="!editedRange.id">编辑</el-button>
			    		<el-button @click="confirmEditRange(scope.row)" v-if="editedRange.id && (editedRange.id == scope.row.id)">确认</el-button>
			    	</template>
			    </el-table-column>
			    <!-- <el-table-column label="比较器类型">
			    	<template scope="scope">
			    		<span>{{reComparisonName(scope.row.comparison)}}</span>
			    	</template>
			    </el-table-column>
			    <el-table-column label="比较器数值">
			    	<template scope="scope">
			    		<span>{{comparisonValueShow(scope.row)}}</span>
			    	</template>
			    </el-table-column> -->
			</el-table>
		</div>
		<!-- <el-row class="tableBox" v-if="!editing">
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
		</el-row> -->

		<!-- <el-row class="tableBox" v-if="tenantId.employeeId && editing">
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
		</el-row> -->

		<!-- <div class="confirmBoxL" v-if="tenantId.employeeId">
			<el-button type="primary" size="large" @click="editMode" v-if="!editing">编辑系数</el-button>
			<el-button size="large" @click="endEditMode" v-if="editing">完成编辑</el-button>
		</div> -->

		<div class="confirmBoxR" v-if="insurerId && choosed">
			<el-button type="danger" size="large" @click="confirmSetDelete">删除</el-button>
			<el-button type="primary" size="large" @click="confirmSetSave">保存</el-button>
		</div>

		<el-dialog title="编辑" :visible.sync="dialogAddVisible" size="small" :before-close="handleEditClose">
			<el-row>
				<el-col :span="8">
	  				<el-select v-model="guimoEdit.comparison" placeholder="请选择">
						<el-option v-for="item in comparisons" :label="item.label" :value="item.value"></el-option>
					</el-select>
	  			</el-col>
	  			<el-col :span="9">
	  				<el-row>
	  					<el-col :span="6">
	  						<span style="line-height: 30px;">区间数值: </span>
	  					</el-col>
	  					<el-col :span="16">
	  						<el-input v-model="guimoEdit.comparableValue" style="width: 100%" class="inputPercent" v-if="guimoEdit.comparison == 2"></el-input>
			  				<el-row v-if="guimoEdit.comparison == 8">
			  					<el-col :span="10">
			  						<el-input v-model="guimoEdit.comparableValueA" style="width: 100%"></el-input>
			  					</el-col>
			  					<el-col :span="4" style="display: flex; justify-content:center;">
			  						<span style="line-height: 36px;">--</span>
			  					</el-col>
			  					<el-col :span="10">
			  						<el-input v-model="guimoEdit.comparableValueB" style="width: 100%"></el-input>
			  					</el-col>
			  				</el-row>
	  					</el-col>
	  				</el-row>
	  			</el-col>
	  			<el-col :span="7">
	  				<span class="dataFont">系数名称: </span>
	  				<el-input v-model="guimoEdit.num" style="width: 120px;"></el-input> 
	  				<span class="dataFont">%</span>
	  			</el-col>
			</el-row>
		    <div slot="footer" class="dialog-footer">
		        <el-button @click="handleEditClose">取 消</el-button>
		        <el-button type="primary" @click="guimoConfirmEdit">确 定</el-button>
		    </div>
		</el-dialog>

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
	      formRouterData: [],
	      formData1: [],		//1-4级路由数据
	      formData2: [],
	      formData3: [],
	      formData4: [],
	      formData5: [],
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
	      currentRange: null,	//当前选中系数的名称
	      isCustom: false,	//当前选中系数是否可编辑
	      tenantId: {},		//当前选择代理商ID	
	      // tenants: [],			//代理商列表数据
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
	      editedRange: {
	      	id: null,
	      	rate: null,
	      },
	      addedRange: {
	      	id: null,
	      	rate: null,
	      },
	      dialogAddVisible: false,
	      isAdded: null,	//被添加的系数
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
	      	// {
	      	// 	value: 6,
	      	// 	label: "不等于"
	      	// },
	      	{
	      		value: 'bteween',
	      		label: "开区间 ( )"
	      	},
	      	{
	      		value: 'lbteween',
	      		label: "前闭后开区间 [ )"
	      	},
	      	{
	      		value: 'rbteween',
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
	  		// this.getRouteList();			//获取路由节点列表  need:employeeId  get:route
	  		// this.getEditSetting();			//获取全局系数设置表
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
	    	this.formData1 = formData;
	    	console.log(formData);
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

	    //获取路由列表数据
	    // getRouteList() {
	    // 	if(this.tenantId.employeeId) {
	    // 		let payload = {
	    // 			employeeId: this.tenantId.employeeId
	    // 		}
	    // 		payload = JSON.stringify(payload);
	    // 		autoApi({
		   // 			action: 'bonus_poundage_configs',
		   // 			version: '1.0',
		   // 			payload: payload
		   // 		},window.localStorage.getItem('token')).then((res)=> {
		   // 			if (res.code == 0) {
		   // 				this.originData = res.attach;
		   // 				this.formRouterData[0] = [];
		   // 				for(let one in res.attach.children) {
		   // 					let databuf = {
		   // 						value: null,
		   // 						label: null,
		   // 						data: null
		   // 					}
		   // 					databuf.value = res.attach.children[one].id;
		   // 					databuf.label = res.attach.children[one].title;
		   // 					databuf.data = res.attach.children[one];
		   // 					this.formData1.push(databuf);
		   // 					this.formRouterData[0].push(databuf);
		   // 				}
	    //    			}
		   // 		})
	    // 	}
	    // },

	    enterToNext(val,i) {
	    	this.choosed = val.value;
	    	this.chooseds[i] = val.value;
	    },
	    //一级路由点击事件处理
	    enterToSecond(val) {
	    	this.formData2 = [];
	    	this.formData3 = [];
	    	this.formData4 = [];
	    	this.formData5 = [];
	    	this.choosed = val.value;
	    	this.chooseds[0] = val.value;
	    	this.chooseds[1] = null;
	    	this.chooseds[2] = null;
	    	this.chooseds[3] = null;
	    	this.chooseds[4] = null;
			this.formData2 = val.children;
			this.formatTableData(val.coefficientStructure);//格式化表格数据
	    },
	    //二级路由点击事件处理
	    enterToThird(val) {
			this.formData3 = [];
	    	this.formData4 = [];
	    	this.formData5 = [];
    		this.choosed = val.value;
	    	this.chooseds[1] = val.value;
	    	this.chooseds[2] = null;
	    	this.chooseds[3] = null;
	    	this.chooseds[4] = null;
	    	if (this.chooseds[1] == 'brand') {
	    		let payload = {
	    			employeeId: this.tenantId.employeeId
	    		}
	    		payload = JSON.stringify(payload);
	    		autoApi({
		   			action: 'vehicle_brands',
		   			version: '1.0',
		   			payload: payload
		   		},window.localStorage.getItem('token')).then((res)=> {
		   			if (res.code == 0) {
		   				if (res.attach && res.attach.length > 0) {
		   					for (var i = 0; i < res.attach.length; i++) {
		   						let databuf = {
									value: null,
									label: null
								}
								databuf.value = res.attach[i].id;
								databuf.label = res.attach[i].name;
								this.formData3.push(databuf);
		   					}
		   				}
	       			}
		   		})
	    	}
	    	else
	    	{
		    	this.formData3 = val.children;
	    	}

			this.formatTableData(val.coefficientStructure);//格式化表格数据
			// this.getSetting();				//获取表格设置列表	need:employeeId/insurerId/route
	    },
	    //三级路由点击事件处理
	    enterTofourth(val) {
			this.formData4 = [];
	    	this.formData5 = [];
	    	this.choosed = val.value;
	    	this.chooseds[2] = val.value;
	    	this.chooseds[3] = null;
	    	this.chooseds[4] = null;
	    	if (this.chooseds[1] == 'brand') {
	    		let payload = {
	    			employeeId: this.tenantId.employeeId,
	    			brandId: val.value
	    		}
	    		autoApi({
		   			action: 'vehicle_depts',
		   			version: '1.0',
		   			payload: payload
		   		},window.localStorage.getItem('token')).then((res)=> {
		   			if (res.code == 0) {
		   				if (res.attach && res.attach.length > 0) {
		   					for (var i = 0; i < res.attach.length; i++) {
		   						let databuf = {
									value: null,
									label: null
								}
								databuf.value = res.attach[i].id;
								databuf.label = res.attach[i].name;
								this.formData4.push(databuf);
		   					}
		   				}
	       			}
		   		})
	    	}
	    	else
	    	{
		    	this.formData4 = val.children;
	    	}

			this.formatTableData(val.coefficientStructure);//格式化表格数据
			// this.getSetting();				//获取表格设置列表	need:employeeId/insurerId/route
	    },
	    //四级路由点击事件处理
	    enterTofifth(val) {
	    	this.formData5 = [];
	    	this.choosed = val.value;
	    	this.chooseds[3] = val.value;
	    	this.chooseds[4] = null;
	    	if (this.chooseds[1] == 'brand') {
	    		let payload = {
	    			employeeId: this.tenantId.employeeId,
	    			deptId: val.value,
	    		}
	    		autoApi({
		   			action: 'vehicle_models',
		   			version: '1.0',
		   			payload: payload
		   		},window.localStorage.getItem('token')).then((res)=> {
		   			if (res.code == 0) {
		   				if (res.attach && res.attach.length > 0) {
		   					for (var i = 0; i < res.attach.length; i++) {
		   						let databuf = {
									value: null,
									label: null
								}
								databuf.value = res.attach[i].id;
								databuf.label = res.attach[i].name;
								this.formData5.push(databuf);
		   					}
		   				}
	       			}
		   		})
	    	}
	    	else
	    	{
		    	this.formData5 = val.children;
	    	}

			this.formatTableData(val.coefficientStructure);//格式化表格数据
	    	// this.getSetting();				//获取表格设置列表	need:employeeId/insurerId/route
	    },
	    //五级路由点击事件处理
	    enterToSixth(val) {
	    	this.choosed = val.value;
	    	this.chooseds[4] = val.value;
			this.formatTableData(val.coefficientStructure);//格式化表格数据
	    },

	    //格式化表格数据
	    formatTableData(data) {
	    	console.log(data);
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
	    	
	    	this.rangeData = formData[0]?formData[0].ranges:[{}];
	    	this.currentRange = formData[0]?formData[0].name:'';
	    	this.isCustom = formData[0]?formData[0].custom:false;
	    	console.log(formData);
	    },

	    selectMenu(index,path) {
	    	console.log('index:' + index);
	    	console.log('path:' + path);
	    	if (!path[1]) {		//说明点击的是一级系数
	    		for (let i = 0; i < this.tableData.length; i++) {
		    		if (this.tableData[i].cfgCoefficientId == index) {
		    			if (this.tableData[i].custom) {//系数可编辑
		    				//post
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
					   		this.currentRange = this.tableData[i].name;
					   		this.isCustom = this.tableData[i].custom;
		    			}
		    			else
		    			{
			    			this.rangeData = this.tableData[i].ranges;
			    			this.currentRange = this.tableData[i].name;
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
	    							this.currentRange = this.tableData[i].children[j].name
					   				this.isCustom = this.tableData[i].children[j].custom;
				    			}
				    			else
				    			{
					    			this.rangeData = this.tableData[i].children[j].ranges;
	    							this.currentRange = this.tableData[i].children[j].name;
	    							this.isCustom = this.tableData[i].children[j].custom;
				    			}
		    				}
		    			}
		    		}
		    	}
	    	}
	    },

	    openMenu(index,path) {
	    	console.log('OPENindex:' + index);
	    	console.log('OPENpath:' + path);
	    	for (let i = 0; i < this.tableData.length; i++) {
	    		if (this.tableData[i].cfgCoefficientId == path[0]) {
	    			this.rangeData = this.tableData[i].ranges;
	    			this.currentRange = this.tableData[i].name;
	    			this.isCustom = this.tableData[i].name;
	    		}
	    	}
	    },
	    //获取节点配置
	   //  getSetting() {
	   //  	if (this.choosed && this.insurerId) {
		  //   	let payload = {
		  //   		 path: '',                        	// 路由节点id链接字符串
		  //   		 employeeId: this.tenantId.employeeId,
	   // 				 insurerId: null,   
	   // 				 all: 'false'       
		  //   	};
		    	
		  //   	payload.insurerId = this.insurerId;			//险企ID
				// //页面节点路径    	
				// for (var i = 0; i < this.chooseds.length; i++) {
				// 	if(this.chooseds[i] === this.choosed) {
				// 		payload.path = payload.path + this.chooseds[i];
				// 		break;
				// 	}
				// 	else
				// 	{
				// 		payload.path = payload.path + this.chooseds[i] + "_";
				// 	}
				// }

				// payload = JSON.stringify(payload);
		  //   	autoApi({
		  //  			action: 'poundage_coefficients',
		  //  			version: '1.0',
		  //  			payload: payload
		  //  		},window.localStorage.getItem('token')).then((res)=> {
		  //  			if (res.code == 0) {
			 //            this.baseCommission.shangye = res.attach.commercialRate / 10;           	//基础 - 商业  
			 //            this.baseCommission.jiaoqiang = res.attach.compulsoryRate / 10;            //基础 - 交强
			 //            this.selfCommission.shangye = res.attach.commercialRetainRate / 10;       //自留 - 商业
			 //            this.selfCommission.jiaoqiang = res.attach.compulsoryRetainRate / 10;       //自留 - 交强
		   				
		  //  				if (res.attach.coefficientTypes) {
		  //  					for (var i = 0; i < res.attach.coefficientTypes.length; i++) {
			 //   					res.attach.coefficientTypes[i]['choosed'] = null;			//当前选择的系数id
			 //   					res.attach.coefficientTypes[i]['comparisonValue'] = null;
			 //   					res.attach.coefficientTypes[i]['comparisonType'] = null;
			 //   					res.attach.coefficientTypes[i]['addORdec'] = null;
			 //   					res.attach.coefficientTypes[i]['rate'] = null;
			 //   				}

		  //  					for (var j = 0; j < res.attach.coefficientTypes.length; j++) {
			 //   					if (res.attach.coefficientTypes[j].coefficients) {
			 //   						for (var i = 0; i < res.attach.coefficientTypes[j].coefficients.length; i++) {
				//    						if (res.attach.coefficientTypes[j].coefficients[i].rate) {
				//    							res.attach.coefficientTypes[j].choosed = res.attach.coefficientTypes[j].coefficients[i].id;
				//    							res.attach.coefficientTypes[j].rate = Math.abs(res.attach.coefficientTypes[j].coefficients[i].rate / 10);
				//    							res.attach.coefficientTypes[j].addORdec = res.attach.coefficientTypes[j].coefficients[i].rate?(res.attach.coefficientTypes[j].coefficients[i].rate > 0?1:2):0;
				//    						}
				//    					}
			 //   					}

			 //   					if (res.attach.coefficientTypes.typeId == 3) {
			 //   						for (var i = 0; i < res.attach.coefficientTypes[j].coefficients.length; i++) {
				//    						if (res.attach.coefficientTypes[j].coefficients.name == '0') {
				//    							res.attach.coefficientTypes[j].coefficients.name = '男';
				//    						}
				//    						if (res.attach.coefficientTypes[j].coefficients.name == '1') {
				//    							res.attach.coefficientTypes[j].coefficients.name = '女';
				//    						}
				//    					}
			 //   					}

			 //   					if (res.attach.coefficientTypes.typeId == 4) {
			 //   						for (var i = 0; i < res.attach.coefficientTypes[j].coefficients.length; i++) {
				//    						if (res.attach.coefficientTypes[j].coefficients.name == '1') {
				//    							res.attach.coefficientTypes[j].coefficients.name = '新车';
				//    						}
				//    						if (res.attach.coefficientTypes[j].coefficients.name == '2') {
				//    							res.attach.coefficientTypes[j].coefficients.name = '转保';
				//    						}
				//    						if (res.attach.coefficientTypes[j].coefficients.name == '4') {
				//    							res.attach.coefficientTypes[j].coefficients.name = '侯保';
				//    						}
				//    					}
			 //   					}
		  //  					this.tableData = res.attach.coefficientTypes;			   				}
		  //  				}
		  //  				else
		  //  				{
		  //  					this.tableData = [];
		  //  				}

	   //     			}
		  //  		})
	   //  	}
	   //  },

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

	    //获取节点编辑配置
	    // getEditSetting() {
	    // 	let payload = {
	    // 		employeeId: this.tenantId.employeeId,
	    // 		all: 'true',

	    // 	}
	    // 	payload = JSON.stringify(payload);
	    // 	autoApi({
	   	// 		action: 'poundage_coefficients',
	   	// 		version: '1.0',
	   	// 		payload: payload
	   	// 	},window.localStorage.getItem('token')).then((res)=> {
	   	// 		if (res.code == 0) {
	   	// 			if (res.attach) {
	   	// 				for (var i = 0; i < res.attach.length; i++) {
		   // 					res.attach[i]['choosed'] = null;			//当前选择的系数id
			  //  				res.attach[i]['name'] = null;			//需要编辑/添加的系数名称
		   // 					res.attach[i]['comparisonValue'] = null;
		   // 					res.attach[i]['comparisonType'] = null;
		   // 					res.attach[i]['addORdec'] = null;
		   // 					res.attach[i]['rate'] = null;
		   // 				}
	   	// 			}

	   	// 			if (res.attach) {
	   	// 				for (var j = 0; j < res.attach.length; j++) {
		   // 					if (res.attach[j].coefficients) {
		   // 						for (var i = 0; i < res.attach[j].coefficients.length; i++) {
			  //  						if (res.attach[j].coefficients[i].rate) {
			  //  							res.attach[j].choosed = res.attach[j].coefficients[i].id;
			  //  							res.attach[j].rate = Math.abs(res.attach[j].coefficients[i].rate / 10);
			  //  							res.attach[j].addORdec = res.attach[j].coefficients[i].rate?(res.attach[j].coefficients[i].rate > 0?1:2):0;
			  //  						}
			  //  					}
		   // 					}
		
		   // 					if (res.attach.typeId == 3) {
		   // 						for (var i = 0; i < res.attach[j].coefficients.length; i++) {
			  //  						if (res.attach[j].coefficients.name == '0') {
			  //  							res.attach[j].coefficients.name = '男';
			  //  						}
			  //  						if (res.attach[j].coefficients.name == '1') {
			  //  							res.attach[j].coefficients.name = '女';
			  //  						}
			  //  					}
		   // 					}
		   // 				}
	   	// 			}

	   	// 			this.editData = res.attach;
     //   			}
	   	// 	})
	    // },
	    editMode() {
	    	this.editing = true;
	    },
	    endEditMode() {
	    	this.editing = false;
	    	// this.getSetting();
	    },
	    editRange(row) {
	    	this.editedRange.id = row.id;
	    	this.editedRange.rate = row.rate;
	    },
	    confirmEditRange() {
	    	this.editedRange.id = null;
	    	this.editedRange.rate = null;
	    	// this.getSetting();
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
		    	let coefficientType = this.reCoefficientType(row.typeId);
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
		    		let payload = {
			   			employeeId: employeeId,
			   			coefficientType: coefficientType,
			   			id: id,
			   			symbol: comparison,
			   			val: array,
			   			name: name,
		    		}
		    		payload = JSON.stringify(payload);
		    		autoApi({
			   			action: 'poundage_coefficient_edit',
			   			version: '1.0',
			   			crudType: 4,	//4:修改
			   			payload: payload
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
	         	let payload = {
	         		employeeId: this.tenantId.employeeId,
			    	coefficientType: this.reCoefficientType(row.typeId),
			    	id: row.choosed,
	         	}
	         	payload = JSON.stringify(payload);
	    		autoApi({
		   			action: 'poundage_coefficient_edit',
		   			version: '1.0',
		   			crudType: 8,	//4:修改
		   			payload: payload
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
	    	let coefficientType = this.reCoefficientType(this.isAdded);
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
	    		let payload = {
	    			employeeId: employeeId,
		   			coefficientType: coefficientType,
		   			symbol: comparison,
		   			val: array,
		   			name: name,
	    		}
	    		payload = JSON.stringify(payload);
	    		autoApi({
		   			action: 'poundage_coefficient_edit',
		   			version: '1.0',
		   			crudType: 1,	//1:添加
		   			payload: payload
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
				case 4:
					return "小于"
					break;
				case 8:
					return "小于等于"
					break;
				case 16:
					return "等于"
					break;
				// case 6:
				// 	return "不等于"
				// 	break;
				case 32:
					return "开区间"
					break;
				case 64:
					return "前闭后开区间"
					break;
				case 128:
					return "前开后闭区间"
					break;
				// case 10:
				// 	return "在 ... 之中"
				// 	break;
				// case 11:
				// 	return "不在 ... 之中"
				// 	break;
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
				// case 6:
				// 	return "不等于"
				// 	break;
				case 'bteween':
					return "开区间"
					break;
				case 'lbteween':
					return "前闭后开区间"
					break;
				case 'rbteween':
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
				// case 10:
				// 	return "在 ... 之中"
				// 	break;
				// case 11:
				// 	return "不在 ... 之中"
				// 	break;
				default:
					return val
					break;
	    	}
	    	
	    },
	    comparisonValueShow(row) {
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
		width: 1200px;
		overflow-x: hidden;
		.dataBoxCol {
			float: left;
			width: 18%;
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

}
</style>