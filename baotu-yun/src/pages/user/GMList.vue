<template>
	<div class="GMList">
		<el-breadcrumb separator="/">
		  	<el-breadcrumb-item>管理员账号</el-breadcrumb-item>
		</el-breadcrumb>

		<div class="toolBar">
			<div class="toolBarR">
				<el-button type="primary" @click="addGM">新增</el-button>
			</div>
		</div>

		<div class="tableBox">
			<el-table :data="tableData" border style="width: 100%;font-size:12px;">
			    <el-table-column prop="id" label="ID"></el-table-column>
			    <el-table-column prop="name" label="姓名"></el-table-column>
			     <el-table-column label="注册时间">
			    	<template scope="scope">
			    		<span>{{formatDate(scope.row.created)}}</span>
			    	</template>
			    </el-table-column>
			    <el-table-column label="最近修改时间">
			    	<template scope="scope">
			    		<span>{{formatDate(scope.row.updated)}}</span>
			    	</template>
			    </el-table-column>
			    <el-table-column label="操作">
			    	<template scope="scope">
			    		<el-button type="text" size="small" @click="changeState(scope.row.id,scope.row.isAble)" v-if="!(scope.row.id == myId) && !((scope.row.mod & 1) == 1)">
			      			{{scope.row.isAble?'禁用':'启用'}}
			    		</el-button>
		    			<router-link :to="{name:'GMPermission',query:{id:scope.row.id, name:scope.row.name}}">
				    		<el-button type="text" size="small" v-if="!(scope.row.id == myId) && isRoot">授权</el-button>
			      		</router-link>
			    	</template>
			    </el-table-column>
			</el-table>
			<el-pagination v-if="total" @current-change="pageChange" :current-page="currentPage" :page-size="pageSize" layout="total , prev, pager, next, jumper" :total='total' style="margin:20px auto;text-align:center"></el-pagination>
		</div>
	</div>
</template>
<script>
import {
	masterApi
} from '@/ajax/post.js'

export default {
	data() {
		return {
			myId: null,
			isRoot: false,
			currentPage: 1,
			total: null,
			pageSize: 10,
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
			}
			payload = JSON.stringify(payload);
			masterApi({
				action: 'admins',
				version: '1.0',
				payload: payload
			}, window.localStorage.getItem('tokenPlate')).then((res) => {
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

		addGM() {
			router.push({
				name: "GM-edit"
			})
		},

		changeState(id, isAble) {
			if (isAble) { //当前可用,操作为禁用
				let payload = {
					id: id,
				}
				payload = JSON.stringify(payload);
				masterApi({
					action: 'admin_seal',
					version: '1.0',
					payload: payload
				}, window.localStorage.getItem('tokenPlate')).then((res) => {
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
				masterApi({
					action: 'admin_unseal',
					version: '1.0',
					payload: payload
				}, window.localStorage.getItem('tokenPlate')).then((res) => {
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
	mounted() {
		this.getInfo();
		this.myId = window.localStorage.getItem('loginId_baotu');
		window.localStorage.getItem('isRoot_baotu') == 'y' ? this.isRoot = true : this.isRoot = false;
	}
}
</script>
<style lang="less">
.GMList{
	.toolBar{
		width: 100%;
		overflow: hidden;
		.toolBarR {
			float: right;
		}
	}
}
</style>