<template>
	<div class="routeList">
		<el-breadcrumb separator="/">
		  	<el-breadcrumb-item>基本信息</el-breadcrumb-item>
		</el-breadcrumb>

		<el-form label-width="120px" class="appbox">
		  	<el-form-item class="appblock" label="平台名称:">
	    		 <span>{{ tenantData.appName }}</span>
		  	</el-form-item>
		  	<el-form-item class="appblock" label="商家名称:">
	    		 <span>{{ tenantData.name  }}</span>
		  	</el-form-item>
		  	<el-form-item class="appblock" label="联系人:">
	    		 <span>{{ tenantData.contacts  }}</span>
		  	</el-form-item>
		  	<el-form-item class="appblock" label="联系人电话:">
	    		 <span>{{ tenantData.contactsMobile  }}</span>
		  	</el-form-item>
		  	<el-form-item class="appblock" label="创建时间:">
	    		 <span>{{ formatDate(tenantData.created)  }}</span>
		  	</el-form-item>
		  	<el-form-item class="appblock" label="到期时间:">
	    		 <span>{{ formatDate(tenantData.expire)  }}</span>
		  	</el-form-item>
		  	<el-form-item class="appblock" label="营业执照号:">
	    		 <span>{{ tenantData.license  }}</span>
		  	</el-form-item>
		  	<el-form-item class="appblock" label="营业执照图片:">
	    		 <img :src="tenantData.licenseImage">
		  	</el-form-item>
		  	<el-form-item class="appblock" label="所属地区:">
	    		 <span>{{ tenantData.regionName  }}</span>
		  	</el-form-item>
		  	<el-form-item class="appblock" label="客服电话:">
	    		 <span>{{ tenantData.servicePhone  }}</span>
		  	</el-form-item>
		</el-form>

		<el-breadcrumb separator="/">
		  	<el-breadcrumb-item>壁虎配置</el-breadcrumb-item>
		</el-breadcrumb>

		<el-form label-width="120px" class="appbox">
			<el-form-item class="appblock" label="gent:" v-if="(formBiHu.agent && formBiHu.key)">
		    	<el-input type="text" style="width:150px;" v-model="formBiHu.agent" placeholder="请输入"></el-input>
		  	</el-form-item>
		  	<el-form-item class="appblock" label="gent:" v-if="isAddBiHu">
		    	<el-input type="text" style="width:150px;" v-model="addBiHuData.agent" placeholder="请输入"></el-input>
		  	</el-form-item>
		  	<el-form-item class="appblock" label="key:" v-if="(formBiHu.agent && formBiHu.key)">
		    	<el-input type="text" style="width:150px;" v-model="formBiHu.key" placeholder="请输入"></el-input>
		  	</el-form-item>
		  	<el-form-item class="appblock" label="key:" v-if="isAddBiHu">
		    	<el-input type="text" style="width:150px;" v-model="addBiHuData.key" placeholder="请输入"></el-input>
		  	</el-form-item>
		</el-form>


		<div style="margin-bottom: 20px;">
			<div class="toolBar">
				<div class="toolBarR">
					<el-button type="primary" @click="addBiHu" v-if="!(formBiHu.agent && formBiHu.key)">开通壁虎</el-button>
					<el-button type="primary" @click="saveBiHu" v-if="formBiHu.agent && formBiHu.key">保存配置</el-button>
					<el-button type="primary" @click="deleteBiHu" v-if="formBiHu.agent && formBiHu.key">关闭壁虎</el-button>
				</div>
			</div>

			<el-breadcrumb separator="/">
			  	<el-breadcrumb-item>险企信息</el-breadcrumb-item>
			</el-breadcrumb>
		</div>

		<div class="toolBar">
			<div class="toolBarR">
				<el-button type="primary" @click="dialogTableVisible = true" :disabled="tableData.length == insurerList.length">新增路由</el-button>
			</div>
		</div>

		<div class="tableBox">
			<el-table :data="formData" border style="width: 100%;font-size:12px;">
			    <el-table-column prop="key" label="路由ID"></el-table-column>
			    <!-- <el-table-column prop="insurerId" label="险企ID"></el-table-column> -->
			    <el-table-column prop="insurerName" label="险企名"></el-table-column>
			    <!-- <el-table-column prop="lane" label="线路ID"></el-table-column> -->
			    <el-table-column label="线路名">
			    	<template scope="scope">
			    		<span v-if="!(isEdit && editedId === scope.row.key)">{{scope.row.laneName}}</span>
			    		<el-select v-model="formEdit.laneId" placeholder="请选择线路" v-if="isEdit && editedId === scope.row.key">
						    <el-option v-for="item in lanes" :label="item.label" :value="item.value"></el-option>
						</el-select>
			    	</template>
			    </el-table-column>
			    <el-table-column label="简捷ID">
			    	<template scope="scope">
			    		<span v-if="!(isEdit && editedId === scope.row.key)">{{scope.row.jianJieId?scope.row.jianJieId:"未绑定"}}</span>
			    		<el-input v-model="formEdit.jianjieId" v-if="isEdit && editedId === scope.row.key"></el-input>
			    	</template>
			    </el-table-column>
			    <!-- <el-table-column label="险企图标地址">
			    	<template scope="scope">
		            	<el-popover ref="popoverPic" trigger="hover" placement="left" width="500px">
		            	    <img :src="scope.row.insurerIcon" class="bre"  slot="reference" style="width: 80px;">
	                    	<img :src='scope.row.insurerIcon' style="width: 475px;">
	                	</el-popover>
			    	</template>
			    </el-table-column> -->
			    <el-table-column label="注册时间">
			    	<template scope="scope">
			    		<span>{{formatDate(scope.row.created)}}</span>
			    	</template>
			    </el-table-column>
			    <el-table-column label="最近修改时间">
			    	<template scope="scope">
			    		<span>{{formatDate(scope.row.updated)}}</span>
			    	</template>
			    </el-table-column>
			    <el-table-column label="操作">
			    	<template scope="scope">
			    		<el-button type="text" size="small" @click="editRoute(scope.row)" v-if="!(isEdit || editedId === scope.row.key)">编辑</el-button>
			    		<el-button type="text" size="small" @click="deleteRoute(scope.row)" v-if="!(isEdit || editedId === scope.row.key)">删除</el-button>
			    		<el-button type="text" size="small" @click="confirmEdit" v-if="isEdit && editedId === scope.row.key">保存</el-button>
			    		<el-button type="text" size="small" @click="quitEdit" v-if="isEdit && editedId === scope.row.key">取消</el-button>
			    	</template>
			    </el-table-column>
			</el-table>
			<el-pagination v-if="pageCount" @current-change="pageChange" :current-page="currentPage" :page-size="pageSize" layout="total , prev, pager, next, jumper" :page-count='pageCount' style="margin:20px auto;text-align:center"></el-pagination>
		</div>

		<el-dialog title="新增路由" :visible.sync="dialogTableVisible">
			<el-form label-width="120px" class="appbox">
			  	<el-form-item class="appblock" label="险企:">
					<span v-show="!formAdd.insurerId" style="color: red;">*</span>
					<el-select v-model="formAdd.insurerId" placeholder="请选择险企">
					    <el-option v-for="item in insurerList" :label="item.label" :value="item.value"></el-option>
					</el-select>
				</el-form-item>
			  	<el-form-item class="appblock" label="线路:">
					<span v-show="!formAdd.laneId" style="color: red;">*</span>
		    		<el-select v-model="formAdd.laneId" placeholder="请选择线路">
					    <el-option v-for="item in lanes" :label="item.label" :value="item.value"></el-option>
					</el-select>
			  	</el-form-item>
			  	<!-- <el-form-item class="appblock" label="商户ID:">
			    	<span>{{tid}}</span>
			  	</el-form-item> -->
			  	<el-form-item class="appblock" label="简捷ID:">
			  		<span v-show="!formAdd.jianjieId" style="color: red;">*</span>
			    	<el-input type="text" style="width:150px;" v-model="formAdd.jianjieId" placeholder="请输入ID"></el-input>
			  	</el-form-item>
			</el-form>
			<div style="clear:both"></div>
			<div style="text-align:center;margin-top:20px;">
				<el-button @click="goback">取消</el-button>
				<el-button type="primary" @click="comfirmAdd">添加路由</el-button>
			</div>
		</el-dialog>
	</div>
