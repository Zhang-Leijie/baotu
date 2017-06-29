<template>
	<div>
		<el-breadcrumb separator="/">
		  	<el-breadcrumb-item>奖励设置</el-breadcrumb-item>
		</el-breadcrumb>
		<el-form :label-position="labelPosition" label-width="120px" style="margin-top:20px;" class="appbox">
		  <el-form-item class="appblock" label="团队层级:">
		  	<el-radio class="radio" v-model="radio" label="1">一级</el-radio>
  			<el-radio class="radio" v-model="radio" label="2">二级</el-radio>
  			<el-radio class="radio" v-model="radio" label="2">三级</el-radio>
		  </el-form-item>
		</el-form>
		<div style="clear:both"></div>

		<el-form :label-position="labelPosition" label-width="120px" class="appbox">
		  <el-form-item class="Btitle" label="规则奖励:" style="margin-bottom:0px;"></el-form-item>
		  <el-form-item class="appblock" label="团队层级:">
		  	<el-radio class="radio" v-model="radio" label="1">月度</el-radio>
  			<el-radio class="radio" v-model="radio" label="2">季度</el-radio>
		  </el-form-item>
		  <el-form-item class="appblock" label="统计类型:">
		  	<el-radio class="radio" v-model="radio" label="1">签单成功</el-radio>
  			<el-radio class="radio" v-model="radio" label="2">保单生效</el-radio>
		  </el-form-item>
		  <el-form-item class="appblock" label="险种:">
			<el-checkbox-group v-model="form.insurance">
			    <el-checkbox value='1' label="险种1"></el-checkbox>
				<el-checkbox value='2' label="险种2"></el-checkbox>	
			</el-checkbox-group>
		  </el-form-item>
		</el-form>
		<div style="clear:both"></div>

		<el-form :label-position="labelPosition" label-width="120px" class="appbox">
		  <el-form-item class="Btitle" label="统计口径:" style="margin-bottom:0px;"></el-form-item>
		  <el-form-item label="统计车型:">
			<el-checkbox-group v-model="form.carType">
			    <el-checkbox value='1' label="非营业客车"></el-checkbox>
				<el-checkbox value='2' label="非营业货车"></el-checkbox>
				<el-checkbox value='3' label="营业客车"></el-checkbox>
				<el-checkbox value='4' label="营业货车"></el-checkbox>
				<el-checkbox value='5' label="特种车"></el-checkbox>
			</el-checkbox-group>
		  </el-form-item>
		  <el-form-item label="统计险种:">
			<el-checkbox-group v-model="form.insuranceType">
			    <el-checkbox value='1' label="商业险"></el-checkbox>
				<el-checkbox value='2' label="交强险"></el-checkbox>
			</el-checkbox-group>
		  </el-form-item>
		</el-form>
		<div style="clear:both"></div>
		
		<el-form :label-position="labelPosition" label-width="120px" class="appbox">
		  <el-form-item class="Btitle" label="奖励口径:" style="margin-bottom:0px;"></el-form-item>
		  <el-form-item label="统计车型:">
			<el-checkbox-group v-model="form.carTypeR">
			    <el-checkbox value='1' label="非营业客车"></el-checkbox>
				<el-checkbox value='2' label="非营业货车"></el-checkbox>
				<el-checkbox value='3' label="营业客车"></el-checkbox>
				<el-checkbox value='4' label="营业货车"></el-checkbox>
				<el-checkbox value='5' label="特种车"></el-checkbox>
			</el-checkbox-group>
		  </el-form-item>
		  <el-form-item label="统计险种:">
			<el-checkbox-group v-model="form.insuranceTypeR">
			    <el-checkbox value='1' label="商业险"></el-checkbox>
				<el-checkbox value='2' label="交强险"></el-checkbox>
			</el-checkbox-group>
		  </el-form-item>
		  <el-form-item label="奖励分配:">
			<div v-for="(list,index) in form.rewardList" style="margin-bottom:5px;">
				<el-input placeholder="请输入保费" style="width:200px;" v-model="list.money1">
				    <template slot="prepend">保费</template>
				</el-input>
				至
				<el-input placeholder="请输入保费" style="width:200px;" v-model="list.money2">
				    <template slot="prepend">保费</template>
				</el-input>
				<el-input placeholder="奖励比例" style="width:200px;margin-left:30px;" v-model="list.reward">
				    <template slot="prepend">奖励比例(%)</template>
				</el-input>
				<el-button type="primary" @click="delReward(index)">删除</el-button>
			</div>
			<div style="text-align:center;width:80%;margin-top:20px;">
				<el-button type="primary" @click="addReward">新增</el-button>
			</div>
		  </el-form-item>
		</el-form>
		<div style="clear:both"></div>

		<el-form :label-position="labelPosition" label-width="140px" style="margin-top:20px;" class="appbox">
		  <el-form-item class="Btitle" label="管理奖励:" style="margin-bottom:0px;"></el-form-item>
		  <el-form-item label="商业险:" style="margin-bottom:0px;"></el-form-item>
		  <el-form-item label="非营业车-二级比例:" class="appblock">
		    <el-input-number size="small" v-model="num1" :step="0.01"></el-input-number>
		  </el-form-item>
		  <el-form-item label="营业车-二级比例:" class="appblock">
		    <el-input-number size="small" v-model="num1" :step="0.01"></el-input-number>
		  </el-form-item>
		  <el-form-item label="非营业车-三级比例:" class="appblock">
		    <el-input-number size="small" v-model="num1" :step="0.01"></el-input-number>
		  </el-form-item>
		  <el-form-item label="营业车-三级比例:" class="appblock">
		    <el-input-number size="small" v-model="num1" :step="0.01"></el-input-number>
		  </el-form-item>
		  <el-form-item label="交强险:" style="margin-bottom:0px;"></el-form-item>
		  <el-form-item label="非营业车-二级比例:" class="appblock">
		    <el-input-number size="small" v-model="num1" :step="0.01"></el-input-number>
		  </el-form-item>
		  <el-form-item label="营业车-二级比例:" class="appblock">
		    <el-input-number size="small" v-model="num1" :step="0.01"></el-input-number>
		  </el-form-item>
		  <el-form-item label="非营业车-三级比例:" class="appblock">
		    <el-input-number size="small" v-model="num1" :step="0.01"></el-input-number>
		  </el-form-item>
		  <el-form-item label="营业车-三级比例:" class="appblock">
		    <el-input-number size="small" v-model="num1" :step="0.01"></el-input-number>
		  </el-form-item>
		</el-form>
		<div style="clear:both"></div>

		<div style="text-align:center;margin-top:20px;">
			<el-button type="primary">确定</el-button>
		</div>
	</div>
</template>
<script>
	export default {
	    data() {
	      return {
	      	num1:'',
	        labelPosition: 'right',
	        radio:'',
	        form:{
	        	carType:[],
	        	insuranceType:[],
	        	carTypeR:[],
	        	insuranceTypeR:[],
	        	rewardList:[{money1:'',money2:'',reward:''}]
	        },
	      };
	    },
	    methods: {
	       	delReward(index){
	       		console.log(index)
	       		this.form.rewardList.splice(index, 1);
	       	},
	       	addReward(){
	       		this.form.rewardList.push({money1:'',money2:'',reward:''})
	       	}
	    },
	    mounted:function(){
	        
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