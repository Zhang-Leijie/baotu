<template>
	<div class="shopList">
		<el-breadcrumb separator="/">
		  	<el-breadcrumb-item>商家账号管理</el-breadcrumb-item>
		</el-breadcrumb>

		<div class="toolBar">
			<div class="searchBox">
				<!-- <el-input icon="search" v-model="search.company" placeholder="搜索保险公司" :on-icon-click="search" style="width:240px"></el-input> -->
				<el-input icon="search" v-model="search.sale" placeholder="搜索业务员" :on-icon-click="searchIt" style="width:240px"></el-input>
			</div>
		</div>

		<div class="tableBox">
			<el-table :data="tableData" border style="width: 100%;font-size:12px;">
			    <el-table-column prop="tid" label="序号"></el-table-column>
			    <el-table-column prop="name" label="订单编号"></el-table-column>
			    <el-table-column prop="name" label="车主"></el-table-column>
			    <el-table-column prop="name" label="车牌"></el-table-column>
			    <el-table-column prop="name" label="业务员"></el-table-column>
			    <el-table-column prop="name" label="保险公司"></el-table-column>
			    <el-table-column label="签单日期">
			    	<template scope="scope">
			    		<span>{{formatDate(scope.row.expire)}}</span>
			    	</template>
			    </el-table-column>
			    <el-table-column prop="name" label="配送方式"></el-table-column>
			    <el-table-column prop="name" label="礼品"></el-table-column>
			    <el-table-column prop="name" label="单证状态"></el-table-column>
			    
			    <el-table-column label="操作">
			      <template scope="scope">
		      		<el-button type="text" size="small">
						<router-link :to="{name:'shop-order-policyDetail',query:{id:scope.row._id}}">
			      			查看
			      		</router-link>
		      		</el-button>
			      </template>
			    </el-table-column>
			</el-table>

			<el-pagination v-if="total" @current-change="pageChange" :current-page="currentPage" :page-size="pageSize" layout="total , prev, pager, next, jumper" :total='total' style="margin:20px auto;text-align:center"></el-pagination>

			<el-button @click="sync" type="primary" style="margin:20px auto;text-align:left;" :disabled="true">同步保单</el-button>
		</div>
	</div>
</template>
<script>
import { autoApi,commonApi } from '@/ajax/post.js'

export default {
	  data() {
	    return {
	      search: {
	      	company: null,
	      	sale: null
	      },
	      tableData:[],
	      total: null,
	      currentPage: 1,
	      pageSize: 10
		}
	  },
	  methods: {
	  	formatDate(time){
		  var   x = (time - 0) * 1000
		  var   now = new Date(x) 
		  var   year = now.getFullYear();     
		  var   month = "0" + (now.getMonth()+1);     
		  var   date = "0" + (now.getDate());   
		  var   hour = "0" + now.getHours();
		  var   min =  "0" + now.getMinutes();
		  return   year + "-" + month.substr(-2) + "-" + date.substr(-2) + ' ' + hour.substr(-2) + ':' + min.substr(-2)
		},

	  	getInfo() {
  			let payload = {
  				page: this.currentPage,
  				pageSize: this.pageSize,
	   			employeeId: window.localStorage.getItem('employeeId'),
	   			// salesman: this.search.sale
  			};
  			
	  		if (this.search.sale) {
	  			payload.salesman = this.search.sale;	
	  		}

  			payload = JSON.stringify(payload);

	  		autoApi({
	   			action: 'vehicle_policies',
	   			version: '1.0',
	   			payload: payload
	   		},window.localStorage.getItem('token')).then((res)=> {
	   			if (res.code == 0) {
	   				this.tableData = res.attach.list;
	   				this.total = res.attach.total;
	   				// this.$message({
			     //        message: '修改的设置已保存',
			     //        type: 'success'
			     //    });
       			}
	   		})
	  	},

	  	pageChange(pg) {
	  		this.currentPage = pg;
	        this.getInfo(); 
	    },

	    searchIt() {
	    	this.getInfo(); 
	    },

	    deleteShop(row) {
	    	this.$confirm('此操作将永久删除该系数, 是否继续?', '提示', {
	          confirmButtonText: '确定',
	          cancelButtonText: '取消',
	          type: 'warning'
	        }).then(() => {
	         	 this.$message({
		            type: 'info',
		            message: 'API未接入,因此操作未执行'
		          });   
	        }).catch(() => {
	          this.$message({
	            type: 'info',
	            message: '已取消删除'
	          });          
	        });   	
	    },

	    sync() {
	    	let payload = {
	    		employeeId: window.localStorage.getItem('employeeId')
	    	}
	    	payload = JSON.stringify(payload);
	    	autoApi({
	   			action: 'jian_jie_fetch',
	   			version: '1.0',
	   			payload: payload,
	   		},window.localStorage.getItem('token')).then((res)=> {
	   			if (res.code == 0) {
	   				this.$message({
	   					message: '保单已同步',
	   					type: 'success'
	   				});
       			}
	   		})
	    }
	  },
	  mounted() {
	  	this.getInfo();
	  }
	}
</script>

<style lang="less">
.shopList {
	.toolBar {
		width: 100%;
		overflow: hidden;
		.searchBox, .btnBox {
			float: right;
		}
	}
	.tableBox {
		margin-top: 20px;
	}
}
</style>