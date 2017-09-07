<template>
	<div>
		<el-breadcrumb separator="/">
		  	<el-breadcrumb-item :to="{name:'shop-role-list'}">角色列表</el-breadcrumb-item>
		  	<el-breadcrumb-item>编辑</el-breadcrumb-item>
		</el-breadcrumb>
		<el-form :label-position="labelPosition" label-width="120px" style="margin-top:20px;" class="appbox">
		  <el-form-item class="appblock" label="角色名称:">
		    <el-input type="text" style="width:300px;" v-model="form.name" auto-complete="off" placeholder="请输入商家名称"></el-input>
		  </el-form-item>
		  <el-form-item class="appblock" label="模块名称:">
		    <el-checkbox-group v-model="form.module">
			    <el-checkbox value='1' label="业务模块"></el-checkbox>
			    <el-checkbox value='2' label="管理模块"></el-checkbox>
			</el-checkbox-group>
		  </el-form-item>
		  <el-form-item class="appblock" label="账号体系:">
			<el-checkbox-group v-model="form.account">
			    <el-checkbox value='1' label="模块1"></el-checkbox>
				<el-checkbox value='2' label="模块2"></el-checkbox>
				<el-checkbox value='3' label="模块3"></el-checkbox>
			</el-checkbox-group>
		  </el-form-item>
		  <el-form-item class="appblock" label="产品体系:">
			<el-checkbox-group v-model="form.product">
			    <el-checkbox value='1' label="模块1"></el-checkbox>
				<el-checkbox value='2' label="模块2"></el-checkbox>
				<el-checkbox value='3' label="模块3"></el-checkbox>
			</el-checkbox-group>
		  </el-form-item>
		  <el-form-item class="appblock" label="订单体系:">
			<el-checkbox-group v-model="form.order">
			    <el-checkbox value='1' label="模块1"></el-checkbox>
				<el-checkbox value='2' label="模块2"></el-checkbox>
				<el-checkbox value='3' label="模块3"></el-checkbox>
			</el-checkbox-group>
		  </el-form-item>
		  <el-form-item class="appblock" label="消息体系:">
			<el-checkbox-group v-model="form.message">
			    <el-checkbox value='1' label="模块1"></el-checkbox>
				<el-checkbox value='2' label="模块2"></el-checkbox>
				<el-checkbox value='3' label="模块3"></el-checkbox>
			</el-checkbox-group>
		  </el-form-item>
		  <el-form-item class="appblock" label="运营体系:">
			<el-checkbox-group v-model="form.run">
			    <el-checkbox value='1' label="模块1"></el-checkbox>
				<el-checkbox value='2' label="模块2"></el-checkbox>
				<el-checkbox value='3' label="模块3"></el-checkbox>
			</el-checkbox-group>
		  </el-form-item>
		</el-form>
		<div style="text-align:center;margin-top:20px;">
			<el-button type="primary">确定</el-button>
		</div>
	</div>
</template>
<script>
	export default {
	    data() {
	      return {
	      	imageUrl: '',
	        labelPosition: 'right',
	        info:'',
	        form:{
	        	name:'',
	        	module:[],
	        	account:[],
	        	product:[],
	        	order:[],
	        	message:[],
	        	run:[],
	        },
	        radio: '',
	        options: [{
	          value: '1',
	          label: '5'
	        }, {
	          value: '2',
	          label: '10'
	        }, {
	          value: '3',
	          label: '15'
	        }, {
	          value: '4',
	          label: '20'
	        }, {
	          value: '5',
	          label: '25'
	        }],
	      };
	    },
	    methods: {
	       formatDate(time){
			  var   x = time - 0
			  
			  var   now = new Date(x) 
			  var   year = now.getFullYear();     
			  var   month = "0" + (now.getMonth()+1);     
			  var   date = "0" +(now.getDate());   
			  var   hour = "0" +now.getHours();
			  var   min =  "0" +now.getMinutes();
			  return   year+"-"+month.substr(-2)+"-"+date.substr(-2)+'   '+ hour.substr(-2) +':'+min.substr(-2)
			},
	    },
	    mounted:function(){
	        
	    }
	}
</script>
<style lang="less">
	.appbox{
		.appblock{
			
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