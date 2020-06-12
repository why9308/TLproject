import Vue from "vue"
import Router from "vue-router"
import Login from "../pages/Login"
import {
    API_TOKEN
} from "../api/apis"

Vue.use(Router)
const router = new Router({
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
                    meta: ["super", "normal"]



                },
                {
                    path: "/index/mycenter",
                    name: "mycenter",
                    component: () => import("../pages/Index/MyCenter"),
                    meta: ["super"]



                },
                {
                    path: "/index/order",
                    name: "order",
                    component: () => import("../pages/Index/Order"),
                    meta: ["super", "normal"]
                },
                {
                    path: "/index/prolist",
                    name: "prolist",
                    component: () => import("../pages/Index/ProductList"),
                    meta: ["super", "normal"]


                },
                {
                    path: "/index/articleadd",
                    name: "prolist",
                    component: () => import("../pages/Index/Articleadd"),
                    meta: ["super", "normal"]
                },
                {
                    path: "/index/classify",
                    name: "classify",
                    component: () => import("../pages/Index/Classify"),
                    meta: ["super", "normal"]
                },
                {
                    path: "/index/manage",
                    name: "manage",
                    component: () => import("../pages/Index/Manage"),
                    meta: ["super"]
                },
                {
                    path: "/index/accountList",
                    name: "accountList",
                    component: () => import("../pages/Index/AccountList"),
                    meta: ["super"]
                },
                {
                    path: "/index/addaccount",
                    name: "addaccount",
                    component: () => import("../pages/Index/AddAccount"),
                    meta: ["super"]
                },
                {
                    path: "/index/changepwd",
                    name: "changepwd",
                    component: () => import("../pages/Index/ChangePwd"),
                    meta: ["super"]
                },
                {
                    path: "/index/goodsstatistics",
                    name: "goodsstatistics",
                    component: () => import("../pages/Index/GoodsStatistics"),
                    meta: ["super"]
                },
                {
                    path: "/index/orderstats",
                    name: "orderstats",
                    component: () => import("../pages/Index/OrderStats"),
                    meta: ["super"]
                }
            ]
        }
    ]

})
export default router
router.beforeEach((to, from, next) => {
    from
    // to: Route: 即将要进入的目标 路由对象  from: Route: 当前导航正要离开的路由  next: Function: 一定要调用该方法来 resolve 这个钩子。执行效果依赖 next 方法的调用参数
    //to: 要前往的路由route对象
    //from: 现在的route对象
    //next：函数，放行，表示继续下一步 如果传参则表示跳转到指定hash
    // 功能2： 权限拦截，不能通过hash值访问到非自己权限的页面！
    // to.meta  当前route的参数   localStorage.role 当前用户权限组
    if (to.path != "/") {
        API_TOKEN(localStorage.token).then((res) => {
            if (res.data.code == 0) {
                if (to.meta.indexOf(localStorage.role) != -1) next()
                // console.log(to.meta);
                else {
                    next(from.path)
                }

            } else {

                next("/")
            }
        })
    } else {
        next()
    }
})