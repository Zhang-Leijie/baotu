<template>
	<div style="padding: 40px;">
		<el-button>
			<router-link :to="{name:'adminHome'}">
				后台管理端
			</router-link>
		</el-button>
		
		<el-button v-if="tenantId">
			<router-link :to="{name:'shopHome'}"> 
				前往商家端
			</router-link>
		</el-button>
			
		<el-button v-show="!tenantId">
			<router-link :to="{name:'shopHome'}"> 
				不选择商家,直接进入
			</router-link>
		</el-button>

		<el-select v-model="tenantId" placeholder="请选择" @change="tenantChange">
		    <el-option v-for="item in tenants" :label="item.label" :value="item.value"></el-option>
		</el-select>
	</div>
</template>

<script>
import { autoApi,commonApi } from '@/ajax/post.js'

export default {
	  data() {
	    return {
	      tenantId: null,
	      tenants: []
		}
	  },
	  methods: {
		//获取代理商列表
	    getTenanList() {
	    	commonApi({
	   			action: 'tenant_list',
	   			version: '1.0',
	   			client: 2		
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

	    tenantChange(val) {debugger
        	localStorage.setItem('employeeId',val.employeeId);
        	localStorage.setItem('tid',val.tid);
	    }
	  },
	  mounted() {
	  	this.getTenanList();
	  }
	}
</script>