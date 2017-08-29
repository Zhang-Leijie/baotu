<template>
	<div>
		<el-breadcrumb separator="/">
		  	<el-breadcrumb-item>模块权限设置</el-breadcrumb-item>
		</el-breadcrumb>

		<el-tabs v-model="modularType" @tab-click="getModulars">
		    <el-tab-pane label="保途模块" name="BT">
		    	<el-tree
				  :data="dataBT"
				  show-checkbox
				  default-expand-all
				  node-key="id"
				  ref="tree"
				  highlight-current
				  :props="defaultProps"
				  :expand-on-click-node="false"
				  :check-strictly="true"
				  :default-checked-keys="choosed"
				  @check-change="handleCheckChange">
				</el-tree>
		    </el-tab-pane>
		    <el-tab-pane label="平台模块" name="APP">
		    	<el-tree
				  :data="dataAPP"
				  show-checkbox
				  default-expand-all
				  node-key="id"
				  ref="tree"
				  highlight-current
				  :props="defaultProps"
				  :expand-on-click-node="false"
				  :check-strictly="true"
				  :default-checked-keys="choosed"
				  @check-change="handleCheckChange">
				</el-tree>
		    </el-tab-pane>
		    <el-tab-pane label="商户模块" name="TENANT">
		    	<el-tree
				  :data="dataTENANT"
				  show-checkbox
				  default-expand-all
				  node-key="id"
				  ref="tree"
				  highlight-current
				  :props="defaultProps"
				  :expand-on-click-node="false"
				  :check-strictly="true"
				  :default-checked-keys="choosed"
				  @check-change="handleCheckChange">
				</el-tree>
		    </el-tab-pane>
		</el-tabs>

		<div class="toolBar">
			<el-button @click="dialogAddVisible = true" type="primary" :disabled="(dataBT[0] && !choosed[0])" v-show="modularType == 'BT'">新增模块</el-button>
			<el-button @click="dialogAddVisible = true" type="primary" :disabled="(dataAPP[0] && !choosed[0])" v-show="modularType == 'APP'">新增模块</el-button>
			<el-button @click="dialogAddVisible = true" type="primary" :disabled="(dataTENANT[0] && !choosed[0])" v-show="modularType == 'TENANT'">新增模块</el-button>
			<el-button @click="editThisModular" type="primary" :disabled="!choosed[0]">编辑模块</el-button>
			<el-button @click="deleteModular" type="primary" :disabled="!choosed[0] || this.apiData[0]">删除模块</el-button>
		</div>

		<el-dialog title="新增模块" :visible.sync="dialogAddVisible" :before-close="handleAddClose">
			<span>当前新增:{{reModularType(modularType)}}</span>
			<el-input v-model="addModular.name"></el-input>
		    <div slot="footer" class="dialog-footer">
		        <el-button @click="handleAddClose">取 消</el-button>
		        <el-button type="primary" @click="confirmAdd">确 定</el-button>
		    </div>
		</el-dialog>

		<el-dialog title="编辑模块" :visible.sync="dialogEditVisible" size="small" :before-close="handleEditClose">
			<span>当前编辑:{{reModularType(modularType)}}</span>
			<el-input v-model="editModular.name"></el-input>
		    <div slot="footer" class="dialog-footer">
		        <el-button @click="handleEditClose">取 消</el-button>
		        <el-button type="primary" @click="confirmEdit">确 定</el-button>
		    </div>
		</el-dialog>

		<el-table :data="apiData" border class="tableBox">
    		<el-table-column prop="pkg" label="类全名"></el-table-column>
    		<el-table-column prop="name" label="接口名"></el-table-column>
    		<el-table-column label="操作">
    			<template scope="scope">
    				<el-button type="text" size="small" @click="editAPI(scope.row)">编辑</el-button>
    				<el-button type="text" size="small" @click="deleteAPI(scope.row)">删除</el-button>
			    </template>
    		</el-table-column>
    	</el-table>

    	<div class="toolBar">
    		<el-button type="primary" @click
    		="dialogAPIAddVisible = true" :disabled="!this.choosed[0]">添加接口</el-button>
    	</div>

    	<el-dialog title="添加接口" :visible.sync="dialogAPIAddVisible" size="small" :before-close="handleAPIAddClose">
			<span>类全名: </span>
			<el-input v-model="apiUpdate.addPkg"></el-input>
			<span>接口名: </span>
			<el-input v-model="apiUpdate.addName"></el-input>
		    <div slot="footer" class="dialog-footer">
		        <el-button @click="handleAPIAddClose">取 消</el-button>
		        <el-button type="primary" @click="addAPI">确 定</el-button>
		    </div>
		</el-dialog>

		<el-dialog title="编辑接口" :visible.sync="dialogAPIEditVisible" size="small" :before-close="handleAPIEditClose">
			<span>接口名: </span>
			<el-input v-model="editedAPI.name"></el-input>
		    <div slot="footer" class="dialog-footer">
		        <el-button @click="handleAPIEditClose">取 消</el-button>
		        <el-button type="primary" @click="confirmEditAPI">确 定</el-button>
		    </div>
		</el-dialog>

	</div>
