<script setup>

import draggableIcon from "../assets/icons/draggable.svg";
import codeIcon from "../assets/icons/code.svg";
import handIcon from "../assets/icons/hand.png";
import studentColors from '../assets/style/colors.module.scss';

// import affect images
import anxious from "../assets/affect/anxious.png";
import bored from "../assets/affect/bored.png";
import confused from "../assets/affect/confused.png";
import curious from "../assets/affect/curious.png";
import excited from "../assets/affect/excited.png";
import focused from "../assets/affect/focused.png";
import frustrated from "../assets/affect/frustrated.png";
import happy from "../assets/affect/happy.png";
import satisfied from "../assets/affect/satisfied.png";

import { useColumnStore } from "../stores/ColumnStore";
import { findColumn } from "../utility"

const columnStore = useColumnStore();

const AFFECTLIST = {
    "happy": happy,
    "anxious": anxious,
    "bored": bored,
    "confused": confused,
    "curious": curious,
    "excited": excited,
    "focused": focused,
    "frustrated": frustrated,
    "satisfied": satisfied
}
const AFFECTLABEL = {
    "happy": "happy",
    "anxious": "anxious",
    "bored": "bored",
    "confused": "confused",
    "curious": "curious",
    "excited": "excited",
    "focused": "focused",
    "frustrated": "frustrated",
    "satisfied": "satisfied"
}

const HANDS = {
    "code": handIcon,
    "other": handIcon
}
const HANDSTEXT = {
    "code": "code help",
    "other": "other help"
}

// console.log(COLUMNS)
// checks if hand is raised or not, can be either code, none or other
function isHandRaised(hand) {
    if (hand == "none") {
        return false
    }
    return true
}

const COLORS = studentColors;

defineProps({
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
        type: String,
        required: true
    },
    submission: {
        type: String,
        required: true
    }
})

</script>

<template>
    <tr  class="student-container">
        <td v-if="columnStore.isName" :style="{order: columnStore.nameOrder, width: columnStore.nameWidth}">
            <div class="name-container">
                <!-- this should go in the bigger column thing to drag -->
                <!-- <img class="dragIcon" :src=draggableIcon alt=""> -->
                <a class="codeIcon" href=""><img :src=codeIcon alt=""></a>

                <p class="student-name">
                    {{ name }}
                </p>
            </div>
        </td>
        <td v-if="columnStore.isLastHelped"  :style="{order: columnStore.lastHelpedOrder, width: columnStore.lastHelpedWidth}" class="last-helped">
            <p>
                {{ lastHelped }}
            </p>
        </td>
        <td v-if="columnStore.isAffect"  :style="{order: columnStore.affectOrder, width: columnStore.affectWidth}" class=" center-td"> 
            <img class="affectIcon" :src=AFFECTLIST[affect] :alt=AFFECTLABEL[affect] :title=AFFECTLABEL[affect]>
        </td>
        <td v-if="columnStore.isHand"  :style="{order: columnStore.handOrder, width: columnStore.handWidth}" class=" center-td">
            <div class="hand-raise">
                <a v-if="isHandRaised(handRaised)" href="">
                    <img :src=HANDS[handRaised] alt="" :title=HANDSTEXT[handRaised]>
                </a>
            </div>
        </td>
        <td v-if="columnStore.isLastActive"  :style="{order: columnStore.lastActiveOrder, width: columnStore.lastActiveWidth}" class="metrics">
            <p>
                {{ lastActive }}
            </p>
        </td>
        <td v-if="columnStore.isLoc2min"  :style="{order: columnStore.loc2minOrder, width: columnStore.loc2minWidth}" class="metrics">
            <p>
                {{ loc2min }}
            </p>
        </td>
        <td v-if="columnStore.isViewCode" class="center-td" :style="{order: columnStore.viewCodeOrder, width: columnStore.viewCodeWidth}">
            <a id="view-code-button" class="btn-small waves-effect waves-light">Code</a>
        </td>
        <td v-if="columnStore.isSubmission" :style="{order: columnStore.submissionOrder, width: columnStore.submissionWidth}" class="submission center-td">
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

    .name-container {
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: start;
        flex-direction: row;
        margin: 0;
        padding: 0;
        order: 1;

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
    }

    .last-helped, .submission, .metrics {
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

        a {
            display: block;
            height: 100%;
        }

        img {
            height: 100%;
            cursor: pointer;
        }
    }
    .center-td{
        justify-content: center;
    }
    #view-code-button{
        font-size: 0.8rem;
        padding: 0 8px;
        margin: 0;
        height: 1.5rem;
        line-height: 1.5rem;
    }
}</style>
