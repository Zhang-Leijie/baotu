<template>
	<div>
		<el-breadcrumb separator="/">
		  	<el-breadcrumb-item :to="{name:'GMList'}">管理员列表</el-breadcrumb-item>
		  	<el-breadcrumb-item>{{id?'编辑':'新增'}}</el-breadcrumb-item>
		</el-breadcrumb>
		<el-form label-width="120px" class="appbox">
		  <el-form-item class="appblock" label="名字:">
		    <el-input type="text" style="width:300px;" v-model="name" auto-complete="off" placeholder="请输入名字"></el-input>
		  </el-form-item>
		  <el-form-item class="appblock" label="密码:">
		    <el-input type="text" style="width:300px;" v-model="password" auto-complete="off" placeholder="请输入密码"></el-input>
		  </el-form-item>
		</el-form>
		<div style="clear:both"></div>
		<div style="margin-left: 120px;margin-top: 20px;">
			<el-button @click="goback">取消</el-button>
			<el-button type="primary" @click="comfirmAdd"  v-if="!id">添加账号</el-button>
			<el-button type="primary" @click="comfirmSave" v-if="id">保存修改</el-button>
		</div>
	</div>
</template>
<script>
import { masterApi } from '@/ajax/post.js'

	export default {
	    data() {
	      return {
	      	id: null,
        	name: '',
        	password: ''
	      };
	    },
	    methods: {
	       formatDate(time){
			  var   x = (time - 0) * 1000
			  console.log(x)
			  var   now = new Date(x) 
			  var   year = now.getFullYear();     
			  var   month = "0" + (now.getMonth()+1);     
			  var   date = "0" +(now.getDate());   
			  var   hour = "0" +now.getHours();
			  var   min =  "0" +now.getMinutes();
			  return   year+"-"+month.substr(-2)+"-"+date.substr(-2)+'   '+ hour.substr(-2) +':'+min.substr(-2)
			},

			comfirmAdd() {
				if (this.name && this.password) {
					let payload = {
						name: this.name,
						pwd: this.password,
					}
					payload = JSON.stringify(payload);
					masterApi({
						action: 'admin_edit',
						version: '1.0',
						crudType: 1,
						payload: payload
					},window.localStorage.getItem('token')).then((res)=> {
						if (res.code == 0) {
							this.$message({
					            type: 'success',
					            message: '添加管理员账号成功'
					        });
						    router.push({
						  	  name: "GMList"
						    })
						}
					})
				}
				else
				{
					this.$message({
			            type: 'error',
			            message: '信息填写不完整'
			        });
				}
			},

			comfirmSave() {

			},

			goback() {
				router.push({
			  	  name: "GMList"
			    })
			}
	    },
	    mounted(){
	        if (this.$route.query.id) {
	        	this.id = this.$route.query.id;
	        }
	    }
	}
</script>
<style lang="less">
	.appbox{
		.appblock{
			width: 100%;
			margin-top: 20px;
		}
	}
</style>