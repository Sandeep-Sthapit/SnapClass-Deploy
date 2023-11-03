<script setup>
import avatar from "../assets/student.jpg";
import hand from "../assets/icons/hand.png";
import studentColors from '../assets/style/colors.module.scss';

// import affect images
import anxious from "../assets/affect/anxious.png";
import bored from "../assets/affect/bored.png";
import confused from "../assets/affect/confused.png";
import curious from "../assets/affect/curious.png";
import excited from "../assets/affect/excited.png";
import focused from "../assets/affect/focused.png";
import frustrated from "../assets/affect/frustrated.png";
import happy from "../assets/affect/happy.png";
import satisfied from "../assets/affect/satisfied.png";

const AFFECTLIST = {
    "happy": happy,
    "anxious": anxious,
    "bored": bored,
    "confused": confused,
    "curious": curious,
    "excited": excited,
    "focused": focused,
    "frustrated": frustrated,
    "satisfied": satisfied
}

const defaultImg = avatar;
var emoji = AFFECTLIST["happy"];

const COLORS = studentColors;

function getBarColor(progessLevel, thresholdLevel) {
    var studentProgress = "ok";
    if (progessLevel > 1.33 * thresholdLevel) {
        studentProgress = "good";
    } else if (progessLevel < 1.33 * thresholdLevel) {
        studentProgress = "bad";
    }

    if (studentProgress == "bad") {
        return COLORS.studentBad;
    } else if (studentProgress == "ok") {
        return COLORS.studentOk;
    } else {
        return COLORS.studentGood;
    }
}


defineProps({
    name: {
        type: String,
        required: true
    },
    handRaised: {
        type: Boolean,
        default: false,
        required: true
    },
    thresholdLevel: {
        type: Number,
        default: 50,
        required: true
    },
    progessLevel: {
        type: Number,
        default: 60,
        required: true
    },
})

</script>

<template>
    <div class="student-container">
        <div class="student-card">
            <div class="avatar-area">
                <div class="indicator-bar">
                    <div class="bar-fill"
                        :style="{ backgroundColor: getBarColor(struggleStatus), height: progessLevel + '%' }">

                    </div>
                    <div class="threshold-line" :style="{ top: thresholdLevel + '%' }">

                    </div>
                </div>
                <div class="avatar-icon">
                    <img :src=defaultImg alt="" :style="{ borderColor: getBarColor(struggleStatus) }">
                </div>
                <div class="student-status">
                    <div class="hand-raise">
                        <img v-if="handRaised" :src=hand alt="">
                    </div>
                    <div class="affect">
                        <img :src=emoji alt="">
                    </div>
                </div>
            </div>
            <p class="student-name">
                {{ name }}
            </p>
            <a class="waves-effect waves-light btn">Select Student</a>
        </div>
    </div>
</template>

<style lang="scss">
@import "../assets/style/colors.module";

.student-container {
    background-color: $background;
    height: 20vh;
    width: 20vh;
    padding: 4%;
    display: flex;
    align-items: center;
    justify-content: center;

    * {
        position: relative;
    }

    .student-card {
        display: flex;
        width: 100%;
        height: 100%;
        align-items: center;
        justify-content: space-around;
        flex-direction: column;

        .avatar-area {
            position: relative;
            display: flex;
            height: 70%;
            width: 100%;
            align-items: center;
            justify-content: space-around;
            flex-direction: row;

            * {
                margin: 2% 4%;
                flex-basis: auto;
            }

            .indicator-bar {
                width: 10%;
                padding: 0;
                border: 1px solid black;
                height: 90%;
                background-color: #AAA;

                .bar-fill {
                    position: absolute;
                    bottom: 0%;
                    width: 100%;
                    margin: 0;
                    padding: 0;
                }

                .threshold-line {
                    height: 2px;
                    width: 100%;
                    background-color: black;
                    position: absolute;
                    top: 50%;
                    margin: 0;
                    padding: 0;
                    transform: translateY(-50%);
                }
            }

            .avatar-icon {
                width: 60%;
                height: 100%;
                padding: 0;
                display: flex;
                align-items: center;
                justify-content: center;

                img {
                    width: 100%;
                    border-radius: 50%;
                    border: 4px solid black;
                }
            }

            .student-status {
                width: 20%;
                padding: 0;
                height: 100%;
                display: flex;
                align-items: center;
                flex-direction: column;
                justify-content: space-between;

                div {
                    width: 100%;

                    img {
                        width: 100%;
                    }
                }
            }
        }
    }


    .student-name {
        color: $text-secondary;
        text-transform: uppercase;
        font-size: 1.5vh;
    }
}
</style>
