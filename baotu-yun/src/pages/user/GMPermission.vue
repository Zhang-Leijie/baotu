<template>
	<div>
		<el-breadcrumb separator="/">
		  	<el-breadcrumb-item :to="{name:'GMList'}">管理员列表</el-breadcrumb-item>
		  	<el-breadcrumb-item>管理员授权</el-breadcrumb-item>
		</el-breadcrumb>
		
		<div style="margin-left: 120px;margin-top: 20px;">
			<el-button @click="goback">取消</el-button>
			<el-button type="primary" @click="comfirmAdd" v-if="!id">添加账号</el-button>
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
					},window.localStorage.getItem('tokenPlate')).then((res)=> {
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