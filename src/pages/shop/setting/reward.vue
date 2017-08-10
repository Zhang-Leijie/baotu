
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
		  	<el-radio class="radio" v-model="formSetting.teamDepth" label="1" value="1">一级</el-radio>
  			<el-radio class="radio" v-model="formSetting.teamDepth" label="2" value="2">二级</el-radio>
  			<el-radio class="radio" v-model="formSetting.teamDepth" label="3" value="3">三级</el-radio>
		  </el-form-item>
		</el-form>

		<!-- <el-form :label-position="labelPosition" label-width="120px" class="appbox" v-if="viewMode == 1">
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
		</el-form> -->
		<div style="clear:both"></div>

		<el-form :label-position="labelPosition" label-width="120px" class="appbox" v-if="viewMode == 1">
		    <el-form-item class="Btitle" label="统计口径:" style="margin-bottom:0px;"></el-form-item>
		  	<el-form-item label="统计车型:">
		  		<el-radio-group v-model="formSetting.bonusScaleCountMod">
			    	<el-radio label="1" value="1">非营业客车</el-radio>
					<el-radio label="2" value="2">非营业货车</el-radio>
					<el-radio label="4" value="4">营业客车</el-radio>
					<el-radio label="8" value="8">营业货车</el-radio>
					<el-radio label="16" value="16">其他</el-radio>
			  	</el-radio-group>
		  	</el-form-item>
		  	<el-form-item label="统计险种:">
		  		<el-radio-group v-model="formSetting.bonusScaleCountInsuranceMod">
			    	<el-radio label="32">商业险</el-radio>
					<el-radio label="64">交强险</el-radio>
			  	</el-radio-group>
		  	</el-form-item>
		</el-form>
		
		<el-form :label-position="labelPosition" label-width="120px" class="appbox" v-if="viewMode == 1">
		  	<el-form-item class="Btitle" label="奖励口径:" style="margin-bottom:0px;"></el-form-item>
		  	<el-form-item label="统计车型:">
				<el-radio-group v-model="formSetting.bonusScaleRewardMod">
			    	<el-radio label="128">非营业客车</el-radio>
					<el-radio label="256">非营业货车</el-radio>
					<el-radio label="512">营业客车</el-radio>
					<el-radio label="1024">营业货车</el-radio>
					<el-radio label="2048">其他</el-radio>
			  	</el-radio-group>
		  	</el-form-item>
		  	<el-form-item label="统计险种:">
				<el-radio-group v-model="formSetting.bonusScaleRewardInsuranceMod">
			    	<el-radio label="4096">商业险</el-radio>
					<el-radio label="8192">交强险</el-radio>
			  	</el-radio-group>
		  	</el-form-item>
		</el-form>

		<div class="confirmBox" v-if="viewMode == 1">
			<el-button type="primary" @click="comfirmSetting">保存设置</el-button>
		</div>

		<div v-if="viewMode == 1" class="guimoDataBox">
			<el-row v-for="item in guimoData" style="margin-bottom: 20px;">
	  			<el-col :span="2">
	  				<el-button v-if="!isGuimoEdited" @click="guimoDelete(item)"><i class="el-icon-minus"></i></el-button>
	  			</el-col>
	  			<el-col :span="6">
	  				<span class="dataFont">比较类型: </span>
	  				<span class="dataFont" v-if="!isGuimoEdited || !(item.id == guimoEdit.id)">{{reComparisonName(item.comparison)}}</span>
	  				<el-select v-model="guimoEdit.comparison" placeholder="请选择" v-if="isGuimoEdited && item.id == guimoEdit.id" style="width:150px;">
						<el-option v-for="item in comparisons" :label="item.label" :value="item.value"></el-option>
					</el-select>
	  			</el-col>
	  			<el-col :span="6">
	  				<span class="dataFont">区间数值: </span>
	  				<span class="dataFont" v-if="!isGuimoEdited || !(item.id == guimoEdit.id)">{{item.comparableValue}}</span>
	  				<el-input v-model="guimoEdit.comparableValue" placeholder="区间数值请用 _ 隔开" class="inputPercent" v-if="isGuimoEdited && item.id == guimoEdit.id"></el-input>
	  			</el-col>
	  			<el-col :span="6">
	  				<span class="dataFont">奖励比例: </span>
	  				<span class="dataFont" v-if="!isGuimoEdited || !(item.id == guimoEdit.id)">{{item.rate?item.rate:0}}</span>
	  				<el-input-number v-model="guimoEdit.num" :min="0" :max="100" :step="0.1" :debounce="100" size="small" class="inputPercent" v-if="isGuimoEdited && item.id == guimoEdit.id"></el-input-number> 
	  				<span class="dataFont">%</span>
	  			</el-col>
	  			<el-col :span="4">
	  				<el-button @click="guimoEditMode(item)" v-if="!isGuimoEdited">编辑</el-button>
	  				<el-button @click="guimoConfirmEdit" v-if="isGuimoEdited && item.id == guimoEdit.id">确认</el-button>
	  				<el-button @click="cancelGuimoEdit" v-if="isGuimoEdited && item.id == guimoEdit.id">取消</el-button>
	  			</el-col>
	  		</el-row>
			<el-button @click="showAddGuimo = !showAddGuimo"><i class="el-icon-plus"></i></el-button>
			<div style="margin-top: 20px">
			  <el-collapse-transition>
			    <div v-show="showAddGuimo">
			      	<div class="transition-box">
			      		<el-row>
			      			<el-col :span="6">
	  							<span class="dataFont">比较类型: </span>
			      				<el-select v-model="guimoAdd.comparison" placeholder="请选择" style="width:150px;">
								<el-option v-for="item in comparisons" :label="item.label" :value="item.value"></el-option>
								</el-select>
			      			</el-col>
			      			<el-col :span="6">
	  							<span class="dataFont">区间数值: </span>
			      				<el-input v-model="guimoAdd.comparableValue" placeholder="区间数值请用 _ 隔开" class="inputPercent"></el-input>
			      			</el-col>
			      			<el-col :span="6">
	  							<span class="dataFont">奖励比例: </span>
			      				<el-input-number v-model="guimoAdd.num" :min="0" :max="100" :step="0.1" :debounce="100" size="small" class="inputPercent"></el-input-number> %
			      			</el-col>
			      			<el-col :span="4">
			      				<el-button @click="guimoConfirmAdd">确定</el-button>
			      				<el-button @click="showAddGuimo = false">取消</el-button>
			      			</el-col>
			      		</el-row>
			      	</div>
			    </div>
			  </el-collapse-transition>
			</div>
		</div>
			

		<div v-if="viewMode == 2">
			<span class="titleLabel">商业险</span>
			<el-row class="optionCol">
				<el-col :span="12">
					<label class="titleLabel">非营业车-二级比例：</label>
					<el-input-number v-model="guanli.shangyeData.N2.value" :min="0" :max="100" :step="0.1" :debounce="100" size="small" class="countTool"></el-input-number> %
					<el-button @click="guanliConfirmEdit(guanli.shangyeData.N2.key,guanli.shangyeData.N2.value,guanli.shangyeData.N2.origin,2,COMMERCIAL_NO_PROFIT)" style="margin-left: 20px" v-show="!(guanli.shangyeData.N2.value == guanli.shangyeData.N2.origin)">确定</el-button>
				</el-col>	
				<el-col :span="12">
					<label class="titleLabel">非营业车-三级比例：</label>
					<el-input-number v-model="guanli.shangyeData.N3.value" :min="0" :max="100" :step="0.1" :debounce="100" size="small" class="countTool"></el-input-number> %
					<el-button @click="guanliConfirmEdit(guanli.shangyeData.N3.key,guanli.shangyeData.N3.value,guanli.shangyeData.N3.origin,3,COMMERCIAL_NO_PROFIT)" style="margin-left: 20px" v-show="!(guanli.shangyeData.N3.value == guanli.shangyeData.N3.origin)">确定</el-button>
				</el-col>	
			</el-row>
			<el-row class="optionCol">
				<el-col :span="12">
					<label class="titleLabel">营业车-二级比例：</label>
					<el-input-number v-model="guanli.shangyeData.Y2.value" :min="0" :max="100" :step="0.1" :debounce="100" size="small" class="countTool"></el-input-number> %
					<el-button @click="guanliConfirmEdit(guanli.shangyeData.Y2.key,guanli.shangyeData.Y2.value,guanli.shangyeData.Y2.origin,2,COMMERCIAL_PROFIT)" style="margin-left: 20px" v-show="!(guanli.shangyeData.Y2.value == guanli.shangyeData.Y2.origin)">确定</el-button>
				</el-col>
				<el-col :span="12">
					<label class="titleLabel">营业车-三级比例：</label>
					<el-input-number v-model="guanli.shangyeData.Y3.value" :min="0" :max="100" :step="0.1" :debounce="100" size="small" class="countTool"></el-input-number> %
					<el-button @click="guanliConfirmEdit(guanli.shangyeData.Y3.key,guanli.shangyeData.Y3.value,guanli.shangyeData.Y3.origin,3,COMMERCIAL_PROFIT)" style="margin-left: 20px" v-show="!(guanli.shangyeData.Y3.value == guanli.shangyeData.Y3.origin)">确定</el-button>
				</el-col>
			</el-row>
			<el-row class="optionCol">
				<el-col :span="12">
					<label class="titleLabel">其他车-二级比例：</label>
					<el-input-number v-model="guanli.shangyeData.other2.value" :min="0" :max="100" :step="0.1" :debounce="100" size="small" class="countTool"></el-input-number> %
					<el-button @click="guanliConfirmEdit(guanli.shangyeData.other2.key,guanli.shangyeData.other2.value,guanli.shangyeData.other2.origin,2,COMMERCIAL_OTHER)" style="margin-left: 20px" v-show="!(guanli.shangyeData.other2.value == guanli.shangyeData.other2.origin)">确定</el-button>
				</el-col>
				<el-col :span="12">
					<label class="titleLabel">其他车-三级比例：</label>
					<el-input-number v-model="guanli.shangyeData.other3.value" :min="0" :max="100" :step="0.1" :debounce="100" size="small" class="countTool"></el-input-number> %
					<el-button @click="guanliConfirmEdit(guanli.shangyeData.other3.key,guanli.shangyeData.other3.value,guanli.shangyeData.other3.origin,3,COMMERCIAL_OTHER)" style="margin-left: 20px" v-show="!(guanli.shangyeData.other3.value == guanli.shangyeData.other3.origin)">确定</el-button>
				</el-col>
			</el-row>

			<span class="titleLabel">交强险</span>
			<el-row class="optionCol">
				<el-col :span="12">
					<label class="titleLabel">非营业车-二级比例：</label>
					<el-input-number v-model="guanli.jiaoqiangData.N2.value" :min="0" :max="100" :step="0.1" :debounce="100" size="small" class="countTool"></el-input-number> %
					<el-button @click="guanliConfirmEdit(guanli.jiaoqiangData.N2.key,guanli.jiaoqiangData.N2.value,guanli.jiaoqiangData.N2.origin,2,COMPULSORY_NO_PROFIT)" style="margin-left: 20px" v-show="!(guanli.jiaoqiangData.N2.value == guanli.jiaoqiangData.N2.origin)">确定</el-button>
				</el-col>	
				<el-col :span="12">
					<label class="titleLabel">非营业车-三级比例：</label>
					<el-input-number v-model="guanli.jiaoqiangData.N3.value" :min="0" :max="100" :step="0.1" :debounce="100" size="small" class="countTool"></el-input-number> %
					<el-button @click="guanliConfirmEdit(guanli.jiaoqiangData.N3.key,guanli.jiaoqiangData.N3.value,guanli.jiaoqiangData.N3.origin,3,COMPULSORY_NO_PROFIT)" style="margin-left: 20px" v-show="!(guanli.jiaoqiangData.N3.value == guanli.jiaoqiangData.N3.origin)">确定</el-button>
				</el-col>	
			</el-row>
			<el-row class="optionCol">
				<el-col :span="12">
					<label class="titleLabel">营业车-二级比例：</label>
					<el-input-number v-model="guanli.jiaoqiangData.Y2.value" :min="0" :max="100" :step="0.1" :debounce="100" size="small" class="countTool"></el-input-number> %
					<el-button @click="guanliConfirmEdit(guanli.jiaoqiangData.Y2.key,guanli.jiaoqiangData.Y2.value,guanli.jiaoqiangData.Y2.origin,2,COMPULSORY_PROTFIT)" style="margin-left: 20px" v-show="!(guanli.jiaoqiangData.Y2.value == guanli.jiaoqiangData.Y2.origin)">确定</el-button>
				</el-col>
				<el-col :span="12">
					<label class="titleLabel">营业车-三级比例：</label>
					<el-input-number v-model="guanli.jiaoqiangData.Y3.value" :min="0" :max="100" :step="0.1" :debounce="100" size="small" class="countTool"></el-input-number> %
					<el-button @click="guanliConfirmEdit(guanli.jiaoqiangData.Y3.key,guanli.jiaoqiangData.Y3.value,guanli.jiaoqiangData.Y3.origin,3,COMPULSORY_PROTFIT)" style="margin-left: 20px" v-show="!(guanli.jiaoqiangData.Y3.value == guanli.jiaoqiangData.Y3.origin)">确定</el-button>
				</el-col>
			</el-row>
			<el-row class="optionCol">
				<el-col :span="12">
					<label class="titleLabel">其他车-二级比例：</label>
					<el-input-number v-model="guanli.jiaoqiangData.other2.value" :min="0" :max="100" :step="0.1" :debounce="100" size="small" class="countTool"></el-input-number> %
					<el-button @click="guanliConfirmEdit(guanli.jiaoqiangData.other2.key,guanli.jiaoqiangData.other2.value,guanli.jiaoqiangData.other2.origin,2,COMPULSORY_OTHER)" style="margin-left: 20px" v-show="!(guanli.jiaoqiangData.other2.value == guanli.jiaoqiangData.other2.origin)">确定</el-button>
				</el-col>
				<el-col :span="12">
					<label class="titleLabel">其他车-三级比例：</label>
					<el-input-number v-model="guanli.jiaoqiangData.other3.value" :min="0" :max="100" :step="0.1" :debounce="100" size="small" class="countTool"></el-input-number> %
					<el-button @click="guanliConfirmEdit(guanli.jiaoqiangData.other3.key,guanli.jiaoqiangData.other3.value,guanli.jiaoqiangData.other3.origin,3,COMPULSORY_OTHER)" style="margin-left: 20px" v-show="!(guanli.jiaoqiangData.other3.value == guanli.jiaoqiangData.other3.origin)">确定</el-button>
				</el-col>
			</el-row>
		</div>
			
		<div style="clear:both"></div>
	</div>
