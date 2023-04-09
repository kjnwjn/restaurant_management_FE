<template>
    <div>
        <DashboardMenu />
        <main class="main-container">
            <Loading :active="isLoading" :is-full-page="true" :can-cancel="false" />
            <template v-if="payload && payload?.role == 'ADMIN'">
                <div class="flex items-center mb-4 text-green-700 font-bold text-lg uppercase">
                    <ThemifyIcon icon="menu" />
                    <h1 class="ml-2">Dishes management</h1>
                </div>
                <div class="mb-6">
                    <div class="mb-6 text-md font-medium text-gray-900 flex items-center">
                        <ThemifyIcon icon="settings" />
                        <p class="ml-2">Create new dish:</p>
                    </div>
                    <div class="grid gap-6 mb-6 md:grid-cols-2">
                        <div>
                            <label class="block mb-2 text-sm font-medium text-gray-900 text-gray-300">Thumbnail</label>
                            <input v-on:change="uploadFile()" ref="file" class="border-gray-300 text-gray-900 border rounded-lg block w-full text-sm cursor-pointer pl-2 py-2 mr-4" type="file" />
                        </div>
                        <div>
                            <label class="block mb-2 text-sm font-medium text-gray-900 text-gray-300">Dish name</label>
                            <input v-model="dish.name" class="border-gray-300 text-gray-900 border text-sm rounded-lg block w-full p-2.5" />
                        </div>
                        <div>
                            <label class="block mb-2 text-sm font-medium text-gray-900 text-gray-300">Price</label>
                            <input v-model="dish.price" type="number" class="border-gray-300 text-gray-900 border text-sm rounded-lg block w-full p-2.5" />
                        </div>
                        <div>
                            <label class="block mb-2 text-sm font-medium text-gray-900 text-gray-300">Category ID</label>
                            <input v-model="dish.categoryId" type="number" class="border-gray-300 text-gray-900 border text-sm rounded-lg block w-full p-2.5" />
                        </div>
                    </div>
                    <button type="submit" v-on:click="newDish" class="text-white transition-all bg-blue-400 hover:bg-blue-500 focus:outline-none font-medium rounded-lg text-sm w-full sm:w-auto px-8 py-2.5 text-center">Submit</button>
                </div>
            </template>
            <div class="flex items-center mb-4 text-green-700 font-bold text-lg uppercase">
                <ThemifyIcon icon="menu" />
                <h1 class="ml-2">List of dishes</h1>
            </div>
            <div class="mb-6">
                <div class="overflow-x-auto relative">
                    <table class="overflow-scroll w-full text-sm text-left text-gray-500 text-gray-400">
                        <thead class="text-xs text-gray-700 uppercase bg-gray-50 text-gray-400">
                            <tr>
                                <th scope="col" class="py-3 px-6">Dish ID</th>
                                <th scope="col" class="py-3 px-6">Category ID</th>
                                <th scope="col" class="py-3 px-6">Dish name</th>
                                <th scope="col" class="py-3 px-6">Status</th>
                                <th scope="col" class="py-3 px-6">Created At</th>
                                <th scope="col" class="py-3 px-6">Last modified</th>
                                <th scope="col" class="py-3 px-6" v-if="payload.role == 'ADMIN' || payload.role == 'CHEF'">Action</th>
                            </tr>
                        </thead>
                        <tbody v-if="dishList && dishList.length > 0">
                            <tr class="bg-white border-b bg-gray-800 border-gray-700" v-for="(dish, i) in dishList" :key="i">
                                <th scope="row" class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap text-white">
                                    {{ dish.dishId }}
                                </th>
                                <td class="py-4 px-6">{{ dish.categoryId }}</td>
                                <td class="py-4 px-6">{{ dish.name }}</td>
                                <template v-if="dishData">
                                    <td :class="dishData.status ? 'py-4 px-6 text-green-400' : 'py-4 px-6 text-red-500'" v-if="dishData.dishId == dish.dishId">
                                        {{ dishData.status ? "Available" : "Unavailable" }}
                                    </td>
                                    <td :class="dish.status ? 'py-4 px-6 text-green-400' : 'py-4 px-6 text-red-500'" v-else>{{ dish.status ? "Available" : "Unavailable" }}</td>
                                </template>
                                <template v-else>
                                    <td :class="dish.status ? 'py-4 px-6 text-green-400' : 'py-4 px-6 text-red-500'">{{ dish.status ? "Available" : "Unavailable" }}</td>
                                </template>
                                <td class="py-4 px-6">{{ dateFormat(dish.createdAt) }}</td>
                                <td class="py-4 px-6">{{ dateFormat(dish.updatedAt) }}</td>
                                <td class="py-4 px-6 flex" v-if="payload.role == 'ADMIN' || payload.role == 'CHEF'">
                                    <div v-on:click="dishRemove(dish.dishId)" class="text-red-500 cursor-pointer p-2" v-if="payload.role == 'ADMIN'"><ThemifyIcon icon="trash" />Delete</div>
                                    <div v-on:click="switchStatus(dish.dishId)" class="text-blue-500 cursor-pointer p-2">Switch status</div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <div v-if="!dishList" class="flex w-full justify-center p-8">
                        <h1 class="">Empty list, there is no data!</h1>
                    </div>
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
import store from "@/store";

