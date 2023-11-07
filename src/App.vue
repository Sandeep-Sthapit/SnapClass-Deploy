<script setup>
import HeaderItem from './components/HeaderItem.vue';
import MessagePop from './components/MessagePop.vue'
import StudentPop from './components/StudentPop.vue'
import CodeView from './components/CodeView.vue'
import ComposeMessage from './components/ComposeMessage.vue'
import HandRaiseContainer from './components/HandRaiseContainer.vue'
import StudentConversation from './components/StudentConversation.vue'
import Bins from './components/Bins.vue'
import { ref } from 'vue'

import { useColumnStore } from './stores/ColumnStore.js';
import { useStudentStore } from './stores/StudentStore.js';

const columnStore = useColumnStore();
const studentStore = useStudentStore();

const helpMsgImages = {
    loop: "https://res.cloudinary.com/sandeepsthapit/image/upload/v1698880243/snap-loop.png",
    conditional: "https://res.cloudinary.com/sandeepsthapit/image/upload/v1698880243/snap-loop.png",
    function: "https://res.cloudinary.com/sandeepsthapit/image/upload/v1698880243/snap-loop.png",
}


let defaultMsg = "I need help"
let defaultStudent = ref({
    "id": 28,
    "name": "Default",
    "lastHelped": "56 minutes ago",
    "affect": "Focused",
    "lastActive": "19 seconds",
    "loc2min": 12,
    "hand": "code",
    "msgText": "I need help with this",
    "msgURL": "",
    "teacherMessage": "",
    "isPinned": false,
    "submission": ""
})


let composeMsg = ref(false)
let msgOpen = ref(false)
let studentOpen = ref(false)
let codeOpen = ref(false)
let conversationView = ref(false)
let msgStudentId = ref(defaultStudent.value.id)

let modalOpen = ref(false)

let msgText = ref(defaultMsg)
let msgImgUrl = ref(helpMsgImages["loop"])

function openConvo() {
    conversationView.value = true;
    codeOpen.value = false;
    modalOpen.value = true;
    studentOpen.value = false;
}
function closeConvo() {
    conversationView.value = false;
}



function openMsg(student) {
    msgStudentId.value = student.id;
    msgText.value = student.msgText;
    msgImgUrl.value = student.msgUrl;
    msgOpen.value = true;
    modalOpen.value = true;
}
function closeMsg() {
    msgOpen.value = false;
    modalOpen.value = false;
}

function openCompose() {
    composeMsg.value = true;
    codeOpen.value = false;
    modalOpen.value = true;
    studentOpen.value = false;
}
function closeCompose() {
    composeMsg.value = false;
    modalOpen.value = false;
}

function openCode(student) {
    defaultStudent.value = student;
    codeOpen.value = true;
    modalOpen.value = true;
    studentOpen.value = false;
}
function closeCode() {
    codeOpen.value = false;
    modalOpen.value = false;
}

function openStudentModal(student) {
    defaultStudent.value = student;
    studentOpen.value = true;
    modalOpen.value = true;
    codeOpen.value = false;
}
function closeStudentModal() {
    studentOpen.value = false;
    modalOpen.value = false;
}

</script>

<template>
    <div class="class-view">
        <!-- <button @click="studentStore.sortStudents('lastHelped')">sort name</button> -->
        <div class="page-container" :class="{ noClick: modalOpen }">
            <HeaderItem @openMsgWindow="openCompose()" />
            <div class="wrapper">
                <!-- <div v-for="column in columnStore.columns" :key="column.name"> {{ column.name }} {{ column.order }} {{ column.visibility }}</div>
        <button @click="columnStore.changeOrder('affect', 5)">Randomize</button>
        <button @click="columnStore.toggleVisibility('lastHelped')">Hide</button> -->
                <!-- <StudentRowItem name="Sandy" lastHelped="23 minutes ago" affect="happy" handRaised="code" lastActive="3 mins ago" loc2min="4 lines" submission="N/A"/> -->
                <HandRaiseContainer @showStudentDetails="openStudentModal" @showHelpMsg="openMsg" @showCodeView="openCode"
                    name="Hand Raised" :studentData="studentStore.getHandRaised" type="pinned" />
                <Bins @showStudentDetails="openStudentModal" @showHelpMsg="openMsg" @showCodeView="openCode"
                    name="Pinned Students" :studentData="studentStore.getPinned" type="pinned" />
                <Bins @showStudentDetails="openStudentModal" @showHelpMsg="openMsg" @showCodeView="openCode"
                    name="All Students" :studentData="studentStore.getStudents" />

            </div>
        </div>
        <StudentPop v-if="studentOpen" @hideStudentDetails="closeStudentModal" @openConvo="openConvo"
            @showCodeView="openCode" :id="defaultStudent.id" :name="defaultStudent.name"
            :lastHelped="defaultStudent.lastHelped" :affect="defaultStudent.affect" :handRaised="defaultStudent.hand"
            :lastActive="defaultStudent.lastActive" :loc2min="defaultStudent.loc2min"
            :submission="defaultStudent.submission" :isPinned="defaultStudent.isPinned" :msgText="defaultStudent.msgText"
            :msgUrl="defaultStudent.msgUrl" />
        <CodeView v-if="codeOpen" @hideCode="closeCode" :id="defaultStudent.id" :name="defaultStudent.name"
            :lastHelped="defaultStudent.lastHelped" :affect="defaultStudent.affect" :handRaised="defaultStudent.hand"
            :lastActive="defaultStudent.lastActive" :loc2min="defaultStudent.loc2min"
            :submission="defaultStudent.submission" :isPinned="defaultStudent.isPinned" :msgText="defaultStudent.msgText"
            :msgUrl="defaultStudent.msgUrl" />
        <MessagePop v-if="msgOpen" @hideModal="closeMsg" @openConvo="openConvo" @showCodeView="openCode" :msgText="msgText" :id="msgStudentId"
            :msgUrl="msgImgUrl" />
        <ComposeMessage v-if="composeMsg" @hideCompose="closeCompose()" :msgText="msgText" :msgUrl="msgImgUrl" />
        <StudentConversation v-if="conversationView" @hideConvo="closeConvo()" :id="defaultStudent.id"
            :name="defaultStudent.name" />
    </div>
</template>

<style scoped>
.class-view {
    background-color: white;
    width: 100%;
    height: 100%;
    padding: 1rem;
}

.wrapper {
    background-color: white;
    color: black;
}

.noClick {
    pointer-events: none;
    opacity: 0.5
}</style>
