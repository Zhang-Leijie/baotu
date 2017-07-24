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
                    require(['./pages/GMList.vue'],resolve)
                }
            },
            {
                path: "/GM-edit",
                name: "GM-edit",
                component(resolve) {
                    require(['./pages/GMEdit.vue'],resolve)
                }
            },
            {
                path: "/appList",
                name: "appList",
                component(resolve) {
                    require(['./pages/appList.vue'],resolve)
                }
            },
            {
                path: "/app-edit",
                name: "app-edit",
                component(resolve) {
                    require(['./pages/appEdit.vue'],resolve)
                }
            },
            {
                path: "/insurerList",
                name: "insurerList",
                component(resolve) {
                    require(['./pages/insurerList.vue'],resolve)
                }
            },
            {
                path: "/insurer-edit",
                name: "insurer-edit",
                component(resolve) {
                    require(['./pages/insurerEdit.vue'],resolve)
                }
            },
            {
                path: "/areaList",
                name: "areaList",
                component(resolve) {
                    require(['./pages/areaList.vue'],resolve)
                }
            },
            {
                path: "/area-edit",
                name: "area-edit",
                component(resolve) {
                    require(['./pages/areaEdit.vue'],resolve)
                }
            },
            {
                path: "/tenantList",
                name: "tenantList",
                component(resolve) {
                    require(['./pages/tenantList.vue'],resolve)
                }
            },
            {
                path: "/tenant-edit",
                name: "tenant-edit",
                component(resolve) {
                    require(['./pages/tenantEdit.vue'],resolve)
                }
            }
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