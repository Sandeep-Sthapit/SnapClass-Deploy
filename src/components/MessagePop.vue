<script setup>
import { ref } from 'vue'
import { useStudentStore } from '@/stores/StudentStore.js';


const studentStore = useStudentStore();
const emit = defineEmits(['customChange'])

const hasMsgUrl = ref(props.msgUrl.length > 2 ? true:false)

const openCodeView = (event) => {
  emit('showCodeView', studentStore.studentData[props.id])
}


const props = defineProps({
    id:{
        type: String,
        required: true
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
    <div class="message-pop-container">
        <div class="close-button" @click="$emit('hideModal')"><i class="fa fa-close"></i></div>
        <div class="message-details">
            <p>{{ msgText }}</p>
            <img v-if="hasMsgUrl" :src="msgUrl" alt="">
        </div>
        <div class="button-containers">
            <p id="reply-button" class="btn-small waves-effect" @click="$emit('openConvo')">Reply</p>
            <p id="view-code-button" @click="openCodeView()" class="btn-small waves-effect">View Code</p>
        </div>
    </div>
</template>

<style lang="scss">
@import "@/assets/style/colors.module";

.message-pop-container{
    width: 800px;
    min-height: 250px;
    padding: 1rem;
    position: fixed;
    top: 50vh;
    left: 50%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    transform: translate(-50%, -50%);
    border: 1px solid black;
    border-radius: 1rem;
    background: $surface2;
    z-index: 100;
    color: $text-secondary;
    .close-button{
        position: absolute;
        top: 2%;
        right: 2%;
        font-size: 2rem;
        color: $text-secondary;
        cursor: pointer;
        :hover{
            transform: scale(1.1);
        }
        z-index: 20;
    }
    .message-details{
        display: flex;
        align-items: start;
        justify-content: start;
        flex-direction: column;
    }

    img{
        max-width: 200px;
    }
    .button-containers{
        width: 100%;
        display: flex;
        padding: 0.5rem 1rem;
        flex-direction: row;
        justify-content: end;
        p{
            margin-right: 1rem;
        }
    }
}

</style>