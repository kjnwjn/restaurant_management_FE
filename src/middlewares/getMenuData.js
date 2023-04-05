import store from "@/store";
import axios from "axios";

export default async function (to, from, next) {
    if (store.state.menuList.length > 0) {
        return next();
    } else {
        await axios
            .get(`${process.env.VUE_APP_API_URL}/menu/get-data`)
            .then((res) => {
                if (res.data.status) {
                    store.commit("set_menuList", res.data.data);
                    localStorage.setItem("menuList", JSON.stringify(res.data.data));
                    return next();
                } else {
                    store.commit("set_menuList", JSON.parse(localStorage.getItem("menuList")));
                    return next();
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }
}
