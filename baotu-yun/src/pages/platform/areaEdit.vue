<template>
	<div>
		<el-breadcrumb separator="/">
		  	<el-breadcrumb-item :to="{name:'areaList'}">地区列表</el-breadcrumb-item>
		  	<el-breadcrumb-item>{{isAdd?'新增':'编辑'}}</el-breadcrumb-item>
		</el-breadcrumb>
		<el-form label-width="120px" class="appbox">
		  	<el-form-item class="appblock" label="壁虎ID:">
	    		 <el-input type="text" style="width:300px;" v-model="form.biHuId" placeholder="请输入ID"></el-input>
		  	</el-form-item>
		  	<el-form-item class="appblock" label="续保期限:">
		    	<el-input type="number" style="width:300px;" v-model="form.num" placeholder="请输入天数(30-90)"></el-input>
		  	</el-form-item>
		  	<el-form-item class="appblock" label="是否不含税:">
		    	<el-switch v-model="form.priceNoTax" on-text="不含" off-text="含税"></el-switch>
		  	</el-form-item>
		  	<el-form-item class="appblock" label="行政区划选择:">
			    <el-select style="width:145px;" v-model="regions" placeholder="请选择" @visible-change="form.region = null">
				    <el-option v-for="item in regionFormData" :label="item.label" :value="item.value" :key="item.value"></el-option>
				</el-select>
				<el-select style="width:145px;" v-model="form.region" placeholder="请选择" v-if="regions || form.region">
				    <el-option v-for="item in regions" :label="item[0]" :value="item[1]" :key="item.value"></el-option>
				</el-select>
		    </el-form-item>
		</el-form>
		<div style="clear:both"></div>
		<div style="text-align:center;margin-top:20px;">
			<el-button @click="goback">取消</el-button>
			<el-button type="primary" @click="comfirmAdd" v-if="isAdd">添加地区</el-button>
			<el-button type="primary" @click="comfirmSave" v-if="!isAdd">保存修改</el-button>
		</div>
	</div>
</template>
<script>
import { masterApi } from '@/ajax/post.js'
import regionData from '@/region.js'

	export default {
	    data() {
	      return {
	      	isAdd: false,
	      	regionFormData: [],		//格式化行政区划表
	        regions: [],			//一级行政区划表
	        form: {
	      		id: null,
	        	name: null,
	        	region: null,
	        	biHuId: null,
	        	num: null,
	        	priceNoTax: false
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
				if (this.form.region) {
					let payload = {
						code: this.form.region,
						biHuId: this.form.biHuId,
						renewalPeriod: this.form.num,
						priceNoTax: this.form.priceNoTax,
					}
					payload = JSON.stringify(payload);
					masterApi({
						action: 'area_edit',
						version: '1.0',
						crudType: 1,
						payload: payload
					},window.localStorage.getItem('tokenPlate')).then((res)=> {
						if (res.code == 0) {
							this.$message({
					            type: 'success',
					            message: '添加地区成功'
					        });
						    router.push({
						  	  name: "areaList"
						    })
						}
					})
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
				if (this.form.region) {
					let payload = {
						code: this.form.region,
						biHuId: this.form.biHuId,
						renewalPeriod: this.form.num,
						priceNoTax: this.form.priceNoTax,
					}
					payload = JSON.stringify(payload);
					masterApi({
						action: 'area_edit',
						version: '1.0',
						crudType: 4,
						payload: payload
					},window.localStorage.getItem('tokenPlate')).then((res)=> {
						if (res.code == 0) {
							this.$message({
					            type: 'success',
					            message: '地区修改成功'
					        });
						    router.push({
						  	  name: "areaList"
						    })
						}
					})
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
			  	  name: "areaList"
			    })
			}
	    },
	    mounted(){
	        if (this.$route.query) {
	        	this.isAdd = false
	        	this.form.id = Math.log(this.$route.query.id) / Math.log(2);
		        this.form.name = this.$route.query.name;
		        this.form.biHuId = this.$route.query.biHuId;
		        this.form.num = this.$route.query.renewalPeriod;
		        this.form.priceNoTax = this.$route.query.vehiclePriceNoTax;
		        let regionName = this.$route.query.name;
		        let region = this.$route.query.code;
		        this.regions = [
		        	[regionName,region]
		        ];
		        this.form.region = this.$route.query.code;
	        }
	        else
	        {
	        	this.isAdd = true;
	        }

	        for(let index in regionData) {
	        	let buf = {
	        		value: regionData[index],
	        		label: index
	        	}
	        	this.regionFormData.push(buf);
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