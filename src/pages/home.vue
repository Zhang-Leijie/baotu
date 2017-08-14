<template>
	<div style="padding: 40px;">
		<el-button @click="goPingtai">平台端</el-button>
		
		<el-button @click="chooseShangjia">商家端</el-button>
			
		<el-select v-model="tenantId" placeholder="请选择" @change="tenantChange" v-show="gotoShangjia">
		    <el-option v-for="item in tenants" :label="item.label" :value="item.value"></el-option>
		</el-select>

		<el-button :disabled="true">PC端</el-button>
		
	</div>
</template>

<script>
import { autoApi,commonApi } from '@/ajax/post.js'

export default {
	  data() {
	    return {
	      tenantId: null,
	      tenants: [],
	      gotoShangjia: false
		}
	  },
	  methods: {
		//获取代理商列表
	    getTenanList() {
	    	let payload = {}
	    	payload = JSON.stringify(payload)
	    	autoApi({
	   			action: 'tenants_user',
	   			version: '1.0',
	   			payload: payload		
	   		},window.localStorage.getItem('token')).then((res)=> {
	   			if (res.code == 0) {
	   				if (res.attach.audit[0]) {
	   					for (var i = 0; i < res.attach.audit.length; i++) {
		   					let buf = {
		   						value: {
		   							tid: null
		   						},
		   						label: null
		   					}
		   					buf.value.tid = res.attach.audit[i].tid;
		   					buf.label = res.attach.audit[i].tname + " (审核中)";
		   					this.tenants.push(buf);
		   				}
	   				}

	   				if (res.attach.own[0]) {
	   					for (var i = 0; i < res.attach.own.length; i++) {
		   					let buf = {
		   						value: {
		   							tid: null,
		   							employeeId: null
		   						},
		   						label: null
		   					}
		   					buf.value.tid = res.attach.own[i].tid;
		   					buf.value.employeeId = res.attach.own[i].employeeId;
		   					buf.label = res.attach.own[i].tname;
		   					this.tenants.push(buf);
		   				}
	   				}
		   				
       			}
	   		}) 
	    },

	    tenantChange(val) {
        	localStorage.setItem('employeeId',val.employeeId);
        	localStorage.setItem('tid',val.tid);
        	this.goShangjia();
	    },

	    goShangjia() {
	    	localStorage.setItem('baotuUserType','shangjia');
	    	router.push({name:'shopHome'});
	    },

	    goPingtai() {
	    	localStorage.setItem('baotuUserType','pingtai');
	    	localStorage.setItem('employeeId',null);
        	localStorage.setItem('tid',null);
	    	router.push({name:'shopHome'});
	    },

	    chooseShangjia() {
	    	this.gotoShangjia = true;
	    	this.$message({
	    		message: '请选择商家',
	    		type: 'info'
	    	});
	    }

	  },
	  mounted() {
	  	this.getTenanList();
	  }
	}
</script>