export default {
    components: { ThemifyIcon, Loading, DashboardMenu },
    data() {
        return {
            isLoading: false,
            dishList: null,
            fileUpload: null,
            dish: {
                name: "",
                price: "",
                categoryId: "",
            },
        };
    },
    sockets: {
        connect: function () {},

        "update-dish-status": (dish) => {
            if (dish) {
                store.commit("set_dishData", dish);
            }
        },
    },
    async mounted() {
        this.fetchData();
    },
    methods: {
        dateFormat,
        async newDish() {
            this.isLoading = true;
            const formData = new FormData();
            formData.append("thumbnail", this.fileUpload);
            formData.append("name", this.dish.name);
            formData.append("price", this.dish.price);
            formData.append("categoryId", this.dish.categoryId);
            const headers = { "Content-Type": "multipart/form-data" };
            await axios
                .post(`${process.env.VUE_APP_API_URL}/dish/new-dish?token=${this.accessToken}`, formData, { headers })
                .then((res) => {
                    if (res.data.status) {
                        this.toastify.success(res.data.msg.en);
                    } else {
                        this.toastify.error(res.data.msg.en);
                    }
                })
                .catch((err) => {
                    if (!err?.response.data.msg.en) return this.toastify.error("Unknown error, please try again!");
                    this.toastify.error(err.response.data.msg.en);
                });
            this.isLoading = false;
            this.fetchData();
        },
        uploadFile() {
            this.fileUpload = this.$refs.file.files[0];
        },
        async dishRemove(dishId) {
            this.isLoading = true;
            await axios.delete(`${process.env.VUE_APP_API_URL}/dish/${dishId}?token=${this.accessToken}`).then((res) => {
                if (res.data.status) {
                    this.toastify.success(res.data.msg.en);
                } else {
                    this.toastify.error(res.data.msg.en);
                }
            });
            this.fetchData();
            this.isLoading = false;
        },
        async switchStatus(dishId) {
            this.isLoading = true;
            await axios.put(`${process.env.VUE_APP_API_URL}/dish/update-dish-status?dishId=${dishId}&token=${this.accessToken}`).then((res) => {
                if (res.data.status) {
                    this.toastify.success(res.data.msg.en);
                } else {
                    this.toastify.error(res.data.msg.en);
                }
            });
            this.fetchData();
            this.isLoading = false;
        },
        async fetchData() {
            this.isLoading = true;
            await axios
                .get(`${process.env.VUE_APP_API_URL}/dish/get-all?token=${this.accessToken}`)
                .then((res) => {
                    if (res.data.status && res.data.data) {
                        this.dishList = res.data.data;
                    } else {
                        this.dishList = null;
                    }
                })
                .catch((err) => {
                    this.toastify.error(err.message);
                });
            this.isLoading = false;
        },
    },
    computed: { ...mapState(["accessToken", "payload", "toastify", "dishData"]) },
};
</script>
