<template>
    <div id="app" v-bind:class="counter.Open_Dark">
        <router-view />
    </div>
</template>

<script>
import { useCounterStore } from "@/stores/counter";
import axios from "axios";
import VueCookies from "vue-cookies";

export default {
    setup() {
        const counter = useCounterStore();
        return { counter };
    },
};
</script>
