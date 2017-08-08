<template>
	<div>
		<el-breadcrumb separator="/">
		  	<el-breadcrumb-item :to="{name:'shop-shop-list'}">商家列表</el-breadcrumb-item>
		  	<el-breadcrumb-item>新增</el-breadcrumb-item>
		</el-breadcrumb>
		<el-form :label-position="labelPosition" label-width="120px" style="margin-top:20px;" class="appbox">
		  <el-form-item class="appblock" label="商家名称:">
		    <el-input type="text" style="width:300px;" v-model="form.name" placeholder="请输入商家名称"></el-input>
		  </el-form-item>
		  <el-form-item class="appblock" label="顶级用户手机号:">
		    <el-input style="width:300px;" v-model="form.phone" placeholder="请输入手机号"></el-input>
		    <!-- <el-button type="primary" @click="getyzm" :disabled="!(getyzmMsg === '获取验证码')">{{getyzmMsg}}</el-button> -->
		  </el-form-item>
		  <!-- <el-form-item class="appblock" label="行政区划选择:">
		    <el-select style="width:145px;" v-model="regions" placeholder="请选择" @change="form.region = null">
			    <el-option v-for="item in regionFormData" :label="item.label" :value="item.value"></el-option>
			</el-select>
			<el-select style="width:145px;" v-model="form.region" placeholder="请选择" v-if="regions">
			    <el-option v-for="item in regions" :label="item[0]" :value="item[1]"></el-option>
			</el-select>
		  </el-form-item> -->
		  <!-- <el-form-item class="appblock" label="填写验证码:">
		    <el-input style="width:300px;" v-model="form.yzm" placeholder="请输入验证码"></el-input>
		  </el-form-item> -->
		  <el-form-item class="appblock" label="客服电话:">
		    <el-input style="width:300px;" v-model="form.servicePhone"></el-input>
		  </el-form-item>
		  <el-form-item class="appblock" label="联系人:">
		    <el-input style="width:300px;" v-model="form.people" placeholder="请输入联系人"></el-input>
		  </el-form-item>
		  <el-form-item class="appblock" label="联系人电话:">
		    <el-input style="width:300px;" v-model="form.contactsMobile" placeholder="请输入联系人电话"></el-input>
		  </el-form-item>
		  <el-form-item class="appblock" label="过期时间:">
		     <el-date-picker v-model="form.time" type="date" placeholder="选择日期"></el-date-picker>
		  </el-form-item>
		  <el-form-item class="appblock" label="营业执照号:">
		    <el-input style="width:300px;" v-model="form.identity"></el-input>
		  </el-form-item>
		  <!-- <el-form-item class="appblock" label="注册时间:">
		    2017-09-26 08:50:08
		  </el-form-item> -->
		  <!-- <el-form-item class="appblock" label="开通商家量:">
		    <el-select v-model="form.shopNum" placeholder="请选择" style="width:300px;">
			    <el-option
			      v-for="item in options"
			      :label="item.label"
			      :value="item.value">
			    </el-option>
			</el-select>
		  </el-form-item> -->
		  <!-- <el-form-item class="appblock" label="账号状态:">
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
			    <el-checkbox value='1' label="咨询"></el-checkbox>
			    <el-checkbox value='2' label="共享商城"></el-checkbox>
			</el-checkbox-group>
		  </el-form-item>
		</el-form> -->
		<!-- <div style="clear:both"></div> -->
		<el-form :label-position="labelPosition" label-width="130px" style="margin-top:20px;" class="appbox">
		  <el-form-item class="appblock" label="营业执照副本:">
		    <el-upload
			  class="avatar-uploader"
			  action="//jsonplaceholder.typicode.com/posts/"
			  :show-file-list="false"
			  :on-success="handleAvatarScucessA">
			  <img v-if="imageUrla" :src="imageUrla" class="avatar">
			  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
			</el-upload>
		  </el-form-item>
		 <!--  <el-form-item class="appblock" label="营业执照反面:">
		    <el-upload
			  class="avatar-uploader"
			  action="//jsonplaceholder.typicode.com/posts/"
			  :show-file-list="false"
			  :on-success="handleAvatarScucessB">
			  <img v-if="imageUrlb" :src="imageUrlb" class="avatar">
			  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
			</el-upload>
		  </el-form-item> -->
		 <!--  <el-form-item class="appblock" label="联系人身份证正面:">
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
			<el-button type="primary" @click="confirmAdd">确定</el-button>
		</div>
	</div>
