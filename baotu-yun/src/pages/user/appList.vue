<template>
	<div class="appList">
		<el-breadcrumb separator="/">
		  	<el-breadcrumb-item>平台列表</el-breadcrumb-item>
		</el-breadcrumb>

		<div class="toolBar">
			<div class="toolBarR">
				<el-button type="primary" @click="addApp">新增</el-button>
			</div>
		</div>

		<div class="tableBox">
			<el-table :data="formData" border style="width: 100%;font-size:12px;">
			    <el-table-column prop="id" label="ID"></el-table-column>
			    <el-table-column prop="name" label="平台名称"></el-table-column>
			    <el-table-column prop="regionName" label="所属行政区划"></el-table-column>
			    <el-table-column label="最大商户数">
			    	<template scope="scope">
			    		<span>{{scope.row.maxTenantsCount?scope.row.maxTenantsCount:'无限制'}}</span>
			    	</template>
			    </el-table-column>
			    <el-table-column label="最大资讯数">
			    	<template scope="scope">
			    		<span>{{scope.row.maxArticlesCount?scope.row.maxArticlesCount:'无限制'}}</span>
			    	</template>
			    </el-table-column>
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
			    		<el-button type="text" size="small" @click="changeState(scope.row.id,scope.row.isAble)">
			      			{{scope.row.isAble?'禁用':'启用'}}
			    		</el-button>
		    			<router-link :to="{name:'app-edit',query:{id:scope.row.id, name:scope.row.name, regionName:scope.row.regionName, region:scope.row.region, maxArticlesCount:scope.row.maxArticlesCount, maxTenantsCount:scope.row.maxTenantsCount}}">
				    		<el-button type="text" size="small">编辑</el-button>
			      		</router-link>
		    			<!-- <router-link :to="{name:'APPPermission',query:{id:scope.row.id, name:scope.row.name}}">
				    		<el-button type="text" size="small">授权</el-button>
			      		</router-link> -->
			    	</template>
			    </el-table-column>
			</el-table>
			<el-pagination v-if="length" @current-change="pageChange" :current-page="currentPage" :page-size="pageSize" layout="total , prev, pager, next, jumper" :total='length' style="margin:20px auto;text-align:center"></el-pagination>
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
			currentPage: 1,
			pageCount: null,
			length: null,
			pageSize: 10,
			tableData: [],
			formData: []
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
			let payload = {};
			payload = JSON.stringify(payload);
			masterApi({
				action: 'apps',
				version: '1.0',
				payload: payload
			}, window.localStorage.getItem('tokenPlate')).then((res) => {
				if (res.code == 0) {
					if (res.attach) {
						for (let i = 0; i < res.attach.length; i++) {
							if ((res.attach[i].mod & 1) == 1) { //该条数据被禁用
								res.attach[i].isAble = false;
							} else {
								res.attach[i].isAble = true;
							}
						}
						this.tableData = res.attach;

						this.length = res.attach.length;
						this.pageCount = parseInt((this.length - 1) / this.pageSize) + 1;
						this.showPage();
					}
				}
			})
		},

		addApp() {
			router.push({
				name: "app-edit"
			})
		},

		showPage() {
			this.formData = [];
			if (this.length * this.pageCount < this.pageSize * this.currentPage) {
				for (let i = 0; i < this.tableData.length; i++) {
					if (i >= (this.currentPage - 1) * this.pageSize) {
						this.formData.push(this.tableData[i])
					}
				}
			} else {
				for (let i = 0; i < this.tableData.length; i++) {
					if (i >= (this.currentPage - 1) * this.pageSize && i < this.currentPage * this.pageSize) {
						this.formData.push(this.tableData[i])
					}
				}
			}
		},

		changeState(id, isAble) {
			if (isAble) { //当前可用,操作为禁用
				let payload = {
					id: id,
				}
				payload = JSON.stringify(payload);
				masterApi({
					action: 'app_seal',
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
					action: 'app_unseal',
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
			this.showPage();
		},
	},
	mounted() {
		this.getInfo();
	}
}
</script>
<style lang="less">
.appList{
	.toolBar{
		width: 100%;
		overflow: hidden;
		.toolBarR {
			float: right;
		}
	}
}
</style>