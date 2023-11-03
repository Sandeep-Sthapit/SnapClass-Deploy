<script setup>
import draggableIcon from "../assets/icons/draggable.svg";
import studentColors from '@/assets/style/colors.module.scss';
import StudentRowItem from './StudentRowItem.vue';

import { ref } from 'vue'
import { useColumnStore } from '@/stores/ColumnStore.js';
import { useStudentStore } from '@/stores/StudentStore.js';

const columnStore = useColumnStore();
const studentStore = useStudentStore();

const sortMsg = "sort table on this column"
const emit = defineEmits(['customChange'])

const openStudentModal = (event) => {
    emit('showStudentDetails', event)
}

let isCollapsed = ref(false);
function collapseBin() {
    isCollapsed.value = !isCollapsed.value;
}

// const studentData = ref(studentStore.getStudents)

const props = defineProps({
    name: {
        type: String,
        required: true
    },
    studentData: {
        type: Array,
        required: true
    },
    type: {
        type: String
    }
})
</script>

<template>
    <div class="bin-container">
        <div class="bin-title-container">
            <div class="bin-title">
                <p class="bin-title-text">{{ name }}</p>
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
                            <p>{{ columnStore.columns["name"].name }}</p>
                            <p :title="sortMsg" class="sort-button" @click="studentStore.sortStudents('name')"><i
                                    class="fa fa-sort"></i>
                            </p>
                        </th>
                        <th v-if="columnStore.isLastHelped"
                            :style="{ order: columnStore.lastHelpedOrder, width: columnStore.lastHelpedWidth }"
                            class="table-header-item">
                            <p>{{ columnStore.columns["lastHelped"].name }}</p>
                            <p :title="sortMsg" class="sort-button" @click="studentStore.sortStudents('lastHelped')"><i
                                    class="fa fa-sort"></i> </p>
                        </th>
                        <th v-if="columnStore.isAffect"
                            :style="{ order: columnStore.affectOrder, width: columnStore.affectWidth }"
                            class="table-header-item">
                            <p>{{ columnStore.columns["affect"].name }}</p>
                            <p :title="sortMsg" class="sort-button" @click="studentStore.sortStudents('affect')"><i
                                    class="fa fa-sort"></i> </p>
                        </th>
                        <th v-if="columnStore.isHand"
                            :style="{ order: columnStore.handOrder, width: columnStore.handWidth }"
                            class="table-header-item">
                            <p>{{ columnStore.columns["hand"].name }}</p>
                            <p :title="sortMsg" class="sort-button" @click="studentStore.sortStudents('hand')"><i
                                    class="fa fa-sort"></i> </p>
                        </th>
                        <th v-if="columnStore.isLastActive"
                            :style="{ order: columnStore.lastActiveOrder, width: columnStore.lastActiveWidth }"
                            class="table-header-item">
                            <p>{{ columnStore.columns["lastActive"].name }}</p><p :title="sortMsg" class="sort-button"
                            @click="studentStore.sortStudents('lastActive')"><i class="fa fa-sort"></i> </p>
                        </th>
                        <th v-if="columnStore.isLoc2min"
                            :style="{ order: columnStore.loc2minOrder, width: columnStore.loc2minWidth }"
                            class="table-header-item">
                            <p>{{ columnStore.columns["loc2min"].name }}</p><p :title="sortMsg" class="sort-button"
                            @click="studentStore.sortStudents('loc2min')"><i class="fa fa-sort"></i> </p>
                        </th>
                        <th v-if="columnStore.isViewCode"
                            :style="{ order: columnStore.viewCodeOrder, width: columnStore.viewCodeWidth }"
                            class="table-header-item">
                            <p>{{ columnStore.columns["viewCode"].name }}</p>
                        </th>
                        <th v-if="columnStore.isSubmission"
                            :style="{ order: columnStore.submissionOrder, width: columnStore.submissionWidth }"
                            class="table-header-item">
                            <p>{{ columnStore.columns["submission"].name }}</p><p :title="sortMsg" class="sort-button"
                            @click="studentStore.sortStudents('submission')"><i class="fa fa-sort"></i> </p>
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
                    <template v-for="student in studentData" :key="student.id">
                        <StudentRowItem @showStudentDetails="openStudentModal" :id="student.id" :name="student.name"
                            :lastHelped="student.lastHelped" :affect="student.affect" :handRaised="student.hand"
                            :lastActive="student.lastActive" :loc2min="student.loc2min" :submission="student.submission"
                            :isPinned="student.isPinned" :msgText="student.helpMessage" :msgUrl="student.codeURL" />
                    </template>
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
            color: $primary;
            margin-right: 2rem;
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
        color: $primary2;
        cursor: pointer;

        :hover {
            transform: scale(1.25);
            filter: brightness(125%);
        }
    }
}

.collapsed {
    height: 2px;
}</style>