<template>
	<div class="rewardBody">
		<el-breadcrumb separator="/">
		  	<el-breadcrumb-item>奖励设置</el-breadcrumb-item>
		</el-breadcrumb>

		<div class="topBar">
			<el-button size="large" :type="viewMode == 1?'primary':''" @click="guimoShow">月度规模奖励</el-button>
			<el-button size="large" :type="viewMode == 2?'primary':''" @click="guanliShow" :disabled="!formSetting.teamDepth">管理奖励</el-button>
			<div class="topBarR">
				<el-button type="primary" v-if="viewMode == 1" @click="guimoAccount" :disabled="true">统计规模结算</el-button>
				<el-button type="primary" v-if="viewMode == 2" @click="guanliAccount" :disabled="true">管理奖励结算</el-button>
			</div>
		</div>

		<el-form :label-position="labelPosition" label-width="180px" style="margin-top:20px;" class="appbox" v-if="viewMode == 1">
		  <el-form-item class="appblock" label="团队层级:">
		  	<el-radio class="radio" v-model="formSetting.teamDepth" label="1" value="1">一级</el-radio>
  			<el-radio class="radio" v-model="formSetting.teamDepth" label="2" value="2">二级（含一级）</el-radio>
  			<el-radio class="radio" v-model="formSetting.teamDepth" label="3" value="3">三级（含一、二级）</el-radio>
		  </el-form-item>
		</el-form>

		<div style="clear:both"></div>

		<el-form :label-position="labelPosition" label-width="180px" class="appbox" v-if="viewMode == 1">
		    <el-form-item class="Btitle" label="规模保费统计口径:" style="margin-bottom:0px;"></el-form-item>
		  	<el-form-item label="统计车型:">
		  		<el-checkbox-group v-model="formSetting.bonusScaleCountMod">
			    	<el-checkbox label="1" value="1">非营业客车</el-checkbox>
					<el-checkbox label="2" value="2">非营业货车</el-checkbox>
					<el-checkbox label="4" value="4">营业客车</el-checkbox>
					<el-checkbox label="8" value="8">营业货车</el-checkbox>
					<el-checkbox label="16" value="16">其他</el-checkbox>
			  	</el-checkbox-group>
		  	</el-form-item>
		  	<el-form-item label="统计险种:">
		  		<el-checkbox-group v-model="formSetting.bonusScaleCountInsuranceMod">
			    	<el-checkbox label="32">商业险</el-checkbox>
					<el-checkbox label="64">交强险</el-checkbox>
			  	</el-checkbox-group>
		  	</el-form-item>
		</el-form>
		
		<el-form :label-position="labelPosition" label-width="180px" class="appbox" v-if="viewMode == 1">
		  	<el-form-item class="Btitle" label="规模奖励对象:" style="margin-bottom:0px;"></el-form-item>
		  	<el-form-item label="奖励车型:">
				<el-checkbox-group v-model="formSetting.bonusScaleRewardMod">
			    	<el-checkbox label="128">非营业客车</el-checkbox>
					<el-checkbox label="256">非营业货车</el-checkbox>
					<el-checkbox label="512">营业客车</el-checkbox>
					<el-checkbox label="1024">营业货车</el-checkbox>
					<el-checkbox label="2048">其他</el-checkbox>
			  	</el-checkbox-group>
		  	</el-form-item>
		  	<el-form-item label="奖励险种:">
				<el-checkbox-group v-model="formSetting.bonusScaleRewardInsuranceMod">
			    	<el-checkbox label="4096">商业险</el-checkbox>
					<el-checkbox label="8192">交强险</el-checkbox>
			  	</el-checkbox-group>
		  	</el-form-item>
		</el-form>

		<div class="confirmBox" v-if="viewMode == 1">
			<el-button type="primary" @click="comfirmSetting">保存设置</el-button>
		</div>

		<div v-if="viewMode == 1" class="guimoDataBox">
			<el-row v-for="(item,index) in guimoData" style="margin-bottom: 20px;" :key="index">
	  			<el-col :span="2">
	  				<el-button @click="guimoDelete(item)"><i class="el-icon-minus"></i></el-button>
	  			</el-col>
	  			<el-col :span="6">
	  				<span class="dataFont">比较类型: {{reComparisonName(reComparisonName(item.comparison))}}</span>
	  			</el-col>
	  			<el-col :span="7">
	  				<el-row>
	  					<el-col :span="6">
	  						<span class="dataFont">区间数值: </span>
	  					</el-col>
	  					<el-col :span="16">
	  						<span class="dataFont" v-if="item.comparison == 2">{{item.comparableValue}}</span>
	  						<span class="dataFont" v-if="item.comparison == 8">
			  						<span>{{item.comparableValue.split("_")[0]}} -- {{item.comparableValue.split("_")[1]}}</span>
	  						</span>
	  					</el-col>
	  				</el-row>
	  			</el-col>
	  			<el-col :span="5">
	  				<span class="dataFont">奖励比例: {{item.rate?item.rate:0}} %</span>
	  			</el-col>
	  			<el-col :span="4">
	  				<el-button @click="guimoEditMode(item)">编辑</el-button>
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
									<el-option v-for="item in comparisons" :label="item.label" :value="item.value" :key="item.value"></el-option>
									</el-select>
				      			</el-col>
				      			<el-col :span="7">
				      				<el-row>
					  					<el-col :span="6">
					  						<span class="dataFont">区间数值: </span>
					  					</el-col>
					  					<el-col :span="16">
					  						<el-input v-model="guimoAdd.comparableValue" style="width: 100%" class="inputPercent" v-if="guimoAdd.comparison == 2"></el-input>
							  				<el-row v-if="guimoAdd.comparison == 8">
							  					<el-col :span="10">
							  						<el-input v-model="guimoAdd.comparableValueA" style="width: 100%"></el-input>
							  					</el-col>
							  					<el-col :span="4" style="display: flex; justify-content:center;">
							  						<span style="line-height: 36px;">--</span>
							  					</el-col>
							  					<el-col :span="10">
							  						<el-input v-model="guimoAdd.comparableValueB" style="width: 100%"></el-input>
							  					</el-col>
							  				</el-row>
					  					</el-col>
					  				</el-row>
				      			</el-col>
				      			<el-col :span="7">
		  							<span class="dataFont">奖励比例: </span>
				      				<el-input v-model="guimoAdd.num" style="width: 150px;"></el-input> %
				      			</el-col>
				      			<el-col :span="4">
				      				<el-button type="primary" @click="guimoConfirmAdd">确定</el-button>
				      				<el-button @click="showAddGuimo = false">取消</el-button>
				      			</el-col>
				      		</el-row>
				      	</div>
				    </div>
				</el-collapse-transition>
			</div>
		</div>

		<el-dialog title="编辑" :visible.sync="dialogEditVisible" size="small" :before-close="handleEditClose">
			<el-row>
				<el-col :span="8">
	  				<el-select v-model="guimoEdit.comparison" placeholder="请选择">
						<el-option v-for="item in comparisons" :label="item.label" :value="item.value" :key="item.value"></el-option>
					</el-select>
	  			</el-col>
	  			<el-col :span="9">
	  				<el-row>
	  					<el-col :span="6">
	  						<span style="line-height: 30px;">区间数值: </span>
	  					</el-col>
	  					<el-col :span="16">
	  						<el-input v-model="guimoEdit.comparableValue" style="width: 100%" class="inputPercent" v-if="guimoEdit.comparison == 2"></el-input>
			  				<el-row v-if="guimoEdit.comparison == 8">
			  					<el-col :span="10">
			  						<el-input v-model="guimoEdit.comparableValueA" style="width: 100%"></el-input>
			  					</el-col>
			  					<el-col :span="4" style="display: flex; justify-content:center;">
			  						<span style="line-height: 36px;">--</span>
			  					</el-col>
			  					<el-col :span="10">
			  						<el-input v-model="guimoEdit.comparableValueB" style="width: 100%"></el-input>
			  					</el-col>
			  				</el-row>
	  					</el-col>
	  				</el-row>
	  			</el-col>
	  			<el-col :span="7">
	  				<span class="dataFont">奖励比例: </span>
	  				<el-input v-model="guimoEdit.num" style="width: 120px;"></el-input> 
	  				<span class="dataFont">%</span>
	  			</el-col>
			</el-row>
		    <div slot="footer" class="dialog-footer">
		        <el-button @click="handleEditClose">取 消</el-button>
		        <el-button type="primary" @click="guimoConfirmEdit">确 定</el-button>
		    </div>
		</el-dialog>
			
		<div v-if="viewMode == 2">
			<el-row class="optionCol">
				<el-col :span="12">
					<span class="titleLabel">商业险</span>
				</el-col>
				<el-col :span="12">
					<span class="titleLabel">交强险</span>
				</el-col>
			</el-row>
			<div v-for="(guanli,index) in guanliData" :key="index">
				<el-row class="optionCol">
					<el-col :span="12">
						<label class="titleLabel">非营业车-{{guanli.shangye_N.depth}}级比例：</label>
						<el-input v-model="guanli.shangye_N.value" class="countTool"></el-input> %
					</el-col>	
					<el-col :span="12">
						<label class="titleLabel">非营业车-{{guanli.jiaoqiang_N.depth}}级比例：</label>
						<el-input v-model="guanli.jiaoqiang_N.value" class="countTool"></el-input> %
					</el-col>	
				</el-row>
				<el-row class="optionCol">
					<el-col :span="12">
						<label class="titleLabel">营业车-{{guanli.shangye_Y.depth}}级比例：</label>
						<el-input v-model="guanli.shangye_Y.value" class="countTool"></el-input> %
					</el-col>
					<el-col :span="12">
						<label class="titleLabel">营业车-{{guanli.jiaoqiang_Y.depth}}级比例：</label>
						<el-input v-model="guanli.jiaoqiang_Y.value" class="countTool"></el-input> %
					</el-col>
				</el-row>
				<el-row class="optionCol">
					<el-col :span="12">
						<label class="titleLabel">其他车-{{guanli.shangye_other.depth}}级比例：</label>
						<el-input v-model="guanli.shangye_other.value" class="countTool"></el-input> %
					</el-col>
					<el-col :span="12">
						<label class="titleLabel">其他车-{{guanli.jiaoqiang_other.depth}}级比例：</label>
						<el-input v-model="guanli.jiaoqiang_other.value" class="countTool"></el-input> %
					</el-col>
				</el-row>
			</div>
		</div>
			
		<div style="clear:both"></div>

		<div class="confirmBox" v-if="viewMode == 2">
			<el-button type="primary" @click="saveGuanli">保存设置</el-button>
		</div>

	</div>
