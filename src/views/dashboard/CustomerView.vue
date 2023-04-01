<template>
    <main>
        <Loading :active="isLoading" :is-full-page="true" :can-cancel="false" />
        <div class="flex items-center mb-4 text-green-700 font-bold text-lg uppercase">
            <ThemifyIcon icon="menu" />
            <h1 class="ml-2">Customer system</h1>
        </div>
        <div class="flex items-center mb-6">
            <input v-model="customerIDToSearch" class="w-full px-3 py-2 border" type="text" placeholder="Enter customer ID for searching..." />
            <button
                v-on:click="customerSearchingHandler"
                class="text-white px-4 py-2 rounded-md ml-4 transition-all"
                :class="{
                    'bg-blue-400 hover:bg-blue-500 cursor-pointer': customerIDToSearch,
                    'bg-gray-400 cursor-default': !customerIDToSearch,
                }"
            >
                Search
            </button>
        </div>
        <div class="grid grid-cols-3">
            <div class="col-span-2">
                <div class="overflow-x-auto relative">
                    <table class="overflow-scroll w-full text-sm text-left text-gray-500 dark:text-gray-400 mb-4">
                        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" class="py-3 px-6">Customer ID</th>
                                <th scope="col" class="py-3 px-6">Fullname</th>
                                <th scope="col" class="py-3 px-6">Point</th>
                                <th scope="col" class="py-3 px-6">Created at</th>
                                <th scope="col" class="py-3 px-6">Last modified</th>
                            </tr>
                        </thead>
                        <tbody v-if="customerList.length > 0">
                            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700" v-for="(customer, i) in customerList" :key="i">
                                <th scope="row" class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">{{ customer.customerID }}</th>
                                <td class="py-4 px-6">{{ customer.fullName }}</td>
                                <td class="py-4 px-6">{{ customer.point }}</td>
                                <td class="py-4 px-6">{{ dateFormat(customer.createdAt) }}</td>
                                <td class="py-4 px-6">{{ dateFormat(customer.updatedAt) }}</td>
                            </tr>
                        </tbody>
                    </table>
                    <div v-if="customerList.length <= 0" class="flex w-full justify-center p-8">
                        <h1 class="">Empty list, there is no data!</h1>
                    </div>
                </div>
            </div>
            <div class="px-4">
                <div class="mb-4 flex items-center text-green-900 font-bold text-xl">
                    <ThemifyIcon icon="settings" />
                    <h1 class="ml-2">Create new customer</h1>
                </div>
                <div class="mb-6">
                    <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Phone number</label>
                    <input
                        v-model="customer.customerID"
                        type="tel"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        placeholder="0123-456-789"
                        pattern="[0-9]{4}-[0-9]{3}-[0-9]{3}"
                    />
                </div>
                <div class="mb-6">
                    <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Full name</label>
                    <input
                        v-model="customer.fullName"
                        type="text"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        placeholder="Mr.Jone"
                    />
                </div>
                <div class="mb-6">
                    <button
                        v-on:click="newCustomerHandler"
                        class="py-3 w-full text-white rounded-md uppercase transition-all"
                        :class="{
                            'bg-blue-400 hover:bg-blue-500 cursor-pointer': customer.customerID && customer.fullName,
                            'bg-gray-400 cursor-default': !customer.customerID || !customer.fullName,
                        }"
                    >
                        New Customer
                    </button>
                </div>
            </div>
        </div>
    </main>
</template>

<script>
import axios from "axios";
import { mapState } from "vuex";
import dateFormat from "../../helpers/dateFormat";
import ThemifyIcon from "vue-themify-icons/ThemifyIcon.vue";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";

export default {
    data() {
        return {
            isLoading: true,
            customerList: [],
            customer: {
                customerID: null,
                fullName: null,
            },
            customerIDToSearch: null,
        };
    },
    mounted() {
        this.fetchData();
    },
    methods: {
        dateFormat,
        async fetchData() {
            this.isLoading = true;
            await axios.get(`${process.env.VUE_APP_API_URL}/customer/get-all?token=${this.accessToken}`).then((res) => {
                if (res.data.status) {
                    this.customerList = res.data.data;
                }
            });
            this.isLoading = false;
        },
        async newCustomerHandler() {
            this.isLoading = true;
            await axios
                .post(`${process.env.VUE_APP_API_URL}/customer/new?token=${this.accessToken}`, {
                    customerID: this.customer.customerID,
                    fullName: this.customer.fullName,
                })
                .then((res) => {
                    if (res.data.status) {
                        this.toastify.success(res.data.msg.en);
                        this.customer = { customerID: null, fullName: null };
                    } else {
                        this.toastify.error(res.data.msg.en);
                    }
                });
            this.fetchData();
            this.isLoading = false;
        },
        async customerSearchingHandler() {
            await axios.get(`${process.env.VUE_APP_API_URL}/customer/detail?customerID=${this.customerIDToSearch}&token=${this.accessToken}`).then((res) => {
                if (res.data.status) {
                    this.toastify.success(res.data.msg.en);
                    this.customerList = [res.data.data];
                } else {
                    this.toastify.error(res.data.msg.en);
                }
            });
        },
    },
    components: { ThemifyIcon, Loading },
    computed: {
        ...mapState(["accessToken", "payload", "toastify"]),
    },
};
</script>

<style></style>
