<template>
    <div>
        <div class="flex flex-col items-center justify-center h-screen">
            <a href="/home" class="flex items-center mb-6 text-2xl font-semibold text-gray-900">
                <img class="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo" />
                Store Sytem
            </a>
            <div class="w-full max-w-md bg-gray-100 rounded-lg shadow p-6">
                <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 mb-6">Sign in to your account</h1>
                <form class="space-y-4 md:space-y-6" v-on:submit="handleSubmit">
                    <div>
                        <label for="email" class="block mb-2 text-sm font-medium text-gray-900">Your user account</label>
                        <input
                            v-model="userCode"
                            name="email"
                            id="email"
                            class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-50 border-gray-600 placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="User account"
                            required=""
                        />
                    </div>
                    <div>
                        <label for="password" class="block mb-2 text-sm font-medium text-gray-900">Password</label>
                        <input
                            v-model="password"
                            type="password"
                            name="password"
                            id="password"
                            placeholder="••••••••"
                            class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-50 border-gray-600 placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500"
                            required=""
                        />
                    </div>
                    <button
                        type="submit"
                        class="w-full bg-indigo-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-primary-600 hover:bg-primary-700 focus:ring-primary-800"
                    >
                        Sign in
                    </button>
                    <p class="text-sm font-light text-gray-500 text-gray-400">Welcome to login to the system!</p>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";
import router from "@/router";

export default {
    components: {},
    data() {
        return {
            userCode: "",
            password: "",
        };
    },

    methods: {
        handleSubmit(e) {
            e.preventDefault();
            axios
                .post(`${process.env.VUE_APP_API_URL}/account/login`, { userCode: this.userCode, password: this.password })
                .then((res) => {
                    if (!res.data.status) {
                        this.$store.state.toastify.error(res.data.msg.en);
                    } else {
                        this.$store.state.toastify.success(res.data.msg.en);
                        localStorage.setItem("x-access-token", JSON.stringify(res.data.data.token));
                        localStorage.setItem("payload", JSON.stringify(res.data.data.payload));
                        this.$store.commit("set_access_token", res.data.data.token);
                        this.$store.commit("set_payload", res.data.data.payload);
                        this.$store.commit("set_tableData", null);
                        if (res.data.data.payload.role != "CHEF") {
                            router.push("/");
                        } else {
                            router.push("/dashboard/pendingOrder");
                        }
                    }
                })
                .catch((err) => {
                    if (!err.response?.data.msg.en) return this.$store.state.toastify.error(err.message);
                    this.$store.state.toastify.error(err.response.data.msg.en);
                });
        },
    },
};
</script>
