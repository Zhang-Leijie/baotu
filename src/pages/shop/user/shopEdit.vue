<template>
	<div>
		<el-breadcrumb separator="/">
		  	<el-breadcrumb-item :to="{name:'shop-shop-list'}">商家列表</el-breadcrumb-item>
		  	<el-breadcrumb-item>编辑</el-breadcrumb-item>
		</el-breadcrumb>
		<el-form :label-position="labelPosition" label-width="120px" style="margin-top:20px;" class="appbox">
		  <el-form-item class="appblock" label="商家名称:">
		    <el-input type="text" style="width:300px;" v-model="form.name" auto-complete="off" placeholder="请输入商家名称"></el-input>
		  </el-form-item>
		  <el-form-item class="appblock" label="营业执照号:">
		    <el-input type="text" style="width:300px;" v-model="form.num" auto-complete="off" placeholder="请输入营业执照号"></el-input>
		  </el-form-item>
		  <el-form-item class="appblock" label="联系人:">
		    <el-input type="text" style="width:300px;" v-model="form.people" auto-complete="off" placeholder="请输入联系人"></el-input>
		  </el-form-item>
		  <!-- <el-form-item class="appblock" label="账号:">
		    <el-input type="number" style="width:300px;" v-model="form.account" auto-complete="off" placeholder="请输入账号"></el-input>
		  </el-form-item> -->
		  <el-form-item class="appblock" label="联系人电话:">
		    <el-input type="text" style="width:300px;" v-model="form.phone" auto-complete="off" placeholder="请输入手机号"></el-input>
		  </el-form-item>
		  <el-form-item class="appblock" label="过期时间:">
		     <el-date-picker v-model="form.time" type="date" placeholder="选择日期" v-if="endTimeEdited"></el-date-picker>
		     <span v-if="!endTimeEdited">{{form.time}}</span>
		     <el-button @click="editEndTime" v-if="!endTimeEdited">修改</el-button>
		  </el-form-item>
		  <!-- <el-form-item class="appblock" label="开通商家量:">
		    <el-select v-model="form.shopNum" placeholder="请选择" style="width:300px;">
			    <el-option
			      v-for="item in options"
			      :label="item.label"
			      :value="item.value">
			    </el-option>
			</el-select>
		  </el-form-item>
		  <el-form-item class="appblock" label="账号状态:">
		    正常
		  </el-form-item> -->
		</el-form>
		<div style="clear:both"></div>
		<!-- <el-form :label-position="labelPosition" label-width="120px" style="margin-top:20px;" class="appbox">
		  <el-form-item class="appblock" label="支付开通:">
		    <el-checkbox-group v-model="form.pay">
			    <el-checkbox value='1' label="银行卡"></el-checkbox>
			    <el-checkbox value='2' label="支付宝"></el-checkbox>
			</el-checkbox-group>
		  </el-form-item>
		  <el-form-item class="appblock" label="积分规则:">
		    <el-radio class="radio" v-model="form.point" label="1">开通</el-radio>
  			<el-radio class="radio" v-model="form.point" label="2">关闭</el-radio>
		  </el-form-item>
		  <el-form-item class="appblock" label="险种:">
		    <el-checkbox-group v-model="form.type">
			    <el-checkbox value='1' label="意外险"></el-checkbox>
			    <el-checkbox value='2' label="财产险"></el-checkbox>
			</el-checkbox-group>
		  </el-form-item>
		  <el-form-item class="appblock" label="险企:">
		    <el-checkbox-group v-model="form.company">
			    <el-checkbox value='1' label="平安保险"></el-checkbox>
			    <el-checkbox value='2' label="太平洋保险"></el-checkbox>
			</el-checkbox-group>
		  </el-form-item>
		  <el-form-item class="appblock" label="其他:">
		    <el-checkbox-group v-model="form.other">
			    <el-checkbox value='1' label="资讯"></el-checkbox>
			    <el-checkbox value='2' label="共享商城"></el-checkbox>
			</el-checkbox-group>
		  </el-form-item>
		</el-form> -->
		<!-- <div style="clear:both"></div> -->
		<el-form :label-position="labelPosition" label-width="130px" style="margin-top:20px;" class="appbox">
		  <el-form-item class="appblock" label="营业执照:">
		    <el-upload
			  class="avatar-uploader"
			  action="//jsonplaceholder.typicode.com/posts/"
			  :show-file-list="false"
			  :on-success="handleAvatarScucess">
			  <img v-if="form.imageUrl" :src="form.imageUrl" class="avatar">
			  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
			</el-upload>
		  </el-form-item>
		  <!-- <el-form-item class="appblock" label="营业执照反面:">
		    <el-upload
			  class="avatar-uploader"
			  action="//jsonplaceholder.typicode.com/posts/"
			  :show-file-list="false"
			  :on-success="handleAvatarScucess">
			  <img v-if="imageUrl" :src="imageUrl" class="avatar">
			  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
			</el-upload>
		  </el-form-item> -->
		  <!-- <el-form-item class="appblock" label="联系人身份证正面:">
		    <el-upload
			  class="avatar-uploader"
			  action="//jsonplaceholder.typicode.com/posts/"
			  :show-file-list="false"
			  :on-success="handleAvatarScucess">
			  <img v-if="imageUrl" :src="imageUrl" class="avatar">
			  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
			</el-upload>
		  </el-form-item>
		  <el-form-item class="appblock" label="联系人身份证反面:">
		    <el-upload
			  class="avatar-uploader"
			  action="//jsonplaceholder.typicode.com/posts/"
			  :show-file-list="false"
			  :on-success="handleAvatarScucess">
			  <img v-if="imageUrl" :src="imageUrl" class="avatar">
			  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
			</el-upload>
		  </el-form-item> -->
		</el-form>
		<div style="clear:both"></div>
		<div style="text-align:center;margin-top:20px;">
			<el-button type="primary" @click="confirmEdit">确定</el-button>
		</div>
	</div>
