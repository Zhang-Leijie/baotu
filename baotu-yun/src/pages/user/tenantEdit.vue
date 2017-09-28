<template>
	<div class="routeList">
		<el-breadcrumb separator="/">
		  	<el-breadcrumb-item>基本信息</el-breadcrumb-item>
		</el-breadcrumb>

		<el-form label-width="120px" class="appbox">
		  	<el-form-item class="appblock" label="平台名称:">
	    		 <span>{{ tenantData.appName }}</span>
		  	</el-form-item>
		  	<el-form-item class="appblock" label="商家名称:">
	    		 <span>{{ tenantData.name  }}</span>
		  	</el-form-item>
		  	<el-form-item class="appblock" label="联系人:">
	    		 <span>{{ tenantData.contacts  }}</span>
		  	</el-form-item>
		  	<el-form-item class="appblock" label="联系人电话:">
	    		 <span>{{ tenantData.contactsMobile  }}</span>
		  	</el-form-item>
		  	<el-form-item class="appblock" label="创建时间:">
	    		 <span>{{ formatDate(tenantData.created)  }}</span>
		  	</el-form-item>
		  	<el-form-item class="appblock" label="到期时间:">
	    		 <span>{{ formatDate(tenantData.expire)  }}</span>
		  	</el-form-item>
		  	<el-form-item class="appblock" label="营业执照号:">
	    		 <span>{{ tenantData.license  }}</span>
		  	</el-form-item>
		  	<el-form-item class="appblock" label="营业执照图片:">
	    		<el-popover ref="popoverPic" trigger="hover" placement="left" width="800px">
            	    <img :src="tenantData.licenseImage" class="bre"  slot="reference" style="width: 150px;">
                	<img :src="tenantData.licenseImage" style="width: 800px;">
            	</el-popover>
		  	</el-form-item>
		  	<el-form-item class="appblock" label="所属地区:">
	    		 <span>{{ tenantData.regionName  }}</span>
		  	</el-form-item>
		  	<el-form-item class="appblock" label="客服电话:">
	    		 <span>{{ tenantData.servicePhone  }}</span>
		  	</el-form-item>
		  	<el-form-item class="appblock" label="agent:">
		    	<el-input type="text" style="width:150px;" v-model="formBiHu.agent" placeholder="未绑定壁虎"></el-input>
		  	</el-form-item>
		  	<el-form-item class="appblock" label="key:">
		    	<el-input type="text" style="width:150px;" v-model="formBiHu.key" placeholder="未绑定壁虎"></el-input>
		  	</el-form-item>
		  	<!-- <el-form-item class="appblock" label="乐保吧key:">
		    	<el-input type="text" style="width:150px;" v-model="formLeBaoBa.leBaoBaKey" placeholder="未开通乐保吧"></el-input>
		  	</el-form-item> -->
		  	<el-form-item class="appblock" label="乐保吧用户名:">
		    	<el-input type="text" style="width:150px;" v-model="formLeBaoBa.leBaoBaUsername" placeholder="未开通"></el-input>
		  	</el-form-item>
		  	<el-form-item class="appblock" label="乐保吧密码:">
		    	<el-input type="text" style="width:150px;" v-model="formLeBaoBa.leBaoBaPassword" placeholder="未开通"></el-input>
		  	</el-form-item>
		  	<el-form-item class="appblock" label="简捷ID:">
		    	<el-input type="text" style="width:150px;" v-model="tenantData.jianJieId" placeholder="暂无简捷ID"></el-input>
		  	</el-form-item>
		</el-form>

		<div style="clear: both;"></div>

		<div style="margin-bottom: 20px;">
			<el-breadcrumb separator="/">
			  	<el-breadcrumb-item>险企信息</el-breadcrumb-item>
			</el-breadcrumb>
		</div>

		<div class="toolBar">
			<div class="toolBarR">
				<el-button type="primary" @click="dialogAddVisible = true" :disabled="(tableData.length == insurerList.length) && (tableData.length > 0 ? true : false)">绑定险企</el-button>
			</div>
		</div>

		<div style="margin-top:20px">
			<el-table :data="formData" border style="width: 100%;font-size:12px;">
				<el-table-column type="expand">
			    	<template scope="scope">
			        	<el-table :data="scope.row.children" border style="width: 100%;font-size:12px;" v-if="scope.row.children[0]">
			        		<el-table-column prop="insurerName" label="名称"></el-table-column>
			        		<el-table-column label="简捷ID">
			        			<template scope="scope">
					    			<span>{{scope.row.jianJieId == '0'?'未绑定':scope.row.jianJieId}}</span>
						    	</template>
			        		</el-table-column>
			        		<el-table-column label="操作">
						    	<template scope="scope">
					    			<el-button type="text" size="small" @click="editInsurer(scope.row)">编辑</el-button>
			    					<el-button type="text" size="small" @click="deleteInsurer(scope.row)">删除</el-button>
						    	</template>
						    </el-table-column>
			        	</el-table>
			        	<span v-else>无子险企</span>
			    	</template>
			    </el-table-column>
			    <el-table-column prop="insurerName" label="险企名"></el-table-column>
			    <el-table-column label="简捷ID">
			    	<template scope="scope">
		    			<span>{{scope.row.jianJieId == '0'?'未绑定':scope.row.jianJieId}}</span>
			    	</template>
			    </el-table-column>
			    <el-table-column label="线路名">
			    	<template scope="scope">
			    		<span>{{reLaneName(scope.row.lane)}}</span>
			    	</template>
			    </el-table-column>
			    <el-table-column label="操作">
			    	<template scope="scope">
			    		<el-button type="text" size="small" @click="editInsurer(scope.row)" v-show="!scope.row.notIn">编辑</el-button>
			    		<el-button type="text" size="small" @click="deleteInsurer(scope.row)" v-show="!scope.row.notIn">删除</el-button>
			    	</template>
			    </el-table-column>
			</el-table>
			<el-pagination v-if="pageCount" @current-change="pageChange" :current-page="currentPage" :page-size="pageSize" layout="total , prev, pager, next, jumper" :page-count='pageCount' style="margin:20px auto;text-align:center"></el-pagination>
		</div>

		<div class="toolBar">
			<div class="toolBarR">
				<el-button type="primary" @click="saveAll">全部保存</el-button>
			</div>
		</div>

		<el-dialog title="新增险企" :visible.sync="dialogAddVisible" :before-close="handleAddClose">
			<el-form label-width="120px" class="appbox">
			  	<el-form-item class="appblock" label="险企:">
					<el-select v-model="formAdd.insurerId" placeholder="请选择险企" @change="addInsurerChange">
					    <el-option v-for="item in insurerList" :label="item.label" :value="item.value" :key="item.value"></el-option>
					</el-select>
				</el-form-item>
				<div style="clear:both;"></div>
			  	<el-form-item class="appblock" label="线路:" v-show="!formAdd.isMinor">
		    		<el-select v-model="formAdd.laneId" placeholder="请选择线路">
					    <el-option v-for="item in lanes" :label="item.label" :value="item.value" :key="item.value"></el-option>
					</el-select>
			  	</el-form-item>
			  	<!-- <el-form-item class="appblock" label="商户ID:">
			    	<span>{{tid}}</span>
			  	</el-form-item> -->
			  	<el-form-item class="appblock" label="简捷ID:">
			    	<el-input type="text" style="width:150px;" v-model="formAdd.jianJieId" placeholder="请输入ID"></el-input>
			  	</el-form-item>
			</el-form>
			<div style="clear:both"></div>
			<div style="text-align:center;margin-top:20px;">
				<el-button @click="handleAddClose">取消</el-button>
				<el-button type="primary" @click="comfirmAdd">添加险企</el-button>
			</div>
		</el-dialog>

		<el-dialog title="编辑子险企" :visible.sync="showEditDialog" size="small" :before-close="handleEditClose">
			<el-form label-width="120px" class="appbox">
			  	<el-form-item class="appblock" label="线路:" v-show="!formEdit.isMinor">
		    		<el-select v-model="formEdit.laneId" placeholder="请选择线路">
					    <el-option v-for="item in lanes" :label="item.label" :value="item.value" :key="item.value"></el-option>
					</el-select>
			  	</el-form-item>
			  	<!-- <el-form-item class="appblock" label="商户ID:">
			    	<span>{{tid}}</span>
			  	</el-form-item> -->
			  	<el-form-item class="appblock" label="简捷ID:">
			    	<el-input type="text" style="width:150px;" v-model="formEdit.jianJieId" placeholder="请输入ID"></el-input>
			  	</el-form-item>
			</el-form>
		    <div slot="footer" class="dialog-footer">
		        <el-button @click="handleEditClose">取 消</el-button>
		        <el-button type="primary" @click="confirmEdit">确 定</el-button>
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
			tid: null,
			currentPage: 1,
			pageCount: null,
			length: null,
			pageSize: 10,
			tenantData: [], //基本信息
			tableData: [], //险企列表数据
			insurerList: [], //险企列表数据
			formData: [], //分页险企列表数据
			dialogAddVisible: false,
			formBiHu: {
				agent: null,
				key: null
			},
			formLeBaoBa: {
				leBaoBaKey: null,
				leBaoBaUsername: null,
				leBaoBaPassword: null,
			},
			formAdd: {
				laneId: null,
				insurerId: null,
				jianJieId: null,
				isMinor: false,
			},
			formEdit: {
				laneId: null,
				insurerId: null,
				jianJieId: null,
				isMinor: false,
			},
			// isAddBiHu: false,
			lanes: [{
				value: 1,
				label: '壁虎车险'
			}, {
				value: 2,
				label: '乐保吧车险'
			}, {
				value: 3,
				label: '保途车险'
			}],
			mainData: [],	//总数据缓存
			showEditDialog: false,
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
			//总表格数据
			let payloadMain = {};
			payloadMain = JSON.stringify(payloadMain);
			masterApi({
				action: 'insurers',
				version: '1.0',
				payload: payloadMain
			}, window.localStorage.getItem('tokenPlate')).then((res) => {
				if (res.code == 0) {
					if (res.attach) {
						this.mainData = res.attach;
					}
					this.getInsurerList();
				}
			})

			//商家基本信息
			let payload = {
				id: this.tid
			};
			payload = JSON.stringify(payload);
			masterApi({
				action: 'tenant_info',
				version: '1.0',
				payload: payload
			}, window.localStorage.getItem('tokenPlate')).then((res) => {
				if (res.code == 0) {
					this.tenantData = res.attach;
					this.formLeBaoBa.leBaoBaUsername = res.attach.leBaoBaUsername;
					this.formLeBaoBa.leBaoBaPassword = res.attach.leBaoBaPassword;
					this.formBiHu.agent = res.attach.biHuAgent;
					this.formBiHu.key = res.attach.biHuKey;
				}
			})
		},

		getInsurerList() {
			//商家险企列表
			let payloadInsuers = {
				id: this.tid
			};
			payloadInsuers = JSON.stringify(payloadInsuers);
			masterApi({
				action: 'tenant_insurers',
				version: '1.0',
				payload: payloadInsuers,
			}, window.localStorage.getItem('tokenPlate')).then((res) => {
				if (res.code == 0) {
					var dataBuf = [];
					//从总表复制相应信息
					for (let item in res.attach) {
						let buf = res.attach[item];
						for (let j = 0; j < this.mainData.length; j++) {
							if (buf.insurerId == this.mainData[j].id) {
								buf.insurerName = this.mainData[j].name;
								buf.minor = this.mainData[j].minor;
								buf.parentId = this.mainData[j].parentId;
								buf.icon = this.mainData[j].icon;
							}
						}
						dataBuf.push(buf);
					}

					//未加入的险企列表--新增时用到
					this.insurerList = [];
					for (let i = 0; i < this.mainData.length; i++) {
						var haveAdded = false;
						for (let j = 0; j < dataBuf.length; j++) {
							if(dataBuf[j].insurerId == this.mainData[i].id) {
								haveAdded = true;
							}
						}
						if (!haveAdded) {
							let buf = {
								value: this.mainData[i].id,
								label: this.mainData[i].name,
							}
							this.insurerList.push(buf);
						} else {
							//已经加入该险企
						}
					}

					//写入总公司信息
					this.tableData = [];
					for (let i = 0; i < dataBuf.length; i++) {
						dataBuf[i].children = [];
						if (!dataBuf[i].minor) {
							this.tableData.push(dataBuf[i]);
						} else {
							//
						}
					}

					//写入子公司信息
					for (var i = 0; i < dataBuf.length; i++) {
						if (dataBuf[i].minor) {
							var isFound = false;
							for (let j = 0; j < this.tableData.length; j++) {
								if (dataBuf[i].parentId == this.tableData[j].insurerId) {
									this.tableData[j].children.push(dataBuf[i]);
									isFound = true;
								} else {
									//
								}
							}

							//父公司不在该商户拥有的险企列表中
							if (!isFound) {
								for (let j = 0; j < this.mainData.length; j++) {
									if (dataBuf[i].parentId == this.mainData[j].id) {
										let pushBuf = this.mainData[j];
										pushBuf.insurerName = this.mainData[j].name;
										pushBuf.insurerId = this.mainData[j].id;
										pushBuf.children = [];
										pushBuf.notIn = true;	//该条数据该商家没有
										this.tableData.push(pushBuf);
										this.tableData[(this.tableData.length - 1)].children.push(dataBuf[i]);
									} else {
										//
									}
								}
							}
						} else {
							//不是子节点
						}
					}

					this.length = this.tableData.length;
					this.pageCount = parseInt((this.length - 1) / this.pageSize) + 1;
					this.showPage();
				}
			})
		},

		editInsurer(row) {
			this.showEditDialog = true;
			this.formEdit.insurerId = row.insurerId;
			this.formEdit.jianJieId = row.jianJieId;
			this.formEdit.laneId = row.lane;
			this.formEdit.isMinor = row.minor
		},

		addInsurerChange(val) {
			for (let i = 0; i < this.mainData.length; i++) {
				if (this.mainData[i].id == val) {
					this.formAdd.isMinor = this.mainData[i].minor;
				} else {
					//是主险企
				}
			}
		},

		comfirmAdd() {
			this.dialogAddVisible = false;
			if (this.formAdd.insurerId && (this.formAdd.laneId || this.formAdd.jianJieId)) {
				let payload = {
					tid: this.tid,
					insurerId: this.formAdd.insurerId,
					lane: this.rePostLane(this.formAdd.laneId),
					jianJieId: this.formAdd.jianJieId,
				};
				payload = JSON.stringify(payload);
				masterApi({
					action: 'tenant_insurer_edit',
					version: '1.0',
					payload: payload,
					crudType: 1,
				}, window.localStorage.getItem('tokenPlate')).then((res) => {
					if (res.code == 0) {
						this.getInfo();
						this.$message({
							type: 'success',
							message: '新增成功',
						});
					}
				})
			} else {
				this.$message({
					type: 'error',
					message: '选择信息不完整,请检查'
				});

			}
		},

		handleAddClose() {
			this.dialogAddVisible = false;
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

		deleteInsurer(row) {
			this.$confirm('此操作将执行删除, 是否继续?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(() => {
				let payload = {
					tid: this.tid,
					insurerId: row.insurerId,
				}
				payload = JSON.stringify(payload);
				masterApi({
					action: 'tenant_insurer_edit',
					version: '1.0',
					crudType: 8,
					payload: payload,
				}, window.localStorage.getItem('tokenPlate')).then((res) => {
					if (res.code == 0) {
						this.$message({
							type: 'success',
							message: '删除成功'
						});
						this.getInfo();
					}
				})
			}).catch(() => {
				this.$message({
					type: 'info',
					message: '已取消删除'
				});
			});
		},

		saveAll() {
			var payload = {
				tid: this.tid,
				jianJieId: this.tenantData.jianJieId,
				biHuKey: this.formBiHu.key,
				biHuAgent: this.formBiHu.agent,
				// leBaoBaKey: this.formLeBaoBa.leBaoBaKey,
				leBaoBaUsername: this.formLeBaoBa.leBaoBaUsername,
				leBaoBaPassword: this.formLeBaoBa.leBaoBaPassword,
			};

			payload = JSON.stringify(payload);
			masterApi({
				action: 'tenant_set',
				version: '1.0',
				payload: payload,
			}, window.localStorage.getItem('tokenPlate')).then((res) => {
				if (res.code == 0) {
					this.$message({
						type: 'success',
						message: '修改已保存'
					});
					this.getInfo();
				}
			})
		},

		handleEditClose() {
			this.showEditDialog = false;
		},

		confirmEdit() {
			this.showEditDialog = false;
			//post
			if (this.formEdit.laneId || this.formEdit.jianJieId) {
				let payload = {
					tid: this.tid,
					insurerId: this.formEdit.insurerId,
					lane: this.rePostLane(this.formEdit.laneId),
					jianJieId: this.formEdit.jianJieId,
				}
				payload = JSON.stringify(payload);
				masterApi({
					action: 'tenant_insurer_edit',
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
		},

		reLaneName(val) {
			for (let i = 0; i < this.lanes.length; i++) {
				if (this.lanes[i].value == val) {
					return this.lanes[i].label;
					break;
				}
			}
		},

		rePostLane(val) {
			switch(val) {
				case 1:
					return 'BI_HU';
					break;
				case 2:
					return 'LE_BAO_BA';
					break;
				case 3:
					return 'BAO_TU';
					break;
				default:
					return val;
					break;
			}
		}
	},
	mounted() {
		if (this.$route.query.tid) {
			this.tid = this.$route.query.tid;
			this.getInfo();
		}
	}
}
</script>
<style lang="less">
.routeList{
	.toolBar{
		width: 100%;
		overflow: hidden;
		.toolBarR {
			float: right;
		}
	}
	.appbox{
		margin-top: 20px;
		.appblock{
			width: 50%;
			float: left;
		}
	}
}
</style>