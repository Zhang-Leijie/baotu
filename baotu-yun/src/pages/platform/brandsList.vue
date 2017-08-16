<template>
	<div class="brandsList">
		<el-breadcrumb separator="/">
		  	<el-breadcrumb-item>汽车品牌列表</el-breadcrumb-item>
		</el-breadcrumb>

		<div class="toolBar">
			<div class="toolBarR">
				<el-button type="primary" @click="dialogFormVisible = true">新增</el-button>
			</div>
		</div>

		<div class="tableBox">
			<el-table :data="formData" border style="width: 100%;font-size:12px;">
			    <el-table-column prop="id" label="ID"></el-table-column>
			    <el-table-column label="名称">
			    	<template scope="scope">
			    		<span v-if="!isEdit || !(scope.row.id == editForm.id)">{{scope.row.name}}</span>
			    		<el-input v-model="editForm.name" v-if="isEdit && scope.row.id == editForm.id"></el-input>
			    	</template>
			    </el-table-column>
			    <el-table-column label="创建时间">
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
			    		<!-- <el-button type="text" size="small" @click="deleteBrands(scope.row)" v-if="!isEdit">删除</el-button> -->
			    		<el-button type="text" size="small" @click="confirmEdit()" v-if="isEdit && scope.row.id == editForm.id">保存</el-button>
			    		<el-button type="text" size="small" @click="cancelEdit()" v-if="isEdit && scope.row.id == editForm.id">取消</el-button>
			    		<el-button type="text" size="small" @click="editBrands(scope.row)" v-if="!isEdit">编辑</el-button>
			    		<router-link :to="{name:'deptsList',query:{id: scope.row.id}}" style="margin-left: 20px;">
			    			<el-button type="text" size="small" v-if="!isEdit">
			    				查看车型
			    			</el-button>
				      	</router-link>
			    	</template>
			    </el-table-column>
			</el-table>
			<el-pagination v-if="length" @current-change="pageChange" :current-page="currentPage" :page-size="pageSize" layout="total , prev, pager, next, jumper" :total='length' style="margin:20px auto;text-align:center"></el-pagination>
		</div>

		<el-dialog title="新增汽车品牌" :visible.sync="dialogFormVisible" size="small" :before-close="handleFormClose">
			<el-input v-model="addForm.name"></el-input>
		    <div slot="footer" class="dialog-footer">
		        <el-button @click="handleFormClose">取 消</el-button>
		        <el-button type="primary" @click="confirmAdd">确 定</el-button>
		    </div>
		</el-dialog>
	</div>
</template>
<script>
import { masterApi } from '@/ajax/post.js'

	export default {
	  data() {
	    return {
	      currentPage: 1,
	      pageCount: null,
	      length: null,
	      pageSize: 10,
	      tableData: [],
	      formData: [],
	      dialogFormVisible: false,
	      isEdit: false,
	      editForm: {
	      	id: null,
	      	name: null
	      },
	      addForm: {
	      	name:null
	      }
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

	  	getInfo() {
	  		let payload = {}
	  		payload = JSON.stringify(payload);
	  		masterApi({
	   			action: 'vehicle_brands',
	   			version: '1.0',
	   			payload: payload,
	   		},window.localStorage.getItem('tokenPlate')).then((res)=> {
	   			if (res.code == 0) {
	   				if (res.attach) {
	   					this.tableData = res.attach;
	   					this.length = res.attach.length;
	   					this.pageCount = parseInt((this.length - 1) / this.pageSize) + 1;
	   					this.showPage();
	   				}
       			}
	   		})
	  	},

	  	confirmAdd() {
	  		this.dialogFormVisible = false;
	  		let payload = {	
	   			name: this.addForm.name
	   		}
	  		payload = JSON.stringify(payload);
	  		masterApi({
	   			action: 'vehicle_brand_edit',
	   			version: '1.0',
	   			crudType: 1,
	   			payload: payload,
	   		},window.localStorage.getItem('tokenPlate')).then((res)=> {
	   			if (res.code == 0) {
   					this.$message({
   						message: '新增汽车品牌成功',
   						type: 'success'
   					});
   					this.getInfo();
   					this.addForm.name = null;
       			}
	   		})
	  	},

	  	editBrands(row) {
	  		this.isEdit = true;
	  		this.editForm.id = row.id;
	  		this.editForm.name = row.name;
	  	},

	  	confirmEdit() {
	  		let payload = {
	  			name: this.editForm.name,
		  		id: this.editForm.id,
	  		}
		  	payload = JSON.stringify(payload);
	  		masterApi({
	   			action: 'vehicle_brand_edit',
	   			version: '1.0',
	   			crudType: 4,
	   			payload: payload,
	   		},window.localStorage.getItem('tokenPlate')).then((res)=> {
	   			if (res.code == 0) {
   					this.$message({
   						message: '已保存修改',
   						type: 'success'
   					});
   					this.isEdit = false;
   					this.editForm.id = null;
   					this.editForm.name = null;
   					this.getInfo();
       			}
	   		})
	  	},

	  	cancelEdit() {
	  		this.isEdit = false;
	  		this.editForm.id = null;
	  		this.editForm.name = null;
	  	},

	  	// deleteBrands(row) {
	  	// 	let id = row.id;
	  	// 	masterApi({
	   // 			action: 'vehicle_brand_edit',
	   // 			version: '1.0',
	   // 			crudType: 8,
	   // 			id, id
	   // 		},window.localStorage.getItem('tokenPlate')).then((res)=> {
	   // 			if (res.code == 0) {
   	// 				this.$message({
   	// 					message: '删除完成',
   	// 					type: 'success'
   	// 				});
   	// 				this.getInfo();
    //    			}
	   // 		})
	  	// },

	  	handleFormClose() {
	  		this.dialogFormVisible = false;
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
	  },
	  mounted() {
	  	this.getInfo();
	  }
	}
</script>
<style lang="less">
.brandsList{
	.toolBar{
		width: 100%;
		overflow: hidden;
		.toolBarR {
			float: right;
		}
	}
}
</style>