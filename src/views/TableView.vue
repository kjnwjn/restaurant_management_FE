<template>
    <main class="p-6">
        <Loading :active="isLoading" :is-full-page="true" :can-cancel="false" />
        <div class="flex items-center mb-4 text-green-700 font-bold text-lg uppercase">
            <ThemifyIcon icon="menu" />
            <h1 class="ml-2">List of dish</h1>
        </div>
        <div class="grid grid-cols-3 p-4">
            <div class="col-span-2 pr-2">
                <!-- <div class="overflow-x-auto relative"> -->
                <div class="grid grid-cols-2 p-4">
                    <div class="col-span-1 pr-2">
                        <card-dish dishId="ca ba sa" status="true"></card-dish>
                    </div>
                    <div class="col-span-1 pr-2">
                        <card-dish dishId="ca ba sa" status="true"></card-dish>
                    </div>
                    <div class="col-span-1 pr-2">
                        <card-dish dishId="ca ba sa" status="true"></card-dish>
                    </div>
                    <div class="col-span-1 pr-2">
                        <card-dish dishId="ca ba sa" status="true"></card-dish>
                    </div>
                    <!-- </div> -->
                </div>
            </div>
            <div class="col-span-1 pr-6"></div>
        </div>
    </main>
</template>

<script>
// import axios from "axios";
// import router from "@/router";
import cardDish from "@/components/CardDish.vue";
export default {
    data() {
        return {
            userCode: "",
            password: "",
        };
    },
    methods: {
        // handleSubmit(e) {
        //     e.preventDefault();
        //     axios
        //         .post(`${process.env.VUE_APP_API_URL}/account/login`, { userCode: this.userCode, password: this.password })
        //         .then((res) => {
        //             console.log(res);
        //             if (!res.data.status) {
        //                 this.$store.state.toastify.error(res.data.msg.en);
        //             } else {
        //                 this.$store.state.toastify.success(res.data.msg.en);
        //                 localStorage.setItem("x-access-token", JSON.stringify(res.data.data.token));
        //                 localStorage.setItem("payload", JSON.stringify(res.data.data.payload));
        //                 this.$store.commit("set_access_token", res.data.data.token);
        //                 this.$store.commit("set_payload", res.data.data.payload);
        //                 router.push("/");
        //             }
        //         })
        //         .catch((err) => {
        //             if (!err.response?.data.msg.en) return this.$store.state.toastify.error(err.message);
        //             this.$store.state.toastify.error(err.response.data.msg.en);
        //         });
        // },
    },
    components: { cardDish },
};
</script>
