<template>
	<div class="staffList">
		<el-breadcrumb separator="/">
		  	<el-breadcrumb-item>员工管理</el-breadcrumb-item>
		</el-breadcrumb>

		<div class="toolBar">
			<div class="btnBox">
				<router-link :to="{name:'shop-staff-add'}">
					<el-button type="primary" class="marginBtn">新增</el-button>
				</router-link>
			</div>
			<div class="searchBox">
				<el-input icon="search" v-model="searchID" placeholder="请输入ID" :on-icon-click="search" style="width:240px"></el-input>
			</div>
		</div>

		<div style="margin-top:20px;">
			<el-table :data="tableData" border style="width: 100%;font-size:12px;">
				<el-table-column prop="id" label="ID"></el-table-column>
				<el-table-column prop="uid" label="用户ID"></el-table-column>
				<el-table-column prop="name" label="姓名"></el-table-column>
				<el-table-column prop="mobile" label="账号"></el-table-column>
			    <el-table-column prop="role" label="角色"></el-table-column>
			    <el-table-column label="加入时间">
			    	<template scope="scope">
			    		<span>{{scope.row.created?formatDate(scope.row.created):''}}</span>
			    	</template>
			    </el-table-column>
			    <el-table-column label="支付方式">
			    	<template scope="scope">
			    		<span>{{scope.row.payType?'':(scope.row.payType == 1?'全额支付':(scope.row.payType == 2?'净保费支付':(scope.row.payType == 4?'公司垫付':'')))}}</span>
			    	</template>
			    </el-table-column>
			    <el-table-column prop="parentId" label="上级工号"></el-table-column>
			    <el-table-column prop="parentName" label="上级名字"></el-table-column>
			    <el-table-column prop="parentUid" label="上级用户ID"></el-table-column>
			    <el-table-column prop="parentMobile" label="上级手机号"></el-table-column>
			    <el-table-column label="操作"> 
			    	<template scope="scope">
			      		<el-button type="text" size="small">
							<router-link :to="{name:'shop-staff-edit',query:{id:scope.row.id}}">编辑</router-link>
			      		</el-button>
				        <!-- <el-button type="text" size="small">禁用</el-button>
				        <el-button type="text" size="small">启用</el-button> -->
			      	</template>
			    </el-table-column>
			</el-table>
			<el-pagination v-if="total" @current-change="pageChange" :current-page="currentPage" :page-size="pageSize" layout="total , prev, pager, next, jumper" :total='total' style="margin:20px auto;text-align:center"></el-pagination>
		</div>
	</div>
</template>
<script>
import { autoApi,commonApi } from '@/ajax/post.js'

	export default {
	  data() {
	    return {
	      total: null,
	      pageSize: 10,
	      currentPage: 1,
	      searchID:'',
	      tableData:[],
		}
	  },
	  methods: {
	  	formatDate(time){
		  var   x = (time - 0) * 1000;
		  var   now = new Date(x) 
		  var   year = now.getFullYear();     
		  var   month = "0" + (now.getMonth()+1);     
		  var   date = "0" +(now.getDate());   
		  var   hour = "0" +now.getHours();
		  var   min =  "0" +now.getMinutes();
		  return   year+"-"+month.substr(-2)+"-"+date.substr(-2)+'   '+ hour.substr(-2) +':'+min.substr(-2)
		},

		getInfo() {
			let employeeSearcher = {
		  		page: this.currentPage,
		  		pageSize: this.pageSize,
		  		asc: false,
		  		employeeId: this.searchID?this.searchID:null
		  	}
		  	employeeSearcher = JSON.stringify(employeeSearcher)
		  	autoApi({
	   			action: 'employee_list',
	   			version: '1.0',
	   			client: 2,
	   			employeeId: window.localStorage.getItem('employeeId'),
	   			employeeSearcher: employeeSearcher
	   		},window.localStorage.getItem('token')).then((res)=> {
	   			if (res.code == 0) {
	   				this.tableData = res.attach.list;
	   				this.total = res.attach.total;
	   			}
	   		})
		},

	  	pageChange(pg) {
	  		this.currentPage = pg;
	        this.getInfo();
	    },

	    search() {
	    	this.getInfo();
	    }
	  },
	  mounted:function() {
	  	this.getInfo();
	  }
	}
</script>

<style lang="less">
.staffList {
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