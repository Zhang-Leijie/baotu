<template>
	<div class="staffEditBody">
		<el-breadcrumb separator="/">
		  	<el-breadcrumb-item :to="{name:'shop-staff-list'}">员工列表</el-breadcrumb-item>
		  	<el-breadcrumb-item>编辑</el-breadcrumb-item>
		</el-breadcrumb>

		<el-form label-position="right" label-width="140px" style="margin-top:20px;" class="appbox">
 		  <el-form-item class="appblockSmall" label="姓名：">
 		  	<span>{{$route.query.name}}</span>
 		  </el-form-item>
 		  <el-form-item class="appblockSmall" label="身份证号：">
 		    {{info.identity}}
 		  </el-form-item>
 		  <el-form-item class="appblockSmall" label="手机号：">
 		    {{info.mobile}}
 		  </el-form-item>
 		  <el-form-item class="appblockSmall" label="申请时间：">
 		    {{formatDate(info.created  * 1000)}}
 		  </el-form-item>
 		  <el-form-item class="appblockSmall" label="邀请人：">
 		  	{{info.name}}
		  </el-form-item>
		  <el-form-item class="appblockSmall" label="邀请码：">
		  	{{$route.query.id}}
 		  </el-form-item>
 		  <el-form-item class="appblockSmall" label="积分余额：">
 		    {{info.demo}}
 		  </el-form-item>
 		  <el-form-item class="appblockSmall" label="账号状态：">
 		    {{info.demo}}
 		  </el-form-item>
 		  <el-form-item class="appblock" label="联系人身份证正面：">
		   <!--  <el-upload
			  class="avatar-uploader"
			  action="//jsonplaceholder.typicode.com/posts/"
			  :show-file-list="false"
			  :on-success="handleAvatarScucess"> -->
			  <img v-if="info.identityFace" :src="imageUrl" class="avatar">
			  <!-- <i v-else class="el-icon-plus avatar-uploader-icon"></i>
			</el-upload> -->
		  </el-form-item>
		  <el-form-item class="appblock" label="联系人身份证反面：">
		    <!-- <el-upload
			  class="avatar-uploader"
			  action="//jsonplaceholder.typicode.com/posts/"
			  :show-file-list="false"
			  :on-success="handleAvatarScucess"> -->
			  <img v-if="info.identityBack" :src="imageUrl" class="avatar">
			  <!-- <i v-else class="el-icon-plus avatar-uploader-icon"></i>
			</el-upload> -->
		  </el-form-item>
 		</el-form>
 		<div style="clear:both;width:90%;border-bottom: 1px solid black;margin: 20px;padding: 20px;"></div>

		<el-form label-position="right" label-width="140px" style="margin-top:20px;" class="appbox">
		    <el-form-item label="支付方式：" class="appblock">
				<el-radio class="radio" v-model="form.payway" label="128">全额支付</el-radio>
	  		 	<el-radio class="radio" v-model="form.payway" label="256">净保费支付</el-radio>
	  		 	<el-radio class="radio" v-model="form.payway" label="512">垫付</el-radio>
		    </el-form-item>
		    <el-form-item label="普通佣金：" class="appblock">
			    <el-checkbox-group v-model="form.commonmoney">
				    <el-checkbox value='4' label="4">非营业客车</el-checkbox>
				    <el-checkbox value='8' label="8">非营业货车</el-checkbox>
				    <el-checkbox value='16' label="16">营业客车</el-checkbox>
				    <el-checkbox value='32' label="32">营业货车</el-checkbox>
				    <el-checkbox value='64' label="64">其他</el-checkbox>
				</el-checkbox-group>
		    </el-form-item>
		    <el-form-item label="团队佣金：" class="appblock">
			    <el-checkbox-group v-model="form.teammoney">
				    <el-checkbox value='1' label="1">规模佣金</el-checkbox>
				    <el-checkbox value='2' label="2">管理佣金</el-checkbox>
				</el-checkbox-group>
		    </el-form-item>
		    <el-form-item label="商业险佣金比例(%)" class="appblock">
			  	<el-input style="width:120px;" v-model="CMRate"></el-input>
		    </el-form-item>
		    <el-form-item class="appblock">
		  		<div></div>
		    </el-form-item>
		    <el-form-item label="交强险佣金比例(%)" class="appblock">
				<el-input style="width:120px;" v-model="CPRate"></el-input>
		    </el-form-item>
		</el-form>

		<div style="clear:both"></div>

		<div style="text-align:center;margin-top:20px;">
			<el-button type="primary" @click="confirmEdit">确定</el-button>
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
			id: null,
			CMRate: 0,
			CPRate: 0,
			imageUrl: '',
			info: {},
			form: {
				role: [],
				teammoney: [],
				commonmoney: [],
				code: '',
				name: '',
				account: '',
				password: '',
				phone: '',
				shopNum: '',
				pay: [],
				point: '',
				type: [],
				company: [],
				other: [],
				people: '',
				payway: '',
			}
		};
	},
	methods: {
		formatDate(time) {
			var x = time - 0

			var now = new Date(x)
			var year = now.getFullYear();
			var month = "0" + (now.getMonth() + 1);
			var date = "0" + (now.getDate());
			var hour = "0" + now.getHours();
			var min = "0" + now.getMinutes();
			return year + "-" + month.substr(-2) + "-" + date.substr(-2) + '   ' + hour.substr(-2) + ':' + min.substr(-2)
		},
		handleAvatarScucess(res, file) {
			this.imageUrl = URL.createObjectURL(file.raw);
		},
		isLegalNumber(val) {
			return (-100 <= val && val <= 100) ? true : false;
		},
		confirmEdit() {
			if (this.isLegalNumber(this.CMRate) && this.isLegalNumber(this.CPRate)) {
				let payload = {
					employeeId: window.localStorage.getItem('employeeId'),
					mod: 0,
					targetId: this.id,
					CMRate: 0,
					CPRate: 0
				}
				for (let i = 0; i < this.form.commonmoney.length; i++) {
					payload.mod = payload.mod + parseInt(this.form.commonmoney[i]);
				}
				for (let j = 0; j < this.form.teammoney.length; j++) {
					payload.mod = payload.mod + parseInt(this.form.teammoney[j]);
				}

				payload.mod = payload.mod + parseInt(this.form.payway);

				payload.CMRate = parseInt(this.CMRate * 10);
				payload.CPRate = parseInt(this.CPRate * 10);

				payload = JSON.stringify(payload);
				autoApi({
					action: 'employee_edit',
					version: '1.0',
					payload: payload
				}, window.localStorage.getItem('token')).then((res) => {
					if (res.code == 0) {
						this.$message({
							message: '设置已保存',
							type: 'success',
						});
						router.push({
							path: '/shop/staff-list'
						})
					}
				});
			} else {
				this.$message({
					message: '输入数据有误,请在-100到100的范围内输入',
					type: 'error',
				});
			}
		},
		getInfo(id) {
			let payload = {
				employeeId: window.localStorage.getItem('employeeId'),
				id: id,
			}
			payload = JSON.stringify(payload);
			autoApi({
				action: 'employee_info',
				version: '1.0',
				payload: payload
			}, window.localStorage.getItem('token')).then((res) => {
				if (res.code == 0) {
					this.info = res.attach;
					this.modConut(res.attach.mod);
					this.CMRate = res.attach.CMRate / 10;
					this.CPRate = res.attach.CPRate / 10;
				}
			});
		},
		modConut(mod) {
			if (mod & 1) { //规模佣金
				this.form.teammoney.push('1');
			}

			if (mod & 2) { //管理佣金
				this.form.teammoney.push('2');
			}

			if (mod & 4) { //非营业客车
				this.form.commonmoney.push('4');
			}

			if (mod & 8) { //非营利货车
				this.form.commonmoney.push('8');
			}

			if (mod & 16) { //营利客车
				this.form.commonmoney.push('16');
			}

			if (mod & 32) { //营利货车
				this.form.commonmoney.push('32');
			}

			if (mod & 64) { //其他车
				this.form.commonmoney.push('64');
			}

			if (mod & 128) { //全额支付
				this.form.payway = '128';
			}

			if (mod & 256) { //净保费支付
				this.form.payway = '256';
			}

			if (mod & 512) { //公司垫付
				this.form.payway = '512';
			}
		}
	},
	mounted() {
		if (this.$route.query.id) {
			this.id = this.$route.query.id;
			this.getInfo(this.$route.query.id);
		}
	}
}
</script>
<style lang="less">
.staffEditBody {
	.appbox{
		.appblock{
			width: 50%;
			float: left;
		}
		.appblockSmall {
			width: 33%;
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
}
</style>