</template>
<script>
import { autoApi,commonApi } from '@/ajax/post.js'
	export default {
	    data() {
	      return {
	        labelPosition: 'right',
	        endTimeEdited: false,
	        form:{
	        	tid: null,
	        	name: null,
	        	num: null,
	        	time: null,
	        	imageUrl: null,
	        	people: null,
	        	phone: null
	        },
	      };
	    },
	    methods: {
	       	add0(m){return m<10?'0'+m:m },
	       	getFormTime(shijianchuo)
		        {
		        //shijianchuo是整数，否则要parseInt转换
			        var time = new Date(shijianchuo);
			        var y = time.getFullYear();
			        var m = time.getMonth()+1;
			        var d = time.getDate();
			        var h = time.getHours();
			        var mm = time.getMinutes();
			        var s = time.getSeconds();
			        return y+'-'+this.add0(m)+'-'+this.add0(d)+' '+this.add0(h)+':'+this.add0(mm)+':'+this.add0(s);
		        },

			handleAvatarScucess(res, file) {
		        this.form.imageUrl = URL.createObjectURL(file.raw);
		    },
		    confirmEdit() {
		    	let payload = {
		   			tname: this.form.name,
		   			licenseImage: this.form.imageUrl,
		   			expire: Date.parse(this.form.time) / 1000,
		   			license: this.form.num,
		   			tid: this.form.tid,
		   			contacts: this.form.people,
		   			contactsMobile: this.form.phone
		    	}
		    	payload = JSON.stringify(payload);
		    	autoApi({
		   			action: 'platform_tenant_set',
		   			version: '1.0',
		   			payload: payload
		   		},window.localStorage.getItem('token')).then((res)=> {
		   			if (res.code == 0) {
		   				// this.tableData = res.attach.list;
		   				// this.pageCount = res.attach.total;
		   				this.$message({
				            message: '修改的设置已保存',
				            type: 'success'
				        });
				        router.push({
					        path: '/shop/shop-list'
					    });
	       			}
		   		})
		    },
		    editEndTime() {
		    	this.endTimeEdited = true;
		    }
	    },
	    mounted:function(){
	        if (this.$route.query.tid) {
	        	this.form.tid = this.$route.query.tid;
	        	this.form.name = this.$route.query.name;
	        	this.form.imageUrl = this.$route.query.licenseImage;
	        	this.form.num = this.$route.query.license;
	        	if (this.$route.query.expire) {
	        		this.form.time = this.getFormTime(this.$route.query.expire * 1000);
	        	}
	        	this.form.people = this.$route.query.contacts;
	        	this.form.phone = this.$route.query.contractsMobile;
	        }
	    }
	}
</script>
<style lang="less">
	.appbox{
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