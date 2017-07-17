<template>
	<div>
		<el-breadcrumb separator="/">
		  	<el-breadcrumb-item>审核管理</el-breadcrumb-item>
		</el-breadcrumb>
		<div style="margin-top:10px;margin-bottom:10px;">
			<el-select v-model="tenantId" placeholder="请选择" @change="tenantChange">
			    <el-option v-for="item in tenants" :label="item.label" :value="item.value"></el-option>
			</el-select>
			<router-link :to="{name:'shop-shop-add'}">
				<el-button type="primary" class="marginBtn">新增</el-button>
			</router-link>
			<el-button class="marginBtn">重置</el-button>
			<el-button class="marginBtn">搜索</el-button>
			<el-input style="float:right;width:300px;" v-model="searchName" placeholder="请输入信息"></el-input>
			<div style="clear:both"></div>
		</div>
		<div style="margin-top:20px;">
			<el-table :data="tableData" border style="width: 100%;font-size:12px;">
			    <el-table-column prop="uid" label="序号" min-width="70"></el-table-column>
			    <el-table-column prop="name" label="姓名" min-width="100"></el-table-column>
			    <el-table-column prop="mobile" label="手机号" min-width="200"></el-table-column>
			    <el-table-column prop="identity" label="身份证" min-width="80"></el-table-column>
			    <el-table-column prop="parentName" label="邀请人姓名" min-width="140"></el-table-column>
			    <el-table-column prop="parentId" label="邀请人工号" min-width="180"></el-table-column>
			    <el-table-column prop="parentUid" label="邀请人ID" min-width="120"></el-table-column>
			    <el-table-column label="证件照片" min-width="180">
			    	<template scope="scope">
			        	<img :src="scope.row.identityFace">
			        	<img :src="scope.row.identityBack">
			      	</template>
			    </el-table-column>
			    <el-table-column label="申请时间" min-width="120">
			    	<template scope="scope">
			        	<span>formatDate(scope.row.time)</span>
			      	</template>
			    </el-table-column>
			    <el-table-column label="操作" min-width="120">
			      	<template scope="scope">
			        	<el-button type="text" size="small" @click="confirm">同意</el-button>
			        	<el-button type="text" size="small" @click="refuse">拒绝</el-button>
			      	</template>
			    </el-table-column>
			</el-table>
			<el-pagination v-if="pageCount" @current-change="pageChange" :current-page="currentPage" :page-size="pageSize" layout="total , prev, pager, next, jumper" :page-count='pageCount' style="margin:20px auto;text-align:center"></el-pagination>
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
	      pageCount: null,
	      currentPage: 1,
	      pageSize: null,
	      tenantId: null,
	      tenants: []
		}
	  },
	  methods: {
		formatDate (time){
		  var   x = time - 0
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
	  		let employeeId = this.tenantId.employeeId;
	  		autoApi({
	   			action: 'apply_list',
	   			version: '1.0',
	   			employeeId: employeeId
	   		},window.localStorage.getItem('token')).then((res)=> {
	   			if (res.code == 0) {
	   				this.tableData = res.attach.list;
	   				this.pageCount = res.attach.total;
       			}
	   		})
	  	},
	  	pageChange(val) {
	        this.currentPage = val;
	        this.getInfo();
	    },
	    confirm() {
	    	let tid = this.tenantId.tid;
	  		autoApi({
	   			action: 'apply_process',
	   			version: '1.0',
	   			tid: tid,
	   			uid: null,
	   			agree: true
	   		},window.localStorage.getItem('token')).then((res)=> {
	   			if (res.code == 0) {
	   				this.getInfo();
       			}
	   		})
	    },
	    refuse() {
	    	let tid = this.tenantId.tid;
	    	autoApi({
	   			action: 'apply_process',
	   			version: '1.0',
	   			tid: tid,
	   			uid: null,
	   			agree: false
	   		},window.localStorage.getItem('token')).then((res)=> {
	   			if (res.code == 0) {
	   				this.getInfo();
       			}
	   		})
	    },
	    //获取代理商列表
	    getTenanList() {
	    	commonApi({
	   			action: 'tenant_list',
	   			version: '1.0',
	   			client: 2		
	   		},window.localStorage.getItem('token')).then((res)=> {
	   			if (res.code == 0) {
	   				if (res.attach.audit[0]) {
	   					for (var i = 0; i < res.attach.audit.length; i++) {
		   					let buf = {
		   						value: {
		   							tid: null
		   						},
		   						label: null
		   					}
		   					buf.value.tid = res.attach.audit[i].tid;
		   					buf.label = res.attach.audit[i].tname + " (审核中)";
		   					this.tenants.push(buf);
		   				}
	   				}

	   				if (res.attach.own[0]) {
	   					for (var i = 0; i < res.attach.own.length; i++) {
		   					let buf = {
		   						value: {
		   							tid: null,
		   							employeeId: null
		   						},
		   						label: null
		   					}
		   					buf.value.tid = res.attach.own[i].tid;
		   					buf.value.employeeId = res.attach.own[i].employeeId;
		   					buf.label = res.attach.own[i].tname;
		   					this.tenants.push(buf);
		   				}
	   				}
		   				
       			}
	   		}) 
	    },
	    tenantChange(value) {
			this.getInfo();
		},
	  },
	  mounted:function() {
	  	this.getTenanList(); //获取代理商列表
	  }
	}
</script>