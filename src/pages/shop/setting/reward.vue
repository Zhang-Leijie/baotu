<template>
	<div class="reward">
		<el-breadcrumb separator="/">
		  	<el-breadcrumb-item>奖励设置</el-breadcrumb-item>
		</el-breadcrumb>

		<div class="topBar">
			<el-button size="large" type="primary" v-if="viewMode == 1">规模奖励</el-button>
			<el-button size="large" v-if="viewMode == 2" @click="guimoShow">规模奖励</el-button>
			<el-button size="large" type="primary" v-if="viewMode == 2">管理奖励</el-button>
			<el-button size="large" v-if="viewMode == 1" @click="guanliShow">管理奖励</el-button>
		</div>

		<el-form :label-position="labelPosition" label-width="120px" style="margin-top:20px;" class="appbox" v-if="viewMode == 1">
		  <el-form-item class="appblock" label="团队层级:">
		  	<el-radio class="radio" v-model="radio" label="1">一级</el-radio>
  			<el-radio class="radio" v-model="radio" label="2">二级</el-radio>
  			<el-radio class="radio" v-model="radio" label="2">三级</el-radio>
		  </el-form-item>
		</el-form>
		<div style="clear:both"></div>

		<el-form :label-position="labelPosition" label-width="120px" class="appbox" v-if="viewMode == 1">
		  <el-form-item class="Btitle" label="规模奖励:" style="margin-bottom:0px;"></el-form-item>
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

		<el-form :label-position="labelPosition" label-width="120px" class="appbox" v-if="viewMode == 1">
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
		
		<el-form :label-position="labelPosition" label-width="120px" class="appbox" v-if="viewMode == 1">
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
				<!-- <el-button type="primary" @click="delReward(index)">删除</el-button> -->
			</div>
			<div style="text-align:center;width:80%;margin-top:20px;">
				<!-- <el-button type="primary" @click="addReward">新增</el-button> -->
			</div>
		  </el-form-item>
		</el-form>
		<div style="clear:both"></div>

		<div v-if="viewMode == 2">
			<span class="titleLabel">商业险</span>
			<el-row class="optionCol">
				<el-col :span="12">
					<label class="titleLabel">非营业车-二级比例：</label>
					<el-input-number v-model="guanli.shangyeData.N2.value" :min="0" :max="100" :step="0.1" :debounce="100" size="small" class="countTool"></el-input-number> %
					<el-button @click="guanliConfirmEdit(guanli.shangyeData.N2.key,guanli.shangyeData.N2.value,2,8)" style="margin-left: 20px" v-show="!(guanli.shangyeData.N2.value == guanli.shangyeData.N2.origin)">确定</el-button>
				</el-col>	
				<el-col :span="12">
					<label class="titleLabel">营业车-二级比例：</label>
					<el-input-number v-model="guanli.shangyeData.Y2.value" :min="0" :max="100" :step="0.1" :debounce="100" size="small" class="countTool"></el-input-number> %
					<el-button @click="guanliConfirmEdit(guanli.shangyeData.Y2.key,guanli.shangyeData.Y2.value,2,1)" style="margin-left: 20px" v-show="!(guanli.shangyeData.Y2.value == guanli.shangyeData.Y2.origin)">确定</el-button>
				</el-col>
			</el-row>
			<el-row class="optionCol">
				<el-col :span="12">
					<label class="titleLabel">非营业车-三级比例：</label>
					<el-input-number v-model="guanli.shangyeData.N3.value" :min="0" :max="100" :step="0.1" :debounce="100" size="small" class="countTool"></el-input-number> %
					<el-button @click="guanliConfirmEdit(guanli.shangyeData.N3.key,guanli.shangyeData.N3.value,3,8)" style="margin-left: 20px" v-show="!(guanli.shangyeData.N3.value == guanli.shangyeData.N3.origin)">确定</el-button>
				</el-col>	
				<el-col :span="12">
					<label class="titleLabel">营业车-三级比例：</label>
					<el-input-number v-model="guanli.shangyeData.Y3.value" :min="0" :max="100" :step="0.1" :debounce="100" size="small" class="countTool"></el-input-number> %
					<el-button @click="guanliConfirmEdit(guanli.shangyeData.Y3.key,guanli.shangyeData.Y3.value,3,1)" style="margin-left: 20px" v-show="!(guanli.shangyeData.Y3.value == guanli.shangyeData.Y3.origin)">确定</el-button>
				</el-col>
			</el-row>

			<span class="titleLabel">交强险</span>
			<el-row class="optionCol">
				<el-col :span="12">
					<label class="titleLabel">非营业车-二级比例：</label>
					<el-input-number v-model="guanli.jiaoqiangData.N2.value" :min="0" :max="100" :step="0.1" :debounce="100" size="small" class="countTool"></el-input-number> %
					<el-button @click="guanliConfirmEdit(guanli.jiaoqiangData.N2.key,guanli.jiaoqiangData.N2.value,2,4)" style="margin-left: 20px" v-show="!(guanli.jiaoqiangData.N2.value == guanli.jiaoqiangData.N2.origin)">确定</el-button>
				</el-col>	
				<el-col :span="12">
					<label class="titleLabel">营业车-二级比例：</label>
					<el-input-number v-model="guanli.jiaoqiangData.Y2.value" :min="0" :max="100" :step="0.1" :debounce="100" size="small" class="countTool"></el-input-number> %
					<el-button @click="guanliConfirmEdit(guanli.jiaoqiangData.Y2.key,guanli.jiaoqiangData.Y2.value,2,2)" style="margin-left: 20px" v-show="!(guanli.jiaoqiangData.Y2.value == guanli.jiaoqiangData.Y2.origin)">确定</el-button>
				</el-col>
			</el-row>
			<el-row class="optionCol">
				<el-col :span="12">
					<label class="titleLabel">非营业车-三级比例：</label>
					<el-input-number v-model="guanli.jiaoqiangData.N3.value" :min="0" :max="100" :step="0.1" :debounce="100" size="small" class="countTool"></el-input-number> %
					<el-button @click="guanliConfirmEdit(guanli.jiaoqiangData.N3.key,guanli.jiaoqiangData.N3.value,3,4)" style="margin-left: 20px" v-show="!(guanli.jiaoqiangData.N3.value == guanli.jiaoqiangData.N3.origin)">确定</el-button>
				</el-col>	
				<el-col :span="12">
					<label class="titleLabel">营业车-三级比例：</label>
					<el-input-number v-model="guanli.jiaoqiangData.Y3.value" :min="0" :max="100" :step="0.1" :debounce="100" size="small" class="countTool"></el-input-number> %
					<el-button @click="guanliConfirmEdit(guanli.jiaoqiangData.Y3.key,guanli.jiaoqiangData.Y3.value,3,2)" style="margin-left: 20px" v-show="!(guanli.jiaoqiangData.Y3.value == guanli.jiaoqiangData.Y3.origin)">确定</el-button>
				</el-col>
			</el-row>
		</div>
			
		<div style="clear:both"></div>

		<div style="text-align:center;margin-top:20px;" v-if="viewMode == 1">
			<el-button type="primary" @click="guanliConfirmEdit()">确定</el-button>
			<el-button type="primary" @click="guimoConfirmEdit">确定</el-button>
		</div>
	</div>
