<template>
    <main>
        <Loading :active="isLoading" :is-full-page="true" :can-cancel="false" />
        <div class="flex items-center mb-4 text-green-700 font-bold text-lg uppercase">
            <ThemifyIcon icon="menu" />
            <h1 class="ml-2">List of all employees:</h1>
        </div>
        <div class="overflow-x-auto relative">
            <table class="overflow-scroll w-full text-sm text-left text-gray-500 dark:text-gray-400 mb-4">
                <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" class="py-3 px-6">UserCode</th>
                        <th scope="col" class="py-3 px-6">Fullname</th>
                        <th scope="col" class="py-3 px-6">Basic salary</th>
                        <th scope="col" class="py-3 px-6">Role</th>
                        <th scope="col" class="py-3 px-6">Last modified</th>
                    </tr>
                </thead>
                <tbody v-if="employeeList.length > 0">
                    <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700" v-for="(employee, i) in employeeList" :key="i">
                        <router-link :to="'/employee/' + employee.userCode + '/detail'" v-if="payload.role == 'ADMIN'">
                            <th scope="row" class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                {{ employee.userCode }}
                            </th>
                        </router-link>
                        <th scope="row" class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white" v-else>
                            {{ employee.userCode }}
                        </th>
                        <td class="py-4 px-6">{{ employee.fullName }}</td>
                        <td class="py-4 px-6">{{ priceFormat(employee.preSalary) }}</td>
                        <td class="py-4 px-6">{{ employee.role }}</td>
                        <td class="py-4 px-6">{{ dateFormat(employee.updatedAt) }}</td>
                    </tr>
                </tbody>
            </table>
            <div v-if="employeeList.length <= 0" class="flex w-full justify-center p-8">
                <h1 class="">Empty list, there is no data!</h1>
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
            employeeList: [],
        };
    },
    async mounted() {
        this.fetchData();
    },
    methods: {
        dateFormat,
        priceFormat,
        async fetchData() {
            this.isLoading = true;
            await axios
                .get(`${process.env.VUE_APP_API_URL}/employee/get-all?&token=${this.accessToken}`)
                .then((res) => {
                    if (res.data.status && res.data.result.length > 0) {
                        this.employeeList = res.data.result;
                    } else {
                        this.employeeList = [];
                    }
                })
                .catch(() => {
                    this.employeeList = [];
                });
            this.isLoading = false;
        },
    },
    computed: { ...mapState(["accessToken", "payload", "toastify"]) },
    components: { ThemifyIcon, Loading },
};
</script>

<style></style>
