<template>
	<div>
		<el-breadcrumb separator="/">
		  	<el-breadcrumb-item :to="{name:'appList'}">平台列表</el-breadcrumb-item>
		  	<el-breadcrumb-item>{{id?'编辑':'新增'}}</el-breadcrumb-item>
		</el-breadcrumb>
		<el-form label-width="120px" class="appbox">
		  <el-form-item class="appblock" label="平台名称:">
		    <el-input type="text" style="width:300px;" v-model="form.name" placeholder="请输入名字"></el-input>
		  </el-form-item>
		  <el-form-item class="appblock" label="最大商户数:">
		    <el-input type="number" style="width:300px;" v-model="form.maxShop" placeholder="请输入数字(0表示不限制)"></el-input>
		  </el-form-item>
		  <el-form-item class="appblock" label="行政区划选择:">
		    <el-select style="width:145px;" v-model="regions" placeholder="请选择" @visible-change="form.region = null">
			    <el-option v-for="item in regionFormData" :label="item.label" :value="item.value" :key="item.value"></el-option>
			</el-select>
			<el-select style="width:145px;" v-model="form.region" placeholder="请选择" v-if="regions || form.region">
			    <el-option v-for="item in regions" :label="item[0]" :value="item[1]" :key="item[1]"></el-option>
			</el-select>
		  </el-form-item>
		  <el-form-item class="appblock" label="最大资讯数:">
		    <el-input type="number" style="width:300px;" v-model="form.maxHold" placeholder="请输入数字(0表示不限制)"></el-input>
		  </el-form-item>
		</el-form>
		<div style="clear:both"></div>
		<div style="text-align:center;margin-top:20px;">
			<el-button @click="goback">取消</el-button>
			<el-button type="primary" @click="comfirmAdd"  v-if="!id">添加平台</el-button>
			<el-button type="primary" @click="comfirmSave" v-if="id">保存修改</el-button>
		</div>
	</div>
</template>
<script>
import { masterApi } from '@/ajax/post.js'
import regionData from '@/region.js'

export default {
	data() {
		return {
			id: null,
			regionFormData: [], //格式化行政区划表
			regions: [], //一级行政区划表
			form: {
				name: null,
				region: null,
				maxShop: null,
				maxHold: null
			}
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

		comfirmAdd() {
			if (this.form.name && this.form.region && this.form.maxHold && this.form.maxShop) {
				let payload = {
					region: this.form.region,
					name: this.form.name,
					maxTenantsCount: this.form.maxShop,
					maxArticlesCount: this.form.maxHold
				}
				payload = JSON.stringify(payload);
				masterApi({
					action: 'app_edit',
					version: '1.0',
					crudType: 1,
					payload: payload
				}, window.localStorage.getItem('tokenPlate')).then((res) => {
					if (res.code == 0) {
						this.$message({
							type: 'success',
							message: '添加平台成功'
						});
						router.push({
							name: "appList"
						})
					}
				})
			} else {
				this.$message({
					type: 'error',
					message: '信息填写不完整'
				});
			}
		},

		comfirmSave() {
			if (this.form.maxHold && this.form.maxShop) {
				let payload = {
					appId: this.id,
					region: this.form.region,
					name: this.form.name,
					maxTenantsCount: this.form.maxShop,
					maxArticlesCount: this.form.maxHold
				}
				payload = JSON.stringify(payload);
				masterApi({
					action: 'app_edit',
					version: '1.0',
					crudType: 4,
					payload: payload
				}, window.localStorage.getItem('tokenPlate')).then((res) => {
					if (res.code == 0) {
						this.$message({
							type: 'success',
							message: '平台修改成功'
						});
						router.push({
							name: "appList"
						})
					}
				})
			} else {
				this.$message({
					type: 'error',
					message: '信息填写不完整'
				});
			}
		},

		goback() {
			router.push({
				name: "appList"
			})
		}
	},
	mounted() {
		if (this.$route.query) {
			this.id = this.$route.query.id;
			this.form.name = this.$route.query.name;
			let regionName = this.$route.query.regionName;
			let region = this.$route.query.region;
			this.regions = [
				[regionName, region]
			];
			this.form.region = this.$route.query.region;
			this.form.maxHold = this.$route.query.maxArticlesCount;
			this.form.maxShop = this.$route.query.maxTenantsCount;
		}

		for (let index in regionData) {
			let buf = {
				value: regionData[index],
				label: index
			}
			this.regionFormData.push(buf);
		}
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
	}
</style>