<template>
	<div class="signInBody">
		<div class="bg"></div>
		<div class="auto-main">
		    <div class="centerBox">
		        <h1>入口选择</h1>
		        <div class="inputBox">
		        	<el-button @click="goPingtai" style="width:100px; height:60px; margin-right:50px;" v-if="isAPPAllowed">平台端</el-button>
			
					<el-button @click="chooseShangjia" style="width:100px; height:60px; margin-right:50px;" v-if="tenants[0]">商家端</el-button>
					
					<el-button @click="chooseShangjiaPC" style="width:100px; height:60px;">展业</el-button>
				</div>
				
				<div class="inputBox">
					<el-select v-model="tenantId" placeholder="请选择商家" @change="tenantChange" v-show="gotoSomewhere == 'shangjia'" style="width:200px; margin-top:20px;">
					    <el-option v-for="item in tenants" :label="item.label" :value="item.value" :key="item.value" :disabled="item.disabled"></el-option>
					</el-select>

					<el-select v-model="tenantIdPC" placeholder="请选择pc端商家" @change="goPC" v-show="gotoSomewhere == 'pc'" style="width:200px; margin-top:20px;">
					    <el-option v-for="item in tenants_PC" :label="item.value.name" :value="item.value" :key="item.value"></el-option>
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
			tenantIdPC: null,
			tenants: [],
			tenants_PC: [],
			gotoSomewhere: null,
			isAPPAllowed: false,
		}
	},
	methods: {
		//获取代理商列表
		getTenanList() {
			autoApi({
				action: 'modulars_possessed',
				version: '1.0',
			}, window.localStorage.getItem('token')).then((res) => {
				if (res.code == 0) {
					if (res.attach.tenants) { //商家模块入口控制
						for (var i = 0; i < res.attach.tenants.length; i++) {
							let buf = {
								value: {
									tid: res.attach.tenants[i].tid,
									employeeId: res.attach.tenants[i].employeeId,
									layer: res.attach.tenants[i].layer,
									name: res.attach.tenants[i].tname,
								},
								label: res.attach.tenants[i].tname,
							}
							this.tenants_PC.push(buf);
							//商家权限管理
							if (res.attach.tenants[i].layer == 1) {
								if ((res.attach.tenants[i].tmod & 16384) == 16384) {
									buf.label = buf.label + '(商户被禁用)';
									buf.disabled = true;
									this.tenants.push(buf);
								} else if ((res.attach.tenants[i].mod & 1024) == 1024) {
									buf.label = buf.label + '(您被禁用)';
									buf.disabled = true;
									this.tenants.push(buf);
								} else {
									this.tenants.push(buf);
								}
							} else {
								if (res.attach.tenants[i].modulars) {
									if (this.isPermiss('SHOP', res.attach.tenants[i].modulars)) {
										if ((res.attach.tenants[i].tmod & 16384) == 16384) {
											buf.label = buf.label + '(商户被禁用)';
											buf.disabled = true;
											this.tenants.push(buf);
										} else if ((res.attach.tenants[i].mod & 1024) == 1024) {
											buf.label = buf.label + '(您被禁用)';
											buf.disabled = true;
											this.tenants.push(buf);
										} else {
											this.tenants.push(buf);
										}
									}
								}
							}
						}
					}
					if (res.attach.pmodulars) { //平台模块入口控制
						if (this.isPermiss('APP', res.attach.pmodulars)) {
							this.isAPPAllowed = true;
						}
					}
				}
			})
		},

		tenantChange(val) {
			localStorage.setItem('employeeId', val.employeeId);
			localStorage.setItem('tid', val.tid);
			if (val.layer == 1) {
				localStorage.setItem('isRoot_tenant', 'y');
			} else {
				localStorage.setItem('isRoot_tenant', 'n');
			}
			// if (val.employeeId) {
			// 	let payload = {
			// 		employeeId: val.employeeId,
			// 	}
			// 	payload = JSON.stringify(payload);
			// 	autoApi({
			// 		action: 'tenant_info',
			// 		version: '1.0',
			// 		payload: payload,
			// 	},window.localStorage.getItem('token')).then((res)=> {
			// 		if (res.code == 0) {
			// 			if ((res.attach.mod & 1) == 1) {debugger
			// 				localStorage.setItem('isRoot_tenant','y');
			// 			}
			// 			else
			// 			{
			// 				localStorage.setItem('isRoot_tenant','n');
			// 			}
			// 		}
			// 	}) 
			// }
			this.goShangjia();
		},

		isPermiss(modular, ownModulars) { //判断模块modular是否在模块列表ownModulars中,若有,则返回true
			for (let i = 0; i < ownModulars.length; i++) {
				if (ownModulars[i] == modular) {
					return true;
				}
			}
			return false;
		},

		goShangjia() {
			localStorage.setItem('baotuUserType', 'shangjia');
			router.push({
				name: 'shopWelcome'
			});
			// router.push({name:'shop-verify'});
		},

		goPingtai() {
			localStorage.setItem('baotuUserType', 'pingtai');
			localStorage.setItem('employeeId', null);
			localStorage.setItem('tid', null);
			localStorage.setItem('isRoot_tenant', null);
			router.push({
				name: 'adminWelcome'
			});
		},

		chooseShangjia() {
			this.gotoSomewhere = 'shangjia';
			this.$message({
				message: '请选择商家',
				type: 'info',
			});
		},

		chooseShangjiaPC() {
			this.gotoSomewhere = 'pc';
			this.$message({
				message: '请选择pc端商家',
				type: 'info',
			});
		},

		goPC(val) {
			if (val) {
				var dataBuf = JSON.parse(window.localStorage.getItem('cacheData'));
				dataBuf.own = [{
					employeeId: val.employeeId,
					tid: val.tid,
					tname: val.name,
				}];

				dataBuf.ip = window.localStorage.getItem('ipAddrPlate');
				dataBuf = JSON.stringify(dataBuf);
				window.open('http://101.37.34.55/pc/#/insur/car?data=' + dataBuf);
				this.tenantIdPC = null;
			}
		},
	},
	mounted() {
		if (window.localStorage.getItem('userId_plate')) {
			autoApi({
				action: 'user_info',
				version: '1.0',
			}, window.localStorage.getItem('token')).then((res) => {
				if (res.code == 0) {
					if ((res.attach.mod & 1) == 1) {
						localStorage.setItem('isRoot_plate', 'y');
						this.isAPPAllowed = true;
					} else {
						localStorage.setItem('isRoot_plate', 'n');
					}
				}
			})
		}
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
