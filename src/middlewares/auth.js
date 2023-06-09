import store from "@/store";
import router from "@/router";
import axios from "axios";

export default async function (to, from, next) {
    if (!store.state.accessToken) {
        return router.push({ path: "/login" });
    } else {
        await axios
            .get(`${process.env.VUE_APP_API_URL}/account/me?token=${store.state.accessToken}`)
            .then((response) => {
                if (response.data.status) {
                    store.commit("set_tableData", null);
                }
                return response.data.status ? next() : router.push({ path: "/login" });
            })
            .catch(() => {
                store.commit("set_access_token", null);
                store.commit("set_payload", null);
                localStorage.removeItem("x-access-token");
                localStorage.removeItem("payload");
                return router.push({ path: "/login" });
            });
    }
}
