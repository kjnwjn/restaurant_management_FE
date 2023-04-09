<template>
    <div>
        <DashboardMenu />
        <main class="main-container">
            <Loading :active="isLoading" :is-full-page="true" :can-cancel="false" />
            <div class="flex items-center mb-4 text-green-700 font-bold text-lg uppercase">
                <ThemifyIcon icon="menu" />
                <h1 class="ml-2">Create new account</h1>
            </div>

            <div>
                <div class="mb-2 text-md font-medium text-gray-900 flex items-center">
                    <ThemifyIcon icon="settings" />
                    <p class="ml-2">Insert new product manually:</p>
                </div>
                <div class="grid gap-6 mb-6 md:grid-cols-2">
                    <div>
                        <label class="block mb-2 text-sm font-medium text-gray-900 text-gray-300">Full name</label>
                        <input v-model="fullName" type="text" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Fullname" required="" />
                    </div>
                    <div>
                        <label class="block mb-2 text-sm font-medium text-gray-900 text-gray-300">Role</label>
                        <select v-model="role" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5">
                            <option value="CHEF" selected>CHEF</option>
                            <option value="STAFF" selected>STAFF</option>
                            <option value="MANAGER">MANAGER</option>
                        </select>
                    </div>
                </div>
                <div class="mb-6">
                    <div>
                        <label class="block mb-2 text-sm font-medium text-gray-900 text-gray-300">Password</label>
                        <input v-model="password" type="password" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Password" required="" />
                    </div>
                </div>
                <button type="submit" v-on:click="registerAccountHandler" class="text-white transition-all bg-blue-400 hover:bg-blue-500 focus:outline-none font-medium rounded-lg text-sm w-full sm:w-auto px-8 py-2.5 text-center">Submit</button>
            </div>
        </main>
    </div>
</template>

<script>
import axios from "axios";
import ThemifyIcon from "vue-themify-icons/ThemifyIcon.vue";
import { mapState } from "vuex";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
import DashboardMenu from "@/components/DashboardMenu.vue";

export default {
    components: { ThemifyIcon, Loading, DashboardMenu },
    data() {
        return {
            isLoading: false,
            fullName: "",
            password: "",
            role: "STAFF",
        };
    },
    methods: {
        async registerAccountHandler() {
            this.isLoading = true;
            await axios
                .post(`${process.env.VUE_APP_API_URL}/account/new-account?token=${this.accessToken}`, {
                    fullName: this.fullName,
                    password: this.password,
                    role: this.role,
                })
                .then((res) => {
                    if (res.data.status) {
                        this.toastify.success(res.data.msg.en);
                        this.fullName = null;
                        this.role = null;
                    } else {
                        this.toastify.error(res.data.msg.en);
                    }
                })
                .catch((err) => {
                    this.toastify.error(err.response.data.msg.en);
                });
            this.isLoading = false;
        },
    },
    computed: { ...mapState(["accessToken", "payload", "toastify"]) },
};
</script>