</template>
<script>
import { autoApi,logApi } from '@/ajax/post.js'
import regionData from '@/region.js'

	export default {
	    data() {
	      return {
	      	imageUrla: '',
	      	// imageUrlb: '',
	        labelPosition: 'right',
	        info:'',
	        // regionFormData: [],		//格式化行政区划表
	        // regions: [],			//一级行政区划表
	        form:{
	        	name:'',
	        	account:'',
	        	// region:'',
	        	phone:'',
	        	// yzm: null,
	        	servicePhone: null,
	        	identity: null,		//营业执照号
	        	// shopNum:'',
	        	// pay:[],
	        	// point:'',
	        	// type:[],
	        	// company:[],
	        	// other:[],
	        	people:'',
	        	time: ''
	        },
	        // getyzmMsg: '获取验证码',
	        // count: 30				//验证码计时器
	        // options: [{
	        //   value: '1',
	        //   label: '5'
	        // }, {
	        //   value: '2',
	        //   label: '10'
	        // }, {
	        //   value: '3',
	        //   label: '15'
	        // }, {
	        //   value: '4',
	        //   label: '20'
	        // }, {
	        //   value: '5',
	        //   label: '25'
	        // }],
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

			handleAvatarScucessA(res, file) {
		        this.imageUrla = URL.createObjectURL(file.raw);
		    },
		    // handleAvatarScucessB(res, file) {
		    //     this.imageUrlb = URL.createObjectURL(file.raw);
		    // },
		    // getyzm() {
		    // 	if (this.getyzmMsg == '获取验证码') {
		    // 		this.getyzmMsg = this.count + 's';
		    // 		logApi({
		    //    			action: 'captcha_obtain',
		    //    			version: '1.0',
		    //    			mobile: '+86' + this.form.phone,
		    //    			appId: window.localStorage.getItem("appId"),
		    //    		}).then((res)=> {
		    //    			if (res.code == 0) {
		    //    				this.form.yzm = res.attach;		       			
		    //    			}
		    //    		})
		    // 	}
		    // 	this.count--;
		    // 	this.getyzmMsg = this.count + 's后重新获取';
		    // 	if (this.count <= 0) {
		    // 		this.getyzmMsg = '获取验证码';
		    // 		return false
		    // 	}
		    // 	setTimeout(this.getyzm,1000);
		    // },

		    confirmAdd() {
		    	if (this.form.identity && this.form.name && this.form.people && this.form.phone && this.form.time && this.form.contactsMobile && this.form.servicePhone && this.imageUrla) {
		    		let tname = this.form.name;
			    	// let region = this.form.region;
			    	let identity = this.form.identity;
			    	let identityFace = this.imageUrla;
			    	// let identityBack = this.imageUrlb;
			    	let mobile = this.form.phone;
			    	let endTime = this.getFormTime(Date.parse(this.form.time));
			    	let name = this.form.people;
			    	let contactsMobile = this.form.contactsMobile;
			    	let servicePhone = this.form.servicePhone;
			    	autoApi({
			   			action: 'tenant_add',
			   			version: '1.0',
			   			tname: tname,
			   			// region: region,
			   			identity: identity,
			   			identityFace: identityFace,
			   			// identityBack: identityBack,
			   			mobile: mobile,
			   			// captcha: captcha,
			   			endTime: endTime,
			   			name: name,
			   			contactsMobile: contactsMobile,
			   			servicePhone: servicePhone
			   		},window.localStorage.getItem('token')).then((res)=> {
			   			if (res.code == 0) {
			   				this.$message({
					            message: '新增商户成功',
					            type: 'success'
					        });
					        router.push({
						        path: '/shop/shop-list'
						    });
		       			}
			   		})
		    	}
		    	else
		    	{
		    		this.$message({
		    			typp: 'info',
		    			message: '输入信息不完整'
		    		});
		    	}	
			    	
		    }
	    },
	    mounted() {
	        // this.form.phone = 13105716367;
	        // for(let index in regionData) {
	        // 	let buf = {
	        // 		value: regionData[index],
	        // 		label: index
	        // 	}
	        // 	this.regionFormData.push(buf);
	        // }
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