</template>
<script>
import { masterApi } from '@/ajax/post.js'

	export default {
	  data() {
	    return {
	    	tid: null,
		    currentPage: 1,
		    pageCount: null,
		    length: null,
		    pageSize: 10,
		    tenantData: [],
		    tableData: [],
		    insurerList: [],
		    formData: [],
		    dialogTableVisible: false,
		    formBiHu: {
	        	agent: null,
	        	key: null
		    },
		    addBiHuData: {
	        	agent: null,
	        	key: null
		    },
		    formAdd: {
		      	id: null,
	      		tid: null,
	        	laneId: null,
	        	insurerId: null,
	        	jianjieId: null,
		    },
		    lanes: [
	      		{
	      			value: 1,
	      			label: '壁虎车险'
	      		},
	      		{
	      			value: 2,
	      			label: '乐保吧车险'
	      		},
	      		{
	      			value: 3,
	      			label: '保途车险'
	      		}
	      	],
	      	formEdit: {
	      		jianjieId: null,
	      		laneId: null
	      	},
	      	isEdit: false,
	      	editedId: null,
	      	isAddBiHu: false,
		}
	  },
	  methods: {
	  	formatDate(time) {
		  var   x = (time - 0) * 1000;
		  
		  var   now = new Date(x) 
		  var   year = now.getFullYear();     
		  var   month = "0" + (now.getMonth()+1);     
		  var   date = "0" + (now.getDate());   
		  var   hour = "0" + now.getHours();
		  var   min =  "0" + now.getMinutes();

		  return   year+"-"+month.substr(-2)+"-"+date.substr(-2)+'   '+ hour.substr(-2) +':'+min.substr(-2)
		},


		getTenantInfo() {
			let payload = {
				id: this.tid
			};
			payload = JSON.stringify(payload);
			masterApi({
	   			action: 'tenant_info',
	   			version: '1.0',
	   			payload: payload
	   		},window.localStorage.getItem('token')).then((res)=> {
	   			if (res.code == 0) {
	   				this.tenantData = res.attach
       			}
	   		})
		},

	  	getRouterInfo() {
	  		masterApi({
	   			action: 'routes',
	   			version: '1.0',
	   			tid: this.tid
	   		},window.localStorage.getItem('token')).then((res)=> {
	   			if (res.code == 0) {
	   				if (res.attach) {
	   					this.tableData = res.attach;
	   					this.length = res.attach.length;
	   					this.pageCount = parseInt((this.length - 1) / this.pageSize) + 1;
	   					this.showPage();
	  					this.getInsurerList();
	   				}
       			}
	   		})
	  	},

	  	getBiHuInfo() {
	  		let payload = {
	  			id: this.tid
	  		}
	  		payload = JSON.stringify(payload);
	  		masterApi({
	   			action: 'bi_hu_tenant_config',
	   			version: '1.0',
	   			payload: payload
	   		},window.localStorage.getItem('token')).then((res)=> {
	   			if (res.code == 0) {
	   				if (res.attach) {
	   					this.formBiHu.agent = res.attach.agent;
	   					this.formBiHu.key = res.attach.key;
	   				}
       			}
	   		})
	  	},

	  	saveBiHu() {
	  		let payload = {
	  			tid: this.tid,
	  			key: this.formBiHu.key,
	  			agent: this.formBiHu.agent
	  		}
	  		payload = JSON.stringify(payload);
	  		masterApi({
	   			action: 'bi_hu_tenant_config_edit',
	   			version: '1.0',
	   			crudType: 4,
	   			payload: payload
	   		},window.localStorage.getItem('token')).then((res)=> {
	   			if (res.code == 0) {
   					this.getBiHuInfo();
   					this.$message({
   						message: '壁虎配置成功',
   						type: 'success'
   					});
       			}
	   		})
	  	},	

	  	addBiHu() {
	  		this.isAddBiHu = true;
	  		if (this.addBiHuData.agent && this.addBiHuData.key) {
	  			let payload = {
		  			tid: this.tid,
		  			key: this.addBiHuData.key,
		  			agent: this.addBiHuData.agent
		  		}
		  		payload = JSON.stringify(payload);
		  		masterApi({
		   			action: 'bi_hu_tenant_config_edit',
		   			version: '1.0',
		   			crudType: 1,
		   			payload: payload
		   		},window.localStorage.getItem('token')).then((res)=> {
		   			if (res.code == 0) {
		   				this.addBiHuData.agent = null;
		   				this.addBiHuData.key = null;
		   				this.isAddBiHu = false;
	   					this.getBiHuInfo();
	   					this.$message({
	   						message: '关联壁虎成功',
	   						type: 'success'
	   					});
	       			}
		   		})
	  		}
	  	},	

	  	deleteBiHu() {
	  		let payload = {
	  			tid: this.tid
	  		}
	  		payload = JSON.stringify(payload);
	  		masterApi({
	   			action: 'bi_hu_tenant_config_edit',
	   			version: '1.0',
	   			crudType: 8,
	   			payload: payload
	   		},window.localStorage.getItem('token')).then((res)=> {
	   			if (res.code == 0) {
	   				this.formBiHu.agent = null;
	   				this.formBiHu.key = null;
	   				this.$message({
   						message: '壁虎已关闭',
   						type: 'success'
   					});
   					this.getBiHuInfo();
       			}
	   		})
	  	},	

	  	getInsurerList() {
	  		let payload = {};
	  		payload = JSON.stringify(payload);
	  		masterApi({
	   			action: 'insurers',
	   			version: '1.0',
	   			payload: payload
	   		},window.localStorage.getItem('token')).then((res)=> {
	   			if (res.code == 0) {
	   				if (res.attach) {
	   					this.insurerList = [];
	   					for (let i = 0; i < res.attach.length; i++) {
	   						let check = false;
	   						for (let j = 0; j < this.tableData.length; j++) {
	   							if(res.attach[i].id == this.tableData[j].insurerId) {
	   								check = true;
	   							}
	   						}
	   						if (!check) {
	   							let buf = {
		   							label: null,
		   							value: null
		   						};
		   						buf.label = res.attach[i].name;
		   						buf.value = res.attach[i].id;
		   						this.insurerList.push(buf);
	   						}
	   					}
	   				}
       			}
	   		})
	  	},

	  	editRoute(row) {
	  		this.isEdit = true;
			this.editedId = row.key;
	    	this.formEdit.jianjieId = row.jianJieId;
	    	this.formEdit.laneId = row.lane;
	  	},

	  	comfirmAdd() {
	  		this.dialogTableVisible = false;
	  		if (this.formAdd.laneId && this.formAdd.insurerId && this.formAdd.jianjieId) {
	  			
	  			if(this.formAdd.laneId == 1) {
	  				masterApi({
			   			action: 'bi_hu_tenant_config_edit',
			   			version: '1.0',
			   			crudType: 1,
			   			tid: this.tid,
			   			agent: this.formAdd.agent,
			   			key: this.formAdd.key
			   		},window.localStorage.getItem('token')).then((res)=> {
			   			if (res.code == 0) {

		       			}
			   		})
	  			}

	  			masterApi({
		   			action: 'route_edit',
		   			version: '1.0',
		   			crudType: 1,
		   			lane: this.formAdd.laneId,
		   			tid: this.tid,
		   			id: this.formAdd.insurerId,
		   			jianJieId: this.formAdd.jianjieId
		   		},window.localStorage.getItem('token')).then((res)=> {
		   			if (res.code == 0) {
		   				for(let item in this.formAdd) {
		   					this.formAdd[item] = null;
		   				}
		   				this.getRouterInfo();
	       			}
		   		})
	  		}
	  		else
	  		{
	  			 this.$message({
		            type: 'error',
		            message: '选择信息不完整,请检查'
		          });    

	  		}
	  	},

	  	goback() {
	  		this.dialogTableVisible = false;
	  	},

	  	showPage() {
	  		this.formData = [];
	  		if(this.length * this.pageCount < this.pageSize * this.currentPage)
	  		{
	  			for (let i = 0; i < this.tableData.length; i++) {
	  				if (i >= (this.currentPage - 1) * this.pageSize) {
	  					this.formData.push(this.tableData[i])
	  				}
	  			}
	  		}
	  		else
	  		{
	  			for (let i = 0; i < this.tableData.length; i++) {
	  				if (i >= (this.currentPage - 1) * this.pageSize && i < this.currentPage * this.pageSize) {
	  					this.formData.push(this.tableData[i])
	  				}
	  			}
	  		}
	  	},

	  	pageChange(pg) {
	  		this.currentPage = pg;
	        this.showPage(); 
	    },

	    confirmEdit() {
	    	//post
	    	this.isEdit = null;
	    	masterApi({
	   			action: 'route_edit',
	   			version: '1.0',
	   			crudType: 4,
	   			key: this.editedId,
	   			lane: this.formEdit.laneId,
	   			jianJieId: this.formEdit.jianjieId
	   		},window.localStorage.getItem('token')).then((res)=> {
	   			if (res.code == 0) {
	   				this.getRouterInfo();
       			}
	   		})
	    	this.editedId = null;
	    },

	    quitEdit() {
	    	this.isEdit = null;
	    	this.editedId = null;
	    },

	    deleteRoute(row) {
	    	this.$confirm('此操作将永久删除该系数, 是否继续?', '提示', {
	          confirmButtonText: '确定',
	          cancelButtonText: '取消',
	          type: 'warning'
	        }).then(() => {
	    		masterApi({
		   			action: 'route_edit',
		   			version: '1.0',
		   			crudType: 8,
		   			key: row.key,
		   		},window.localStorage.getItem('token')).then((res)=> {
		   			if (res.code == 0) {
		   				this.getRouterInfo();
	       			}
		   		})
	        }).catch(() => {
	          this.$message({
	            type: 'info',
	            message: '已取消删除'
	          });          
	        }); 
	    }
	  },
	mounted() {
	  	if (this.$route.query.tid) {
	        this.tid = this.$route.query.tid;
	  		this.getRouterInfo();
	  		this.getTenantInfo();
	  		this.getBiHuInfo();
        }
	}
}
</script>
<style lang="less">
.routeList{
	.toolBar{
		width: 100%;
		overflow: hidden;
		.toolBarR {
			float: right;
		}
	}
	.appbox{
		margin-top: 20px;
		.appblock{
			width: 50%;
			float: left;
		}
	}
}
</style>