</template>
<script>

import { autoApi } from '@/ajax/post.js'

	export default {
	    data() {
	      return {
	      	viewMode: 1,
	        labelPosition: 'right',
	        radio:'',
	        form:{
	        	carType:[],
	        	insuranceType:[],
	        	carTypeR:[],
	        	insuranceTypeR:[],
	        	rewardList:[{money1:'',money2:'',reward:''}]
	        },
	        guanli: {

	        }
	      };
	    },
	    methods: {
	    	init() {
	    		this.guanli = {
		        	shangyeData: {
		        		N2: {
		        			key: null,
		        			value: 0,
		        			origin: 0
		        		},
		        		Y2: {
		        			key: null,
		        			value: 0,
		        			origin: 0
		        		},
		        		N3: {
		        			key: null,
		        			value: 0,
		        			origin: 0
		        		},
		        		Y3: {
		        			key: null,
		        			value: 0,
		        			origin: 0
		        		}
		        	},
		        	jiaoqiangData: {
		        		N2: {
		        			key: null,
		        			value: 0,
		        			origin: 0
		        		},
		        		Y2: {
		        			key: null,
		        			value: 0,
		        			origin: 0
		        		},
		        		N3: {
		        			key: null,
		        			value: 0,
		        			origin: 0
		        		},
		        		Y3: {
		        			key: null,
		        			value: 0,
		        			origin: 0
		        		}
		        	}
		        }
	    	},
	       	delReward(index){
	       		console.log(index)
	       		this.form.rewardList.splice(index, 1);
	       	},
	       	addReward(){
	       		this.form.rewardList.push({money1:'',money2:'',reward:''})
	       	},
	       	guanliShow() {
	       		this.viewMode = 2;
	       	},
	       	guimoShow() {
	       		this.viewMode = 1;
	       	},
	       	getGuanli() {
	       		this.init();
	       		autoApi({
		   			action: 'vehicle_bonus_manage_settings',
		   			version: '1.0',
		   			employeeId: window.localStorage.getItem('employeeId')	
		   		},window.localStorage.getItem('token')).then((res)=> {
		   			if (res.code == 0) {
		   				if (res.attach) {
		   					for (var i = 0; i < res.attach.length; i++) {
		   						if(res.attach[i].depth == 2){
		   							switch(res.attach[i].type){
		   							case 1:
		   								//营利车商业险2级
		   								this.guanli.shangyeData.Y2.value = res.attach[i].rate / 10;
		   								this.guanli.shangyeData.Y2.origin = res.attach[i].rate / 10;
		   								this.guanli.shangyeData.Y2.key = res.attach[i].key;
		   								break;
		   							case 2:
		   								//盈利车交强险2级
		   								this.guanli.jiaoqiangData.Y2.value = res.attach[i].rate / 10;
		   								this.guanli.jiaoqiangData.Y2.origin = res.attach[i].rate / 10;
		   								this.guanli.jiaoqiangData.Y2.key = res.attach[i].key;
		   								break;
		   							case 4:
		   								//非营利车交强险2级
		   								this.guanli.jiaoqiangData.N2.value = res.attach[i].rate / 10;
		   								this.guanli.jiaoqiangData.N2.origin = res.attach[i].rate / 10;
		   								this.guanli.jiaoqiangData.N2.key = res.attach[i].key;
		   								break;
		   							case 8:
		   								//非营利车商业险2级
		   								this.guanli.shangyeData.N2.value = res.attach[i].rate / 10;
		   								this.guanli.shangyeData.N2.origin = res.attach[i].rate / 10;
		   								this.guanli.shangyeData.N2.key = res.attach[i].key;
		   								break;
		   							}
		   						}
		   						if(res.attach[i].depth == 3){
		   							switch(res.attach[i].type){
	   								case 1:
	   									this.guanli.shangyeData.Y3.value = res.attach[i].rate / 10;
		   								this.guanli.shangyeData.Y3.origin = res.attach[i].rate / 10;
		   								this.guanli.shangyeData.Y3.key = res.attach[i].key;
	   									break;
	   								case 2:
	   									this.guanli.jiaoqiangData.Y3.value = res.attach[i].rate / 10;
		   								this.guanli.jiaoqiangData.Y3.origin = res.attach[i].rate / 10;
		   								this.guanli.jiaoqiangData.Y3.key = res.attach[i].key;
	   									break;
	   								case 4:
	   									this.guanli.jiaoqiangData.N3.value = res.attach[i].rate / 10;
		   								this.guanli.jiaoqiangData.N3.origin = res.attach[i].rate / 10;
		   								this.guanli.jiaoqiangData.N3.key = res.attach[i].key;
	   									break;
	   								case 8:
	   									this.guanli.shangyeData.N3.value = res.attach[i].rate / 10;
		   								this.guanli.shangyeData.N3.origin = res.attach[i].rate / 10;
		   								this.guanli.shangyeData.N3.key = res.attach[i].key;
	   									break;
		   							}
		   						}
		   					}
		   				}
		   			}
		   		})
	       	},
	       	getGuimo() {
	       		autoApi({
		   			action: 'vehicle_bonus_scale_settings',
		   			version: '1.0',
		   			employeeId: window.localStorage.getItem('employeeId')	
		   		},window.localStorage.getItem('token')).then((res)=> {
		   			if (res.code == 0) {
		   				
	       			}
		   		})
	       	},
	       	guanliConfirmEdit(id,val,depth,type) {
	       		if (id) {

	       		}
	       		else
	       		{debugger
	       			autoApi({
			   			action: 'vehicle_bonus_manage_set',
			   			version: '1.0',
			   			employeeId: window.localStorage.getItem('employeeId'),
			   			crudType: 1,
			   			num: val * 10,
			   			depth: depth,
			   			type: type
			   		},window.localStorage.getItem('token')).then((res)=> {
			   			if (res.code == 0) {
	        				this.getGuanli();
		       			}
			   		})
	       		}
	       	},
	       	guimoConfirmEdit() {

	       	}
	    },
	    mounted:function(){
	        this.getGuanli();
	        this.getGuimo();
	    }
	}
</script>
<style lang="less">
.reward {
	.topBar {
		margin-top: 10px;
		margin-bottom: 20px;
	}
	.appbox{
		.appblock{
			width: 50%;
			float: left;
		}
	}
	.titleLabel {
		font-size: 14px;
	}
	.optionCol {
		margin: 20px;
	}
}	
</style>