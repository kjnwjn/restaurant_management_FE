<template>
    <main>
        <Loading :active="isLoading" :is-full-page="true" :can-cancel="false" />
        <div class="flex items-center mb-4 text-green-700 font-bold text-lg uppercase">
            <ThemifyIcon icon="menu" />
            <h1 class="ml-2">Finance Sales</h1>
        </div>
        <div class="grid grid-cols-3">
            <div class="col-span-2">
                <div class="overflow-x-auto relative">
                    <table class="overflow-scroll w-full text-sm text-left text-gray-500 dark:text-gray-400 mb-4">
                        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" class="py-3 px-6">ID</th>
                                <th scope="col" class="py-3 px-6">Sale date</th>
                                <th scope="col" class="py-3 px-6">Cash</th>
                                <th scope="col" class="py-3 px-6">Products</th>
                                <th scope="col" class="py-3 px-6">Price</th>
                            </tr>
                        </thead>
                        <tbody v-if="dataList.length > 0">
                            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700" v-for="(element, i) in dataList" :key="i">
                                <th scope="row" class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {{ element.id }}
                                </th>
                                <td class="py-4 px-6">{{ element.dateString }}</td>
                                <td class="py-4 px-6">{{ priceFormat(element.cash) }}</td>
                                <td class="py-4 px-6">{{ element.totalProduct }}</td>
                                <td class="py-4 px-6">{{ priceFormat(element.totalPrice) }}</td>
                            </tr>
                            <tr class="font-bold bg-gray-50 text-black">
                                <th colspan="4" class="py-4 px-6">Total sales:</th>
                                <td class="py-4 px-6">{{ totalSale }}</td>
                            </tr>
                        </tbody>
                    </table>
                    <div v-if="dataList.length <= 0" class="flex w-full justify-center p-8">
                        <h1 class="">Empty list, there is no data!</h1>
                    </div>
                </div>
            </div>
            <div class="px-2">
                <div class="mb-8">
                    <div class="mb-4 flex items-center text-green-900 font-bold text-md">
                        <ThemifyIcon icon="settings" />
                        <h1 class="ml-2">Select the start and the end date for detail:</h1>
                    </div>
                    <div class="grid grid-cols-2 bg-gray-200 rounded-md mt-5">
                        <div class="flex flex-col p-4">
                            <label class="mb-2 font-bold">Date Start:</label>
                            <input v-model="startDate" type="date" class="px-3 py-2 rounded-sm focus:outline-none" placeholder="dd-mm-yyyy" />
                        </div>
                        <div class="flex flex-col p-4">
                            <label class="mb-2 font-bold">Date End:</label>
                            <input v-model="endDate" type="date" class="px-3 py-2 rounded-sm focus:outline-none" placeholder="dd-mm-yyyy" />
                        </div>
                    </div>
                    <button
                        v-on:click="visualizeHandler"
                        class="text-white py-2 w-full my-4 rounded-md transition-all"
                        :class="{ 'bg-blue-400 hover:bg-blue-500 cursor-pointer': startDate && endDate, 'bg-gray-400 cursor-default': !startDate || !endDate }"
                    >
                        Confirm
                    </button>
                </div>
                <div class="mb-8" v-if="dataList.length > 0">
                    <div class="mb-4 text-md font-medium text-gray-900 flex items-center">
                        <ThemifyIcon icon="settings" />
                        <p class="ml-2">Export to excel file:</p>
                    </div>
                    <div
                        v-on:click="exportHandler"
                        class="flex justify-center items-center transition-all text-white w-full py-2 text-center rounded bg-blue-400 hover:bg-blue-500 cursor-pointer"
                    >
                        <ThemifyIcon icon="export" />
                        <button class="ml-2">Export</button>
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>

<script>
import axios from "axios";
import { mapState } from "vuex";
import dateFormat from "@/helpers/dateFormat";
import priceFormat from "../../helpers/priceFormat";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";

export default {
    data() {
        return {
            isLoading: false,
            startDate: null,
            endDate: null,
            dataList: [],
            totalSale: this.priceFormat(0),
        };
    },
    methods: {
        dateFormat,
        priceFormat,
        async visualizeHandler() {
            if (this.startDate && this.endDate) {
                this.isLoading = true;
                const dayFrom = this.startDate.split("-")[2];
                const monthFrom = this.startDate.split("-")[1];
                const yearFrom = this.startDate.split("-")[0];
                const dayTo = this.endDate.split("-")[2];
                const monthTo = this.endDate.split("-")[1];
                const yearTo = this.endDate.split("-")[0];
                const dateFrom = `${dayFrom}/${monthFrom}/${yearFrom}`;
                const dateTo = `${dayTo}/${monthTo}/${yearTo}`;
                await axios.get(`${process.env.VUE_APP_API_URL}/transaction/visualize/?dateFrom=${dateFrom}&dateTo=${dateTo}&token=${this.accessToken}`).then((res) => {
                    if (res.data.status && res.data.result.data.length > 0) {
                        this.dataList = res.data.result.data;
                        this.totalSale = this.priceFormat(res.data.result.totalSale);
                    }
                });
                this.isLoading = false;
            }
        },
        async exportHandler() {
            const dayFrom = this.startDate.split("-")[2];
            const monthFrom = this.startDate.split("-")[1];
            const yearFrom = this.startDate.split("-")[0];
            const dayTo = this.endDate.split("-")[2];
            const monthTo = this.endDate.split("-")[1];
            const yearTo = this.endDate.split("-")[0];
            const dateFrom = `${dayFrom}/${monthFrom}/${yearFrom}`;
            const dateTo = `${dayTo}/${monthTo}/${yearTo}`;
            await axios({
                url: `${process.env.VUE_APP_API_URL}/transaction/visualize/export?dateFrom=${dateFrom}&dateTo=${dateTo}&token=${this.accessToken}`,
                method: "GET",
                responseType: "blob",
            }).then((response) => {
                const fileURL = window.URL.createObjectURL(new Blob([response.data]));
                const fileLink = document.createElement("a");
                fileLink.href = fileURL;
                const fileName = `finance-sales-reports-${dateFrom}-${dateTo}-${Date.now()}.xlsx`;
                fileLink.setAttribute("download", fileName);
                fileLink.setAttribute("target", "_blank");
                document.body.appendChild(fileLink);
                fileLink.click();
                fileLink.remove();
            });
        },
    },
    computed: {
        ...mapState(["accessToken", "payload", "toastify"]),
    },
    components: { Loading },
};
</script>
