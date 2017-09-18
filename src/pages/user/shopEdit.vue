<template>
	<div class="shopEditBody">
		<el-breadcrumb separator="/">
		  	<el-breadcrumb-item :to="{name:'shop-shop-list'}">商家列表</el-breadcrumb-item>
		  	<el-breadcrumb-item>编辑</el-breadcrumb-item>
		</el-breadcrumb>
		<el-form label-position="right" label-width="120px" style="margin-top:20px;" class="appbox">
		  <el-form-item class="appblock" label="商家名称:">
		    <span>{{form.name}}</span>
		  </el-form-item>
		  <el-form-item class="appblock" label="营业执照号:">
		    <el-input type="text" style="width:300px;" v-model="form.num" auto-complete="off" placeholder="请输入营业执照号"></el-input>
		  </el-form-item>
		  <el-form-item class="appblock" label="联系人:">
		    <el-input type="text" style="width:300px;" v-model="form.people" auto-complete="off" placeholder="请输入联系人"></el-input>
		  </el-form-item>
		  <el-form-item class="appblock" label="联系人电话:">
		    <el-input type="text" style="width:300px;" v-model="form.phone" auto-complete="off" placeholder="请输入手机号"></el-input>
		  </el-form-item>
		  <el-form-item class="appblock" label="过期时间:">
		     <el-date-picker v-model="form.time" type="date" placeholder="选择日期" v-if="endTimeEdited"></el-date-picker>
		     <span v-if="!endTimeEdited">{{form.time}}</span>
		  </el-form-item>
		</el-form>

		<div style="clear:both"></div>

		<el-form label-position="right" label-width="130px" style="margin-top:20px;" class="appbox">
		  <el-form-item class="appblock" label="营业执照:">
		    <el-upload
			  class="avatar-uploader"
			  action=""
			  :show-file-list="false"
			  :before-upload="beforeUpload">
			  <img v-if="form.imageUrl" :src="form.imageUrl" class="avatar">
			  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
			</el-upload>
		  </el-form-item>
		</el-form>
		<div style="clear:both"></div>
		<div style="text-align:center;margin-top:20px;">
			<el-button @click="goback">返回</el-button>
			<el-button type="primary" @click="confirmEdit">确定</el-button>
		</div>
	</div>
</template>
<script>
import { autoApi,uploadImg } from '@/ajax/post.js'

	export default {
	    data() {
	      return {
	        endTimeEdited: false,
	        fileBuf: null,
	        form:{
	        	tid: null,
	        	name: null,
	        	num: null,
	        	time: null,
	        	imageUrl: null,
	        	people: null,
	        	phone: null,
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
		    getInfo(id) {
		    	let payload = {
		    		employeeId: id,
		    	}
		    	payload = JSON.stringify(payload);
		    	autoApi({
		   			action: 'tenant_info',
		   			version: '1.0',
		   			payload: payload,
		   		},window.localStorage.getItem('token')).then((res)=> {
		   			if (res.code == 0) {
		   				   	this.form.tid = res.attach.tid;
				        	this.form.name = res.attach.name;
				        	this.form.imageUrl = res.attach.licenseImage;
				        	this.form.num = res.attach.license;
				        	if (this.$route.query.expire) {
				        		this.form.time = this.getFormTime(this.$route.query.expire * 1000);
				        	}
				        	this.form.people = this.$route.query.contacts;
				        	this.form.phone = this.$route.query.contractsMobile;
	       			}
		   		})
		    },

		    beforeUpload(file) {
			    var vm = this;
		    	var reader = new FileReader();
			    reader.readAsDataURL(file);
			    reader.onload = function(e){
			        vm.form.imageUrl = this.result;
			    }
			    this.fileBuf = file;
			    return false; //放弃组件上传
		    },

		    uploadFile(tid,file) {
				let fd = new FormData();
				fd.append("version", '1.0');
				fd.append("action", 'upload_tenant_license');
				fd.append("license", file);
				let payload = {
					tid: tid,
				}
				payload = JSON.stringify(payload);
				fd.append("payload", payload);
				uploadImg(fd);
		    },

		    confirmEdit() {
			    if (this.form.name && this.form.imageUrl && this.form.time && this.form.num && this.form.tid && this.form.people && this.form.phone) {
			    	let payload = {
			   			tname: this.form.name,
			   			expire: Date.parse(this.form.time) / 1000,
			   			license: this.form.num,
			   			tid: this.form.tid,
			   			contacts: this.form.people,
			   			contactsMobile: this.form.phone,
			    	}
			    	payload = JSON.stringify(payload);
			    	autoApi({
			   			action: 'platform_tenant_set',
			   			version: '1.0',
			   			payload: payload
			   		},window.localStorage.getItem('token')).then((res)=> {
			   			if (res.code == 0) {
			   				this.$message({
					            message: '修改的设置已保存',
					            type: 'success',
					        });

			   				this.uploadFile(this.form.tid,this.fileBuf);

			   				setTimeout(function(){
			   					router.push({
							        path: '/shop/shop-list',
							    });
			   				},1000);
		       			}
			   		})
			    }
			    else
			    {
			    	this.$message({
			    		message: '信息填写不完整,请检查',
			    		type: 'error',
			    	});
			    }
		    },
		    goback() {
		    	router.push({
			        path: '/shop/shop-list'
			    });
		    },
		    editEndTime() {
		    	this.endTimeEdited = true;
		    }
	    },
	    mounted(){
	    	this.getInfo(this.$route.query.tid);
	    }
	}
</script>
<style lang="less">
.shopEditBody {
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