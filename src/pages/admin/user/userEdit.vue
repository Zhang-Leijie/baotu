<template>
	<div>
		<el-breadcrumb separator="/">
		  	<el-breadcrumb-item :to="{name:'admin-user-list'}">管理员账号列表</el-breadcrumb-item>
		  	<el-breadcrumb-item>编辑</el-breadcrumb-item>
		</el-breadcrumb>
		<el-form :label-position="labelPosition" label-width="180px" style="margin-top:20px;">
		  <el-form-item label="账号:">
		    <!-- <el-input type="text" style="width:300px;" v-model="form.account" auto-complete="off" placeholder="请输入账号"></el-input> -->
		    账号
		  </el-form-item>
		  <el-form-item label="角色:">
		    <el-radio class="radio" v-model="radio" label="1">备选项</el-radio>
  			<el-radio class="radio" v-model="radio" label="2">备选项</el-radio>
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
	        labelPosition: 'right',
	        info:'',
	        form:{
	        	account:'',
	        	password:'',
	        },
	        radio: '',
	      };
	    },
	    methods: {
	       formatDate(time){
			  var   x = time - 0
			  console.log(x)
			  var   now = new Date(x) 
			  var   year = now.getFullYear();     
			  var   month = "0" + (now.getMonth()+1);     
			  var   date = "0" +(now.getDate());   
			  var   hour = "0" +now.getHours();
			  var   min =  "0" +now.getMinutes();
			  return   year+"-"+month.substr(-2)+"-"+date.substr(-2)+'   '+ hour.substr(-2) +':'+min.substr(-2)
			}
	    },
	    mounted:function(){
	        
	    }
	}
</script>