import Vue from "vue";
import VueRouter from "vue-router";
import auth from "@/middlewares/auth";

Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        name: "home",
        beforeEnter: () => {
            router.push("/home");
        },
    },
    {
        path: "/home",
        name: "home",
        beforeEnter: auth,
        component: () => import(/* webpackChunkName: "home" */ "../views/POSView.vue"),
    },
    {
        path: "/client/table",
        name: "client/table",
        component: () => import(/* webpackChunkName: "client/table" */ "../views/TableView.vue"),
    },
    {
        path: "/dashboard/account",
        name: "dashboardAccount",
        beforeEnter: auth,
        component: () => import(/* webpackChunkName: "dashboardAccount" */ "../views/dashboard/AccountList.vue"),
    },
    {
        path: "/dashboard/account/register",
        name: "dashboardRegister",
        beforeEnter: auth,
        component: () => import(/* webpackChunkName: "dashboardRegister" */ "../views/dashboard/AccountNew.vue"),
    },
    {
        path: "/dashboard/food/category",
        name: "foodCategory",
        beforeEnter: auth,
        component: () => import(/* webpackChunkName: "foodCategory" */ "../views/dashboard/FoodCategory.vue"),
    },
    {
        path: "/dashboard/food/dish",
        name: "foodDish",
        beforeEnter: auth,
        component: () => import(/* webpackChunkName: "foodDish" */ "../views/dashboard/FoodDish.vue"),
    },
    {
        path: "/dashboard/table",
        name: "dashboardTable",
        beforeEnter: auth,
        component: () => import(/* webpackChunkName: "dashboardTable" */ "../views/dashboard/TableManagement.vue"),
    },

    {
<<<<<<< HEAD
        path: "/dashboard/order",
        name: "/dashboard/order",
        component: () => import(/* webpackChunkName: "login" */ "../views/OrderManagement.vue"),
=======
        path: "/pos",
        name: "pos",
        beforeEnter: auth,
        component: () => import(/* webpackChunkName: "pos" */ "../views/TransactionView.vue"),
>>>>>>> 684f6b2b79a6e54a1c0be2e7aa0371df2f9108f0
    },
    {
        path: "/login",
        name: "login",
        component: () => import(/* webpackChunkName: "login" */ "../views/LoginView.vue"),
    },
    {
        path: "*",
        name: "notfound",
        beforeEnter: auth,
        component: () => import(/* webpackChunkName: "notfound" */ "../views/NotFound.vue"),
    },
];

const router = new VueRouter({
    mode: "history",
    linkExactActiveClass: "is-active",
    base: process.env.BASE_URL,
    routes,
});

export default router;