</template>
<script>

import { commonApi,autoApi } from '@/ajax/post.js'

	export default {
	    data() {
	      return { 
	      	showAddGuimo: false,
	      	viewMode: 1,
	        labelPosition: 'right',
	        formSetting:{
	        	teamDepth: null,		//团队层级数
	        	bonusScaleCountMod: null,	//规模佣金统计口径模值
	        	bonusScaleRewardMod: null,			//规模佣金奖励口径模值
	        	bonusScaleCountInsuranceMod: null,		//规模佣金统计口径险种模值
	        	bonusScaleRewardInsuranceMod: null, 		//规模佣金奖励口径险种模值
	        },
	        guanli: {
	        	
	        },
	        guimoData: [],
	        guimoAdd: {
	        	num: null,
	        	comparison: null,
	        	comparableValue: null
	        },
	        guimoEdit: {				//规模列表编辑数据
	        	id: null,
	        	num: null,
	        	comparison: null,
	        	comparableValue: null
	        },
	        isGuimoEdited: false,		//控制规模列表编辑模式的状态
	        comparisons: [
		      	{
		      		value: 1,
		      		label: "大于"
		      	},
		      	{
		      		value: 2,
		      		label: "大于等于"
		      	},
		      	{
		      		value: 3,
		      		label: "小于"
		      	},
		      	{
		      		value: 4,
		      		label: "小于等于"
		      	},
		      	{
		      		value: 5,
		      		label: "等于"
		      	},
		      	// {
		      	// 	value: 6,
		      	// 	label: "不等于"
		      	// },
		      	{
		      		value: 7,
		      		label: "开区间 ( )"
		      	},
		      	{
		      		value: 8,
		      		label: "前闭后开区间 [ )"
		      	},
		      	{
		      		value: 9,
		      		label: "前开后闭区间 ( ]"
		      	},
		      	// {
		      	// 	value: 10,
		      	// 	label: "在 ... 之中"
		      	// },
		      	// {
		      	// 	value: 11,
		      	// 	label: "不在 ... 之中"
		      	// }
		      ]
	      };
	    },
	    methods: {
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
	       	initGuanli() {
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
		        		},
		        		other2: {
		        			key: null,
		        			value: 0,
		        			origin: 0
		        		},
		        		other3: {
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
		        		},
		        		other2: {
		        			key: null,
		        			value: 0,
		        			origin: 0
		        		},
		        		other3: {
		        			key: null,
		        			value: 0,
		        			origin: 0
		        		}
		        	}
	       		}
	       	},
	       	getGuanli() {
	       		this.initGuanli();
	       		let payload = {
	       			employeeId: window.localStorage.getItem('employeeId')
	       		}
	       		payload = JSON.stringify(payload);
	       		autoApi({
		   			action: 'bonus_manage_configs',
		   			version: '1.0',
		   			payload: payload	
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
		   							case 16:
		   								//其他2级
		   								this.guanli.shangyeData.other2.value = res.attach[i].rate / 10;
		   								this.guanli.shangyeData.other2.origin = res.attach[i].rate / 10;
		   								this.guanli.shangyeData.other2.key = res.attach[i].key;
		   								break;
		   							case 32:
		   								//其他2级
		   								this.guanli.jiaoqiangData.other2.value = res.attach[i].rate / 10;
		   								this.guanli.jiaoqiangData.other2.origin = res.attach[i].rate / 10;
		   								this.guanli.jiaoqiangData.other2.key = res.attach[i].key;
		   								break;
		   							}
		   						}
		   						if(res.attach[i].depth == 3){
		   							switch(res.attach[i].type){
	   								case 1:
	   									//营利车商业险2级
	   									this.guanli.shangyeData.Y3.value = res.attach[i].rate / 10;
		   								this.guanli.shangyeData.Y3.origin = res.attach[i].rate / 10;
		   								this.guanli.shangyeData.Y3.key = res.attach[i].key;
	   									break;
	   								case 2:
	   									//盈利车交强险2级
	   									this.guanli.jiaoqiangData.Y3.value = res.attach[i].rate / 10;
		   								this.guanli.jiaoqiangData.Y3.origin = res.attach[i].rate / 10;
		   								this.guanli.jiaoqiangData.Y3.key = res.attach[i].key;
	   									break;
	   								case 4:
	   									//非营利车交强险2级
	   									this.guanli.jiaoqiangData.N3.value = res.attach[i].rate / 10;
		   								this.guanli.jiaoqiangData.N3.origin = res.attach[i].rate / 10;
		   								this.guanli.jiaoqiangData.N3.key = res.attach[i].key;
	   									break;
	   								case 8:
	   									//非营利车商业险3级
	   									this.guanli.shangyeData.N3.value = res.attach[i].rate / 10;
		   								this.guanli.shangyeData.N3.origin = res.attach[i].rate / 10;
		   								this.guanli.shangyeData.N3.key = res.attach[i].key;
	   									break;
	   								case 16:
		   								//其他3级
		   								this.guanli.shangyeData.other3.value = res.attach[i].rate / 10;
		   								this.guanli.shangyeData.other3.origin = res.attach[i].rate / 10;
		   								this.guanli.shangyeData.other3.key = res.attach[i].key;
		   								break;
		   							case 32:
		   								//其他3级
		   								this.guanli.jiaoqiangData.other3.value = res.attach[i].rate / 10;
		   								this.guanli.jiaoqiangData.other3.origin = res.attach[i].rate / 10;
		   								this.guanli.jiaoqiangData.other3.key = res.attach[i].key;
		   								break;
		   							}
		   						}
		   					}
		   				}
		   			}
		   		})
	       	},
	       	getGuimo() {
	       		let payload = {
	       			employeeId: window.localStorage.getItem('employeeId')
	       		}
	       		payload = JSON.stringify(payload);
	       		autoApi({
		   			action: 'bonus_scale_configs',
		   			version: '1.0',
		   			payload: payload	
		   		},window.localStorage.getItem('token')).then((res)=> {
		   			if (res.code == 0) {
		   				if(res.attach) {
		   					for (var i = 0; i < res.attach.length; i++) {
		   						res.attach[i].rate = res.attach[i].rate / 10;
		   					}
		   					this.guimoData = res.attach;
		   				}
	       			}
		   		})
	       	},
	      //  	getInfo() {
	      //  		commonApi({
		   		// 	action: 'tenant_info',
		   		// 	version: '1.0',
		   		// 	employeeId: window.localStorage.getItem('employeeId'),
		   		// 	client: 2
		   		// },window.localStorage.getItem('token')).then((res)=> {
		   		// 	if (res.code == 0) {
       //  				//缺少深度
       //  				debugger
       //  				this.formSetting.bonusScaleCountMod = res.attach.bonusScaleCountMod.toString();
       //  				this.formSetting.bonusScaleRewardMod = res.attach.bonusScaleRewardMod.toString();
       //  				this.formSetting.bonusScaleCountInsuranceMod = res.attach.bonusScaleCountInsuranceMod.toString();
       //  				this.formSetting.bonusScaleRewardInsuranceMod = res.attach.bonusScaleRewardInsuranceMod.toString();
	      //  			}
		   		// })
	      //  	},
	       	comfirmSetting() {
	       		let tenantSettingsSubmit  = {
				    // name : xxx,                                                // 商户名字
				    teamDepth: null,                                            // 团队层级数
				    // nonAutoBind :[1,2,3]                                 // 开通的非车险类型id列表
				    mod: 0
				};
				tenantSettingsSubmit .teamDepth = this.formSetting.teamDepth;
				tenantSettingsSubmit .mod = parseInt(this.formSetting.bonusScaleCountMod) + parseInt(this.formSetting.bonusScaleRewardMod) + parseInt(this.formSetting.bonusScaleCountInsuranceMod) + parseInt(this.formSetting.bonusScaleRewardInsuranceMod);
				debugger
				if (tenantSettingsSubmit .mod) {
					tenantSettingsSubmit  = JSON.stringify(tenantSettingsSubmit );
					autoApi({
			   			action: 'tenant_set',
			   			version: '1.0',
			   			employeeId: window.localStorage.getItem('employeeId'),
			   			tenantSettingsSubmit : tenantSettingsSubmit 
			   		},window.localStorage.getItem('token')).then((res)=> {
			   			if (res.code == 0) {
			   				this.$message({
			   					message: '设置已保存',
			   					type: 'success'
			   				});
		       			}
			   		})
				}      		
	       	},
	       	guanliConfirmEdit(id,val,origin,depth,type) {
	       		if (val && origin) {//value/origin值不为零,操作为修改
	       			let payload = {
	       				id: id,
			   			rate: val * 10,
			   			teamDepth: depth,
			   			configType: type
	       			}
	       			payload = JSON.stringify(payload);
	       			autoApi({
			   			action: 'bonus_manage_config_edit',
			   			version: '1.0',
			   			employeeId: window.localStorage.getItem('employeeId'),
			   			crudType: 4,
			   			payload: payload
			   		},window.localStorage.getItem('token')).then((res)=> {
			   			if (res.code == 0) {
	        				this.getGuanli();
		       			}
			   		})
	       		}
	       		else if (!val) {//value为零,操作为删除
	       			let payload = {
	       				id: id
	       			}
	       			payload = JSON.stringify(payload);
	       			autoApi({
			   			action: 'bonus_manage_config_edit',
			   			version: '1.0',
			   			employeeId: window.localStorage.getItem('employeeId'),
			   			crudType: 8,
			   			payload: payload
			   		},window.localStorage.getItem('token')).then((res)=> {
			   			if (res.code == 0) {
	        				this.getGuanli();
		       			}
			   		})
	       		}
	       		else if (!origin) {//origin为零,操作为新增
	       			let payload = {
			   			rate: val * 10,
			   			teamDepth: depth,
			   			configType: type
	       			}
	       			payload = JSON.stringify(payload);
	       			autoApi({
			   			action: 'bonus_manage_config_edit',
			   			version: '1.0',
			   			employeeId: window.localStorage.getItem('employeeId'),
			   			crudType: 1,
			   			payload: payload
			   		},window.localStorage.getItem('token')).then((res)=> {
			   			if (res.code == 0) {
	        				this.getGuanli();
		       			}
			   		})
	       		}
	       	},
	       	guimoEditMode(row) {
	       		this.isGuimoEdited = true;
	       		this.guimoEdit.id = row.id;
	       		this.guimoEdit.num = row.rate;
	       		this.guimoEdit.comparison = row.comparison;
	       		this.guimoEdit.comparableValue = row.comparableValue; 
	       	},
	       	cancelGuimoEdit() {
	       		this.isGuimoEdited = false;
	       	},
	       	guimoConfirmEdit() {
	       		let payload = {
	       			employeeId: window.localStorage.getItem('employeeId'),
	       			id: this.guimoEdit.id,
	       			rate: this.guimoEdit.num * 10,
	       			symbol: this.guimoEdit.comparison,
	       			val: this.guimoEdit.comparableValue.split("_"),
	       		}
	       		payload = JSON.stringify(array);

	       		autoApi({
		   			action: 'bonus_scale_config_edit',
		   			version: '1.0',
		   			crudType: 4,
		   			payload: payload
		   		},window.localStorage.getItem('token')).then((res)=> {
		   			if (res.code == 0) {
	       				this.isGuimoEdited = false;
        				this.getGuimo();
        				this.showAddGuimo = false;
        				this.guimoAdd = {
				        	num: null,
				        	comparison: null,
				        	comparableValue: null
				        };
	       			}
		   		})
	       	},
	       	guimoConfirmAdd() {
	       		let payload = {
	       			employeeId: window.localStorage.getItem('employeeId'),
	       			rate: this.guimoAdd.num * 10,
	       			symbol: this.guimoAdd.comparison,
	       			val: this.guimoAdd.comparableValue.split("_"),
	       		}
	       		payload = JSON.stringify(array);
	       		
	       		autoApi({
		   			action: 'bonus_scale_config_edit',
		   			version: '1.0',
		   			employeeId: window.localStorage.getItem('employeeId'),
		   			crudType: 1,
		   			payload: payload
		   		},window.localStorage.getItem('token')).then((res)=> {
		   			if (res.code == 0) {
        				this.getGuimo();
        				this.showAddGuimo = false;
        				this.guimoAdd = {
				        	num: null,
				        	comparison: null,
				        	comparableValue: null
				        };
	       			}
		   		})
	       	},
	       	guimoDelete(row) {
	       		let payload = {
	       			id: row.id
	       		}
	       		payload = JSON.stringify(array);
	       		autoApi({
		   			action: 'bonus_scale_config_edit',
		   			version: '1.0',
		   			employeeId: window.localStorage.getItem('employeeId'),
		   			crudType: 8,
		   			payload: payload
		   		},window.localStorage.getItem('token')).then((res)=> {
		   			if (res.code == 0) {
        				this.getGuimo();
	       			}
		   		})
	       	},
		    reComparisonName(val) {
		    	switch(val)
		    	{
					case 1:
						return "大于"
						break;
					case 2:
						return "大于等于"
						break;
					case 3:
						return "小于"
						break;
					case 4:
						return "小于等于"
						break;
					case 5:
						return "等于"
						break;
					// case 6:
					// 	return "不等于"
					// 	break;
					case 7:
						return "开区间"
						break;
					case 8:
						return "前闭后开区间"
						break;
					case 9:
						return "前开后闭区间"
						break;
					// case 10:
					// 	return "在 ... 之中"
					// 	break;
					// case 11:
					// 	return "不在 ... 之中"
					// 	break;
		    	}
		    	
		    }
	    },
	    mounted:function(){
	    	// this.getInfo();
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
	.guimoDataBox {
		padding: 20px 20px 10px 20px;
		margin: 20px 0;
		background-color: white;
		.inputPercent {
			width: 150px !important;
		}
		.dataFont {
			font-size: 16px;
			line-height: 36px;
		}
	}
	.confirmBox {
		text-align: center;
	}
	.titleLabel {
		font-size: 14px;
	}
	.optionCol {
		margin: 20px;
	}
}	
</style>