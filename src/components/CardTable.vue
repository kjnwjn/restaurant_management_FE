<template>
    <div class="card-app-wrapper p-6" v-if="tableData && Number(tableData?.tableData.tableId) == tableId">
        <div id="card-app" :class="{ active: tableData.tableData.status }">
            <div class="card-app-img p-6">
                <img src="@/assets/plate.png" width="100%" />
            </div>
            <p>{{ tableId }}</p>
            <p>{{ tableData.tableData.status ? "Unavailable" : "Available" }}</p>
        </div>
    </div>
    <div class="card-app-wrapper p-6" v-else>
        <div id="card-app" :class="{ active: status }">
            <div class="card-app-img p-6">
                <img src="@/assets/plate.png" width="100%" />
            </div>
            <p>{{ tableId }}</p>
            <p>{{ status ? "Unavailable" : "Available" }}</p>
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
    padding: 10px;
    border-radius: 10px;
    color: white;
    background: white;
    transition: all 0.2s linear;
    box-shadow: 0px 3px 9px -2px rgba(0, 0, 0, 0.4);
}
#card-app.active {
    background: #b5b5b5;
}
#card-app:hover {
    transform: scale(1.1);
    box-shadow: 0px 3px 9px 2px rgba(0, 0, 0, 0.4);
}
</style>
