<template>
    <div id="app">
        <left-menu></left-menu>
        <main class="main-container">
            <router-view />
        </main>
    </div>
</template>

<script>
// import { mapState } from "vuex";
import leftMenu from "@/components/leftMenu";

export default {
    // mounted() {
    //     this.$store.commit("set_toastify", this.$vToastify);
    // },
    // methods: {
    //     handleSignOut() {
    //         localStorage.removeItem("x-access-token");
    //         localStorage.removeItem("payload");
    //         this.$store.commit("set_access_token", null);
    //         this.$store.commit("set_payload", null);
    //         this.$router.push("/login");
    //     },
    // },
    components: { leftMenu },
    // computed: {
    //     ...mapState(["accessToken", "payload"]),
    // },
};
</script>

<style>
input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
}
.vld-overlay.is-full-page {
    height: 100vh;
}
</style>
