<template>
    <div class="left-menu">
        <div class="flex text-white justify-center items-center p-4" style="background: rgb(71 69 139)">
            <img src="@/assets/logo.png" width="25px" />
            <h1 class="font-bold text-2xl uppercase ml-4">Store System</h1>
        </div>
        <div class="w-full p-6 main-content-menu" v-if="!tableData">
            <h1 class="text-2xl text-center">{{ payload ? `Hi, ${payload.fullName}` : "Welcome!" }}</h1>
            <div class="menu-list mt-8" v-if="payload && accessToken">
                <ul class="mb-3">
                    <div class="flex items-center mb-1 text-white">
                        <ThemifyIcon icon="arrow-circle-right" />
                        <h1 class="ml-2 font-bold uppercase">Point of Sale</h1>
                    </div>
                    <router-link to="/dashboard/order" v-if="payload.role == 'MANAGER' || payload.role == 'ADMIN' || payload.role == 'STAFF'">
                        <div class="flex items-center w-full pl-6 transition-all">
                            <ThemifyIcon icon="server" />
                            <li class="p-1 pl-2">Order</li>
                        </div>
                    </router-link>
                    <router-link to="/dashboard/pendingOrder">
                        <div class="flex items-center w-full pl-6 transition-all">
                            <ThemifyIcon icon="timer" />
                            <li class="p-1 pl-2">Pending Order</li>
                        </div>
                    </router-link>
                    <router-link to="/dashboard/invoice" v-if="payload.role == 'MANAGER' || payload.role == 'ADMIN'">
                        <div class="flex items-center w-full pl-6 transition-all">
                            <ThemifyIcon icon="timer" />
                            <li class="p-1 pl-2">Invoice</li>
                        </div>
                    </router-link>
                </ul>
                <hr class="my-4 opacity-50" />
                <ul class="mb-3" v-if="payload.role == 'ADMIN'">
                    <div class="flex items-center mb-1 text-white">
                        <ThemifyIcon icon="arrow-circle-right" />
                        <h1 class="ml-2 font-bold uppercase">Account Management</h1>
                    </div>
                    <router-link to="/dashboard/account">
                        <div class="flex items-center w-full pl-6 transition-all">
                            <ThemifyIcon icon="user" />
                            <li class="p-1 pl-2">Account List</li>
                        </div>
                    </router-link>
                    <router-link to="/dashboard/account/register">
                        <div class="flex items-center w-full pl-6 transition-all">
                            <ThemifyIcon icon="plus" />
                            <li class="p-1 pl-2">Create</li>
                        </div>
                    </router-link>
                </ul>
                <hr class="my-4 opacity-50" />
                <ul class="mb-3" v-if="payload.role != 'CHEF'">
                    <div class="flex items-center mb-1 text-white">
                        <ThemifyIcon icon="arrow-circle-right" />
                        <h1 class="ml-2 font-bold uppercase">Table management</h1>
                    </div>
                    <router-link to="/dashboard/table">
                        <div class="flex items-center w-full pl-6 transition-all">
                            <ThemifyIcon icon="harddrives" />
                            <li class="p-1 pl-2">Table</li>
                        </div>
                    </router-link>
                </ul>
                <hr class="my-4 opacity-50" />
                <ul class="mb-3" v-if="payload.role == 'ADMIN' || payload.role == 'CHEF'">
                    <div class="flex items-center mb-1 text-white">
                        <ThemifyIcon icon="arrow-circle-right" />
                        <h1 class="ml-2 font-bold uppercase">Category & Dish</h1>
                    </div>
                    <router-link to="/dashboard/food/category">
                        <div class="flex items-center w-full pl-6 transition-all">
                            <ThemifyIcon icon="bar-chart" />
                            <li class="p-1 pl-2">Categories</li>
                        </div>
                    </router-link>
                    <router-link to="/dashboard/food/dish">
                        <div class="flex items-center w-full pl-6 transition-all">
                            <ThemifyIcon icon="money" />
                            <li class="p-1 pl-2">Dishes</li>
                        </div>
                    </router-link>
                </ul>
            </div>
            <div v-if="accessToken && payload" class="logout-btn py-2 hover:bg-red-500 transition-all bg-red-400 flex justify-center items-center cursor-pointer" v-on:click="handleSignOut">
                <ThemifyIcon icon="power-off" />
                <button class="ml-4">Logout</button>
            </div>
        </div>
        <div class="w-full p-6 main-content-men" v-else>
            <h1 class="text-2xl text-center">Welcome</h1>
            <div class="menu-list mt-8">
                <ul class="mb-3">
                    <div class="flex items-center mb-1 text-white">
                        <ThemifyIcon icon="arrow-circle-right" />
                        <h1 class="ml-2 font-bold uppercase">Category</h1>
                    </div>
                    <router-link :to="'/client/table/' + $route.params.tableId + '/' + cateItem.category.categoryId" class="category-item" v-for="(cateItem, i) in menuList" :key="i">
                        <div class="flex items-center w-full pl-6 transition-all">
                            <ThemifyIcon icon="server" />
                            <p class="p-1 pl-2">{{ cateItem.category.name }}</p>
                        </div>
                    </router-link>
                </ul>
                <hr class="my-4 opacity-50" />
                <ul class="mb-3">
                    <div class="flex items-center mb-1 text-white">
                        <ThemifyIcon icon="arrow-circle-right" />
                        <h1 class="ml-2 font-bold uppercase">Order</h1>
                    </div>
                    <router-link :to="'/client/table/' + $route.params.tableId + '/order-session'" class="category-item">
                        <div class="flex items-center w-full pl-6 transition-all">
                            <ThemifyIcon icon="server" />
                            <li class="p-1 pl-2">Order Section</li>
                        </div>
                    </router-link>
                </ul>
                <hr class="my-4 opacity-50" />
            </div>
        </div>
    </div>
</template>

<script>
import ThemifyIcon from "vue-themify-icons/ThemifyIcon.vue";
import { mapState } from "vuex";

export default {
    props: { menu: Array },
    methods: {
        handleSignOut() {
            localStorage.removeItem("x-access-token");
            localStorage.removeItem("payload");
            this.$store.commit("set_access_token", null);
            this.$store.commit("set_payload", null);
            this.$router.push("/login");
        },
        handleGetIndex(index) {
            this.$store.commit("set_menuIndex", index + 1);
        },
    },
    components: { ThemifyIcon },
    computed: {
        ...mapState(["accessToken", "payload", "tableData", "menuIndex", "menuList"]),
    },
};
</script>

<style scope>
.main-content-menu {
    height: 100%;
    overflow: hidden scroll;
    padding-bottom: 10.5rem;
}
.left-menu {
    position: fixed;
    width: 300px;
    top: 0;
    bottom: 0;
    background: #797cbd;
    color: white;
    box-shadow: 8px 0 10px 0 #0000001f;
    z-index: 10;
}
.left-menu-header {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 80px;
    background: #458b69;
    color: #79bda1;
}
a.is-active div {
    background: white;
    color: black;
    border-radius: 100px;
}
.category-item:hover {
    cursor: pointer;
    background: #bdaed181;
}
.logout-btn {
    width: 85%;
    position: absolute;
    font-size: 20px;
    border-radius: 100px;
    bottom: 40px;
}
</style>
