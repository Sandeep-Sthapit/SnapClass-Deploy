<script setup>

import draggableIcon from "../assets/icons/draggable.svg";
import codeIcon from "../assets/icons/code.svg";
import studentColors from '../assets/style/colors.module.scss';

import { AFFECT_LIST, AFFECT_LABEL } from '@/affect.js'
import { HAND, HANDS_TEXT, isHandRaised } from '@/handraise.js'

import { useColumnStore } from '@/stores/ColumnStore.js';
import { useStudentStore } from '@/stores/StudentStore.js';

import { ref, computed } from 'vue'

const columnStore = useColumnStore();
const studentStore = useStudentStore();

const showStar = ref(props.isPinned)

const AFFECTLIST = AFFECT_LIST
const AFFECTLABEL = AFFECT_LABEL

const HANDS = HAND
const HANDSTEXT = HANDS_TEXT

const emit = defineEmits(['customChange'])

const openStudentDetails = (event) => {
    studentStore.currentSelectedStudent(props.id);
    emit('showStudentDetails', props)
}
const openCodeView = (event) => {
    studentStore.currentSelectedStudent(props.id);
    emit('showCodeView', props)
}

const openHelpMsg = (event) => {
    studentStore.currentSelectedStudent(props.id);
    emit('showHelpMsg', props)
}

// console.log(COLUMNS)

function togglePin() {
    showStar.value = !showStar.value;
    studentStore.pinStudent(props.id, showStar.value)
}


function addToList(id) {
    if (studentStore.checkedStudents[id] == false) {
        studentStore.removeStudentsList(id);
    }
    else {
        studentStore.addStudentsToCheckList(id);
    }
}
const COLORS = studentColors;

const props = defineProps({
    id: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    lastHelped: {
        type: String,
        required: true
    },
    affect: {
        type: String,
        required: true
    },
    handRaised: {
        type: String,
        required: true
    },
    lastActive: {
        type: String,
        required: true
    },
    loc2min: {
        type: Number,
        required: true
    },
    submission: {
        type: String,
        required: true
    },
    isPinned: {
        type: Boolean,
        default: false
    },
    msgText: {
        type: String,
        required: true
    },
    msgUrl: {
        type: String,
    }
})

</script>

<template>
    <tr class="student-container">
        <td v-if="columnStore.isName" :style="{ order: columnStore.nameOrder, width: columnStore.nameWidth }">
            <div class="name-container">
                <!-- this should go in the bigger column thing to drag -->
                <!-- <img class="dragIcon" :src=draggableIcon alt=""> -->
                <form v-if="studentStore.msgMode" class="checkbox">
                    <label>

                        <input v-model="studentStore.checkedStudents[id]" class="filled-in" type="checkbox"
                            @change="addToList(id)"><span></span>
                    </label>
                </form>
                <span class="star-icon fa fa-star" :class="{ checked: isPinned }" @click="togglePin()"></span>
                <p class="codeIcon" @click="openCodeView"><img :src=codeIcon alt="" title="view code"></p>

                <p class="student-name" @click="openStudentDetails">
                    {{ name }}
                </p>
            </div>
        </td>
        <td v-if="columnStore.isLastHelped"
            :style="{ order: columnStore.lastHelpedOrder, width: columnStore.lastHelpedWidth }" class="last-helped">
            <p>
                {{ lastHelped }}
            </p>
        </td>
        <td v-if="columnStore.isAffect" :style="{ order: columnStore.affectOrder, width: columnStore.affectWidth }"
            class=" center-td" :title=AFFECTLABEL[affect.toLowerCase()]>
            <img class="affectIcon" :src=AFFECTLIST[affect.toLowerCase()] :alt=AFFECTLABEL[affect.toLowerCase()]
                >
        </td>
        <td v-if="columnStore.isHand" :style="{ order: columnStore.handOrder, width: columnStore.handWidth }"
            class=" center-td">
            <div class="hand-raise">
                <div v-if="isHandRaised(handRaised)">
                    <img @click="openHelpMsg" :src=HANDS[handRaised] alt="" :title=HANDSTEXT[handRaised]>
                </div>
            </div>
        </td>
        <td v-if="columnStore.isLastActive"
            :style="{ order: columnStore.lastActiveOrder, width: columnStore.lastActiveWidth }" class="metrics">
            <p>
                {{ lastActive }}
            </p>
        </td>
        <td v-if="columnStore.isLoc2min" :style="{ order: columnStore.loc2minOrder, width: columnStore.loc2minWidth }"
            class="metrics">
            <p>
                <span>{{ loc2min }}</span> <span>lines</span>
            </p>
        </td>
        <td v-if="columnStore.isViewCode" class="center-td"
            :style="{ order: columnStore.viewCodeOrder, width: columnStore.viewCodeWidth }">
            <p id="view-code-button" class="btn-small waves-effect waves-light" @click="openCodeView">Code</p>
        </td>
        <td v-if="columnStore.isSubmission"
            :style="{ order: columnStore.submissionOrder, width: columnStore.submissionWidth }"
            class="submission center-td">
            <p>
                {{ submission }}
            </p>
        </td>
    </tr>
</template>

<style lang="scss">
@import "../assets/style/colors.module";

.student-container {
    background-color: $background;
    height: 2rem;
    width: 100%;
    padding: 0 0;
    display: flex;
    align-items: center;
    justify-content: space-between;


    td {
        margin: 0 0;
        padding: 0 2px;
        height: 100%;
        display: flex;
        align-items: center;
        border-right: 1px solid $text-surface;
        // order: 5;
    }

    td:first-child {
        padding-left: 0;
    }

    * {
        position: relative;
    }

    .checked {
        color: #EFCE4A;
    }

    .star-icon {
        margin-right: 0.25rem;
        cursor: pointer;
    }

    .star-icon:hover {
        transform: scale(1.1);
    }

    .name-container {
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: start;
        flex-direction: row;
        margin: 0;
        padding: 0;
        order: 1;

        .checkbox {
            height: 18px;
            width: 20px;
            margin-right: 5px;
            align-self: center;
        }

        img {
            height: 100%;
            margin-right: 0.5rem;
        }

        .dragIcon {
            cursor: grab;
            transition: 0.1s ease-in-out;
        }

        .dragIcon:hover {
            background-color: gray;
        }

        .codeIcon {
            height: 100%;

            img {
                cursor: pointer;
                transition: 0.1s ease-in-out;
            }

            img:hover {
                transform: scale(120%);
            }
        }
    }

    .student-name {
        color: $text-secondary;
        font-size: 0.8rem;
        cursor: pointer;
        transition: 0.1s linear;
    }

    .student-name:hover {
        transform: scale(1.1);
    }

    .last-helped,
    .submission,
    .metrics {

        // order: 2;
        p {
            color: $text-secondary;
            font-size: 0.8rem;
        }
    }

    .affectIcon {
        height: 95%;
    }

    .hand-raise {
        height: 100%;

        div {
            display: block;
            height: 100%;
        }

        img {
            height: 100%;
            cursor: pointer;
        }
    }

    .center-td {
        justify-content: center;
    }

    #view-code-button {
        font-size: 0.8rem;
        padding: 0 8px;
        margin: 0;
        height: 1.5rem;
        line-height: 1.5rem;
    }

    .hidden-label {
        display: none !important;
    }
}

.student-container:hover {
    background-color: #EEE;

}
</style>
