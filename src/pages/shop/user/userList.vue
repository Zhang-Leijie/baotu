<template>
	<div>
		<el-breadcrumb separator="/">
		  	<el-breadcrumb-item>用户信息</el-breadcrumb-item>
		</el-breadcrumb>
		<div style="margin-top:10px;margin-bottom:10px;">
			<el-input icon="search" v-model="searchName" placeholder="请输入姓名" :on-icon-click="search" style="float:right;width:240px;"></el-input>
			<el-input icon="search" v-model="searchMobile" placeholder="请输入账号(+86)" :on-icon-click="search" style="float:right;width:240px;"></el-input>
			<div style="clear:both"></div>
		</div>
		<div style="margin-top:20px;">
			<el-table :data="tableData" border style="width: 100%;font-size:12px;">
			    <el-table-column prop="uid" label="序号"></el-table-column>
			    <el-table-column prop="name" label="姓名"></el-table-column>
			    <el-table-column label="头像">
			    	<template scope="scope">
			        	<img :src="scope.row.avatar">
			      	</template>
			    </el-table-column>
			    <el-table-column prop="mobile" label="账号"></el-table-column>
			    <el-table-column label="登录时间">
			    	<template scope="scope">
			    		<span>{{scope.row.pcLoginTime?formatDate(scope.row.pcLoginTime):''}}</span>
			    	</template>
			    </el-table-column>
			     <el-table-column label="注册时间">
			    	<template scope="scope">
			    		<span>{{scope.row.created?formatDate(scope.row.created):''}}</span>
			    	</template>
			    </el-table-column>
			     <el-table-column label="最近修改时间">
			    	<template scope="scope">
			    		<span>{{scope.row.updated?formatDate(scope.row.updated):''}}</span>
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
	      currentPage: 1,
	      pageCount: null,
	      pageSize: 10,
	      searchName: '',
	      searchMobile: '',
	      tableData: [],
		}
	  },
	  methods: {
	  	formatDate(time) {
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
	  		let userSearch = {
	  			page: this.currentPage,
	  			pageSize: this.pageSize,
	  			asc: false,
	  			name: this.searchName?this.searchName:null,
	  			mobile: this.searchMobile?'+86' + this.searchMobile:null
	  		}
	  		userSearch = JSON.stringify(userSearch);
	  		autoApi({
	   			action: 'user_list',
	   			version: '1.0',
	   			client: 2,
	   			userSearch: userSearch
	   		},window.localStorage.getItem('token')).then((res)=> {
	   			if (res.code == 0) {
	   				this.tableData = res.attach.list;
	   				this.pageCount = res.attach.total;
       			}
	   		})
	  	},
	  	search() {
	  		this.getInfo();
	  	},
	  	pageChange(pg) {
	  		this.currentPage = pg;
	        this.getInfo(); 
	    },
	  },
	  mounted:function() {
	  	this.getInfo();
	  }
	}
</script>