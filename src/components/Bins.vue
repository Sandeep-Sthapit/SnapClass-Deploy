<script setup>
import draggableIcon from "../assets/icons/draggable.svg";
import studentColors from '@/assets/style/colors.module.scss';
import StudentRowItem from './StudentRowItem.vue';

import { ref } from 'vue'
import { useColumnStore } from '@/stores/ColumnStore.js';

const columnStore = useColumnStore();

let isCollapsed = ref(false);

function collapseBin() {
    isCollapsed.value = !isCollapsed.value;
}

defineProps({
    binName: {
        type: String,
        required: true
    }
})
</script>

<template>
    <div class="bin-container">
        <div class="bin-title-container">
            <div class="bin-title">

                <p class="bin-title-text">{{ binName }}</p><a href="" class="edit-bin-button snapclass-button"><i
                        class="fa fa-pencil"></i></a>
            </div>
            <p class="bin-collapse-button snapclass-button" @click="collapseBin()">
                <i v-if="isCollapsed" class="fa fa-caret-down"></i>
                <i v-else class="fa fa-caret-up"></i>
            </p>
        </div>
        <div class="bin-body" :class="{ collapsed: isCollapsed }">

            <table>
                <!-- <colgroup>
            <col v-if="columnStore.isName" span="1" 
                        :style="{ width: columnStore.nameWidth + 'px' }">
            <col v-if="columnStore.isLastHelped" span="1"
                        :style="{ width: columnStore.lastHelpedWidth + 'px' }">
            <col v-if="columnStore.isAffect" span="1"
                        :style="{ width: columnStore.affectWidth + 'px' }">
            <col v-if="columnStore.isHand" span="1"
                        :style="{ width: columnStore.handWidth + 'px' }">
            <col v-if="columnStore.isLastActive" span="1"
                        :style="{ width: columnStore.lastActiveWidth + 'px' }">
            <col v-if="columnStore.isLoc2min" span="1"
                        :style="{ width: columnStore.loc2minWidth + 'px' }">
            <col v-if="columnStore.isViewCode" span="1"
                        :style="{ width: columnStore.viewCodeWidth + 'px' }">
            <col v-if="columnStore.isSubmission" span="1"
                        :style="{ width: columnStore.submissionWidth + 'px' }">
            </colgroup> -->
                <thead>
                    <tr class="table-header">
                        <th v-if="columnStore.isName"
                            :style="{ order: columnStore.nameOrder, width: columnStore.nameWidth }"
                            class="table-header-item">
                            <p>{{ columnStore.columns["name"].name }}</p><a class="sort-button" href=""><i
                                    class="fa fa-sort"></i> </a>
                        </th>
                        <th v-if="columnStore.isLastHelped"
                            :style="{ order: columnStore.lastHelpedOrder, width: columnStore.lastHelpedWidth }"
                            class="table-header-item">
                            <p>{{ columnStore.columns["lastHelped"].name }}</p><a class="sort-button" href=""><i
                                    class="fa fa-sort"></i> </a>
                        </th>
                        <th v-if="columnStore.isAffect"
                            :style="{ order: columnStore.affectOrder, width: columnStore.affectWidth }"
                            class="table-header-item">
                            <p>{{ columnStore.columns["affect"].name }}</p><a class="sort-button" href=""><i
                                    class="fa fa-sort"></i> </a>
                        </th>
                        <th v-if="columnStore.isHand"
                            :style="{ order: columnStore.handOrder, width: columnStore.handWidth }"
                            class="table-header-item">
                            <p>{{ columnStore.columns["hand"].name }}</p><a class="sort-button" href=""><i
                                    class="fa fa-sort"></i> </a>
                        </th>
                        <th v-if="columnStore.isLastActive"
                            :style="{ order: columnStore.lastActiveOrder, width: columnStore.lastActiveWidth }"
                            class="table-header-item">
                            <p>{{ columnStore.columns["lastActive"].name }}</p><a class="sort-button" href=""><i
                                    class="fa fa-sort"></i> </a>
                        </th>
                        <th v-if="columnStore.isLoc2min"
                            :style="{ order: columnStore.loc2minOrder, width: columnStore.loc2minWidth }"
                            class="table-header-item">
                            <p>{{ columnStore.columns["loc2min"].name }}</p><a class="sort-button" href=""><i
                                    class="fa fa-sort"></i> </a>
                        </th>
                        <th v-if="columnStore.isViewCode"
                            :style="{ order: columnStore.viewCodeOrder, width: columnStore.viewCodeWidth }"
                            class="table-header-item">
                            <p>{{ columnStore.columns["viewCode"].name }}</p><a class="sort-button" href=""><i
                                    class="fa fa-sort"></i> </a>
                        </th>
                        <th v-if="columnStore.isSubmission"
                            :style="{ order: columnStore.submissionOrder, width: columnStore.submissionWidth }"
                            class="table-header-item">
                            <p>{{ columnStore.columns["submission"].name }}</p><a class="sort-button" href=""><i
                                    class="fa fa-sort"></i> </a>
                        </th>

                        <!-- <th v-for="column in columnStore.columns" :key="column.name" class="table-header-item">
                        <p>{{ column.name }}</p>
                        <div class="sort-icon">
                            <i class="fa-solid fa-sort"></i>
                        </div>
                    </th> -->
                    </tr>
                </thead>

                <tbody>
                    <StudentRowItem name="Sandy" lastHelped="23 minutes ago" affect="happy" handRaised="code"
                        lastActive="3 mins ago" loc2min="0 lines" submission="N/A" />
                    <StudentRowItem name="Saminur" lastHelped="yesterday" affect="frustrated" handRaised="code"
                        lastActive="23 mins ago" loc2min="4 lines" submission="N/A" />
                    <StudentRowItem name="Ally" lastHelped="never" affect="focused" handRaised="code"
                        lastActive="1 mins ago" loc2min="6 lines" submission="N/A" />
                </tbody>
            </table>
        </div>
    </div>
</template>
  
<style lang="scss">
@import "@/assets/style/colors.module";

.bin-title-container {
    display: flex;
    align-items: center;
    justify-content: space-between;

    .bin-collapse-button {
        font-size: 1.5rem;
        color: $primary;
        cursor: pointer;
    }

    .bin-title {
        display: flex;
        align-items: center;
        justify-content: start;

        .bin-title-text {
            font-size: 1rem;
            font-weight: bold;
            color: $primary2;
            margin-right: 2rem;
        }

        .edit-bin-button {
            font-size: 1rem;
            color: $primary;
        }

    }
}


.bin-body {
    position: relative;
    width: 100%;
    transition: 2s linear;
    overflow: hidden;

    table {
        width: 100%;
        position: relative;
        table-layout: fixed
    }

    .table-header {
        display: flex;
        align-items: end;
        justify-content: space-between;
        flex-direction: row;
        height: 4vh;
        width: 100%;
    }

    .table-header-item {
        font-size: 0.8rem;
        padding: 0 2px;
        height: 100%;
        border-right: 1px solid $text-surface;
        color: $text-secondary;
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex-direction: row;
    }

    .sort-button {
        font-size: 1.2rem;
        color: $primary;
        cursor: pointer;

        :hover {
            transform: scale(1.25);
            filter: brightness(125%);
        }
    }
}
.collapsed{
    height: 2px;
}
</style>