<template>
	<div class="shopListBody">
		<el-breadcrumb separator="/">
		  	<el-breadcrumb-item>商家账号管理</el-breadcrumb-item>
		</el-breadcrumb>

		<div class="toolBar">
			<div class="btnBox">
				<router-link :to="{name:'shop-shop-add'}">
					<el-button type="primary" class="marginBtn">新增</el-button>
				</router-link>
			</div>
			<div class="searchBox">
				<el-input icon="search" v-model="searchName" placeholder="请输入Name" :on-icon-click="search" style="width:240px"></el-input>
				<el-input icon="search" v-model="searchId" placeholder="请输入Id" :on-icon-click="search" style="width:240px"></el-input>
			</div>
		</div>

		<div class="tableBox">
			<el-table
			    :data="tableData"
			    border
			    style="width: 100%;font-size:12px;">
			    <el-table-column prop="tid" label="商户ID"></el-table-column>
			    <el-table-column prop="name" label="商家名"></el-table-column>
			    <el-table-column prop="teamDepth" label="最大团队层级"></el-table-column>
			    <!-- <el-table-column prop="regionName" label="行政区划名称"></el-table-column> -->
			    <el-table-column prop="license" label="营业执照号"></el-table-column>
			    <el-table-column prop="contacts" label="联系人"></el-table-column>
			    <el-table-column prop="contractsMobile" label="联系人电话"></el-table-column>
			    <!-- <el-table-column prop="licenseImage" label="营业执照">
			    	<template scope="scope">
		            	<el-popover ref="popoverPic" trigger="hover" placement="left" width="500px">
		            	    <img :src="scope.row.licenseImage" class="bre"  slot="reference" style="width: 80px;">
	                    	<img :src='scope.row.licenseImage' style="width: 475px;">
	                	</el-popover>
			    	</template>
			    </el-table-column> -->
			    <el-table-column label="过期时间">
			    	<template scope="scope">
			    		<span>{{formatDate(scope.row.expire)}}</span>
			    	</template>
			    </el-table-column>
			    <el-table-column label="注册时间">
			    	<template scope="scope">
			    		<span>{{formatDate(scope.row.created)}}</span>
			    	</template>
			    </el-table-column>
			    <!-- <el-table-column prop="timeLastChange" label="最近修改时间">
			    	<template scope="scope">
			    		<span>{{formatDate(scope.row.updated)}}</span>
			    	</template>
			    </el-table-column> -->
			    <el-table-column label="操作">
			      <template scope="scope">
					<el-button type="text" size="small" @click="changeState(scope.row.tid,scope.row.isAble)">
		      			{{scope.row.isAble?'禁用':'启用'}}
		    		</el-button>
					<router-link :to="{name:'shop-shop-edit',query:{tid:scope.row.tid,contacts:scope.row.contacts,contractsMobile:scope.row.contractsMobile,expire:scope.row.expire}}">
			      		<el-button type="text" size="small">编辑</el-button>
		      		</router-link>
					<!-- <router-link :to="{name:'shop-shop-permission',query:{id:scope.row.tid,name:scope.row.name}}">
			      		<el-button type="text" size="small">授权</el-button>
		      		</router-link> -->
			        <!-- <el-button type="text" size="small">禁用</el-button>
			        <el-button type="text" size="small">启用</el-button>
			        <el-button type="text" size="small">轮播图</el-button> -->
			        <!-- <el-button type="text" size="small" @click="deleteShop(scope.row)">删除</el-button> -->
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
			searchName: null,
			searchId: null,
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
			return year + "-" + month.substr(-2) + "-" + date.substr(-2) + ' ' + hour.substr(-2) + ':' + min.substr(-2)
		},

		getInfo() {
			let payload = {
				page: this.currentPage,
				pageSize: this.pageSize,
				tid: this.searchId,
				name: this.searchName
			};

			payload = JSON.stringify(payload);

			autoApi({
				action: 'tenants',
				version: '1.0',
				payload: payload
			}, window.localStorage.getItem('token')).then((res) => {
				if (res.code == 0) {
					if (res.attach.list) {
						for (let i = 0; i < res.attach.list.length; i++) {
							if ((res.attach.list[i].mod & 16384) == 16384) { //该条数据被禁用
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

		changeState(id, isAble) {
			if (isAble) { //当前可用,操作为禁用
				let payload = {
					id: id,
				}
				payload = JSON.stringify(payload);
				autoApi({
					action: 'tenant_seal',
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
					action: 'tenant_unseal',
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

		search() {
			this.getInfo();
		},

		deleteShop(row) {
			this.$confirm('此操作将永久删除该系数, 是否继续?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(() => {
				this.$message({
					type: 'info',
					message: 'API未接入,因此操作未执行'
				});
			}).catch(() => {
				this.$message({
					type: 'info',
					message: '已取消删除'
				});
			});
		},
	},
	mounted() {
		this.getInfo();
	}
}
</script>
<style lang="less">
.shopListBody {
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