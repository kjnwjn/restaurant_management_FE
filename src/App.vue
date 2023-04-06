<template>
    <div id="app">
        <router-view />
    </div>
</template>

<script>
export default {
    mounted() {
        this.$store.commit("set_toastify", this.$vToastify);
    },
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
main.main-container {
    padding: 1.5rem;
    background: white;
    position: absolute;
    width: calc(100% - 300px);
    transform: translateX(300px);
    height: 100%;
}
</style>
