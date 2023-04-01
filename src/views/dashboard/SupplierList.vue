<template>
    <main>
        <Loading :active="isLoading" :is-full-page="true" :can-cancel="false" />
        <div class="flex items-center mb-4 text-green-700 font-bold text-lg uppercase">
            <ThemifyIcon icon="menu" />
            <h1 class="ml-2">List of all suppliers:</h1>
        </div>
        <div class="flex items-center mb-4 text-gray-700 font-bold text-md uppercase">
            <h1 class="ml-2">Total suppliers: {{ totalSuppliers }}</h1>
        </div>
        <div class="overflow-x-auto relative">
            <table class="overflow-scroll w-full text-sm text-left text-gray-500 dark:text-gray-400 mb-4">
                <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" class="py-3 px-6">Supplier code</th>
                        <th scope="col" class="py-3 px-6">Supplier name</th>
                        <th scope="col" class="py-3 px-6">Phone number</th>
                        <th scope="col" class="py-3 px-6">Address</th>
                        <th scope="col" class="py-3 px-6">Products amount</th>
                        <th scope="col" class="py-3 px-6">Co.operation date</th>
                        <th scope="col" class="py-3 px-6">Last modified</th>
                        <th scope="col" class="py-3 px-6">Action</th>
                    </tr>
                </thead>
                <tbody v-if="supplierList.length > 0">
                    <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700" v-for="(data, i) in supplierList" :key="i">
                        <th scope="row" class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            {{ data.supplier.supplierCode }}
                        </th>
                        <td class="py-4 px-6">{{ data.supplier.supplierName }}</td>
                        <td class="py-4 px-6">{{ data.supplier.phoneNumer }}</td>
                        <td class="py-4 px-6">{{ data.supplier.address }}</td>
                        <td class="py-4 px-6">{{ data.productRefs.total }}</td>
                        <td class="py-4 px-6">{{ dateFormat(data.supplier.createdAt) }}</td>
                        <td class="py-4 px-6">{{ dateFormat(data.supplier.updatedAt) }}</td>
                        <td class="py-4 px-6" v-on:click="handleDelete(data.supplier.supplierCode)">
                            <div class="text-red-500 cursor-pointer"><ThemifyIcon icon="trash" />Delete</div>
                        </td>
                    </tr>
                </tbody>
            </table>
            <div v-if="supplierList.length <= 0" class="flex w-full justify-center p-8">
                <h1 class="">Empty list, there is no data!</h1>
            </div>
            <div class="flex items-center" v-if="supplierList.length > 0">
                <button class="underline px-2 py-1 rounded-full" v-if="pageData.currentPage != 1" v-on:click="pagePagination(pageData.currentPage - 1)">Previous</button>
                <p class="px-2 py-4 font-bold">{{ `${pageData.currentPage}/${pageData.pageTotal}` }}</p>
                <button class="underline px-2 py-1 rounded-full" v-if="pageData.currentPage < pageData.pageTotal" v-on:click="pagePagination(pageData.currentPage + 1)">
                    Next
                </button>
            </div>
        </div>
    </main>
</template>

<script>
import axios from "axios";
import ThemifyIcon from "vue-themify-icons/ThemifyIcon.vue";
import { mapState } from "vuex";
import dateFormat from "../../helpers/dateFormat";
import priceFormat from "../../helpers/priceFormat";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";

export default {
    data() {
        return {
            isLoading: false,
            supplierList: [],
            pageData: {
                currentPage: 1,
                pageTotal: 0,
            },
            totalSuppliers: 0,
        };
    },
    async mounted() {
        this.fetchData();
    },
    methods: {
        dateFormat,
        priceFormat,
        pagePagination(page) {
            this.$router.push(`/dashboard/supplier-list?page=${page}`);
            this.fetchData();
            this.isLoading = false;
        },
        async fetchData(page = 1) {
            this.isLoading = true;
            let pageSelect = this.$route.query ? parseInt(this.$route.query.page) : page;
            await axios
                .get(`${process.env.VUE_APP_API_URL}/supplier/get-all?page=${pageSelect}&token=${this.accessToken}`)
                .then((res) => {
                    if (res.data.status && (res.data.result.perPage ? true : false)) {
                        console.log(res.data);
                        this.supplierList = res.data.result.data;
                        this.pageData.currentPage = res.data.currentPage;
                        this.pageData.pageTotal = res.data.pageTotal;
                        this.totalSuppliers = res.data.totalSuppliers;
                    } else {
                        this.productsData = [];
                    }
                })
                .catch(() => {
                    this.productsData = [];
                });
            this.isLoading = false;
        },
        async handleDelete(barcode = null) {
            this.isLoading = true;
            await axios
                .delete(`${process.env.VUE_APP_API_URL}/supplier/delete/${encodeURIComponent(barcode)}?token=${this.accessToken}`)
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
            this.isLoading = false;
            this.fetchData();
        },
    },
    computed: { ...mapState(["accessToken", "toastify"]) },
    components: { ThemifyIcon, Loading },
};
</script>

<style></style>
