<script setup>

import { AFFECT_LIST, AFFECT_LABEL } from '@/affect.js'
import { HAND, HANDS_TEXT, isHandRaised } from '@/handraise.js'

import { useColumnStore } from '@/stores/ColumnStore.js';
import { useStudentStore } from '@/stores/StudentStore.js';

import { ref } from 'vue'

const columnStore = useColumnStore();
const studentStore = useStudentStore();

const AFFECTLIST = AFFECT_LIST
const AFFECTLABEL = AFFECT_LABEL

const HANDS = HAND
const HANDSTEXT = HANDS_TEXT

const emit = defineEmits(['customChange'])
const showStar = ref(props.isPinned)

function togglePin() {
    showStar.value = !showStar.value;
    studentStore.pinStudent(props.id, showStar.value)
}

const openCodeView = (event) => {
  emit('showCodeView', props)
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
    <div class="student-pop-container">
        <div class="top-row">
            <div class="name-container">
                <span class="star-icon fa fa-star" :class="{ checked: isPinned }" @click="togglePin()"></span>
                <p class="student-name">{{ name }}</p>
                <div class="hand-raise">
                    <div v-if="isHandRaised(handRaised)" href="">
                        <img :src=HANDS[handRaised] alt="" :title=HANDSTEXT[handRaised]>
                    </div>
                </div>
            </div>
            <div class="close-button" @click="$emit('hideStudentDetails')"><i class="fa fa-close"></i></div>
        </div>
        <div class="student-details">
            <div class="metric-container">
                <div class="metric-component">
                    <p class="metric-name">{{ columnStore.columns["lastActive"].name }}</p>
                    <p>{{ lastActive }}</p>
                </div>
                <div class="metric-component">
                    <p class="metric-name">{{ columnStore.columns["loc2min"].name }}</p>
                    <p>{{ loc2min }}</p>
                </div>
                <div class="metric-component">
                    <p class="metric-name">{{ columnStore.columns["affect"].name }}</p>
                    <img class="affectIcon" :src=AFFECTLIST[affect.toLowerCase()] :alt=AFFECTLABEL[affect]
                        :title=AFFECTLABEL[affect]>
                </div>
                <div class="metric-component">
                    <p class="metric-name">{{ columnStore.columns["lastHelped"].name }}</p>
                    <p>{{ lastHelped }}</p>
                </div>
            </div>
            <div class="message-container">
                <p class="small-text">Student Message</p>
                <div class="msg-box">
                    <p>{{ msgText }}</p>

                </div>
                <div class="reply-container">
                    <p id="reply-button" class="btn-small waves-effect">Reply</p>
                </div>
            </div>

        </div>
        <div class="code-section">
            <p class="code-header">Code</p>
            <div class="code-window">
                <iframe
                    src="https://snap.berkeley.edu/snap/snap.html#present:Username=cornelios207&ProjectName=Missing%20square%20illusion&editMode&noRun"
                    frameborder="0"></iframe>
                <p id="view-code-button" class="btn-small waves-effect"  @click="openCodeView">View Code</p>
            </div>
        </div>
    </div>
</template>

<style lang="scss">
@import "@/assets/style/colors.module";

.student-pop-container {
    width: 800px;
    height: 600px;
    padding: 1rem;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: $surface2;
    border-radius: 1rem;
    border: 2px solid black;
    z-index: 80;
    color: $text-secondary;

    .top-row {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
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

    .star-icon {
        cursor: pointer;
        transition: 0.1s linear;
    }

    .star-icon:hover {
        transform: scale(1.1);
    }

    .checked {
        color: #EFCE4A;
    }

    .name-container {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: start;
        font-size: 1.5rem;

        p {
            margin-left: 0.5rem;
        }
    }

    .close-button {
        font-size: 2rem;
        color: $text-secondary;
        cursor: pointer;

        :hover {
            transform: scale(1.1);
        }

        z-index: 20;
    }

    .student-details {
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;

        .metric-container {
            width: 50%;

            .metric-component {
                width: 100%;
                display: flex;
                flex-direction: row;
                justify-content: start;
                align-items: center;

                .metric-name {
                    width: 50%;
                    color: $primary;
                    font-weight: bold;
                }

                .affectIcon {
                    height: 24px;
                }
            }
        }

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
                height: 100px;
                overflow: hidden;
            }

            .reply-container {
                margin-top: 0.1rem;
                display: flex;
                flex-direction: row;
                justify-content: end;
            }
        }

    }

    .code-section {
        width: 100%;
        .code-window {
            width: 100%;
            background: black;
            height: 335px;
            overflow: scroll;

            iframe{
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

    #view-code-button {
        position: absolute;
        bottom: 5%;
        right: 2%;
        // transform: translateX(-50%);
    }

}</style>