<script setup>
import { ref, computed } from 'vue'
import { useStudentStore } from '@/stores/StudentStore.js';


const studentStore = useStudentStore();
let hasMsgUrl = ref(false);
let imageText = ref("Add Image")


function toggleImg() {
    hasMsgUrl.value = !hasMsgUrl.value;
    if (imageText.value == "Add Image") {
        imageText.value = "Remove Image"
    } else {
        imageText.value = "Add Image"
    }
}

function addToList(id) {
    if (studentStore.checkedStudents[id] == false) {
        studentStore.removeStudentsList(id);
    }
    else {
        studentStore.addStudentsToCheckList(id);
    }
}

const props = defineProps({
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
    <div class="compose-container">
        <div class="close-button" @click="$emit('hideCompose')"><i class="fa fa-close"></i></div>
        <p class="instruction-text">Compose Message to Students</p>
        <div class="main-body">
            <div class="message-details">
                <div class="text-area input-field">
                    <textarea id="textarea1" class="materialize-textarea"></textarea>
                    <label for="textarea1">Message</label>
                </div>
                <div class="img-div">

                    <img v-if="hasMsgUrl"
                        src="https://res.cloudinary.com/sandeepsthapit/image/upload/v1698880243/snap-loop.png" alt="">
                </div>
                <p id="add-img-button" class="btn-small waves-effect" @click="toggleImg">{{ imageText }}</p>
            </div>
            <div class="student-lists">
                <p class="instruction">Select Students</p>
                <div class="student-list">
                    <form v-for="student in studentStore.studentData" :key="student.id">
                        <label>
                            <input v-model="studentStore.checkedStudents[student.id]" class="filled-in" type="checkbox"
                                @change="addToList(student.id)">
                            <span>{{ student.name }}</span>
                        </label>
                    </form>
                </div>
            </div>
        </div>
        <div class="button-containers">
            <p id="send-button" class="btn-small waves-effect" @click="$emit('hideCompose')">Send</p>
            <p id="cancel-button" class="btn-small waves-effect" @click="$emit('hideCompose')">Cancel
            </p>
        </div>
    </div>
</template>

<style lang="scss">
@import "@/assets/style/colors.module";

.compose-container {
    width: 800px;
    height: 90vh;
    padding: 1rem;
    position: absolute;
    top: 5vh;
    left: 50%;
    display: flex;
    flex-direction: column;
    justify-content: start;
    transform: translateX(-50%);
    border: 1px solid black;
    border-radius: 1rem;
    background: $surface2;
    z-index: 100;
    color: $text-secondary;

    .instruction-text {
        margin: 0.5rem 0rem;
    }

    .instruction {}

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

    .main-body {
        display: flex;
        flex-direction: row;
        align-items: start;
        justify-content: space-between;
        width: 100%;
        height: 80vh;
    }

    .student-lists {
        width: 35%;
        min-height: 300px;
        height: 80vh;
        border: 1px solid black;
        background-color: white;
    }

    .student-list {
        width: 100%;
        background-color: white;
    }

    .message-details {
        height: 80vh;
        width: 60%;
        display: flex;
        flex-direction: column;
        justify-content: start;
        border: 1px solid black;
        background-color: white;

        .text-area {
            height: auto;
            width: 100%;
        }

        .img-div {
            width: 100%;
            max-height: 150px;

            img {
                max-height: 150px;
            }
        }
    }


    .button-containers {
        width: 100%;
        display: flex;
        padding: 0.5rem 1rem;
        flex-direction: row;
        justify-content: end;

        p {
            margin-right: 1rem;
        }
    }

    #cancel-button {
        background-color: red;
    }

    #add-img-button {
        position: absolute;
        bottom: 2%;
        right: 2%;
    }
}
</style>