<template>
    <div>
        <DashboardMenu />
        <main class="main-container">
            <Loading :active="isLoading" :is-full-page="true" :can-cancel="false" />
            <div class="flex items-center mb-4 text-green-700 font-bold text-lg uppercase">
                <ThemifyIcon icon="menu" />
                <h1 class="ml-2">Accounts list</h1>
            </div>
            <div class="flex items-center mb-4 text-gray-700 font-bold uppercase">
                <h1 class="ml-2">Total accounts: {{ totalAccounts }}</h1>
            </div>
            <div class="overflow-x-auto relative">
                <table class="overflow-scroll w-full text-sm text-left text-gray-500 text-gray-400">
                    <thead class="text-xs text-gray-700 uppercase bg-gray-50 text-gray-400">
                        <tr>
                            <th scope="col" class="py-3 px-6">User code</th>
                            <th scope="col" class="py-3 px-6">Full name</th>
                            <th scope="col" class="py-3 px-6">Role</th>
                            <th scope="col" class="py-3 px-6">Created At</th>
                            <th scope="col" class="py-3 px-6">Last modified</th>
                            <th scope="col" class="py-3 px-6" v-if="payload.role == 'ADMIN'">Action</th>
                        </tr>
                    </thead>
                    <tbody v-if="accountList && accountList.length > 0">
                        <tr class="bg-white border-b bg-gray-800 border-gray-700" v-for="(account, i) in accountList" :key="i">
                            <th scope="row" class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap">
                                {{ account.userCode }}
                            </th>
                            <td class="py-4 px-6">{{ account.fullName }}</td>
                            <td class="py-4 px-6">{{ account.role }}</td>
                            <td class="py-4 px-6">{{ dateFormat(account.createdAt) }}</td>
                            <td class="py-4 px-6">{{ dateFormat(account.updatedAt) }}</td>
                            <td class="py-4 px-6" v-on:click="accountRemoveHandler(account.userCode)" v-if="payload.role == 'ADMIN'">
                                <div class="text-red-500 cursor-pointer"><ThemifyIcon icon="trash" />Delete</div>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div v-if="!accountList" class="flex w-full justify-center p-8">
                    <h1 class="">Empty list, there is no data!</h1>
                </div>
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
import dateFormat from "@/helpers/dateFormat";
import DashboardMenu from "@/components/DashboardMenu.vue";

export default {
    data() {
        return {
            isLoading: true,
            accountList: null,
            totalAccounts: 0,
        };
    },
    async mounted() {
        this.fetchData();
    },
    methods: {
        dateFormat,
        async fetchData() {
            this.isLoading = true;
            await axios
                .get(`${process.env.VUE_APP_API_URL}/account/get-all-account?token=${this.accessToken}`)
                .then((res) => {
                    console.log(res);
                    if (res.data.status) {
                        this.accountList = res.data.data.listUsers;
                        this.totalAccounts = res.data.data.listUsers.length;
                    }
                })
                .catch(() => {
                    this.accountList = null;
                });
            this.isLoading = false;
        },
        async accountRemoveHandler(userCode) {
            this.isLoading = true;
            await axios
                .delete(`${process.env.VUE_APP_API_URL}/account/${userCode}?token=${this.accessToken}`)
                .then((res) => {
                    if (res.data.status) {
                        this.toastify.success(res.data.msg.en);
                    } else {
                        this.toastify.error(res.data.msg.en);
                    }
                })
                .catch((err) => {
                    this.toastify.error(err.response.data.msg.en);
                });
            this.fetchData();
            this.isLoading = false;
        },
    },
    computed: { ...mapState(["accessToken", "payload", "toastify"]) },
    components: { ThemifyIcon, Loading, DashboardMenu },
};
</script>

<style></style>
