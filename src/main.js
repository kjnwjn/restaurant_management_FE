import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ThemifyIcon from "vue-themify-icons";
import VueToastify from "vue-toastify";
import VueSocketIO from "vue-socket.io";
import SocketIO from "socket.io-client";
Vue.use(
    new VueSocketIO({
        debug: true,
        allowEIO3: true,

        connection: SocketIO(`https://restaurant-management-system-28dc.onrender.com/`, {}), // http://192.168.0.5:3300
        vuex: {
            store,
            actionPrefix: "SOCKET_",
            mutationPrefix: "SOCKET_",
        },
    })
);

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