</template>
<script>
import { masterApi } from '@/ajax/post.js'

	export default {
	    data() {
	      return {
	        modularType: 'BT',
	        dialogAddVisible: false,
	        addModular: {			//新增模块
	        	name: null,
	        },
	        dialogEditVisible: false,
	        editModular: {			//编辑模块
	        	name: null,
	        },
	        modulars: [{
	        	value: 'BT',
	        	label: '保途模块',
	        },
	        {
	        	value: 'APP',
	        	label: '平台模块',
	        },
	        {
	        	value: 'TENANT',
	        	label: '商户模块',
	        }],
	        dataBT: [],
	        dataAPP: [],
	        dataTENANT: [],
	        choosed: [],
	        // defaultChoosed: [],
	        defaultProps: {
	          children: 'children',
	          label: 'label'
	        },
	        //接口部分数据
	        apiData: [],
	        apiUpdate: {
	        	addPkg: null,
	        	addName: null,
	        },
	        editedAPI: {
	        	id: null,
	        	pkg: null,
	        	name: null,
	        },
	        dialogAPIAddVisible: false,
	        dialogAPIEditVisible: false,
	      };
	    },
	    watch: {
	    	modularType(new1,old) {
				this.choosed[0] = null;
				this.apiData = [];
	    	}
	    },
	    methods: {
	       formatDate(time){
			  var   x = (time - 0) * 1000
			  console.log(x)
			  var   now = new Date(x) 
			  var   year = now.getFullYear();     
			  var   month = "0" + (now.getMonth()+1);     
			  var   date = "0" +(now.getDate());   
			  var   hour = "0" +now.getHours();
			  var   min =  "0" +now.getMinutes();
			  return   year+"-"+month.substr(-2)+"-"+date.substr(-2)+'   '+ hour.substr(-2) +':'+min.substr(-2)
			},

			getModulars() {
				if (this.modularType == "BT") {
					masterApi({
						action: 'modulars_bt',
						version: '1.0',
					},window.localStorage.getItem('tokenPlate')).then((res)=> {
					// let res = {
					// 	"code": 0,
					// 	"attach": {
					// 		"13": {
					// 			"node": {
					// 				"name": "平台",
					// 				"type": 2,
					// 				"created": 1503126180,
					// 				"updated": 1503126180,
					// 				"left": 0,
					// 				"right": 1,
					// 				"id": 13,
					// 				"layer": 1
					// 			},
					// 			"children": {
					// 				"15": {
					// 					"node": {
					// 						"name": "账号管理A",
					// 						"type": 2,
					// 						"created": 1503128041,
					// 						"updated": 1503128041,
					// 						"left": 1,
					// 						"right": 2,
					// 						"id": 15,
					// 						"layer": 2,
					// 						"parentId": 13
					// 					}
					// 				},
					// 				"16": {
					// 					"node": {
					// 						"name": "账号管理B",
					// 						"type": 2,
					// 						"created": 1503128041,
					// 						"updated": 1503128041,
					// 						"left": 1,
					// 						"right": 2,
					// 						"id": 16,
					// 						"layer": 2,
					// 						"parentId": 13
					// 					}
					// 				}
					// 			},
					// 		}
					// 	},
					// 	"createTime": 1503129000515,
					// 	"messageType": 2
					// }
						this.drawTree(res.attach);
					})
				}
				else if (this.modularType == "APP") {
					masterApi({
						action: 'modulars_app',
						version: '1.0',
					},window.localStorage.getItem('tokenPlate')).then((res)=> {
						this.drawTree(res.attach);
					})
				}
				else if (this.modularType == "TENANT") {
					masterApi({
						action: 'modulars_tenant',
						version: '1.0',
					},window.localStorage.getItem('tokenPlate')).then((res)=> {
						this.drawTree(res.attach);
					})
				}
			},

			drawTree(nodeData) {
				function deep(data,formData) {//递归处理数据,将对象转化成对象数组并精简数据
					for (let children in data) {
						let buf = {
							id: data[children].node.id,
							label: data[children].node.name,
							children: []
						}
						formData.push(buf);
						for (let i = 0; i < formData.length; i++) {
							if (formData[i].id == children) {//判断子节点的归属
								deep(data[children].children,formData[i].children);
							}
						}
					}
				}

				let formData = [];
				deep(nodeData,formData);
				if (this.modularType == "BT") {
					this.dataBT = formData;
				}
				else if(this.modularType == "APP") {
					this.dataAPP = formData;
				}
				else if(this.modularType == "TENANT") {
					this.dataTENANT = formData;
				}
				console.log(formData);
			},

			handleCheckChange(data, checked, indeterminate) {//element的树形控件current-node-key属性无效,也没有单选设置,故用此方法实现单选控制
				// this.dataBT = [];
				// this.getModulars();
				if (checked) {
					this.choosed[0] = data.id;
					this.getModulars();
					this.getAPIs();
				}
				else if(data.id == this.choosed[0])
				{
					this.choosed = [];
				}
			//data:传递给 data 属性的数组中该节点所对应的对象、
			//checked:节点本身是否被选中、
			//indeterminate:节点的子树中是否有被选中的节点
			},

			handleAddClose() {
				this.dialogAddVisible = false;
			},

			handleEditClose() {
				this.dialogEditVisible = false;
			},

			handleAPIAddClose() {
				this.dialogAPIAddVisible = false;
			},

			handleAPIEditClose() {
				this.dialogAPIEditVisible = false;
			},

			reModularType(val) {
				switch(val) {
					case 'BT':
					return '保途模块';
					break;
					case 'APP': 
					return '平台模块';
					break;
					case 'TENANT':
					return '商家模块';
					break;
					default:
					return val;
					break;
				}
			},

			confirmAdd() {
				this.dialogAddVisible = false;
				let payload = {
					name: this.addModular.name,
					modularType: this.modularType,
					parentId: this.choosed[0],
				}
				payload = JSON.stringify(payload);
				if (this.addModular.name) {
					masterApi({
						action: 'modular_edit',
						version: '1.0',
						crudType: '1',
						payload: payload,
					},window.localStorage.getItem('tokenPlate')).then((res)=> {
						this.getModulars();
						this.addModular.name = null;
					})
				}
			},

			editThisModular() {
				function traversal(data,formData) {//遍历已有格式化数据,根据id返回name
					for (let i in data) {
						formData.push(data[i]);
						if (data[i].children) {
						    traversal(data[i].children,formData);
						}
					}
				}
				this.dialogEditVisible = true;
				if (this.modularType == "BT") {
					let traversalData = [];
					traversal(this.dataBT,traversalData);
					for (let i = 0; i < traversalData.length; i++) {
						if(traversalData[i].id == this.choosed[0]) {
							this.editModular.name = traversalData[i].label;
						}
					}
				}
				else if(this.modularType == "APP") {
					let traversalData = [];
					traversal(this.dataAPP,traversalData);
					for (let i = 0; i < traversalData.length; i++) {
						if(traversalData[i].id == this.choosed[0]) {
							this.editModular.name = traversalData[i].label;
						}
					}
				}
				else if(this.modularType == "TENANT") {
					let traversalData = [];
					traversal(this.dataTENANT,traversalData);
					for (let i = 0; i < traversalData.length; i++) {
						if(traversalData[i].id == this.choosed[0]) {
							this.editModular.name = traversalData[i].label;
						}
					}
				}
			},

			confirmEdit() {
				this.dialogEditVisible = false;
				let payload = {
					id: this.choosed[0],
					name: this.editModular.name,
					modularType: this.modularType,
				}
				payload = JSON.stringify(payload);
				if (this.editModular.name) {
					masterApi({
						action: 'modular_edit',
						version: '1.0',
						crudType: '4',
						payload: payload,
					},window.localStorage.getItem('tokenPlate')).then((res)=> {
						this.getModulars();
					})
				}
			},

			deleteModular() {
				let payload = {
					id: this.choosed[0],
				}
				payload = JSON.stringify(payload);
				masterApi({
					action: 'modular_edit',
					version: '1.0',
					crudType: '8',
					payload: payload,
				},window.localStorage.getItem('tokenPlate')).then((res)=> {
					this.getModulars();
				})
			},

			//接口部分代码
			getAPIs() {
				let payload = {
					modularId: this.choosed[0],
				}
				payload = JSON.stringify(payload);
				masterApi({
					action: 'apis',
					version: '1.0',
					payload: payload,
				},window.localStorage.getItem('tokenPlate')).then((res)=> {
					if (res.attach) {
						this.apiData = res.attach;
					}
				})
			},

			addAPI() {
				this.dialogAPIAddVisible = false;
				let payload = {
					pkg: this.apiUpdate.addPkg,
					name: this.apiUpdate.addName,
					modularId: this.choosed[0],
				}
				payload = JSON.stringify(payload);
				masterApi({
					action: 'api_edit',
					version: '1.0',
					crudType: 1,
					payload: payload,
				},window.localStorage.getItem('tokenPlate')).then((res)=> {
					this.getAPIs();
				})
			},

			editAPI(row) {
				this.dialogAPIEditVisible = true;
				this.editAPI.id = row.id;
				this.editedAPI.pkg = row.pkg;
				this.editedAPI.name = row.name;
			},

			confirmEditAPI() {
				this.dialogAPIEditVisible = false;
				let payload = {
					id: this.editedAPI.id,
					pkg: this.editedAPI.pkg,
					name: this.editedAPI.name,
					modularId: this.choosed[0],
				}
				payload = JSON.stringify(payload);
				masterApi({
					action: 'api_edit',
					version: '1.0',
					crudType: 4,
					payload: payload,
				},window.localStorage.getItem('tokenPlate')).then((res)=> {
					this.getAPIs();
				})
			},

			deleteAPI(row) {
				let payload = {
					id: row.id,
					pkg: row.pkg,
					modularId: this.choosed[0],
				}
				payload = JSON.stringify(payload);
				masterApi({
					action: 'api_edit',
					version: '1.0',
					crudType: 8,
					payload: payload,
				},window.localStorage.getItem('tokenPlate')).then((res)=> {
					this.getAPIs();
				})
			},
	    },
	    mounted(){
	        this.getModulars();
	    }
	}
</script>
<style lang="less">
	.toolBar {
		margin-top: 20px;
	}
</style>