</template>
<script>

import { autoApi } from '@/ajax/post.js'

	export default {
	    data() {
	      return { 
	      	showAddGuimo: false,
	      	viewMode: 1,
	        labelPosition: 'right',
	        formSetting:{
	        	teamDepth: null,		//团队层级数
	        	bonusScaleCountMod: [],	//规模佣金统计口径模值
	        	bonusScaleRewardMod: [],			//规模佣金奖励口径模值
	        	bonusScaleCountInsuranceMod: [],		//规模佣金统计口径险种模值
	        	bonusScaleRewardInsuranceMod: [], 		//规模佣金奖励口径险种模值
	        },
	        guanliData: [],
	        guimoData: [],
	        guimoAdd: {
	        	num: null,
	        	comparison: null,
	        	comparableValue: null,
	        	comparableValueA: null,
	        	comparableValueB: null,
	        },
	        guimoEdit: {				//规模列表编辑数据
	        	id: null,
	        	num: null,
	        	comparison: null,
	        	comparableValue: null,
	        	comparableValueA: null,
	        	comparableValueB: null,
	        },
	        dialogEditVisible: false,
	        comparisons: [
	      	{
	      		value: 2,
	      		label: "大于等于"
	      	},
	      	{
	      		value: 64,
	      		label: "(含)金额1---金额2(不含)"
	      	}],
	      };
	    },
	    methods: {
	       	guanliShow() {
	       		this.viewMode = 2;
	       		this.getGuanli();
	       	},
	       	guimoShow() {
	       		this.viewMode = 1;
	       		this.getInfo();
	       		this.getGuimo();
	       	},
	       	initGuanli(depth) {
		       	this.guanliData = [];
	       		for (var i = 2; i <= depth; i++) {
	       			let buf = {
		       			shangye_N: {
		       				key: null,
		        			value: 0,
		        			origin: 0,
		        			depth: 0,
		        			type: 'COMMERCIAL_NO_PROFIT'
		       			},
		       			shangye_Y: {
		       				key: null,
		        			value: 0,
		        			origin: 0,
		        			depth: 0,
		        			type: 'COMMERCIAL_PROFIT'
		       			},
		       			shangye_other: {
		       				key: null,
		        			value: 0,
		        			origin: 0,
		        			depth: 0,
		        			type: 'COMMERCIAL_OTHER'
		       			},
		       			jiaoqiang_N: {
		       				key: null,
		        			value: 0,
		        			origin: 0,
		        			depth: 0,
		        			type: 'COMPULSORY_NO_PROFIT'
		       			},
		       			jiaoqiang_Y: {
		       				key: null,
		        			value: 0,
		        			origin: 0,
		        			depth: 0,
		        			type: 'COMPULSORY_PROTFIT'
		       			},
		       			jiaoqiang_other: {
		       				key: null,
		        			value: 0,
		        			origin: 0,
		        			depth: 0,
		        			type: 'COMPULSORY_OTHER'
		       			}
		       		}
	       			for (let item in buf) {
	       				buf[item].depth = i;
	       			}
	       			this.guanliData.push(buf);
	       		}

	       	},
	       	getGuanli() {
	       		this.initGuanli(parseInt(this.formSetting.teamDepth));
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
	   							if (res.attach[i].depth <= this.formSetting.teamDepth) {
	   								switch(res.attach[i].type){
		   							case 1:
		   								//营利车商业险
		   								this.guanliData[res.attach[i].depth - 2].shangye_Y.value = res.attach[i].rate / 10;
		   								this.guanliData[res.attach[i].depth - 2].shangye_Y.origin = res.attach[i].rate / 10;
		   								this.guanliData[res.attach[i].depth - 2].shangye_Y.key = res.attach[i].key;
		   								break;
		   							case 2:
		   								//盈利车交强险
		   								this.guanliData[res.attach[i].depth - 2].jiaoqiang_Y.value = res.attach[i].rate / 10;
		   								this.guanliData[res.attach[i].depth - 2].jiaoqiang_Y.origin = res.attach[i].rate / 10;
		   								this.guanliData[res.attach[i].depth - 2].jiaoqiang_Y.key = res.attach[i].key;
		   								break;
		   							case 4:
		   								//非营利车交强险
		   								this.guanliData[res.attach[i].depth - 2].jiaoqiang_N.value = res.attach[i].rate / 10;
		   								this.guanliData[res.attach[i].depth - 2].jiaoqiang_N.origin = res.attach[i].rate / 10;
		   								this.guanliData[res.attach[i].depth - 2].jiaoqiang_N.key = res.attach[i].key;
		   								break;
		   							case 8:
		   								//非营利车商业险
		   								this.guanliData[res.attach[i].depth - 2].shangye_N.value = res.attach[i].rate / 10;
		   								this.guanliData[res.attach[i].depth - 2].shangye_N.origin = res.attach[i].rate / 10;
		   								this.guanliData[res.attach[i].depth - 2].shangye_N.key = res.attach[i].key;
		   								break;
		   							case 16:
		   								//其他商业险
		   								this.guanliData[res.attach[i].depth - 2].shangye_other.value = res.attach[i].rate / 10;
		   								this.guanliData[res.attach[i].depth - 2].shangye_other.origin = res.attach[i].rate / 10;
		   								this.guanliData[res.attach[i].depth - 2].shangye_other.key = res.attach[i].key;
		   								break;
		   							case 32:
		   								//其他交强险
		   								this.guanliData[res.attach[i].depth - 2].jiaoqiang_other.value = res.attach[i].rate / 10;
		   								this.guanliData[res.attach[i].depth - 2].jiaoqiang_other.origin = res.attach[i].rate / 10;
		   								this.guanliData[res.attach[i].depth - 2].jiaoqiang_other.key = res.attach[i].key;
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
		   					for (let i = 0; i < res.attach.length; i++) {
		   						res.attach[i].rate = res.attach[i].rate / 10;
		   					}
		   					this.guimoData = res.attach;
		   				}
	       			}
		   		})
	       	},
	       	getInfo() {
	       		let payload = {
		   			employeeId: window.localStorage.getItem('employeeId')
	       		}
	       		payload = JSON.stringify(payload);
	       		autoApi({
		   			action: 'tenant_info',
		   			version: '1.0',
		   			payload: payload
		   		},window.localStorage.getItem('token')).then((res)=> {
		   			if (res.code == 0) {
		   				if (res.attach.teamDepth) {
		   					this.formSetting.teamDepth = res.attach.teamDepth.toString();
		   				}
        				this.reModCount(res.attach.mod);
	       			}
		   		})
	       	},
		    isLegalNumber(val) {
		    	return (-100 <= val && val <= 100)?true:false;
		    },
	       	comfirmSetting() {
	       		let payload = {
				    // name : xxx,                                                // 商户名字
				    teamDepth: this.formSetting.teamDepth,                  // 团队层级数
				    // nonAutoBind :[1,2,3]                                 // 开通的非车险类型id列表
				    employeeId: window.localStorage.getItem('employeeId'),
				    mod: 0
				};
				var modCount = 0; 
				for (let i = 0; i < this.formSetting.bonusScaleCountMod.length; i++) {
					modCount = modCount + parseInt(this.formSetting.bonusScaleCountMod[i]);
				}
				for (let i = 0; i < this.formSetting.bonusScaleRewardMod.length; i++) {
					modCount = modCount + parseInt(this.formSetting.bonusScaleRewardMod[i]);
				}
				for (let i = 0; i < this.formSetting.bonusScaleCountInsuranceMod.length; i++) {
					modCount = modCount + parseInt(this.formSetting.bonusScaleCountInsuranceMod[i]);
				}
				for (let i = 0; i < this.formSetting.bonusScaleRewardInsuranceMod.length; i++) {
					modCount = modCount + parseInt(this.formSetting.bonusScaleRewardInsuranceMod[i]);
				}
				payload.mod = modCount;
				
				if (payload.mod) {
					payload = JSON.stringify(payload);
					autoApi({
			   			action: 'tenant_set',
			   			version: '1.0',
			   			payload : payload 
			   		},window.localStorage.getItem('token')).then((res)=> {
			   			if (res.code == 0) {
			   				this.$message({
			   					message: '设置已保存',
			   					type: 'success'
			   				});
			   				this.getInfo();
		       			}
			   		})
				}
				else
				{
					this.$message({
						message: '提交数据为空,已取消提交',
						type: 'info',
					});
				}
	       	},
	       	saveGuanli() {
	       		for (var i = 0; i < this.guanliData.length; i++) {
	       			for(let item in this.guanliData[i]) {
	       				if (!(this.guanliData[i][item].value == this.guanliData[i][item].origin) && this.formSetting.teamDepth >= this.guanliData[i][item].depth) {
	       					this.guanliConfirmEdit(this.guanliData[i][item].key,this.guanliData[i][item].value,this.guanliData[i][item].origin,this.guanliData[i][item].depth,this.guanliData[i][item].type);
	       				}
	       			}
	       		}
	       	},
	       	guanliConfirmEdit(id,val,origin,depth,type) {
	       		if(this.isLegalNumber(val)){
	       			if (parseInt(val * 10) && parseInt(origin * 10)) {//value/origin值不为零,操作为修改
		       			let payload = {
				   			employeeId: window.localStorage.getItem('employeeId'),
		       				id: id,
				   			rate: parseInt(val * 10),
				   			teamDepth: depth,
				   			configType: type
		       			}
		       			payload = JSON.stringify(payload);
		       			autoApi({
				   			action: 'bonus_manage_config_edit',
				   			version: '1.0',
				   			crudType: 4,
				   			payload: payload
				   		},window.localStorage.getItem('token')).then((res)=> {
				   			if (res.code == 0) {
		        				this.getGuanli();
		        				this.$message({
				       				message: '修改的设置已保存',
				       				type: 'success',
				       			});
			       			}
				   		})
		       		}
		       		else if (!parseInt(val * 10)) {//value为零,操作为删除
		       			let payload = {
				   			employeeId: window.localStorage.getItem('employeeId'),
		       				id: id
		       			}
		       			payload = JSON.stringify(payload);
		       			autoApi({
				   			action: 'bonus_manage_config_edit',
				   			version: '1.0',
				   			crudType: 8,
				   			payload: payload
				   		},window.localStorage.getItem('token')).then((res)=> {
				   			if (res.code == 0) {
		        				this.getGuanli();
		        				this.$message({
				       				message: '修改的设置已保存',
				       				type: 'success',
				       			});
			       			}
				   		})
		       		}
		       		else if (!parseInt(origin * 10)) {//origin为零,操作为新增
		       			let payload = {
				   			employeeId: window.localStorage.getItem('employeeId'),
				   			rate: parseInt(val * 10),
				   			teamDepth: depth,
				   			configType: type,
		       			}
		       			payload = JSON.stringify(payload);
		       			autoApi({
				   			action: 'bonus_manage_config_edit',
				   			version: '1.0',
				   			crudType: 1,
				   			payload: payload
				   		},window.localStorage.getItem('token')).then((res)=> {
				   			if (res.code == 0) {
		        				this.getGuanli();
	        					this.$message({
				       				message: '修改的设置已保存',
				       				type: 'success',
				       			});
			       			}
				   		})
		       		}
	       		}
	       		else
	       		{
	       			this.$message({
	       				message: '提交的数据中有非法参数,合法输入为-100到100,其他合法参数已保存修改',
	       				type: 'error',
	       			});
	       		}
	       	},
	       	guimoEditMode(row) {
	       		this.dialogEditVisible = true;
	       		this.guimoEdit.id = row.id;
	       		this.guimoEdit.num = row.rate;
	       		this.guimoEdit.comparison = row.comparison;
	       		if (row.comparison == 8) {
	       			this.guimoEdit.comparableValueA = row.comparableValue.split("_")[0];
	       			this.guimoEdit.comparableValueB = row.comparableValue.split("_")[1];
	       		}
	       		else
	       		{
	       			this.guimoEdit.comparableValue = row.comparableValue; 
	       		}
	       	},
	       	handleEditClose() {
	       		this.dialogEditVisible = false;
	       	},
	       	guimoConfirmEdit() {
	       		this.dialogEditVisible = false;
	       		if (this.isLegalNumber(this.guimoEdit.num)) {
	       			let payload = {
		       			employeeId: window.localStorage.getItem('employeeId'),
		       			id: this.guimoEdit.id,
		       			rate: parseInt(this.guimoEdit.num * 10),
		       			symbol: this.reComparisonName(this.guimoEdit.comparison),
		       			val: [],
		       		}
		       		if (this.guimoEdit.comparison == 8) {
		       			payload.val[0] = this.guimoEdit.comparableValueA;
		       			payload.val[1] = this.guimoEdit.comparableValueB;
		       		}
		       		else {
		       			payload.val = this.guimoEdit.comparableValue.split("_");
		       		}
		       		payload = JSON.stringify(payload);

		       		autoApi({
			   			action: 'bonus_scale_config_edit',
			   			version: '1.0',
			   			crudType: 4,
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
	       		}
	       		else
	       		{
	       			this.$message({
	       				message: '输入数值非法,请在-100到100的范围内输入',
	       				type: 'error',
	       			});
	       		}
	       	},
	       	guimoConfirmAdd() {
		       	if (this.isLegalNumber(this.guimoAdd.num)) {
		       		let payload = {
		       			employeeId: window.localStorage.getItem('employeeId'),
		       			rate: parseInt(this.guimoAdd.num * 10),
		       			symbol: this.reComparisonName(this.guimoAdd.comparison),
		       			val: [],
		       		}
		       		if (this.guimoAdd.comparison == 8) {
		       			payload.val[0] = this.guimoAdd.comparableValueA;
		       			payload.val[1] = this.guimoAdd.comparableValueB;
		       		}
		       		else {
		       			payload.val = this.guimoAdd.comparableValue.split("_");
		       		}
		       		payload = JSON.stringify(payload);
		       		
		       		autoApi({
			   			action: 'bonus_scale_config_edit',
			   			version: '1.0',
			   			// employeeId: window.localStorage.getItem('employeeId'),
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
		       	}	
		       	else
		       	{
		       		this.$message({
	       				message: '输入数值非法,请在-100到100的范围内输入',
	       				type: 'error',
	       			});
		       	}
	       	},
	       	guimoDelete(row) {
	       		let payload = {
	       			id: row.id,
		   			employeeId: window.localStorage.getItem('employeeId'),
	       		}
	       		payload = JSON.stringify(payload);
	       		autoApi({
		   			action: 'bonus_scale_config_edit',
		   			version: '1.0',
		   			// employeeId: window.localStorage.getItem('employeeId'),
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
						return "gt"
						break;
					case 2:
						return "gte"
						break;
					case 4:
						return "lt"
						break;
					case 8:
						return "lte"
						break;
					case 16:
						return "eq"
						break;
					case 32:
						return "bteween"
						break;
					case 64:
						return "lbteween"
						break;
					case 128:
						return "rbteween"
						break;
					case 'gt':
						return "大于"
						break;
					case 'gte':
						return "大于等于"
						break;
					case 'lt':
						return "小于"
						break;
					case 'lte':
						return "小于等于"
						break;
					case 'eq':
						return "等于"
						break;
					case 'bteween':
						return "开区间"
						break;
					case 'lbteween':
						return "(含)金额1---金额2(不含)"
						break;
					case 'rbteween':
						return "前开后闭区间"
						break;
		    	}
		    },
		    reModCount(mod) {
		    	this.formSetting.bonusScaleCountMod = [];
		    	this.formSetting.bonusScaleCountInsuranceMod = [];
		    	this.formSetting.bonusScaleRewardMod = [];
		    	this.formSetting.bonusScaleRewardInsuranceMod = [];
		    	if (mod & 1) {//非营业客车 - 统计口径
		    		this.formSetting.bonusScaleCountMod.push('1');
		    	}

		    	if (mod & 2) {//非营业货车 - 统计口径
		    		this.formSetting.bonusScaleCountMod.push('2');
		    	}

		    	if (mod & 4) {//营业客车 - 统计口径
		    		this.formSetting.bonusScaleCountMod.push('4');
		    	}

		    	if (mod & 8) {//营业货车 - 统计口径
		    		this.formSetting.bonusScaleCountMod.push('8');
		    	}

		    	if (mod & 16) {//其他 - 统计口径
		    		this.formSetting.bonusScaleCountMod.push('16');
		    	}

		    	if (mod & 32) {//商业险 - 统计
		    		this.formSetting.bonusScaleCountInsuranceMod.push('32');
		    	}

		    	if (mod & 64) {//交强险 - 统计
		    		this.formSetting.bonusScaleCountInsuranceMod.push('64');
		    	}

		    	if (mod & 128) {//非营业客车 - 奖励
		    		this.formSetting.bonusScaleRewardMod.push('128');
		    	}

		    	if (mod & 256) {//非营业货车 - 奖励
		    		this.formSetting.bonusScaleRewardMod.push('256');
		    	}

		    	if (mod & 512) {//营业客车 - 奖励
		    		this.formSetting.bonusScaleRewardMod.push('512');
		    	}

		    	if (mod & 1024) {//营业货车 - 奖励
		    		this.formSetting.bonusScaleRewardMod.push('1024');
		    	}

		    	if (mod & 2048) {//其他 - 奖励
		    		this.formSetting.bonusScaleRewardMod.push('2048');
		    	}

		    	if (mod & 4096) {//商业险 - 奖励
		    		this.formSetting.bonusScaleRewardInsuranceMod.push('4096');
		    	}

		    	if (mod & 8192) {//交强险 - 奖励
		    		this.formSetting.bonusScaleRewardInsuranceMod.push('8192');
		    	}
		    },
		    guimoAccount() {
		    	let payload = {
		    		employeeId: window.localStorage.getItem('employeeId')
		    	}
		    	payload = JSON.stringify(payload);
		    	autoApi({
		   			action: 'vehicle_reward_scale',
		   			version: '1.0',
		   			payload: payload,
		   		},window.localStorage.getItem('token')).then((res)=> {
		   			if (res.code == 0) {
		   				this.$message({
		   					message: '规模奖励已统计',
		   					type: 'success'
		   				});
	       			}
		   		})
		    },
		    guanliAccount() {
		    	let payload = {
		    		employeeId: window.localStorage.getItem('employeeId')
		    	}
		    	payload = JSON.stringify(payload);
		    	autoApi({
		   			action: 'vehicle_reward',
		   			version: '1.0',
		   			payload: payload,
		   		},window.localStorage.getItem('token')).then((res)=> {
		   			if (res.code == 0) {
		   				this.$message({
		   					message: '管理奖励已结算',
		   					type: 'success'
		   				});
	       			}
		   		})
		    }
	    },
	    mounted(){
	        this.getGuimo();
	        this.getInfo();
	    }
	}
</script>
<style lang="less">
.rewardBody {
	.topBar {
		margin-top: 10px;
		margin-bottom: 20px;
		.topBarR {
			float: right;
		}
	}
	.appbox{
		.appblock{
			width: 100%;
		}
	}
	.guimoDataBox {
		padding: 20px 20px 10px 20px;
		margin: 20px 0;
		background-color: white;
		min-width: 1050px;
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
		.countTool {
			width: 150px !important;
		}
	}
}	
</style>