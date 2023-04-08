<template>
    <div class="card-app-wrapper p-6" v-if="tableData && Number(tableData?.tableData?.tableId) == tableId">
        <div id="card-app" :class="{ 'un-active': tableData.tableData.status }">
            <div class="flex justify-center items-center p-6">
                <p class="text-6xl">{{ tableId }}</p>
            </div>
            <p class="text-center mb-2">{{ tableData.tableData.status ? "Unavailable" : "Available" }}</p>
        </div>
    </div>
    <div class="card-app-wrapper p-6" v-else>
        <div id="card-app" :class="{ 'un-active': status }">
            <div class="flex justify-center items-center p-6">
                <p class="text-6xl">{{ tableId }}</p>
            </div>
            <p class="text-center mb-2">{{ status ? "Unavailable" : "Available" }}</p>
        </div>
    </div>
</template>

<script>
import store from "@/store";
import { mapState } from "vuex";

export default {
    props: {
        tableId: Number,
        status: Boolean,
    },
    sockets: {
        "update-table-status": (table) => {
            if (table) {
                let tableData = {
                    tableData: table,
                    pendingOrder: [],
                };

                store.commit("set_tableData", tableData);
            }
        },
    },
    computed: {
        ...mapState(["tableData"]),
    },
};
</script>

<style>
#card-app {
    cursor: pointer;
    padding: 10px;
    border-radius: 10px;
    color: white;
    background: #69bf4c;
    transition: all 0.2s linear;
    box-shadow: 0px 3px 9px -2px rgba(0, 0, 0, 0.4);
}
#card-app.un-active {
    background: #ce6c00;
}
#card-app:hover {
    transform: scale(1.1);
    box-shadow: 0px 3px 9px 2px rgba(0, 0, 0, 0.4);
}
</style>
