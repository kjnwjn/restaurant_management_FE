// import Vue from "vue";
import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";

import "./assets/tailwind.css";

import { createI18n } from "vue-i18n";
import messages from "@intlify/unplugin-vue-i18n/messages";

// import VueFlags from "@growthbunker/vueflags";
import CountryFlag from "vue-country-flag-next";

import VueKinesis from "vue-kinesis";

import VScrollLock from "v-scroll-lock";

// import axios from 'axios'
import VueCookies from "vue-cookies";

/* import the fontawesome core */
import { library } from "@fortawesome/fontawesome-svg-core";

/* import font awesome icon component */
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

// import { MdButton, MdContent, MdTabs } from "vue-material/dist/components";
// import "vue-material/dist/vue-material.min.css";
// import "vue-material/dist/theme/default.css";

// Vue.use(MdButton);
// Vue.use(MdContent);
// Vue.use(MdTabs);

/* import specific icons */
import {
    faMagnifyingGlass,
    faChevronDown,
    faBarsStaggered,
    faXmark,
    faChevronRight,
    faChevronLeft,
    faCircle,
    faC,
    faCartShopping,
    faCircleRight,
    faCircleUser,
    faUserLarge,
    faClockRotateLeft,
    faCreditCard,
    faUser,
    faComment,
    faSquarePhone,
    faCircleInfo,
    faWineGlass,
    faShrimp,
    faFishFins,
    faNetworkWired,
    faCookie,
    faStroopwafel,
    faCirclePlus,
    faCircleMinus,
    faFileCirclePlus,
    faCaretDown,
    faCaretUp,
    faCircleCheck,
    faListUl,
    faFileLines,
} from "@fortawesome/free-solid-svg-icons";

import { faFacebook, faSquareFacebook, faTelegram, faTiktok, faPython, faJava, faPhp, faJs, faHtml5, faCss3 } from "@fortawesome/free-brands-svg-icons";

import { faMoon, faSun, faIdCard, faHandPointDown } from "@fortawesome/free-regular-svg-icons";

/* add icons to the library */
library.add(
    faMagnifyingGlass,
    faFacebook,
    faMoon,
    faSun,
    faChevronDown,
    faSquareFacebook,
    faTelegram,
    faTiktok,
    faBarsStaggered,
    faXmark,
    faChevronRight,
    faChevronLeft,
    faCircle,
    faPython,
    faJava,
    faPhp,
    faJs,
    faHtml5,
    faCss3,
    faC,
    faCartShopping,
    faCircleRight,
    faCircleUser,
    faUserLarge,
    faClockRotateLeft,
    faCreditCard,
    faUser,
    faComment,
    faIdCard,
    faSquarePhone,
    faCircleInfo,
    faWineGlass,
    faShrimp,
    faFishFins,
    faNetworkWired,
    faCookie,
    faStroopwafel,
    faCirclePlus,
    faCircleMinus,
    faFileCirclePlus,
    faCaretDown,
    faCaretUp,
    faCircleCheck,
    faListUl,
    faFileLines,
    faHandPointDown
);

const app = createApp(App);

app.component("font-awesome-icon", FontAwesomeIcon);

app.use(createPinia());

app.use(router);

// app.use(VueFlags);
app.component("country-flag", CountryFlag);

const i18n = createI18n({
    legacy: false,
    globalInjection: true,
    locale: "vi",
    availableLocales: ["vi", "en"],
    messages,
    fallbackLocale: "vi",
});

app.use(i18n);
// app.use(axios);

app.use(VueCookies);

app.use(VueKinesis);

app.use(VScrollLock);

app.mount("#app");
