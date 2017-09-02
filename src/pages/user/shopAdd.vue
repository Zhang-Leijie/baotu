<template>
	<div class="shopAddBody">
		<el-breadcrumb separator="/">
		  	<el-breadcrumb-item :to="{name:'shop-shop-list'}">商家列表</el-breadcrumb-item>
		  	<el-breadcrumb-item>新增</el-breadcrumb-item>
		</el-breadcrumb>
		<el-form label-position="right" label-width="120px" style="margin-top:20px;" class="appbox">
		  <el-form-item class="appblock" label="商家名称:">
		    <el-input type="text" style="width:300px;" v-model="form.name" placeholder="请输入商家名称"></el-input>
		  </el-form-item>
		  <el-form-item class="appblock" label="顶级用户手机号:">
		    <el-input style="width:300px;" v-model="form.phone" placeholder="请输入手机号"></el-input>
		  </el-form-item>
		  <el-form-item class="appblock" label="行政区划选择:">
		    <el-select style="width:145px;" v-model="form.region" placeholder="请选择">
			    <el-option v-for="item in regionFormData" :label="item.label" :value="item.value"></el-option>
			</el-select>
		  </el-form-item>
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
		    <el-input style="width:300px;" v-model="form.license"></el-input>
		  </el-form-item>
		</el-form>

		<div style="clear:both"></div>

		<el-form label-position="right" label-width="130px" style="margin-top:20px;" class="appbox">
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
		</el-form>
		<div style="clear:both"></div>
		<div style="text-align:center;margin-top:20px;">
			<el-button type="primary" @click="confirmAdd">确定</el-button>
		</div>
	</div>
</template>
<script>
import { autoApi } from '@/ajax/post.js'

	export default {
	    data() {
	      return {
	      	imageUrla: '',
	        info:'',
	        regionFormData: [],		//格式化行政区划表
	        form:{
	        	name:'',
	        	account:'',
	        	region:'',
	        	phone:'',
	        	servicePhone: null,
	        	license: null,		//营业执照号
	        	people:'',
	        	time: ''
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

		    getRegion() {
		    	let payload = {}
		    	payload = JSON.stringify(payload);
		    	autoApi({
		   			action: 'areas',
		   			version: '1.0',
		   			payload: payload
		   		},window.localStorage.getItem('token')).then((res)=> {
		   			if (res.code == 0) {
		   				if (res.attach) {
		   					for (var i = 0; i < res.attach.length; i++) {
		   						let buf = {
		   							value: res.attach[i].code,
		   							label: res.attach[i].name,
		   						}
		   						this.regionFormData.push(buf);
		   					}
		   				}
	       			}
		   		})
		    },

			handleAvatarScucessA(res, file) {
		        this.imageUrla = URL.createObjectURL(file.raw);
		    },

		    confirmAdd() {
		    	if (this.form.license && this.form.name && this.form.people && this.form.phone && this.form.time && this.form.contactsMobile && this.form.servicePhone && this.imageUrla && this.form.region) {
		    		let payload = {
		    			tname: this.form.name,
			   			region: this.form.region,
			   			license: this.form.license,
			   			licenseImage: this.imageUrla,
			   			mobile: this.form.phone,
			   			expire: Date.parse(this.form.time) / 1000,
			   			contacts: this.form.people,
			   			contactsMobile: this.form.contactsMobile,
			   			servicePhone: this.form.servicePhone
		    		}
		    		payload = JSON.stringify(payload);

			    	autoApi({
			   			action: 'tenant_add',
			   			version: '1.0',
			   			payload: payload
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
	        this.getRegion();
	    }
	}
</script>
<style lang="less">
.shopAddBody {
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
}
	
</style>