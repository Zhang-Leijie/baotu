<template>
	<div class="staffListBody">
		<el-breadcrumb separator="/">
		  	<el-breadcrumb-item>员工管理</el-breadcrumb-item>
		</el-breadcrumb>

		<div class="toolBar">
			<div class="btnBox">
				<router-link :to="{name:'shop-verify'}">
					<el-button class="marginBtn">审核员工</el-button>
				</router-link>
				<el-button type="primary" class="marginBtn">员工管理</el-button>
			</div>
			<div class="searchBox">
				<el-input icon="search" v-model="formSearch.mobile" placeholder="账号" :on-icon-click="search" style="width:160px"></el-input>
				<el-input icon="search" v-model="formSearch.ID" placeholder="邀请码" :on-icon-click="search" style="width:160px"></el-input>
			</div>
		</div>

		<div class="tableBox">
			<el-table :data="tableData" border style="width: 100%;font-size:12px;" @sort-change="sortChange">
				<el-table-column prop="name" label="姓名"></el-table-column>
				<el-table-column prop="mobile" label="账号"></el-table-column>
			    <el-table-column prop="created" label="加入时间" sortable="custom">
			    	<template scope="scope">
			    		<span>{{scope.row.created?formatDate(scope.row.created):''}}</span>
			    	</template>
			    </el-table-column>
			    <el-table-column label="支付方式">
			    	<template scope="scope">
			    		<span>{{payType(scope.row.mod)}}</span>
			    	</template>
			    </el-table-column>
			    <el-table-column prop="parentName" label="邀请人"></el-table-column>
			    <el-table-column prop="id" label="邀请码"></el-table-column>
			    <el-table-column label="操作"> 
			    	<template scope="scope">
						<el-button type="text" size="small" @click="changeState(scope.row.id,scope.row.isAble)">
			      			{{scope.row.isAble?'禁用':'启用'}}
			    		</el-button>
			      		<el-button type="text" size="small">
							<router-link :to="{name:'shop-staff-edit',query:{id:scope.row.id,name:scope.row.name}}">编辑</router-link>
			      		</el-button>
			      		<el-button type="text" size="small" v-if="isRoot && !(rootId == scope.row.id)">
							<router-link :to="{name:'shop-staff-permission',query:{id:scope.row.id,name:scope.row.name}}">授权</router-link>
			      		</el-button>
			      	</template>
			    </el-table-column>
			</el-table>
			<el-pagination v-if="total" @current-change="pageChange" :current-page="currentPage" :page-size="pageSize" layout="total , prev, pager, next, jumper" :total='total' style="margin:20px auto;text-align:center"></el-pagination>
		</div>
	</div>
</template>
<script>
import { autoApi } from '@/ajax/post.js'
export default {
	data() {
		return {
			isRoot: false,
			rootId: null,
		  	total: null,
		  	pageSize: 10,
		  	currentPage: 1,
		  	formSearch: {
		  		mobile: null,
		  		ID: null,
		  	},
		  	sort: {
		  		sortCol: null,
		  		asc: false,
		  	},
		  	tableData: [],
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
			let payload = {
		  		page: this.currentPage,
		  		pageSize: this.pageSize,
		  		sortCol: this.sort.sortCol?this.sort.sortCol:null,
		  		asc: this.sort.asc,
		  		employeeId: window.localStorage.getItem('employeeId'),
		  		tarId: this.formSearch.ID?this.formSearch.ID:null,
		  		mobile: this.formSearch.mobile?this.formSearch.mobile:null,
		  	}
		  	payload = JSON.stringify(payload)
		  	autoApi({
				action: 'employees',
				version: '1.0',
				client: 2,
				payload: payload
			},window.localStorage.getItem('token')).then((res)=> {
				if (res.code == 0) {
					if (res.attach.list) {
	   					for (let i = 0; i < res.attach.list.length; i++) {
	   						//mod敏感值待定
	   						if((res.attach.list[i].mod & 1) == 1) {	//该条数据被禁用
	   							res.attach.list[i].isAble = false;
	   						}
	   						else {
	   							res.attach.list[i].isAble = true;
	   						}
	   					}
		   				this.tableData = res.attach.list;
	   				}
					this.total = res.attach.total;
				}
			})
		},

		sortChange(val) {
			if (val.order == "ascending") {
				this.sort.asc = true;
				this.sort.sortCol = "created";
			}
			else
			{
				this.sort.asc = false;
				this.sort.sortCol = "created";
			}
			this.getInfo();
		},

	  	changeState(id,isAble) {debugger
	  		if (isAble) {	//当前可用,操作为禁用
	  			let payload = {
	  				employeeId: window.localStorage.getItem('employeeId'),
	  				id: id,
	  			}
	  			payload = JSON.stringify(payload);
	  			autoApi({
		   			action: 'employee_seal',
		   			version: '1.0',
		   			payload: payload
		   		},window.localStorage.getItem('token')).then((res)=> {
		   			//
		   		});
	  		}
	  		else
	  		{	//当前不可用,操作为解禁
	  			let payload = {
	  				employeeId: window.localStorage.getItem('employeeId'),
	  				id: id,
	  			}
	  			payload = JSON.stringify(payload);
	  			autoApi({
		   			action: 'employee_unseal',
		   			version: '1.0',
		   			payload: payload
		   		},window.localStorage.getItem('token')).then((res)=> {
		   			//
		   		});
	  		}
	  	},

		pageChange(pg) {
			this.currentPage = pg;
	    	this.getInfo();
		},

		search() {
			this.getInfo();
		},

		payType(val) {
			const mod = [
			{
				value: 128,
				label: '全额支付'
			},
			{
				value: 256,
				label: '净保费支付'
			},
			{
				value: 512,
				label: '公司垫付'
			}];
			for (let i = 0; i < mod.length; i++) {
				let result = mod[i].value & val;
				if (mod[i].value == result) {
					return mod[i].label;
				}
			}
		}
	},
	created() {
		this.getInfo();
		if (window.localStorage.getItem('isRoot_tenant') == "y") {
			this.isRoot = true;
			this.rootId = window.localStorage.getItem('employeeId');
		}
		else
		{
			this.isRoot = false;
			this.rootId = null;
		}
	}
}
</script>
<style lang="less">
.staffListBody {
	.toolBar {
		width: 100%;
		overflow: hidden;
		.btnBox {
			float: left;
			margin-top: 10px;
		}
		.searchBox {
			float: right;
		}
	}
	.tableBox {
		margin-top: 20px;
	}
}
</style>