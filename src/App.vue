<script setup>
import ClassGrid from './components/ClassGrid.vue';
import StudentRowItem from './components/StudentRowItem.vue';
import HeaderItem from './components/HeaderItem.vue';
import Bins from './components/Bins.vue'

import { useColumnStore } from './stores/ColumnStore.js';

const columnStore = useColumnStore();

console.log("HELLO")
console.log(columnStore)
</script>

<template>
  <div class="class-view">
    <HeaderItem />
    <div class="wrapper">
        <!-- <div v-for="column in columnStore.columns" :key="column.name"> {{ column.name }} {{ column.order }} {{ column.visibility }}</div>
        <button @click="columnStore.changeOrder('affect', 5)">Randomize</button>
        <button @click="columnStore.toggleVisibility('lastHelped')">Hide</button> -->
      <!-- <StudentRowItem name="Sandy" lastHelped="23 minutes ago" affect="happy" handRaised="code" lastActive="3 mins ago" loc2min="4 lines" submission="N/A"/> -->
      <Bins binName="bin 1"  />
      <!-- <HelloWorld /> -->
    </div>
</div>
</template>

<style scoped>
.class-view{
    background-color: white;
    width: 100%;
    height: 100%;
    padding: 1rem;
}
.wrapper{
    background-color: white;
    color: black;
}
</style>
