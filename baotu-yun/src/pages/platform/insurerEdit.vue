<template>
	<div>
		<el-breadcrumb separator="/">
		  	<el-breadcrumb-item :to="{name:'insurerList'}">险企列表</el-breadcrumb-item>
		  	<el-breadcrumb-item>{{isAdd?'新增':'编辑'}}</el-breadcrumb-item>
		</el-breadcrumb>
		<el-form label-width="120px" class="appbox">
			<el-form-item class="appblock" label="公司级别:" v-if="isAdd">
				<el-radio-group v-model="form.isMinor">
				    <el-radio :label="false">总公司</el-radio>
				    <el-radio :label="true">子公司</el-radio>
				  </el-radio-group>
			</el-form-item>
			<!-- <el-form-item class="appblock" label="险企ID:" v-if="!form.isMinor">
				<span style="width:50px;">2 ^ </span>
	    		<el-input type="number" style="width:150px;" v-model="form.id" placeholder="暂无ID"></el-input>
	    		<span style="width:100px;"> = {{form.id?Math.pow(2,form.id):'暂无ID'}}</span>
			</el-form-item> -->
			<div style="clear:both"></div>
		  	<el-form-item class="appblock" label="险企名字:">
		    	<el-input type="text" style="width:300px;" v-model="form.name" placeholder="请输入名字"></el-input>
		  	</el-form-item>
		  	<el-form-item class="appblock" label="乐保吧ID:" v-if="!form.isMinor">
	    		 <el-input type="text" style="width:300px;" v-model="form.leBaoBaId" placeholder="请输入ID"></el-input>
		  	</el-form-item>
		  	<el-form-item class="appblock" label="绑定壁虎险企:" v-if="!form.isMinor">
		  		<el-input type="text" style="width:300px;" v-model="form.agree" placeholder="请输入"></el-input>
		  	</el-form-item>
		  	<el-form-item class="appblock" label="险企图标:" v-if="!form.isMinor">
			    <el-upload
					class="avatar-uploader"
					action=""
					:show-file-list="false"
					:before-upload="beforeUpload">
					<img v-if="form.iconUrl" :src="form.iconUrl" class="avatar">
					<i v-else class="el-icon-plus avatar-uploader-icon"></i>
				</el-upload>
		  	</el-form-item>
		  	<el-form-item class="appblock" label="选择总公司:" v-if="form.isMinor">
			    <el-select v-model="form.parentId">
			    	<el-option v-for="item in parents" :value="item.value" :label="item.label" :key="item.value"></el-option>
			    </el-select>
		  	</el-form-item>
		</el-form>
		<div style="clear:both"></div>
		<div style="text-align:center;margin-top:20px;">
			<el-button @click="goback">取消</el-button>
			<el-button type="primary" @click="comfirmAdd" v-if="isAdd">添加险企</el-button>
			<el-button type="primary" @click="comfirmSave" v-if="!isAdd">保存修改</el-button>
		</div>
	</div>
