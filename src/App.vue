<script setup>
import HeaderItem from './components/HeaderItem.vue';
import MessagePop from './components/MessagePop.vue'
import StudentPop from './components/StudentPop.vue'
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
    "code2Min": 12,
    "handRaised": "code",
    "helpMessage": "I need help with this",
    "codeURL": "",
    "teacherMessage": "",
    "isPinned": false,
    "submission": ""
})


let msgOpen = ref(false)
let studentOpen = ref(false)

let modalOpen = ref(false)

let msgText = ref(defaultMsg)
let msgImgUrl = ref(helpMsgImages["loop"])

function openModal(msg, img) {
    msgOpen.value = true;
    modalOpen.value = true;
}
function closeModal() {
    msgOpen.value = false;
    modalOpen.value = false;
}
function openStudentModal(student) {
    // console.log(student)
    defaultStudent.value = student;
    studentOpen.value = true;
    modalOpen.value = true;
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
            <HeaderItem />
            <div class="wrapper">
                <!-- <div v-for="column in columnStore.columns" :key="column.name"> {{ column.name }} {{ column.order }} {{ column.visibility }}</div>
        <button @click="columnStore.changeOrder('affect', 5)">Randomize</button>
        <button @click="columnStore.toggleVisibility('lastHelped')">Hide</button> -->
                <!-- <StudentRowItem name="Sandy" lastHelped="23 minutes ago" affect="happy" handRaised="code" lastActive="3 mins ago" loc2min="4 lines" submission="N/A"/> -->

                <Bins @showStudentDetails="openStudentModal" name="Pinned Students" :studentData="studentStore.getPinned"
                    type="pinned" />
                <Bins @showStudentDetails="openStudentModal" name="All Students" :studentData="studentStore.getStudents" />

            </div>
        </div>
        <StudentPop v-if="studentOpen" @hideStudentDetails="closeStudentModal" :id="defaultStudent.id"
            :name="defaultStudent.name" :lastHelped="defaultStudent.lastHelped" :affect="defaultStudent.affect"
            :handRaised="defaultStudent.hand" :lastActive="defaultStudent.lastActive"
            :loc2min="defaultStudent.loc2min" :submission="defaultStudent.submission" :isPinned="defaultStudent.isPinned"
            :msgText="defaultStudent.helpMessage" :msgUrl="defaultStudent.codeURL" />
        <MessagePop v-if="msgOpen" @hideModal="closeModal" @showModal="openModal" :msgText=msgText :msgUrl=msgImgUrl />
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
}
</style>
