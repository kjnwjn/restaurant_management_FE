<template>
    <main>
        <Loading :active="isLoading" :is-full-page="true" :can-cancel="false" />
        <div class="flex items-center mb-4 text-green-700 font-bold text-lg uppercase">
            <ThemifyIcon icon="menu" />
            <h1 class="ml-2">Out of stock</h1>
        </div>
        <div class="mb-8">
            <div class="mb-2 text-md font-medium text-gray-900 flex items-center">
                <ThemifyIcon icon="settings" />
                <p class="ml-2">Export out of stock into excel:</p>
            </div>
            <div
                v-on:click="exportHandler()"
                class="flex justify-center items-center transition-all text-white w-80 py-2 text-center rounded"
                :class="{
                    'bg-blue-400 hover:bg-blue-500 cursor-pointer': productsData.length > 0,
                    'bg-gray-400 ': productsData.length <= 0,
                }"
            >
                <ThemifyIcon icon="export" />
                <button class="ml-2" :disabled="productsData.length <= 0">Export</button>
            </div>
        </div>
        <div class="mb-2 text-md font-medium text-gray-900 flex items-center">
            <ThemifyIcon icon="settings" />
            <p class="ml-2">Out of stock data list:</p>
        </div>
        <div class="overflow-x-auto relative">
            <table class="overflow-scroll w-full text-sm text-left text-gray-500 dark:text-gray-400 mb-4">
                <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" class="py-3 px-6">Barcode</th>
                        <th scope="col" class="py-3 px-6">Product name</th>
                        <th scope="col" class="py-3 px-6">Supplier</th>
                        <th scope="col" class="py-3 px-6">Quantity</th>
                        <th scope="col" class="py-3 px-6">Unit cost</th>
                        <th scope="col" class="py-3 px-6">Last modified</th>
                    </tr>
                </thead>
                <tbody v-if="productsData && productsData.length > 0">
                    <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700" v-for="(product, i) in productsData" :key="i">
                        <th scope="row" class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            {{ product.barcode }}
                        </th>
                        <td class="py-4 px-6">{{ product.productName }}</td>
                        <td class="py-4 px-6">{{ product.supplierName }}</td>
                        <td class="py-4 px-6">{{ product.quantity }}</td>
                        <td class="py-4 px-6">{{ priceFormat(product.unitCost) }}</td>
                        <td class="py-4 px-6">{{ dateFormat(product.updatedAt) }}</td>
                    </tr>
                </tbody>
            </table>
            <div v-if="productsData && productsData.length <= 0" class="flex w-full justify-center p-8">
                <h1 class="">Empty list, there is no data!</h1>
            </div>
        </div>
    </main>
</template>

<script>
import axios from "axios";
import { mapState } from "vuex";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
import priceFormat from "../../helpers/priceFormat";
import dateFormat from "../../helpers/dateFormat";

export default {
    data() {
        return {
            isLoading: false,
            productsData: [],
        };
    },
    async mounted() {
        this.fetchData();
    },
    methods: {
        priceFormat,
        dateFormat,
        pagePagination(page) {
            this.$router.push(`/dashboard/product/get-out-of-stock?page=${page}`);
            this.fetchData();
        },
        async fetchData(page = 1) {
            this.isLoading = true;
            let pageSelect = this.$route.query ? parseInt(this.$route.query.page) : page;
            await axios.get(`${process.env.VUE_APP_API_URL}/product/get-out-of-stock?page=${pageSelect}&token=${this.accessToken}`).then((res) => {
                if (res.data.status) {
                    this.productsData = res.data.result.data;
                } else {
                    this.productsData = [];
                }
            });
            this.isLoading = false;
        },
        async exportHandler() {
            const requestID = Date.now();
            await axios({
                url: `${process.env.VUE_APP_API_URL}/product/out-of-stock/export?requestID=${requestID}&token=${this.accessToken}`,
                method: "GET",
                responseType: "blob",
            }).then((response) => {
                const fileURL = window.URL.createObjectURL(new Blob([response.data]));
                const fileLink = document.createElement("a");
                fileLink.href = fileURL;
                const fileName = `out-of-stock.xlsx`;
                fileLink.setAttribute("download", fileName);
                fileLink.setAttribute("target", "_blank");
                document.body.appendChild(fileLink);
                fileLink.click();
                fileLink.remove();
            });
        },
    },
    computed: { ...mapState(["accessToken", "payload", "toastify"]) },
    components: { Loading },
};
</script>

<style></style>
