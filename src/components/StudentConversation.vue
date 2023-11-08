<script setup>
import { useStudentStore } from '@/stores/StudentStore.js';
import codeIcon from "../assets/icons/code.svg";
import data from "@/data/conversation.json"

import { ref } from 'vue'


let convData = ref(data)
const studentStore = useStudentStore();

const emit = defineEmits(['customChange'])
let message = ""

let hasMsgUrl = ref(false);
let imageText = ref("Add Image/Code")


function toggleImg() {
    hasMsgUrl.value = !hasMsgUrl.value;
    if (imageText.value == "Add Image/Code") {
        imageText.value = "Remove Image/Code"
    } else {
        imageText.value = "Add Image"
    }
}

function sendMsg() {
    const date = new Date();
    const time = date.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
    if (hasMsgUrl.value) {
        convData.value.push({
            "isTeacher": true,
            "text": message,
            "url": "https://res.cloudinary.com/sandeepsthapit/image/upload/v1698880243/snap-loop.png",
            "time": "today at " + time
        })
    } else {
        convData.value.push({
            "isTeacher": true,
            "text": message,
            "url": "",
            "time": "today at " + time
        })
    }
    // emit('hideConvo');
}

const props = defineProps({
    id: {
        type: String,
        required: true
    }
})
</script>

<template>
    <div class="conversation-container">
        <div class="top-row-container">
            <div class="close-button" @click="$emit('hideConvo')"><i class="fa fa-close"></i></div>
            <div class="breadcrumb-container">
                <p class="breadcrumbs">
                    <span>{{ studentStore.studentData[id].name }}</span>
                    <span class="msg-history-instruction"> Message History for</span>
                </p>
                <!-- Dropdown Trigger -->
                <div class="dropdown-menu">
                    <div class="input-field col s12">
                        <select class="browser-default select-view">
                            <option value="" disabled selected>Assignment 1</option>
                            <option value="1">Assignment 1</option>
                            <option value="2">Assignment 2</option>
                            <option value="3">Assignment 3</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
        <div class="msg-contents">
            <template v-for="(msg, index) in convData" :key="index">
                <div class="reply-container" :class="{ bySender: msg.isTeacher }">
                    <div class="messagebox">
                        <p>{{ msg.text }}</p>

                        <img v-if="msg.url != ''" :src="msg.url" alt="">
                    </div>
                    <p class="msg-time">{{ msg.time }}</p>
                </div>
            </template>
        </div>
        <div class="button-bar">
            <div class="message-details">
                <div class="msg-buttons">
                    <p class="codeIcon" @click="openCodeView"><img :src=codeIcon alt="" @click="toggleImg()"></p>
                    <p><i class="media-img fa fa-image" @click="toggleImg()"></i></p>
                </div>
                <div class="msg-area">
                    <div class="text-area input-field">
                        <textarea v-model="message" placeholder="type a message" id="textarea1"
                            class="materialize-textarea"></textarea>
                    </div>
                    <img v-if="hasMsgUrl"
                        src="https://res.cloudinary.com/sandeepsthapit/image/upload/v1698880243/snap-loop.png" alt="">
                </div>
                <p class="send-btn btn-small waves-effect" @click="sendMsg()">Send</p>
            </div>
        </div>
    </div>
</template>

<style lang="scss">
@import "@/assets/style/colors.module";

.top-row-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 2.5rem;
    margin: 0.5rem 0rem;
}

.msg-contents {
    width: 100%;
    height: 85vh;
    overflow: auto;
    display: flex;
    flex-direction: column;
    justify-content: start;

    .reply-container {
        align-self: start;
    }

    .messagebox {
        background-color: #FFF;
        padding: 1rem;
        border-radius: 0.5rem;

        img {
            max-height: 100px;
        }
    }

    .bySender {
        align-self: end;

        .messagebox {
            background-color: $primary;
            color: white;
        }
    }

    .msg-time {
        font-size: 0.8rem;
    }
}

.message-details {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;


    .msg-buttons {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: start;

        img {
            height: 3rem;
            margin-right: 0.5rem;
            cursor: pointer;
        }

        .media-img {
            font-size: 2.5rem;
            cursor: pointer;
        }

        *:hover {
            transform: scale(1.05);
        }
    }

    .msg-area {
        width: 800px;
        margin-left: 1rem;
        min-height: 1rem;
        background-color: white;
        border: 1px solid black;
        border-radius: 1rem;

        .text-area {
            margin: 0;
            padding: 0 1rem;
        }

        textarea {
            border-bottom: none;
        }
    }

    .send-btn {
        margin-bottom: 0.75rem;
        font-size: 1rem;
    }
}



.breadcrumb-container {
    display: flex;
    height: 100%;
    align-items: center;
    justify-content: start;

    .breadcrumbs {
        color: $primary;
        font-size: 1.2rem;
        font-weight: bold;
        margin-right: 8px;
    }

    .msg-history-instruction {
        color: $text-secondary;
        font-size: 1rem;
        font-weight: normal;
    }

    .select-view {
        border: 1px solid $text-surface;
        border-radius: 4px;
        padding: 2px;
        height: 2rem;
    }

    #save-view-button {
        font-size: 2rem;
        color: $primary2;
        margin-left: 8px;
    }
}

.conversation-container {
    width: 1024px;
    height: 100vh;
    padding: 1rem;
    position: fixed;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    background: $surface2;
    z-index: 300;
    color: $text-secondary;

    .student-box {
        width: 100%;
    }

    .close-button {
        position: absolute;
        top: 1%;
        right: 2%;
        font-size: 2rem;
        color: $text-secondary;
        cursor: pointer;

        :hover {
            transform: scale(1.1);
        }

        z-index: 20;
    }
}

.button-bar {
    position: absolute;
    padding: 0.5rem 1rem;
    width: 100%;
    bottom: 2%;
    max-height: 40vh;
    left: 0%;
    display: flex;
    align-items: end;
    justify-content: space-between;
    flex-direction: row;
}
</style>