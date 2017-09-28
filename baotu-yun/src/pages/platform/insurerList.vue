<template>
	<div class="insurerList">
		<el-breadcrumb separator="/">
		  	<el-breadcrumb-item>险企列表</el-breadcrumb-item>
		</el-breadcrumb>

		<div class="toolBar">
			<div class="toolBarR">
				<el-button type="primary" @click="addInsurer">新增</el-button>
			</div>
		</div>

		<div class="tableBox">
			<el-table :data="formData" border style="width: 100%;font-size:12px;">
				<el-table-column type="expand">
			    	<template scope="scope">
			        	<el-table :data="scope.row.children" border style="width: 100%;font-size:12px;" v-if="scope.row.children[0]">
			        		<el-table-column prop="name" label="名称"></el-table-column>
			        		<el-table-column label="操作">
						    	<template scope="scope">
					    			<el-button type="text" @click="childEdit(scope.row)">编辑</el-button>
						    	</template>
						    </el-table-column>
			        	</el-table>
			        	<span v-else>无子险企</span>
			    	</template>
			    </el-table-column>
			    <el-table-column prop="id" label="险企ID"></el-table-column>
			    <el-table-column prop="name" label="名称"></el-table-column>
			    <el-table-column label="图标">
			    	<template scope="scope">
		            	<el-popover ref="popoverPic" trigger="hover" placement="left" width="500px">
		            	    <img :src="scope.row.icon" class="bre"  slot="reference" style="width: 80px;">
	                    	<img :src='scope.row.icon' style="width: 475px;">
	                	</el-popover>
			    	</template>
			    </el-table-column>
			    <el-table-column label="壁虎id">
			    	<template scope="scope">
			    		<span>{{scope.row.biHuId?scope.row.biHuId:'未开通'}}</span>
			    	</template>
			    </el-table-column>
			    <el-table-column label="乐保吧id">
			    	<template scope="scope">
			    		<span>{{scope.row.leBaoBaId?scope.row.leBaoBaId:'未开通'}}</span>
			    	</template>
			    </el-table-column>
			  <!--   <el-table-column label="简捷id">
			    	<template scope="scope">
			    		<span>{{scope.row.jianJieId?scope.row.jianJieId:'未开通'}}</span>
			    	</template>
			    </el-table-column> -->
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
		    			<router-link :to="{name:'insurer-edit',query:{id:scope.row.id, name:scope.row.name, icon:scope.row.icon, biHuId:scope.row.biHuId, leBaoBaId:scope.row.leBaoBaId}}">
				    		<el-button type="text" size="small">编辑</el-button>
			      		</router-link>
			    	</template>
			    </el-table-column>
			</el-table>
			<el-pagination v-if="length" @current-change="pageChange" :current-page="currentPage" :page-size="pageSize" layout="total , prev, pager, next, jumper" :total='length' style="margin:20px auto;text-align:center"></el-pagination>
		</div>

		<el-dialog title="编辑子险企" :visible.sync="showEditDialog" size="small" :before-close="handleEditClose">
			<el-input v-model="editChild.name"></el-input>
		    <div slot="footer" class="dialog-footer">
		        <el-button @click="handleEditClose">取 消</el-button>
		        <el-button type="primary" @click="confirmChildEdit">确 定</el-button>
		    </div>
		</el-dialog>
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
			formData: [],
			showEditDialog: false,
			editChild: {
				id: null,
				name: null,
			}
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
				action: 'insurers',
				version: '1.0',
				payload: payload
			}, window.localStorage.getItem('tokenPlate')).then((res) => {
				if (res.code == 0) {
					if (res.attach) {
						var parentData = [];
						for (let i = 0; i < res.attach.length; i++) {
							if (!res.attach[i].minor) {
								res.attach[i].children = [];
								parentData.push(res.attach[i]);
							} else {
								//
							}
						}

						for (var i = 0; i < res.attach.length; i++) {
							if (res.attach[i].minor) {
								for (let j = 0; j < parentData.length; j++) {
									if (parentData[j].id == res.attach[i].parentId) {
										parentData[j].children.push(res.attach[i]);
									} else {
										//
									}
								}
							} else {
								//
							}
						}

						this.tableData = parentData;
						this.length = parentData.length;
						this.pageCount = parseInt((this.length - 1) / this.pageSize) + 1;
						this.showPage();
					}
				}
			})
		},

		addInsurer() {
			router.push({
				name: "insurer-edit"
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

		pageChange(pg) {
			this.currentPage = pg;
			this.showPage();
		},

		childEdit(row) {
			this.showEditDialog = true;
			this.editChild.id = row.id;
			this.editChild.name = row.name;
		},

		handleEditClose() {
			this.showEditDialog = false;
		},

		confirmChildEdit() {
			this.showEditDialog = false;
			//post
			if (this.editChild.name) {
				let payload = {
					id: this.editChild.id,
					name: this.editChild.name,
					minor: true,
				}
				payload = JSON.stringify(payload);
				masterApi({
					action: 'insurer_edit',
					version: '1.0',
					crudType: 4,
					payload: payload,
				}, window.localStorage.getItem('tokenPlate')).then((res) => {
					if (res.code == 0) {
						this.$message({
							type: 'success',
							message: '险企修改已保存'
						});

						this.getInfo();
					}
				})
			} else {
				this.$message({
					message: '输入名称为空,已取消编辑',
					type: 'error',
				});
			}
		}
	},
	mounted() {
		this.getInfo();
	}
}
</script>
<style lang="less">
.insurerList{
	.toolBar{
		width: 100%;
		overflow: hidden;
		.toolBarR {
			float: right;
		}
	}
}
</style>