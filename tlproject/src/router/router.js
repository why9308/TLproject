import Vue from "vue"
import Router from "vue-router"
import Login from "../pages/Login"
import {API_TOKEN} from "../api/apis"

Vue.use(Router)
const router= new Router({
    routes: [{
            path: "/",
            name: "login",
            component: Login,
        },
        {
            path: "/index",
            name: "index",
            component: () => import("../pages/Index"),
            children: [{
                    path: "/index/home",
                    name: "home",
                    component: () => import("../pages/Index/Home"),
                    meta:{Permission:["super"]}
                    

                },
                {
                    path: "/index/mycenter",
                    name: "mycenter",
                    component: () => import("../pages/Index/MyCenter")

                },
                {
                    path: "/index/order",
                    name: "order",
                    component: () => import("../pages/Index/Order")
                },
                {
                    path: "/index/prolist",
                    name: "prolist",
                    component: () => import("../pages/Index/ProductList")


                },
                {
                    path: "/index/articleadd",
                    name: "prolist",
                    component: () => import("../pages/Index/Articleadd")
                },
                {
                    path: "/index/classify",
                    name: "classify",
                    component: () => import("../pages/Index/Classify")
                },
                {
                    path: "/index/manage",
                    name: "manage",
                    component: () => import("../pages/Index/Manage")
                },
                {
                    path: "/index/accountList",
                    name: "accountList",
                    component: () => import("../pages/Index/AccountList")
                },
                {
                    path: "/index/addaccount",
                    name: "addaccount",
                    component: () => import("../pages/Index/AddAccount")
                },
                {
                    path: "/index/changepwd",
                    name: "changepwd",
                    component: () => import("../pages/Index/ChangePwd")
                },
                {
                    path: "/index/goodsstatistics",
                    name: "goodsstatistics",
                    component: () => import("../pages/Index/GoodsStatistics")
                },
                {
                    path: "/index/orderstats",
                    name: "orderstats",
                    component: () => import("../pages/Index/OrderStats")
                }
            ]
        }
    ]

})
export default router
router.beforeEach((to,from,next)=>{
    from
    if(to.path!="/"){
        API_TOKEN(localStorage.token).then((res)=>{
            if(res.data.code==0){
                next()

            }else{
                next("/")
            }
        })
    }else{
        next()
    }
})