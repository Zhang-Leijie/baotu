<template>
	<div class="demoList">
		<el-breadcrumb separator="/">
		  	<el-breadcrumb-item>列表</el-breadcrumb-item>
		</el-breadcrumb>

		<div class="toolBar">
			<div class="toolBarR">
				<el-button type="primary" @click="addDemo">新增</el-button>
			</div>
		</div>

		<div style="margin-top:20px;">
			<el-table :data="formData" border style="width: 100%;font-size:12px;">
			    <el-table-column prop="demo" label=""></el-table-column>
			    <el-table-column label="">
			    	<template scope="scope">
			    		<span>{{scope.row?scope.row:''}}</span>
			    	</template>
			    </el-table-column>
			    <el-table-column label="操作">
			    	<template scope="scope">
			    		<el-button type="text" size="small">
			    			<router-link :to="{name:'demo-edit',query:{}}">
			      			编辑
				      		</router-link>
			    		</el-button>
			    	</template>
			    </el-table-column>
			</el-table>
			<el-pagination v-if="pageCount" @current-change="pageChange" :current-page="currentPage" :page-size="pageSize" layout="total , prev, pager, next, jumper" :page-count='pageCount' style="margin:20px auto;text-align:center"></el-pagination>
		</div>

		<el-dialog title="新增" :visible.sync="dialogFormVisible" size="small" :before-close="handleFormClose">
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
	      dialogFormVisible: false,	
	      currentPage: 1,
	      pageCount: null,
	      length: null,
	      pageSize: 10,
	      tableData: [],
	      formData: []
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
	  		// masterApi({
	   	// 		action: 'demos',
	   	// 		version: '1.0'
	   	// 	},window.localStorage.getItem('token')).then((res)=> {
	   	// 		if (res.code == 0) {
	   	// 			if (res.attach) {
	   	// 				this.tableData = res.attach;
	   	// 				this.length = res.attach.length;
	   	// 				this.pageCount = parseInt((this.length - 1) / this.pageSize) + 1;
	   	// 				this.showPage();
	   	// 			}
     //   			}
	   	// 	})
	  	},

	  	addDemo() {
	  		 router.push({
	  		 	name: "demo-edit"
	  		 })
	  	},

	  	confirmAdd() {
	  		this.dialogFormVisible = false;
	  	},

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
.demoList{
	.toolBar{
		width: 100%;
		overflow: hidden;
		.toolBarR {
			float: right;
		}
	}
}
</style>