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
	    		 <img :src="tenantData.licenseImage">
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
				<el-button type="primary" @click="dialogTableVisible = true" :disabled="tableData.length == insurerList.length">新增路由</el-button>
			</div>
		</div>

		<el-breadcrumb separator="/">
		  	<el-breadcrumb-item>报价险企列表</el-breadcrumb-item>
		</el-breadcrumb>
		<div class="tableBox">
			<el-table :data="formData" border style="width: 100%;font-size:12px;">
			    <el-table-column prop="key" label="路由ID"></el-table-column>
			    <!-- <el-table-column prop="insurerId" label="险企ID"></el-table-column> -->
			    <el-table-column prop="insurerName" label="险企名"></el-table-column>
			    <!-- <el-table-column prop="lane" label="线路ID"></el-table-column> -->
			    <el-table-column label="线路名">
			    	<template scope="scope">
			    		<span v-if="!(isEdit && editedId === scope.row.key)">{{scope.row.laneName}}</span>
			    		<el-select v-model="formEdit.laneId" placeholder="请选择线路" v-if="isEdit && editedId === scope.row.key">
						    <el-option v-for="item in lanes" :label="item.label" :value="item.value" :key="item.value"></el-option>
						</el-select>
			    	</template>
			    </el-table-column>
			    <!-- <el-table-column label="简捷ID">
			    	<template scope="scope">
			    		<span v-if="!(isEdit && editedId === scope.row.key)">{{scope.row.jianJieId?scope.row.jianJieId:"未绑定"}}</span>
			    		<el-input v-model="formEdit.jianJieId" v-if="isEdit && editedId === scope.row.key"></el-input>
			    	</template>
			    </el-table-column> -->
			    <!-- <el-table-column label="险企图标地址">
			    	<template scope="scope">
		            	<el-popover ref="popoverPic" trigger="hover" placement="left" width="500px">
		            	    <img :src="scope.row.insurerIcon" class="bre"  slot="reference" style="width: 80px;">
	                    	<img :src='scope.row.insurerIcon' style="width: 475px;">
	                	</el-popover>
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
			    		<el-button type="text" size="small" @click="editRoute(scope.row)" v-if="!(isEdit || editedId === scope.row.key)">编辑</el-button>
			    		<el-button type="text" size="small" @click="deleteRoute(scope.row)" v-if="!(isEdit || editedId === scope.row.key)">删除</el-button>
			    		<el-button type="text" size="small" @click="confirmEdit" v-if="isEdit && editedId === scope.row.key">保存</el-button>
			    		<el-button type="text" size="small" @click="quitEdit" v-if="isEdit && editedId === scope.row.key">取消</el-button>
			    	</template>
			    </el-table-column>
			</el-table>
			<el-pagination v-if="pageCount" @current-change="pageChange" :current-page="currentPage" :page-size="pageSize" layout="total , prev, pager, next, jumper" :page-count='pageCount' style="margin:20px auto;text-align:center"></el-pagination>
		</div>

		<div class="toolBar">
			<div class="toolBarR">
				<el-button type="primary" @click="dialogTableVisibleJianjie = true">新增</el-button>
			</div>
		</div>

		<el-breadcrumb separator="/">
		  	<el-breadcrumb-item>保单险企列表</el-breadcrumb-item>
		</el-breadcrumb>
		<div class="tableBox">
			<el-table :data="formDataJianjie" border style="width: 100%;font-size:12px;">
			    <!-- <el-table-column prop="id" label="ID"></el-table-column> -->
			    <el-table-column prop="companyId" label="公司ID"></el-table-column>
			    <!-- <el-table-column prop="insurerId" label="险企ID"></el-table-column> -->
			    <el-table-column prop="insurerName" label="险企名称"></el-table-column>
			    <el-table-column label="操作">
			    	<template scope="scope">
			    		<el-button type="text" @click="deleteJianjie(scope.row)">删除</el-button>
			    	</template>
			    </el-table-column>
			</el-table>
			<el-pagination v-if="pageCountJianjie" @current-change="pageChangeJianjie" :current-page="currentPageJianjie" :page-size="pageSizeJianjie" layout="total , prev, pager, next, jumper" :page-count='pageCountJianjie' style="margin:20px auto;text-align:center"></el-pagination>
		</div>

		<div class="toolBar">
			<div class="toolBarR">
				<el-button type="primary" @click="saveAll">全部保存</el-button>
			</div>
		</div>

		<el-dialog title="新增路由" :visible.sync="dialogTableVisible">
			<el-form label-width="120px" class="appbox">
			  	<el-form-item class="appblock" label="险企:">
					<span v-show="!formAdd.insurerId" style="color: red;">*</span>
					<el-select v-model="formAdd.insurerId" placeholder="请选择险企">
					    <el-option v-for="item in insurerList" :label="item.label" :value="item.value" :key="item.value"></el-option>
					</el-select>
				</el-form-item>
			  	<el-form-item class="appblock" label="线路:">
					<span v-show="!formAdd.laneId" style="color: red;">*</span>
		    		<el-select v-model="formAdd.laneId" placeholder="请选择线路">
					    <el-option v-for="item in lanes" :label="item.label" :value="item.value" :key="item.value"></el-option>
					</el-select>
			  	</el-form-item>
			  	<!-- <el-form-item class="appblock" label="商户ID:">
			    	<span>{{tid}}</span>
			  	</el-form-item> -->
			  	<el-form-item class="appblock" label="简捷ID:">
			  		<span v-show="!formAdd.jianJieId" style="color: red;">*</span>
			    	<el-input type="text" style="width:150px;" v-model="formAdd.jianJieId" placeholder="请输入ID"></el-input>
			  	</el-form-item>
			</el-form>
			<div style="clear:both"></div>
			<div style="text-align:center;margin-top:20px;">
				<el-button @click="goback">取消</el-button>
				<el-button type="primary" @click="comfirmAdd">添加路由</el-button>
			</div>
		</el-dialog>

		<el-dialog title="新增" :visible.sync="dialogTableVisibleJianjie">
			<el-form label-width="120px" class="appbox">
			  	<el-form-item class="appblock" label="险企ID:">
			  		<span v-show="!formAddJianjie.insurerId" style="color: red;">*</span>
			  		<el-select v-model="formAddJianjie.insurerId" placeholder="请选择险企">
					    <el-option v-for="item in insurerListJianjie" :label="item.label" :value="item.value" :key="item.value"></el-option>
					</el-select>
			  	</el-form-item>
			  	<el-form-item class="appblock" label="简捷ID:">
			  		<span v-show="!formAddJianjie.companyId" style="color: red;">*</span>
			    	<el-input type="text" style="width:150px;" v-model="formAddJianjie.companyId" placeholder="请输入ID"></el-input>
			  	</el-form-item>
			</el-form>
			<div style="clear:both"></div>
			<div style="text-align:center;margin-top:20px;">
				<el-button @click="goback">取消</el-button>
				<el-button type="primary" @click="comfirmAddJianjie">添加</el-button>
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
			tableData: [], //路由列表数据
			insurerList: [], //险企列表数据
			insurerListJianjie: [], //险企列表数据
			formData: [], //分页路由列表数据
			dialogTableVisible: false,
			currentPageJianjie: 1,
			pageCountJianjie: null,
			lengthJianjie: null,
			pageSizeJianjie: 10,
			tableDataJianjie: [], //简捷(保单)列表数据
			formDataJianjie: [], //分页简捷列表数据
			dialogTableVisibleJianjie: false,
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
				tid: null,
				laneId: null,
				insurerId: null,
				jianJieId: null,
			},
			formAddJianjie: {
				tid: null,
				insurerId: null,
				companyId: null,
			},
			addBuf: [],
			formEdit: {
				jianJieId: null,
				laneId: null
			},
			editBuf: [],
			isEdit: false,
			editedId: null,
			deleteBuf: [],
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
				id: this.tid
			};
			payload = JSON.stringify(payload);
			masterApi({
				action: 'tenant_info',
				version: '1.0',
				payload: payload
			}, window.localStorage.getItem('tokenPlate')).then((res) => {
				if (res.code == 0) {
					this.tableData = [];
					this.tenantData = res.attach;
					for (let item in res.attach.insurers) {
						let buf = res.attach.insurers[item];
						for (let i = 0; i < this.lanes.length; i++) {
							if (buf.lane == this.lanes[i].value) {
								buf.laneName = this.lanes[i].label;
							}
						}
						this.tableData.push(buf);
					}
					// this.tableData = res.attach.insurers;
					this.length = this.tableData.length;
					this.pageCount = parseInt((this.length - 1) / this.pageSize) + 1;
					this.showPage();
					this.getInsurerList();
					this.formLeBaoBa.leBaoBaUsername = res.attach.leBaoBaUsername;
					this.formLeBaoBa.leBaoBaPassword = res.attach.leBaoBaPassword;
					this.formBiHu.agent = res.attach.biHuAgent;
					this.formBiHu.key = res.attach.biHuKey;
				}
			})
		},

		getInfoJianjie() {
			let payload = {
				id: this.tid
			};
			payload = JSON.stringify(payload);
			masterApi({
				action: 'jian_jie_insurers',
				version: '1.0',
				payload: payload
			}, window.localStorage.getItem('tokenPlate')).then((res) => {
				if (res.code == 0) {
					this.tableDataJianjie = res.attach;
					this.lengthJianjie = res.attach.length;
					this.pageCountJianjie = parseInt((this.lengthJianjie - 1) / this.pageSizeJianjie) + 1;
					this.showPageJianjie();
					this.getInsurerListJianjie();
				}
			})
		},

		getInsurerList() {
			let payload = {};
			payload = JSON.stringify(payload);
			masterApi({
				action: 'insurers',
				version: '1.0',
				payload: payload
			}, window.localStorage.getItem('tokenPlate')).then((res) => {
				if (res.code == 0) {
					if (res.attach) {
						this.insurerList = [];
						for (let i = 0; i < res.attach.length; i++) {
							let check = false;
							for (let j = 0; j < this.tableData.length; j++) {
								if (res.attach[i].id == this.tableData[j].insurerId) {
									check = true;
								}
							}
							if (!check) {
								let buf = {
									label: null,
									value: null
								};
								buf.label = res.attach[i].name;
								buf.value = res.attach[i].id;
								this.insurerList.push(buf);
							}
						}
					}
				}
			})
		},

		getInsurerListJianjie() {
			let payload = {};
			payload = JSON.stringify(payload);
			masterApi({
				action: 'insurers',
				version: '1.0',
				payload: payload
			}, window.localStorage.getItem('tokenPlate')).then((res) => {
				if (res.code == 0) {
					if (res.attach) {
						this.insurerListJianjie = [];
						for (let i = 0; i < res.attach.length; i++) {
							let check = false;
							for (let j = 0; j < this.tableDataJianjie.length; j++) {
								if (res.attach[i].id == this.tableDataJianjie[j].insurerId) {
									check = true;
								}
							}
							if (!check) {
								let buf = {
									label: null,
									value: null
								};
								buf.label = res.attach[i].name;
								buf.value = res.attach[i].id;
								this.insurerListJianjie.push(buf);
							}
						}
					}
				}
			})
		},

		editRoute(row) {
			this.isEdit = true;
			this.editedId = row.key;
			this.formEdit.jianJieId = row.jianJieId;
			this.formEdit.laneId = row.lane;
		},

		comfirmAdd() {
			this.dialogTableVisible = false;
			if (this.formAdd.laneId && this.formAdd.insurerId && this.formAdd.jianJieId) {
				let buf = {
					insurerName: this.formAdd.insurerName,
					insurerId: this.formAdd.insurerId,
					laneName: this.formAdd.laneId,
					laneId: this.formAdd.laneId,
					jianJieId: this.formAdd.jianJieId,
				}
				for (let i = 0; i < this.lanes.length; i++) {
					if (this.lanes[i].value == buf.laneName) {
						buf.laneName = this.lanes[i].label;
					}
				}
				for (let i = 0; i < this.insurerList.length; i++) {
					if (this.insurerList[i].value == buf.insurerId) {
						buf.insurerName = this.insurerList[i].label;
					}
				}
				this.tableData.push(buf);
				this.addBuf.push(buf);
				this.showPage();
				this.saveAll();
			} else {
				this.$message({
					type: 'error',
					message: '选择信息不完整,请检查'
				});

			}
		},

		comfirmAddJianjie() {
			this.dialogTableVisibleJianjie = false;
			if (this.formAddJianjie.insurerId && this.formAddJianjie.companyId) {
				let payload = {
					insurerId: this.formAddJianjie.insurerId,
					companyId: this.formAddJianjie.companyId,
					tid: this.tid,
				}
				payload = JSON.stringify(payload);
				masterApi({
					action: 'jian_jie_insurer_edit',
					version: '1.0',
					crudType: 1,
					payload: payload
				}, window.localStorage.getItem('tokenPlate')).then((res) => {
					if (res.code == 0) {
						this.getInfoJianjie();
					}
				})
			} else {
				this.$message({
					type: 'error',
					message: '选择信息不完整,请检查'
				});

			}
		},

		goback() {
			this.dialogTableVisible = false;
			this.dialogTableVisibleJianjie = false;
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

		showPageJianjie() {
			this.formDataJianjie = [];
			if (this.lengthJianjie * this.pageCountJianjie < this.pageSizeJianjie * this.currentPageJianjie) {
				for (let i = 0; i < this.tableDataJianjie.length; i++) {
					if (i >= (this.currentPageJianjie - 1) * this.pageSizeJianjie) {
						this.formDataJianjie.push(this.tableDataJianjie[i])
					}
				}
			} else {
				for (let i = 0; i < this.tableDataJianjie.length; i++) {
					if (i >= (this.currentPageJianjie - 1) * this.pageSizeJianjie && i < this.currentPageJianjie * this.pageSizeJianjie) {
						this.formDataJianjie.push(this.tableDataJianjie[i])
					}
				}
			}
		},

		pageChange(pg) {
			this.currentPage = pg;
			this.showPage();
		},

		pageChangeJianjie(pg) {
			this.currentPage = pg;
			this.showPage();
		},

		confirmEdit() {
			//post
			this.isEdit = null;
			let buf = {
				id: this.editedId,
				laneName: this.formEdit.laneId,
				laneId: this.formEdit.laneId,
				jianJieId: this.formEdit.jianJieId,
			}
			for (let i = 0; i < this.lanes.length; i++) {
				if (this.lanes[i].value == buf.laneName) {
					buf.laneName = this.lanes[i].label;
				}
			}
			for (let i = 0; i < this.tableData.length; i++) {
				if (this.tableData[i].key == buf.id) {
					this.tableData[i].laneName = buf.laneName;
					this.tableData[i].laneId = buf.laneId;
					this.tableData[i].jianJieId = buf.jianJieId;
				}
			}
			this.editBuf.push(buf);
			// masterApi({
			// 	action: 'route_edit',
			// 	version: '1.0',
			// 	crudType: 4,
			// 	key: this.editedId,
			// 	lane: this.formEdit.laneId,
			// 	jianJieId: this.formEdit.jianJieId
			// },window.localStorage.getItem('tokenPlate')).then((res)=> {
			// 	if (res.code == 0) {
			// 		this.getRouterInfo();
			//  			}
			// })
			this.editedId = null;
			this.saveAll();
			this.showPage();
		},

		quitEdit() {
			this.isEdit = null;
			this.editedId = null;
		},

		deleteRoute(row) {
			this.$confirm('此操作将执行删除, 是否继续?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(() => {
				for (var i = 0; i < this.tableData.length; i++) {
					if (this.tableData[i].key == row.key) {
						this.tableData[i] = {}
					}
				}
				this.deleteBuf.push(row.key);
				this.saveAll();
				// masterApi({
				// 	action: 'route_edit',
				// 	version: '1.0',
				// 	crudType: 8,
				// 	key: row.key,
				// },window.localStorage.getItem('tokenPlate')).then((res)=> {
				// 	if (res.code == 0) {
				// 		this.getRouterInfo();
				//  			}
				// })
				this.showPage();
			}).catch(() => {
				this.$message({
					type: 'info',
					message: '已取消删除'
				});
			});
		},

		deleteJianjie(row) {
			this.$confirm('此操作将执行删除, 是否继续?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(() => {
				let payload = {
					id: row.id
				}
				payload = JSON.stringify(payload);
				masterApi({
					action: 'jian_jie_insurer_edit',
					version: '1.0',
					crudType: 8,
					payload: payload,
				}, window.localStorage.getItem('tokenPlate')).then((res) => {
					if (res.code == 0) {
						this.getInfoJianjie();
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
				insurersDelete: [], //删除
				insurersUpdate: {}, //修改
				insurersInsert: {} //新增
			};
			for (var i = 0; i < this.addBuf.length; i++) {
				let buf = {
					tid: this.tid,
					insurerId: this.addBuf[i].insurerId,
					lane: this.addBuf[i].laneId,
					jianJieId: this.addBuf[i].jianJieId,
				};
				payload.insurersInsert[this.tid + "_" + this.addBuf[i].insurerId] = buf;
			}
			for (var i = 0; i < this.editBuf.length; i++) {
				let buf = {
					lane: this.editBuf[i].laneId,
					jianJieId: this.editBuf[i].jianJieId,
				};
				payload.insurersUpdate[this.editBuf[i].id] = buf;
			}
			payload.insurersDelete = this.deleteBuf;

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
					this.addBuf = [];
					this.editBuf = [];
					this.deleteBuf = [];
				}
			})
		}
	},
	mounted() {
		if (this.$route.query.tid) {
			this.tid = this.$route.query.tid;
			// this.getRouterInfo();
			// this.getTenantInfo();
			// this.getBiHuInfo();
			this.getInfo();
			this.getInfoJianjie();
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