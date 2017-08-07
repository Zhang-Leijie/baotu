<template>
	<div class="verify">
		<el-breadcrumb separator="/">
		  	<el-breadcrumb-item>审核管理</el-breadcrumb-item>
		</el-breadcrumb>
		
		<div class="toolBar">
			<div class="btnBox">
				<router-link :to="{name:'shop-staff-add'}">
					<el-button type="primary" class="marginBtn">新增</el-button>
				</router-link>
			</div>
			<div class="searchBox">
				<el-input icon="search" v-model="searchName" placeholder="请输入ID" :on-icon-click="search" style="width:240px"></el-input>
			</div>
		</div>

		<div style="margin-top:20px;">
			<el-table :data="tableData" border style="width: 100%;font-size:12px;">
			    <el-table-column prop="uid" label="ID"></el-table-column>
			    <el-table-column prop="name" label="姓名"></el-table-column>
			    <el-table-column prop="mobile" label="手机号"></el-table-column>
			    <el-table-column prop="identity" label="身份证"></el-table-column>
			    <el-table-column prop="parentName" label="邀请人姓名"></el-table-column>
			    <el-table-column prop="parentId" label="邀请人工号"></el-table-column>
			    <el-table-column prop="parentUid" label="邀请人ID"></el-table-column>
			    <el-table-column label="证件照片">
			    	<template scope="scope">
			        	<img :src="scope.row.identityFace">
			        	<img :src="scope.row.identityBack">
			      	</template>
			    </el-table-column>
			    <el-table-column label="申请时间">
			    	<template scope="scope">
			        	<span>{{scope.row.time?formatDate(scope.row.time):''}}</span>
			      	</template>
			    </el-table-column>
			    <el-table-column label="操作">
			      	<template scope="scope">
			        	<el-button type="text" size="small" @click="confirm(scope.row)">同意</el-button>
			        	<el-button type="text" size="small" @click="refuse(scope.row)">拒绝</el-button>
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
	      searchName: '',
	      tableData: [],
	      total: null,
	      currentPage: 1,
	      pageSize: null
		}
	  },
	  methods: {
		formatDate (time){
		  var   x = (time - 0) * 1000

		  var   now = new Date(x) 
		  var   year = now.getFullYear();     
		  var   month = "0" + (now.getMonth()+1);     
		  var   date = "0" +(now.getDate());   
		  var   hour = "0" +now.getHours();
		  var   min =  "0" +now.getMinutes();
		  return   year+"-"+month.substr(-2)+"-"+date.substr(-2)+'   '+ hour.substr(-2) +':'+min.substr(-2)
		},

	  	getInfo() {
	  		autoApi({
	   			action: 'apply_list',
	   			version: '1.0',
	   			employeeId: window.localStorage.getItem('employeeId')
	   		},window.localStorage.getItem('token')).then((res)=> {
	   			if (res.code == 0) {
	   				this.tableData = res.attach.list;
	   				this.total = res.attach.total;
       			}
	   		})
	  	},
	  	pageChange(val) {
	        this.currentPage = val;
	        this.getInfo();
	    },
	    confirm(row) {
	    	let uid = row.uid;
	  		autoApi({
	   			action: 'apply_process',
	   			version: '1.0',
	   			employeeId: window.localStorage.getItem('employeeId'),
	   			uid: uid,
	   			agree: true
	   		},window.localStorage.getItem('token')).then((res)=> {
	   			if (res.code == 0) {
	   				this.getInfo();
       			}
	   		})
	    },
	    refuse(row) {
	    	let uid = row.uid;
	  		autoApi({
	   			action: 'apply_process',
	   			version: '1.0',
	   			employeeId: window.localStorage.getItem('employeeId'),
	   			uid: uid,
	   			agree: false
	   		},window.localStorage.getItem('token')).then((res)=> {
	   			if (res.code == 0) {
	   				this.getInfo();
       			}
	   		})
	    },

	    search() {
	    	this.getInfo();
	    }
	  },
	  mounted() {
	  	this.getInfo(); //获取代理商列表
	  }
	}
</script>

<style lang="less">
.verify {
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