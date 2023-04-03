<template>
    <main class="p-6">
        <Loading :active="isLoading" :is-full-page="true" :can-cancel="false" />
        <div class="flex items-center mb-4 text-green-700 font-bold text-lg uppercase">
            <ThemifyIcon icon="menu" />
            <h1 class="ml-2">Table Management</h1>
        </div>
        <div class="mb-6">
            <div class="mb-2 text-md font-medium text-gray-900 flex items-center">
                <ThemifyIcon icon="settings" />
                <p class="ml-2">Create new table automatically</p>
            </div>
            <div
                v-on:click="createNewTable()"
                class="p-2 flex justify-center items-center transition-all bg-blue-400 hover:bg-blue-500 text-white w-80 text-center rounded cursor-pointer"
            >
                <ThemifyIcon icon="plus" />
                <button class="ml-2">Create</button>
            </div>
        </div>
        <div class="flex items-center mb-4 text-green-700 font-bold text-lg uppercase">
            <ThemifyIcon icon="menu" />
            <h1 class="ml-2">List of table</h1>
        </div>
        <div class="mb-6">
            <div class="grid-menu">
                <div v-for="(table, index) in tableList" :key="index">
                    <router-link :to="'/dashboard/table/' + table.tableId">
                        <card-vue :table-id="table.tableId" :status="table.status" />
                    </router-link>
                </div>
            </div>
        </div>
    </main>
</template>

<script>
import axios from "axios";
// import ThemifyIcon from "vue-themify-icons/ThemifyIcon.vue";
import { mapState } from "vuex";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
import dateFormat from "../../helpers/dateFormat";
import CardVue from "../../../src/components/CardVue.vue";

export default {
    components: { Loading, CardVue },
    data() {
        return {
            isLoading: false,
            tableList: null,
        };
    },
    async mounted() {
        this.fetchData();
    },
    methods: {
        dateFormat,
        async createNewTable() {
            this.isLoading = true;
            await axios
                .post(`${process.env.VUE_APP_API_URL}/table/new-table?token=${this.accessToken}`)
                .then((res) => {
                    console.log(res);
                    if (res.data.status) {
                        this.toastify.success(res.data.msg.en);
                    } else {
                        this.toastify.error(res.data.msg.en);
                    }
                })
                .catch((err) => {
                    this.toastify.error(err.message);
                });
            this.fetchData();
            this.isLoading = false;
        },
        async fetchData() {
            this.isLoading = true;
            await axios
                .get(`${process.env.VUE_APP_API_URL}/table/get-all?token=${this.accessToken}`)
                .then((res) => {
                    if (res.data.status) {
                        this.tableList = res.data.data.listTables;
                    } else {
                        this.tableList = null;
                    }
                })
                .catch((err) => {
                    this.toastify.error(err.message);
                });
            this.isLoading = false;
        },
    },
    computed: { ...mapState(["accessToken", "payload", "toastify"]) },
};
</script>

<style>
.grid-menu {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
}
</style>
