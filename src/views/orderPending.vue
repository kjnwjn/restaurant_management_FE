<template>
    <div>
        <DashboardMenu />

        <main class="main-container">
            <!-- <Loading :active="isLoading" :is-full-page="true" :can-cancel="false" /> -->
            <pre>{{ tableData }}</pre>
            <div class="grid grid-cols-3 p-4" v-if="tableData">
                <div class="col-span-3 pr-6 mb-4" v-for="(item, i) in tableData.pendingOrder" :key="i">
                    <h1 class="ml-2 text-green-700 font-bold text-lg uppercase">Session order {{ i + 1 }}</h1>
                    <p class="ml-2 text-green-500 font-bold text-md">Session Status : {{ item.status }}</p>
                    <p class="ml-2 text-green-500 font-bold text-md">Session Note: {{ item.note }}</p>

                    <div class="col-span-3 pr-6">
                        <div class="overflow-x-auto relative">
                            <table class="overflow-scroll w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                    <tr>
                                        <th scope="col" class="py-3 px-6">dishId</th>
                                        <th scope="col" class="py-3 px-6">dishId</th>
                                        <th scope="col" class="py-3 px-6">qty</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700" v-for="(dish, i) in item.orderData" :key="i">
                                        <td class="py-4 px-6 flex justify-between items-center">
                                            <button
                                                class="inline-flex items-center p-1 text-sm font-medium text-gray-500 bg-white rounded-full border border-gray-300"
                                                type="button"
                                            >
                                                {{ dish.dishId }}
                                            </button>
                                        </td>
                                        <td class="py-4 px-6">{{ dish.dishId }}</td>
                                        <td class="py-4 px-6">{{ dish.qty }}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            <!-- <pre>{{ orderList }}</pre> -->
        </main>
    </div>
</template>

<script>
import axios from "axios";
// import ThemifyIcon from "vue-themify-icons/ThemifyIcon.vue";
import dateFormat from "@/helpers/dateFormat";
import dateFormatV2 from "@/helpers/dateFormatV2";
import priceFormat from "@/helpers/priceFormat";
import { mapState } from "vuex";
// import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
import DashboardMenu from "@/components/DashboardMenu.vue";

export default {
    data() {
        return {
            isLoading: true,
            orderList: null,
            pendingOrderList: null,
            dish: null,
        };
    },
    async mounted() {
        this.fetchData();
    },
    methods: {
        dateFormat,
        priceFormat,
        dateFormatV2,
        async fetchData() {
            this.isLoading = true;

            await axios
                .get(`${process.env.VUE_APP_API_URL}/table/get-order/${this.$route.params.tableId}`)
                .then(async (res) => {
                    if (res.data.status && res.data.data) {
                        this.$store.commit("set_tableData", res.data.data);
                        this.$store.state.toastify.success(res.data.msg.en);
                    } else {
                        this.$store.commit("set_tableData", { tableId: this.$route.params.tableId });
                        this.$store.state.toastify.error(res.data.msg.en);
                    }
                })
                .catch(() => {});
            localStorage.setItem("set_defaultPOD", JSON.stringify([]));
            this.$store.commit("set_defaultPOD", []);

            this.isLoading = false;
        },
    },
    computed: { ...mapState(["tableData"]) },
    components: { DashboardMenu },
};
</script>
