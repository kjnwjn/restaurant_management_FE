<template>
    <section class="bg-white dark:bg-gray-900">
        <div class="left-menu hidden" >
            <div class="flex text-white justify-center items-center p-4" style="background: rgb(71 69 139)">
                <img src="@/assets/logo.png" width="25px" />
                <h1 class="font-bold text-2xl uppercase ml-4">Store System</h1>
            </div>
            <div class="w-full p-6 main-content-menu">
                <h1 class="text-2xl text-center">{{ payload ? `Hi, ${payload.fullName}` : "Welcome!" }}</h1>
                <div class="menu-list mt-8" v-if="payload && accessToken">
                    <ul class="mb-3">
                        <div class="flex items-center mb-1 text-white">
                            <ThemifyIcon icon="arrow-circle-right" />
                            <h1 class="ml-2 font-bold uppercase">Point of Sale</h1>
                        </div>
                        <router-link to="/dashboard/order">
                            <div class="flex items-center w-full pl-6 transition-all">
                                <ThemifyIcon icon="server" />
                                <li class="p-1 pl-2">Order</li>
                            </div>
                        </router-link>
                        <router-link to="/attendance">
                            <div class="flex items-center w-full pl-6 transition-all">
                                <ThemifyIcon icon="timer" />
                                <li class="p-1 pl-2">Attendance</li>
                            </div>
                        </router-link>
                        <router-link to="/customer">
                            <div class="flex items-center w-full pl-6 transition-all">
                                <ThemifyIcon icon="face-smile" />
                                <li class="p-1 pl-2">Customer</li>
                            </div>
                        </router-link>
                    </ul>
                    <hr class="my-4 opacity-50" />
                    <div v-if="payload.role === 'ADMIN' || payload.role === 'MANAGER'">
                        <ul class="mb-3">
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
                            <router-link to="/dashboard/account/register" v-if="payload.role == 'ADMIN'">
                                <div class="flex items-center w-full pl-6 transition-all">
                                    <ThemifyIcon icon="plus" />
                                    <li class="p-1 pl-2">Create</li>
                                </div>
                            </router-link>
                        </ul>
                        <hr class="my-4 opacity-50" />
                        <ul class="mb-3">
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
                        <ul class="mb-3" v-if="payload.role == 'ADMIN'">
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
                </div>
                <div
                    v-if="accessToken && payload"
                    class="logout-btn py-2 hover:bg-red-500 transition-all bg-red-400 flex justify-center items-center cursor-pointer"
                    v-on:click="handleSignOut"
                >
                    <ThemifyIcon icon="power-off" />
                    <button class="ml-4">Logout</button>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
// import axios from "axios";
// import router from "@/router";
export default {
    data() {
        return {
            userCode: "",
            password: "",
        };
    },
    methods: {
        // handleSubmit(e) {
        //     e.preventDefault();
        //     axios
        //         .post(`${process.env.VUE_APP_API_URL}/account/login`, { userCode: this.userCode, password: this.password })
        //         .then((res) => {
        //             console.log(res);
        //             if (!res.data.status) {
        //                 this.$store.state.toastify.error(res.data.msg.en);
        //             } else {
        //                 this.$store.state.toastify.success(res.data.msg.en);
        //                 localStorage.setItem("x-access-token", JSON.stringify(res.data.data.token));
        //                 localStorage.setItem("payload", JSON.stringify(res.data.data.payload));
        //                 this.$store.commit("set_access_token", res.data.data.token);
        //                 this.$store.commit("set_payload", res.data.data.payload);
        //                 router.push("/");
        //             }
        //         })
        //         .catch((err) => {
        //             if (!err.response?.data.msg.en) return this.$store.state.toastify.error(err.message);
        //             this.$store.state.toastify.error(err.response.data.msg.en);
        //         });
        // },
    },
};
</script>