</template>
<script>
import {
	masterApi,
	uploadImg
} from '@/ajax/post.js'
export default {
	data() {
		return {
			isAdd: false,
			fileBuf: null,
			form: {
				id: null,
				isMinor: false,
				name: null,
				iconUrl: null,
				agree: null,
				leBaoBaId: null,
				parentId: null,
			},
			parents: [],
		};
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

		beforeUpload(file) {
			var vm = this;
			var reader = new FileReader();
			reader.readAsDataURL(file);
			reader.onload = function(e) {
				vm.form.iconUrl = this.result;
			}
			this.fileBuf = file;
			return false; //放弃组件上传
		},

		uploadFile(id, file) {
			let fd = new FormData();
			fd.append("version", '1.0');
			fd.append("action", 'upload_insurer_icon');
			fd.append("icon", file);
			let payload = {
				id: id,
			}
			payload = JSON.stringify(payload);
			fd.append("payload", payload);

			uploadImg(fd);
		},


		comfirmAdd() {
			if (this.form.isMinor) {	//子公司
				if (this.form.name && this.form.parentId) {
					let payload = {
						name: this.form.name,
						parentId: this.form.parentId,
						minor: this.form.isMinor,
					}
					payload = JSON.stringify(payload);
					masterApi({
						action: 'insurer_edit',
						version: '1.0',
						crudType: 1,
						payload: payload,
					}, window.localStorage.getItem('tokenPlate')).then((res) => {
						if (res.code == 0) {
							this.$message({
								type: 'success',
								message: '添加险企成功'
							});

							setTimeout(function() {
								router.push({
									name: "insurerList"
								})
							}, 1000);
						}
					})
				} else {
					this.$message({
						type: 'error',
						message: '信息不完整'
					});
				}
			} else {	//总公司
				if (this.form.name && this.form.iconUrl) {
					let payload = {
						name: this.form.name,
						// icon: this.form.iconUrl,
						biHuId: this.form.agree, //壁虎id
						leBaoBaId: this.form.leBaoBaId,
						minor: this.form.isMinor,
					}
					payload = JSON.stringify(payload);
					masterApi({
						action: 'insurer_edit',
						version: '1.0',
						crudType: 1,
						payload: payload,
					}, window.localStorage.getItem('tokenPlate')).then((res) => {
						if (res.code == 0) {
							this.uploadFile(res.attach, this.fileBuf);

							this.$message({
								type: 'success',
								message: '添加险企成功'
							});

							setTimeout(function() {
								router.push({
									name: "insurerList"
								})
							}, 1000);
						}
					})
				} else {
					this.$message({
						type: 'error',
						message: '信息不完整'
					});
				}
			}
		},

		comfirmSave() {
			if (this.form.name && this.form.iconUrl) {
				let payload = {
					id: this.form.id,
					name: this.form.name,
					icon: this.form.iconUrl,
					biHuId: this.form.agree, //壁虎id
					leBaoBaId: this.form.leBaoBaId,
					minor: false,
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

						this.uploadFile(this.form.id, this.fileBuf);

						setTimeout(function() {
							router.push({
								name: "insurerList"
							})
						}, 1000);
					}
				})
			} else {
				this.$message({
					type: 'error',
					message: '信息不完整'
				});
			}
		},

		goback() {
			router.push({
				name: "insurerList"
			})
		},

		getParents() {
			let payload = {};
			payload = JSON.stringify(payload);
			masterApi({
				action: 'insurers',
				version: '1.0',
				payload: payload
			}, window.localStorage.getItem('tokenPlate')).then((res) => {
				if (res.code == 0) {
					if (res.attach) {
						this.parents = [];
						for (let i = 0; i < res.attach.length; i++) {
							if (!res.attach[i].minor) {
								let buf = {
									label: res.attach[i].name,
									value: res.attach[i].id,
								}
								this.parents.push(buf);
							} else {
								//
							}
						}
					}
				}
			})
		}
	},
	mounted() {//新增总公司.子公司,编辑只有总公司,子公司在列表页编辑
		if (this.$route.query.id) {
			this.isAdd = false
			// this.form.id = Math.log(this.$route.query.id) / Math.log(2);
			this.form.id = this.$route.query.id;
			this.form.name = this.$route.query.name;
			this.form.iconUrl = this.$route.query.icon;
			this.form.agree = this.$route.query.biHuId;
			this.form.leBaoBaId = this.$route.query.leBaoBaId;
		} else {
			this.isAdd = true;
		}

		this.getParents();
	}
}
</script>
<style lang="less">
	.appbox{
		margin-top: 20px;
		.appblock{
			width: 50%;
			float: left;
		}
		.avatar-uploader .el-upload {
		    border: 1px dashed #d9d9d9;
		    border-radius: 6px;
		    cursor: pointer;
		    position: relative;
		    overflow: hidden;
		}
		.avatar-uploader .el-upload:hover {
		    border-color: #20a0ff;
		}
		.avatar-uploader-icon {
		    font-size: 28px;
		    color: #8c939d;
		    width: 178px;
		    height: 178px;
		    line-height: 178px;
		    text-align: center;
		}
		.avatar {
		    width: 178px;
		    height: 178px;
		    display: block;
		}
	}
</style>