<template>
	<div class="userListBody">
		<el-breadcrumb separator="/">
		  	<el-breadcrumb-item>用户信息</el-breadcrumb-item>
		</el-breadcrumb>
		<div style="margin-top:10px;margin-bottom:10px;">
			<el-input icon="search" v-model="searchName" placeholder="请输入姓名" :on-icon-click="search" style="float:right;width:240px;"></el-input>
			<!-- <el-input icon="search" v-model="searchMobile" placeholder="请输入账号(+86)" :on-icon-click="search" style="float:right;width:240px;"></el-input> -->
			<div style="clear:both"></div>
		</div>
		<div class="tableBox">
			<el-table :data="tableData" border style="width: 100%;font-size:12px;">
			    <el-table-column prop="uid" label="ID"></el-table-column>
			    <el-table-column prop="name" label="姓名"></el-table-column>
			    <!-- <el-table-column label="申请代理商数量"></el-table-column> -->
			    <el-table-column label="注册时间">
			    	<template scope="scope">
			    		<span>{{formatDate(scope.row.created)}}</span>
			    	</template>
			    </el-table-column>
			    <el-table-column label="最后登录时间">
			    	<template scope="scope">
			    		<span>{{formatDate(scope.row.pcLoginTime)}}</span>
			    	</template>
			    </el-table-column>
			    <el-table-column label="状态">
			    	<template scope="scope">
			    		<span>{{scope.row.isAble?'正常':'禁用'}}</span>
			    	</template>
			    </el-table-column>
			    <el-table-column label="操作">
					<template scope="scope">
						<el-button type="text" size="small" @click="changeState(scope.row.uid,scope.row.isAble)" v-if="!(myId == scope.row.uid) && !((scope.row.mod & 1) == 1)">
			      			{{scope.row.isAble?'禁用':'启用'}}
			    		</el-button>
						<el-button type="text" size="small" v-if="!(myId == scope.row.uid) && isRoot">
				    		<router-link :to="{name:'shop-user-permission',query:{id:scope.row.uid,name:scope.row.name}}">
				      			授权
				      		</router-link>
			    		</el-button>
				    </template>
			    </el-table-column>
			</el-table>
			<el-pagination v-if="total" @current-change="pageChange" :current-page="currentPage" :page-size="pageSize" layout="total , prev, pager, next, jumper" :total='total' style="margin:20px auto;text-align:center"></el-pagination>
		</div>
	</div>
</template>
<script>
import {
	autoApi
} from '@/ajax/post.js'

export default {
	data() {
		return {
			myId: null,
			isRoot: false,
			currentPage: 1,
			total: null,
			pageSize: 10,
			searchName: '',
			searchMobile: '',
			tableData: [],
		}
	},
	methods: {
		formatDate(time) {
			var x = (time - 0) * 1000;

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
				asc: false,
				name: this.searchName ? this.searchName : null,
				mobile: this.searchMobile ? '+86' + this.searchMobile : null
			}
			payload = JSON.stringify(payload);
			autoApi({
				action: 'users',
				version: '1.0',
				client: 2,
				payload: payload
			}, window.localStorage.getItem('token')).then((res) => {
				if (res.code == 0) {
					if (res.attach.list) {
						for (let i = 0; i < res.attach.list.length; i++) {
							if ((res.attach.list[i].mod & 2) == 2) { //该条数据被禁用
								res.attach.list[i].isAble = false;
							} else {
								res.attach.list[i].isAble = true;
							}
						}
						this.tableData = res.attach.list;
					}
					this.total = res.attach.total;
				}
			})
		},
		search() {
			this.getInfo();
		},

		changeState(id, isAble) {
			if (isAble) { //当前可用,操作为禁用
				let payload = {
					id: id,
				}
				payload = JSON.stringify(payload);
				autoApi({
					action: 'user_seal',
					version: '1.0',
					payload: payload
				}, window.localStorage.getItem('token')).then((res) => {
					if (res.code == 0) {
						this.getInfo();
						this.$message({
							message: '禁用成功',
							type: 'success',
						});
					}
				});
			} else { //当前不可用,操作为解禁
				let payload = {
					id: id,
				}
				payload = JSON.stringify(payload);
				autoApi({
					action: 'user_unseal',
					version: '1.0',
					payload: payload
				}, window.localStorage.getItem('token')).then((res) => {
					if (res.code == 0) {
						this.getInfo();
						this.$message({
							message: '解禁成功',
							type: 'success',
						});
					}
				});
			}
		},

		pageChange(pg) {
			this.currentPage = pg;
			this.getInfo();
		},
	},
	created() {
		this.getInfo();
		this.myId = window.localStorage.getItem('userId_plate');
		window.localStorage.getItem('isRoot_plate') == "y" ? this.isRoot = true : this.isRoot = false;
	}
}
</script>
<style lang="less">
.userListBody{
	.contentBox{
		margin-top: 20px;
		margin-left: 10px;
	}
}
</style>