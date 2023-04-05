import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ThemifyIcon from "vue-themify-icons";
import VueToastify from "vue-toastify";

Vue.config.productionTip = false;

Vue.component("ThemifyIcon", ThemifyIcon);

Vue.use(VueToastify, {
    position: "bottom-right",
    theme: "light",
    canPause: false,
    errorDuration: 4000,
    singular: true,
    hideProgressbar: true,
    withBackdrop: true,
    backdrop: "rgba(0, 0, 0, 0.2)",
});

new Vue({
    router,
    store,
    render: (h) => h(App),
}).$mount("#app");
