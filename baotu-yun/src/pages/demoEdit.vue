<template>
	<div>
		<el-breadcrumb separator="/">
		  	<el-breadcrumb-item :to="{name:'areaList'}">地区列表</el-breadcrumb-item>
		  	<el-breadcrumb-item>{{isAdd?'新增':'编辑'}}</el-breadcrumb-item>
		</el-breadcrumb>

		<el-form label-width="120px" class="appbox">
		  	<el-form-item class="appblock" label=":">
	    		 
		  	</el-form-item>
		</el-form>

		<div style="text-align:center;margin-top:20px;">
			<el-button @click="goback">取消</el-button>
			<el-button type="primary" @click="comfirmAdd" v-if="isAdd">添加</el-button>
			<el-button type="primary" @click="comfirmSave" v-if="!isAdd">保存</el-button>
		</div>
	</div>
</template>
<script>
import { masterApi } from '@/ajax/post.js'

	export default {
	    data() {
	      return {
	      	isAdd: false,
	        form: {
	      		
	        }
	      };
	    },
	    methods: {
	       formatDate(time){
			  var   x = (time - 0) * 1000
			  
			  var   now = new Date(x) 
			  var   year = now.getFullYear();     
			  var   month = "0" + (now.getMonth()+1);     
			  var   date = "0" +(now.getDate());   
			  var   hour = "0" +now.getHours();
			  var   min =  "0" +now.getMinutes();
			  return   year+"-"+month.substr(-2)+"-"+date.substr(-2)+'   '+ hour.substr(-2) +':'+min.substr(-2)
			},
			
			comfirmAdd() {
				if (this.form) {
					// masterApi({
					// 	action: 'demo_edit',
					// 	version: '1.0',
					// 	crudType: 1
					// },window.localStorage.getItem('tokenPlate')).then((res)=> {
					// 	if (res.code == 0) {
					// 		this.$message({
					//             type: 'success',
					//             message: '添加地区成功'
					//         });
					// 	    router.push({
					// 	  	  name: "areaList"
					// 	    })
					// 	}
					// })
				}
				else
				{
					this.$message({
			            type: 'error',
			            message: '信息不完整'
			        });
				}
			},

			comfirmSave() {
				if (this.form) {
					// masterApi({
					// 	action: 'demo_edit',
					// 	version: '1.0',
					// 	crudType: 4,
					// },window.localStorage.getItem('tokenPlate')).then((res)=> {
					// 	if (res.code == 0) {
					// 		this.$message({
					//             type: 'success',
					//             message: '修改已保存'
					//         });
					// 	    router.push({
					// 	  	  name: "demoList"
					// 	    })
					// 	}
					// })
				}
				else
				{
					this.$message({
			            type: 'error',
			            message: '信息不完整'
			        });
				}
			},

			goback() {
				router.push({
			  	  name: "demoList"
			    })
			}
	    },
	    mounted(){
	        if (this.$route.query) {
	        	this.isAdd = false
	        }
	        else
	        {
	        	this.isAdd = true;
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