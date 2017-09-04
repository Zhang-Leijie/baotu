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
				<el-input icon="search" v-model="searchID" placeholder="请输入ID" :on-icon-click="search" style="width:240px"></el-input>
			</div>
		</div>

		<div class="tableBox">
			<el-table :data="tableData" border style="width: 100%;font-size:12px;">
				<el-table-column prop="name" label="姓名"></el-table-column>
				<el-table-column prop="mobile" label="账号"></el-table-column>
			    <el-table-column label="加入时间">
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
			      		<el-button type="text" size="small">
							<router-link :to="{name:'shop-staff-edit',query:{id:scope.row.id}}">编辑</router-link>
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
			let payload = {
		  		page: this.currentPage,
		  		pageSize: this.pageSize,
		  		asc: false,
		  		employeeId: window.localStorage.getItem('employeeId'),
		  		tarId: this.searchID?this.searchID:null,
		  	}
		  	payload = JSON.stringify(payload)
		  	autoApi({
				action: 'employees',
				version: '1.0',
				client: 2,
				payload: payload
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
			this.rootId = window.localStorage.getItem('tid');
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