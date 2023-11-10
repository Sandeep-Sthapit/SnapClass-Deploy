<script setup>
import { useStudentStore } from '@/stores/StudentStore.js';

import { ref } from 'vue'

let instances;

document.addEventListener('DOMContentLoaded', function () {
    var elems = document.querySelectorAll('select');
    var instances = M.FormSelect.init(elems, {});
});

const studentStore = useStudentStore();
let msgClicked = ref(false)
let isOpen = false;

function openClose() {
    isOpen = !isOpen;
    if (isOpen) {
        instances.open();
    } else {
        instances.close();
    }
}

const emit = defineEmits(['customChange'])

function openMsg() {
    msgClicked.value = true;
    studentStore.emptyCheckedStudents();
    studentStore.changeMsgMode(true);
}
function closeMsg() {
    msgClicked.value = false;
    studentStore.changeMsgMode(false);
    console.log(studentStore.msgMode)
}


const openMsgWindow = (event) => {
    emit('openMsgWindow')
}

</script>

<template>
    <div class="top-row-container">
        <div class="breadcrumb-container">
            <!-- <p class="breadcrumbs">
                CSC 110 - 001
            </p> -->
            <div class="dropdown-menu course-select">
                <div class="input-field col s12">
                    <select class="browser-default select-view">
                        <option value="" disabled selected>CSC 110 - 001</option>
                        <option value="1">CSC 110 - 002</option>
                        <option value="2">AP CS1 - 01</option>
                        <option value="3">AP CS1 - 02</option>
                    </select>
                    <!-- <label>Materialize Select</label> -->
                </div>
            </div>
            <!-- Dropdown Trigger -->
            <div class="dropdown-menu">
                <div class="input-field col s12">
                    <select class="browser-default select-view">
                        <option value="" disabled selected>Assignment 1</option>
                        <option value="1">Assignment 1</option>
                        <option value="2">Assignment 2</option>
                        <option value="3">Assignment 3</option>
                    </select>
                    <!-- <label>Materialize Select</label> -->
                </div>
            </div>
        </div>
        <div v-if="studentStore.msgMode" class="msg-options">
            <p class="instruction">Select Students to Send Message</p>
            <p class="compose-button btn-small waves-effect waves-light" @click="openMsgWindow">Compose Message</p>
            <p class="cancel-button btn-small waves-effect waves-light" @click="closeMsg">Cancel</p>
        </div>
        <div class="side-button">
            <p class="msg-button snapclass-button" @click="openMsg()"><i class="fa fa-envelope"></i></p>
            <!-- <p class="settings-button snapclass-button"><i class="fa fa-gear"></i></p> -->
            <div class="dropdown-2" style="float:right;">
                <p class="dropbtn settings-button snapclass-button"><i class="fa fa-gear"></i></p>
                <div class="dropdown-content-2" style="right:0;">
                    <p>Feature</p>
                    <p>Under</p>
                    <p>Development</p>
                </div>
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

.breadcrumb-container {
    display: flex;
    height: 100%;
    align-items: center;
    justify-content: start;

    .breadcrumbs {
        color: $primary;
        font-size: 16px;
        font-weight: bold;
        margin-right: 8px;
    }

    .course-select {
        margin-right: 0.5rem;
        select {
            border: 2px solid $primary;
            color: $primary;
            font-weight: bold;
        }
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

.msg-options {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;

    * {
        margin: 0 0.2rem;
        transition: 0.1s linear;
    }

    .instruction {
        color: $text-secondary;
        font-size: 1rem;
    }

    .cancel-button {
        background-color: red;
    }

    .compose-button:hover,
    .cancel-button:hover {
        transform: scale(1.05);
    }
}

.side-button {
    display: flex;
    align-items: center;
    justify-content: end;
    flex-direction: row;

    .dropdown-2 {
        position: relative;
        display: inline-block;
        cursor: pointer;
    }

    .dropdown-content-2 {
        display: none;
        position: absolute;
        right: 0;
        background-color: #f9f9f9;
        min-width: 160px;
        box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
        z-index: 50;
    }

    .dropdown-content-2 p {
        color: black;
        padding: 12px 16px;
        text-decoration: none;
        display: block;
    }

    .dropdown-content-2 p:hover {
        background-color: #f1f1f1;
    }

    .dropdown-2:hover .dropdown-content-2 {
        display: block;
    }
}

.msg-button,
.settings-button {
    font-size: 2rem;
    color: $primary;
    margin-left: 1rem;
    cursor: pointer;

    :hover {
        transform: scale(1.1);
    }
}

.dropdown-menu>div {
    margin: 0;
}
</style>