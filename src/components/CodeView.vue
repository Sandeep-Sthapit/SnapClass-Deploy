<script setup>

import { AFFECT_LIST, AFFECT_LABEL } from '@/affect.js'
import { HAND, HANDS_TEXT, isHandRaised } from '@/handraise.js'

import { useColumnStore } from '@/stores/ColumnStore.js';
import { useStudentStore } from '@/stores/StudentStore.js';

import { ref } from 'vue'

const columnStore = useColumnStore();
const studentStore = useStudentStore();

let showMetric = ref(false);

const AFFECTLIST = AFFECT_LIST
const AFFECTLABEL = AFFECT_LABEL

const HANDS = HAND
const HANDSTEXT = HANDS_TEXT


function openMetric() {
    showMetric.value = true;
}
function closeMetric() {
    showMetric.value = false;
}

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
    <div class="code-view-container">
        <div class="close-button" @click="$emit('hideCode')"><i class="fa fa-close"></i></div>
        <div class="top-row">

        </div>
        <div class="student-details">
            <div class="student-stat-container">
                <div class="top-row">
                    <div class="name-container">
                        <p class="student-name">{{ name }}</p>
                        <img class="affectIcon" :src=AFFECTLIST[affect.toLowerCase()] :alt=AFFECTLABEL[affect.toLowerCase()]
                            :title=AFFECTLABEL[affect.toLowerCase()]>
                        <div class="hand-raise">
                            <div v-if="isHandRaised(handRaised)" href="">
                                <img :src=HANDS[handRaised] alt="" :title=HANDSTEXT[handRaised]>
                            </div>
                        </div>
                    </div>
                </div>
                <p class="last-helped-text"><span>Last Helped: </span><span>{{ lastHelped }}</span></p>
                <div class="button-row">
                    <p id="reply-button" class="btn-small waves-effect"  @click="$emit('openConvo')">Send Message</p>
                    <p id="metric-button" class="btn-small waves-effect" @click="openMetric()">Show Metric</p>
                </div>
            </div>
            <div class="message-container">
                <p class="small-text">Student Message</p>
                <div class="msg-box">
                    <p>{{ msgText }}</p>

                </div>
                <div class="msg-expand" @click="$emit('openConvo')">Click to Expand</div>
            </div>

        </div>
        <div class="code-section">
            <p class="code-header">Code</p>
            <div class="code-window">
                <iframe
                    src="https://snap.berkeley.edu/snap/snap.html#present:Username=cornelios207&ProjectName=Missing%20square%20illusion&editMode&noRun"
                    frameborder="0"></iframe>
            </div>
        </div>
        <div v-if="showMetric" class="metric-container">
            <div id="close-metric" @click="closeMetric()"><i class="fa fa-close"></i></div>
            <div class="metric-component">
                <p class="metric-name">{{ columnStore.columns["lastActive"].name }}: </p>
                <p>{{ lastActive }}</p>
            </div>
            <div class="metric-component">
                <p class="metric-name">{{ columnStore.columns["loc2min"].name }}: </p>
                <p>{{ loc2min }}</p>
            </div>
        </div>
    </div>
</template>

<style lang="scss">
@import "@/assets/style/colors.module";

.code-view-container {
    width: 1024px;
    position: fixed;
    min-height: 100vh;
    top: 0vh;
    margin: 0;
    padding: 2rem;
    top: 0%;
    left: 50%;
    transform: translateX(-50%);
    background: white;
    z-index: 200;
    color: $text-secondary;

    .top-row {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
    }

    .affectIcon {
        height: 26px;
        margin-left: 0.5rem;
    }

    .hand-raise {
        height: 26px;
        margin-left: 0.5rem;

        div {
            display: block;
            height: 100%;
        }

        img {
            height: 100%;
            cursor: pointer;
        }
    }

    .name-container {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: start;
        font-size: 1.5rem;
    }

    .close-button {
        font-size: 2rem;
        color: $text-secondary;
        cursor: pointer;
        position: absolute;
        top: 0.5rem;
        right: 1rem;
        z-index: 50;

        :hover {
            transform: scale(1.1);
        }

        z-index: 20;
    }

    .last-helped-text {
        font-size: 0.8rem;
        color: $text-secondary;
    }

    .student-details {
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: start;

        .message-container {
            width: 45%;

            .small-text {
                font-size: 0.8rem;
            }

            .msg-box {
                background: white;
                border: 1px solid black;
                width: 100%;
                padding: 0.25rem;
                height: 75px;
                overflow: hidden;
            }

            .msg-expand {
                position: absolute;
                bottom: 0%;
                left: 0%;
                width: 100%;
                text-align: center;
                cursor: pointer;
                font-size: 0.8rem;
                background-color: #DDD;
                border: 1px solid black;
            }

            .msg-expand:hover {
                filter: brightness(125%);
            }
        }

    }

    .button-row {
        display: flex;
        justify-content: start;
        flex-direction: row;

        #metric-button {
            margin-left: 0.75rem;
        }
    }

    .code-section {
        width: 100%;

        .code-window {
            width: 100%;
            background: black;
            height: 80vh;
            overflow: scroll;

            iframe {
                width: 100%;
                height: 100%;
            }
        }

        .code-header {
            font-size: 1.25rem;
            color: $primary;
            font-weight: bold;
            text-transform: uppercase;
        }
    }

    .metric-container {
        position: absolute;
        left: 250px;
        top: 50px;
        width: 300px;
        padding: 2rem;
        font-size: 0.8rem;
        background: $surface2;
        z-index: 20;
        border: 1px solid black;
        border-radius: 0.5rem;

        .metric-component {
            width: 100%;
            display: flex;
            flex-direction: row;
            justify-content: start;
            align-items: center;

            .metric-name {
                width: 60%;
                color: $primary;
                font-weight: bold;
            }
        }

        #close-metric {
            position: absolute;
            cursor: pointer;
            font-size: 1.3rem;
            right: 2%;
            top: 2%;
            z-index: 25;
        }

        #close-metric:hover {
            transform: scale(1.2);
        }
    }

}</style>