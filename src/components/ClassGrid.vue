<script setup>

import StudentCard from './StudentCard.vue';
import draggable from "vuedraggable";
import { reactive } from 'vue';

var row = 2;
var column = 2;

let enabled = true;
let dragging = false;

const game = reactive({
    list: generateList(row, column),
    draggingInfo: dragging ? "under drag" : "",
})
function generateList(row, col) {
    let returnList = {}
    for (let rIdx = 1; rIdx <= row; rIdx++) {
        for (let cIdx = 1; cIdx <= col; cIdx++) {
            let key = rIdx + "+" + cIdx;
            if (rIdx == cIdx) {
                returnList = Object.assign({}, returnList, { [key]: [{ name: rIdx }] });
            }
            else {
                returnList = Object.assign({}, returnList, { [key]: [] });
            }
        }
    }
    return returnList;
}

function test() {
    console.log(JSON.stringify(game.list))

}

function log(evt) {
    // get key from the element ID
    let previousContainer = evt.from.id.split('-')[1]
    let currentContainer = evt.to.id.split('-')[1]
    if (game.list[currentContainer].length > 1) {

        window.console.log(game.list[currentContainer]);
        let oldItem = game.list[currentContainer][0]
        // get data name from the element ID
        let itemName = evt.item.id.split('-')[1]
        let newItem = {};
        if (oldItem.name == itemName) {
            oldItem = JSON.parse(JSON.stringify(game.list[currentContainer][1]))
            newItem = JSON.parse(JSON.stringify(game.list[currentContainer][0]))
        } else {
            oldItem = JSON.parse(JSON.stringify(game.list[currentContainer][0]))
            newItem = JSON.parse(JSON.stringify(game.list[currentContainer][1]))
        }
        // window.console.log(oldItem);
        // window.console.log(newItem);
        game.list[currentContainer] = [newItem]
        game.list[previousContainer] = [oldItem]
    }
    console.log(JSON.stringify(game.list))
}

function log2(row, col) {
    let key = row + "+" + col;
    console.log(JSON.stringify(game.list[key]))
}
defineProps({
})
</script>

<template>
    <div class="grid-area" @click="test()">
        <div class="grid-container">
            <div class="row-container" v-for="index in row" :key="index">
                <div class="column-container" v-for="col_idx in column" :key="index + '+' + col_idx">
                    <div class="cell-container">
                        <draggable :id="'drag-' + index + '+' + col_idx" class="list-group"
                            :list="game.list[index + '+' + col_idx]" group="people" @end="log" itemKey="name">
                            <template #item="{ element }">
                                <div class="list-group-item" :id="'item-' + element.name">{{ element.name }}</div>
                            </template>
                        </draggable>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
@import "../assets/style/colors.module";

.grid-area {
    width: 100vw;
    height: 60vh;
    background-color: $secondary;
    margin: 0;
    padding: 0;

    .grid-container {
        width: 100%;
        height: 100%;
        margin: 0;
        padding: 0;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;

        .row-container {
            width: 100%;
            height: 20%;
            margin: 0;
            padding: 0;
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
        }

        .column-container {
            width: 20%;
            height: 100%;
            margin: 0;
            padding: 0;
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
        }

        .cell-container {
            border: 1px solid black;
            width: 70%;
            height: 70%;
            background-color: lightcoral;
        }

        .cell-container:hover {
            filter: brightness(120%);
        }

    }

    .test-class {
        width: 90px;
        height: 90px;
        padding: 10px;
        background: lime;
    }

    .list-group {
        width: 90px;
        height: 90px;
        padding: 10px;
        background: lime;
    }

    .list-group-item {
        color: $text-secondary;
        text-transform: uppercase;
        font-size: 1.5vh;
        width: 40px;
        height: 40px;
        padding: 10px;
        background: yellow;
    }
}

.buttons {
    margin-top: 35px;
}

.ghost {
    opacity: 0.5;
    background: #c8ebfb;
}

.not-draggable {
    cursor: no-drop;
}
</style>
