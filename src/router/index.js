import { createRouter, createWebHistory } from "vue-router";
import HomeLayout from "../layouts/HomeLayout.vue";
import ChefLayout from "../layouts/ChefLayout.vue";
import ManagerLayout from "../layouts/ManagerLayout.vue";
// import ProductLayout from "../layouts/ProductLayout.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            name: "home",
            redirect: "/",
            component: HomeLayout,
            children: [
                {
                    path: "/",
                    component: () => import("../views/HomeView.vue"),
                },
                {
                    path: "/Seafood",
                    component: () => import("../views/SeafoodView.vue"),
                },
                {
                    path: "/Waterfood",
                    component: () => import("../views/WaterfoodView.vue"),
                },
                {
                    path: "/Cachloroathite",
                    component: () => import("../views/CachloroathiteView.vue"),
                },
                {
                    path: "/Other",
                    component: () => import("../views/OtherView.vue"),
                },
                {
                    path: "/Drinks",
                    component: () => import("../views/DrinksView.vue"),
                },
                {
                    path: "/Dessert",
                    component: () => import("../views/DessertView.vue"),
                },
            ],
        },
        {
            path: "/chef",
            name: "chef",
            redirect: "/chef/table",
            component: ChefLayout,
            children: [
                {
                    path: "/chef/table",
                    component: () => import("../views/chef/TableView.vue"),
                },
            ],
        },
        {
            path: "/manager",
            name: "manager",
            redirect: "/manager",
            component: ManagerLayout,
            children: [
                {
                    path: "/manager",
                    component: () => import("../views/manager/TableView.vue"),
                },
                {
                    path: "/manager/table",
                    component: () => import("../views/manager/TableView.vue"),
                },
                {
                    path: "/manager/order",
                    component: () => import("../views/manager/orderView.vue"),
                },
                {
                    path: "/manager/menu",
                    component: () => import("../views/manager/TableView.vue"),
                },
                {
                    path: "/manager/category",
                    component: () => import("../views/manager/TableView.vue"),
                },
                {
                    path: "/manager/employee",
                    component: () => import("../views/manager/TableView.vue"),
                },
            ],
        },
    ],
    scrollBehavior() {
        window.scrollTo(0, 0);
    },
});

export default router;
