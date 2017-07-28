<template>
	<div class="nonAutoCategoryList">
		<el-breadcrumb separator="/">
		  	<el-breadcrumb-item>非车险类型管理</el-breadcrumb-item>
		</el-breadcrumb>

		<div style="margin-top:20px;">
			<el-table :data="formData" border style="width: 100%;font-size:12px;">
			    <el-table-column prop="id" label="ID"></el-table-column>
			    <el-table-column label="操作">
			    	<template scope="scope">
			    		<el-button type="text" size="small" @click="showEdit(scope.row)">编辑</el-button>
			    	</template>
			    </el-table-column>
			</el-table>
			<el-pagination v-if="pageCount" @current-change="pageChange" :current-page="currentPage" :page-size="pageSize" layout="total , prev, pager, next, jumper" :page-count='pageCount' style="margin:20px auto;text-align:center"></el-pagination>
		</div>
	</div>
</template>
<script>
import { masterApi } from '@/ajax/post.js'

	export default {
	    data() {
	      return {
	      	isEdit: false,
	      	edited: null,
	        editData: [],
	        formData: [],
	        pageCount: null,
	        pageSize: 10,
	        currentPage: 1
	      };
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

			getInfo() {
				let payload = {};
				payload = JSON.stringify(payload);
				masterApi({
					action: 'non_auto_category_list',
					version: '1.0',
					payload: payload
				},window.localStorage.getItem('token')).then((res)=> {
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
			
			showEdit(row) {
				this.edited = row.id;
			},

			confirmEdit(item) {

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
	    mounted(){
	    	this.getInfo();
	    }
	}

</script>
<style lang="less">
.nonAutoCategoryList{

}
</style>