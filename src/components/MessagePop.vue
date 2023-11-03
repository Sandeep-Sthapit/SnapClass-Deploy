<script setup>

defineProps({
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
            <img v-if=msgUrl :src=msgUrl alt="">
        </div>
        <div class="button-containers">
            <a id="reply-button" class="btn-small waves-effect">Reply</a>
            <a id="view-code-button" class="btn-small waves-effect">View Code</a>
        </div>
    </div>
</template>

<style lang="scss">
@import "@/assets/style/colors.module";

.message-pop-container{
    width: 800px;
    height: auto;
    padding: 1rem;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: $surface2;
    z-index: 100;
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
        a{
            margin-right: 1rem;
        }
    }
}

</style>