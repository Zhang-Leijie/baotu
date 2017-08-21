import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
	{
        path: "/sign-in",
        name: "sign-in",
        component(resolve) {
            require(['./pages/sign-in.vue'],resolve)
        }
    },{
        path: "/home",
        name: "home",
        component(resolve) {
            require(['./pages/home.vue'],resolve)
        },
        children: [
            {
                path: "/GMList",
                name: "GMList",
                component(resolve) {
                    require(['./pages/user/GMList.vue'],resolve)
                }
            },
            {
                path: "/GM-edit",
                name: "GM-edit",
                component(resolve) {
                    require(['./pages/user/GMEdit.vue'],resolve)
                }
            },
            {
                path: "/appList",
                name: "appList",
                component(resolve) {
                    require(['./pages/user/appList.vue'],resolve)
                }
            },
            {
                path: "/app-edit",
                name: "app-edit",
                component(resolve) {
                    require(['./pages/user/appEdit.vue'],resolve)
                }
            },
            {
                path: "/insurerList",
                name: "insurerList",
                component(resolve) {
                    require(['./pages/platform/insurerList.vue'],resolve)
                }
            },
            {
                path: "/insurer-edit",
                name: "insurer-edit",
                component(resolve) {
                    require(['./pages/platform/insurerEdit.vue'],resolve)
                }
            },
            {
                path: "/areaList",
                name: "areaList",
                component(resolve) {
                    require(['./pages/platform/areaList.vue'],resolve)
                }
            },
            {
                path: "/area-edit",
                name: "area-edit",
                component(resolve) {
                    require(['./pages/platform/areaEdit.vue'],resolve)
                }
            },
            {
                path: "/tenantList",
                name: "tenantList",
                component(resolve) {
                    require(['./pages/user/tenantList.vue'],resolve)
                }
            },
            {
                path: "/tenant-edit",
                name: "tenant-edit",
                component(resolve) {
                    require(['./pages/user/tenantEdit.vue'],resolve)
                }
            },
            {
                path: "/brandsList",
                name: "brandsList",
                component(resolve) {
                    require(['./pages/platform/brandsList.vue'],resolve)
                }
            },
            {
                path: "/deptsList",
                name: "deptsList",
                component(resolve) {
                    require(['./pages/platform/deptsList.vue'],resolve)
                }
            },
            {
                path: "/modelsList",
                name: "modelsList",
                component(resolve) {
                    require(['./pages/platform/modelsList.vue'],resolve)
                }
            },
            {
                path: "/nonAutoCategoryList",
                name: "nonAutoCategoryList",
                component(resolve) {
                    require(['./pages/product/nonAutoCategoryList.vue'],resolve)
                }
            },
            {
                path: "/nonAutoProductList",
                name: "nonAutoProductList",
                component(resolve) {
                    require(['./pages/product/nonAutoProductList.vue'],resolve)
                }
            },
            {
                path: "/poundageCoefficient",
                name: "poundageCoefficient",
                component(resolve) {
                    require(['./pages/poundageCoefficient.vue'],resolve)
                }
            },
            {
                path: "/permissionEdit",
                name: "permissionEdit",
                component(resolve) {
                    require(['./pages/permissionEdit.vue'],resolve)
                }
            },
            {
                path: "/GMPermission",
                name: "GMPermission",
                component(resolve) {
                    require(['./pages/user/GMPermission.vue'],resolve)
                }
            },
            {
                path: "/APPPermission",
                name: "APPPermission",
                component(resolve) {
                    require(['./pages/user/APPPermission.vue'],resolve)
                }
            },
        ]
    },{
        path: "/",
        redirect: '/sign-in'
    }
]

export default new VueRouter({
	routes
})

export const routerState = {
  previous: null
}