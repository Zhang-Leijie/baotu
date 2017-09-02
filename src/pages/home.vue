<template>
	<div class="signInBody">
		<div class="bg"></div>
		<div class="auto-main">
		    <div class="centerBox">
		        <h1>入口选择</h1>
		        <div class="inputBox">
		        	<el-button @click="goPingtai" style="width:100px; height:60px; margin-right:50px;">平台端</el-button>
			
					<el-button @click="chooseShangjia" style="width:100px; height:60px; margin-right:50px;">商家端</el-button>
					
					<el-button @click="" style="width:100px; height:60px;" @click="gotoPC">展业</el-button>

					<el-select v-model="tenantId" placeholder="请选择" @change="tenantChange" v-show="gotoShangjia" style="width:200px; margin-top:20px;">
					    <el-option v-for="item in tenants" :label="item.label" :value="item.value"></el-option>
					</el-select>
		        </div>
		    </div>
		</div>

		<el-button :disabled="true">PC端</el-button>
		
	</div>
</template>

<script>
import { autoApi } from '@/ajax/post.js'

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
			router.push({name:'shop-staff-list'});
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
		},

		gotoPC() {
			window.open('http://101.37.34.55/pc/');
		},
	},
	mounted() {
		this.getTenanList();
	}
}
</script>
<style lang="less">
.signInBody {
    height: 100%;
    overflow: hidden;
    text-align: center;
    .bg {
    	background: url("../assets/ales-krivec-337355.png") no-repeat;
	    background-size: cover;
	    position: fixed;
	    left: 0;
	    top: 0;
	    width: 100%;
	    height: 100%;
	    z-index: -1
    }
	.auto-main {
        display: flex;
        align-items: center;
        width: 100%;
        height: 100%;
    }
    .el-button {
        background: transparent;
        color: #fff;
    }
    .centerBox {
        width: 540px;
        margin: 0 auto;
        border-radius: 5px;
        background: rgba(0, 0, 0, .55);
        color: #fff;
        padding: 20px;
        h1 {
            margin-top: 10px;
            font-size: 16px;
        }
        .inputBox {
            width: 500px;
            margin: 30px auto;
        }
    }
}
</style>
