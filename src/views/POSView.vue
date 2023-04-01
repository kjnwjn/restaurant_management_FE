<template>
    <main>
        <Loading :active="isLoading" :is-full-page="true" :can-cancel="false" />
        <div
            class="py-2 bg-green-400 rounded-full text-white text-center mb-9 font-bold text-lg cursor-pointer hover:bg-green-500 transition-all"
            v-on:click="newTransactionHandler"
        >
            <ThemifyIcon icon="shopping-cart" />
            <button class="ml-3">Create New Transaction</button>
        </div>
        <div class="mb-6">
            <bar-chart
                :height="100"
                :chart-options="{ responsive: true }"
                :chart-data="{
                    labels: [
                        dateFormatV2(weekSalesData.data.day2.dateTime),
                        dateFormatV2(weekSalesData.data.day3.dateTime),
                        dateFormatV2(weekSalesData.data.day4.dateTime),
                        dateFormatV2(weekSalesData.data.day5.dateTime),
                        dateFormatV2(weekSalesData.data.day6.dateTime),
                        dateFormatV2(weekSalesData.data.day7.dateTime),
                        dateFormatV2(weekSalesData.data.today.dateTime),
                    ],
                    datasets: [
                        {
                            label: 'Top week sales',
                            backgroundColor: '#468b69',
                            data: [
                                weekSalesData.data.day2.daySale,
                                weekSalesData.data.day3.daySale,
                                weekSalesData.data.day4.daySale,
                                weekSalesData.data.day5.daySale,
                                weekSalesData.data.day6.daySale,
                                weekSalesData.data.day7.daySale,
                                weekSalesData.data.today.daySale,
                            ],
                        },
                    ],
                }"
            ></bar-chart>
        </div>
        <div class="mb-4 flex items-center justify-center text-gray-900">
            <div class="text-center">
                <h1 class="font-bold">Total: {{ priceFormat(weekSalesData.weekSaleTotal) }}</h1>
                <h1>Sales data in a week (From {{ dateFormatV2(weekSalesData.data.day2.dateTime) }} to {{ dateFormatV2(weekSalesData.data.today.dateTime) }})</h1>
            </div>
        </div>
        <div class="mb-4 flex items-center text-green-900 font-bold text-xl">
            <ThemifyIcon icon="settings" />
            <h1 class="ml-2">List of transactions:</h1>
        </div>
        <div class="overflow-x-auto relative">
            <table class="overflow-scroll w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" class="py-3 px-6">Transaction ID</th>
                        <th scope="col" class="py-3 px-6">Cashier</th>
                        <th scope="col" class="py-3 px-6">Status</th>
                        <th scope="col" class="py-3 px-6">Customer</th>
                        <th scope="col" class="py-3 px-6">Total price</th>
                        <th scope="col" class="py-3 px-6">Created at</th>
                        <th scope="col" class="py-3 px-6">Last modified</th>
                    </tr>
                </thead>
                <tbody v-if="transactionList">
                    <tr
                        class="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                        v-for="(transaction, i) in transactionList"
                        :key="i"
                        :class="{ 'bg-pink-100': !transaction.payStatus }"
                    >
                        <router-link :to="'/transaction/' + transaction.transactionID">
                            <th scope="row" class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                {{ transaction.transactionID }}
                            </th>
                        </router-link>
                        <td class="py-4 px-6">{{ transaction.cashierCode }}</td>
                        <td class="py-4 px-6">
                            <div class="flex items-center">
                                <div class="h-2.5 w-2.5 rounded-full mr-2" :class="{ 'bg-green-400': transaction.payStatus, 'bg-red-400': !transaction.payStatus }"></div>
                                {{ transaction.payStatus ? "Paid" : "Un-paid" }}
                            </div>
                        </td>
                        <td class="py-4 px-6">{{ transaction.customerID ? transaction.customerID : "Unknown" }}</td>
                        <td class="py-4 px-6">{{ priceFormat(transaction.totalPrice) }}</td>
                        <td class="py-4 px-6">{{ dateFormat(transaction.createdAt) }}</td>
                        <td class="py-4 px-6">{{ dateFormat(transaction.updatedAt) }}</td>
                    </tr>
                </tbody>
            </table>
            <div v-if="transactionList && transactionList.length <= 0" class="flex w-full justify-center p-8">
                <h1 class="">Empty list, there is no data!</h1>
            </div>
        </div>
    </main>
</template>

<script>
import axios from "axios";
import { mapState } from "vuex";
import ThemifyIcon from "vue-themify-icons/ThemifyIcon.vue";
import dateFormat from "@/helpers/dateFormat";
import dateFormatV2 from "../helpers/dateFormatV2";
import priceFormat from "../helpers/priceFormat";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
import { Bar as BarChart } from "vue-chartjs/legacy";
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from "chart.js";
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

export default {
    name: "POSView",
    data() {
        return {
            isLoading: false,
            transactionList: null,
            weekSalesData: null,
        };
    },
    async mounted() {
        this.isLoading = true;
        await axios.get(`${process.env.VUE_APP_API_URL}/transaction/get-all?token=${this.accessToken}`).then((res) => {
            if (res.data.status && res.data.data) {
                this.transactionList = res.data.data;
            }
        });
        await axios.get(`${process.env.VUE_APP_API_URL}/transaction/top-week?token=${this.accessToken}`).then((res) => {
            this.weekSalesData = res.data.result;
        });
        this.isLoading = false;
    },
    methods: {
        dateFormat,
        priceFormat,
        dateFormatV2,
        async newTransactionHandler() {
            this.isLoading = true;
            await axios.post(`${process.env.VUE_APP_API_URL}/transaction/new?token=${this.accessToken}`).then((res) => {
                if (res.data.status) {
                    this.toastify.success(res.data.msg.en);
                    this.$router.push(`/transaction/${res.data.transaction.transactionID}`);
                } else {
                    this.toastify.error(res.data.msg.en);
                }
            });
            this.isLoading = false;
        },
    },
    components: { ThemifyIcon, Loading, BarChart },
    computed: {
        ...mapState(["accessToken", "toastify"]),
    },
};
</script>

<style scoped></style>
