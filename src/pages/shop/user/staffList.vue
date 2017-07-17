<template>
	<div>
		<el-breadcrumb separator="/">
		  	<el-breadcrumb-item>员工管理</el-breadcrumb-item>
		</el-breadcrumb>
		<div style="margin-top:10px;margin-bottom:10px;">
			<router-link :to="{name:'shop-staff-add'}">
				<el-button type="primary" class="marginBtn">新增</el-button>
			</router-link>
			<el-button class="marginBtn">重置</el-button>
			<el-button class="marginBtn">搜索</el-button>
			<el-input style="float:right;width:300px;" v-model="searchName" placeholder="请输入信息"></el-input>
			<div style="clear:both"></div>
		</div>
		<div style="margin-top:20px;">
			<el-table
			    :data="tableData"
			    border
			    style="width: 100%;font-size:12px;">
			    <el-table-column
			      prop="name"
			      label="姓名"
			      min-width="100">
			    </el-table-column>
			    <el-table-column
			      prop="account"
			      label="账号"
			      min-width="120">
			    </el-table-column>
			    <el-table-column
			      prop="role"
			      label="角色"
			      min-width="100">
			    </el-table-column>
			    <el-table-column
			      prop="time"
			      label="申请时间"
			      min-width="100">
			    </el-table-column>
			    <el-table-column
			      prop="payway"
			      label="支付方式"
			      min-width="100">
			    </el-table-column>
			    <el-table-column
			      prop="invite"
			      label="邀请人"
			      min-width="120">
			    </el-table-column>
			    <el-table-column
			      prop="invitecode"
			      label="邀请码"
			      min-width="100">
			    </el-table-column>
			    <el-table-column
			      prop="state"
			      label="状态"
			      min-width="100">
			    </el-table-column>
			    <el-table-column
			      label="操作"
			      min-width="150">
			      <template scope="scope">
		      		<el-button type="text" size="small">
						<router-link :to="{name:'shop-staff-edit',query:{id:scope.row.id}}">
			      			编辑
			      		</router-link>
		      		</el-button>
			        <el-button type="text" size="small">禁用</el-button>
			        <el-button type="text" size="small">启用</el-button>
			      </template>
			    </el-table-column>
			</el-table>
			<el-pagination v-if="pageCount" @current-change="pageChange" :current-page="currentPage" :page-size="pageSize" layout="total , prev, pager, next, jumper" :page-count='pageCount' style="margin:20px auto;text-align:center"></el-pagination>
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
	  var   date = "0" +(now.getDate());   
	  var   hour = "0" +now.getHours();
	  var   min =  "0" +now.getMinutes();
	  return   year+"-"+month.substr(-2)+"-"+date.substr(-2)+'   '+ hour.substr(-2) +':'+min.substr(-2)
	}

	export default {
	  data() {
	    return {
	      pageCount: null,
	      pageSize: 10,
	      currentPage: 1,
	      searchName:'',
	      tableData:[],
		}
	  },
	  methods: {
	  	pageChange(val) {
	        this.currentPage = val;
	        console.log(`当前页: ${val}`);
	        // this.getlist(); 
	    },
	  },
	  mounted:function() {
	  	let employeeSearcher = {
	  		page: this.currentPage,
	  		pageSize: this.pageSize,
	  		asc: false
	  	}
	  	employeeSearcher = JSON.stringify(employeeSearcher)
	  	autoApi({
   			action: 'employee_list',
   			version: '1.0',
   			client: 2,
   			employeeSearcher: employeeSearcher
   		},window.localStorage.getItem('token')).then((res)=> {
   			if (res.code == 0) {
   				
   			}
   		})
	  }
	}
</script>