<script setup>
import { ref } from 'vue'

const showCodeView = (event) => {
    emit('showCodeView', event)
}

const hasMsgUrl = ref(props.msgUrl.length > 2 ? true:false)
console.log(hasMsgUrl)


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
    <div class="message-pop-container">
        <div class="close-button" @click="$emit('hideModal')"><i class="fa fa-close"></i></div>
        <div class="message-details">
            <p>{{ msgText }}</p>
            <img v-if="hasMsgUrl" :src="msgUrl" alt="">
        </div>
        <div class="button-containers">
            <p id="reply-button" class="btn-small waves-effect">Reply</p>
            <p id="view-code-button" @click="showCodeView" class="btn-small waves-effect">View Code</p>
        </div>
    </div>
</template>

<style lang="scss">
@import "@/assets/style/colors.module";

.message-pop-container{
    width: 800px;
    min-height: 250px;
    padding: 1rem;
    position: absolute;
    top: 50%;
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