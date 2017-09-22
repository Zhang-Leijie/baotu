<template>
	<div class="verifyBody">
		<el-breadcrumb separator="/">
		  	<el-breadcrumb-item>审核管理</el-breadcrumb-item>
		</el-breadcrumb>
		
		<div class="toolBar">
			<div class="btnBox">
				<el-button type="primary" class="marginBtn">审核员工</el-button>
				<router-link :to="{name:'shop-staff-list'}">
					<el-button class="marginBtn">员工管理</el-button>
				</router-link>
			</div>
			<div class="searchBox">
				<el-input icon="search" v-model="searchName" placeholder="请输入ID" :on-icon-click="search" style="width:240px"></el-input>
			</div>
		</div>

		<div class="tableBox">
			<el-table :data="tableData" border style="width: 100%;font-size:12px;">
			    <el-table-column prop="uid" label="序号"></el-table-column>
			    <el-table-column prop="name" label="姓名"></el-table-column>
			    <el-table-column prop="mobile" label="账号"></el-table-column>
			    <el-table-column prop="identity" label="证件号"></el-table-column>
			    <el-table-column label="申请时间">
			    	<template scope="scope">
			        	<span>{{scope.row.time?formatDate(scope.row.time):''}}</span>
			      	</template>
			    </el-table-column>
			    <el-table-column prop="parentName" label="邀请人"></el-table-column>
			    <el-table-column prop="parentMobile" label="邀请人手机号"></el-table-column>
			    <el-table-column label="证件照片">
			    	<template scope="scope">
			        	<img :src="scope.row.identityFace">
			        	<img :src="scope.row.identityBack">
			      	</template>
			    </el-table-column>
			    <el-table-column label="操作">
			      	<template scope="scope">
			        	<el-button type="text" size="small" @click="reject(scope.row,false)">同意</el-button>
			        	<el-button type="text" size="small" @click="reject(scope.row,true)">拒绝</el-button>
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
			searchName: '',
			tableData: [],
			total: null,
			currentPage: 1,
			pageSize: 10
		}
	},
	methods: {
		formatDate(time) {
			var x = (time - 0) * 1000

			var now = new Date(x)
			var year = now.getFullYear();
			var month = "0" + (now.getMonth() + 1);
			var date = "0" + (now.getDate());
			var hour = "0" + now.getHours();
			var min = "0" + now.getMinutes();
			return year + "-" + month.substr(-2) + "-" + date.substr(-2) + '   ' + hour.substr(-2) + ':' + min.substr(-2)
		},

		getInfo() {
			let payload = {
				page: this.currentPage,
				pageSize: this.pageSize,
				employeeId: window.localStorage.getItem('employeeId'),
			}
			payload = JSON.stringify(payload);
			autoApi({
				action: 'apply_list',
				version: '1.0',
				payload: payload
			}, window.localStorage.getItem('token')).then((res) => {
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

		reject(row, isReject) {
			let payload = {
				uid: row.uid,
				reject: isReject,
				employeeId: window.localStorage.getItem('employeeId'),
			}
			payload = JSON.stringify(payload);
			autoApi({
				action: 'apply_audit',
				version: '1.0',
				payload: payload
			}, window.localStorage.getItem('token')).then((res) => {
				if (res.code == 0) {
					this.getInfo();
				}
			})
		},

		search() {
			this.getInfo();
		},
	},
	mounted() {
		this.getInfo(); //获取代理商列表
	},
}
</script>
<style lang="less">
.verifyBody {
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