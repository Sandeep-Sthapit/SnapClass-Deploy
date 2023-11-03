<script setup>
let instances;

document.addEventListener('DOMContentLoaded', function () {
    var elems = document.querySelectorAll('select');
    var instances = M.FormSelect.init(elems, {});
});

let isOpen = false;
function openClose() {
    isOpen = !isOpen;
    if (isOpen) {
        instances.open();
    } else {
        instances.close();
    }
}


</script>

<template>
    <div class="top-row-container">
        <div class="breadcrumb-container">
            <p class="breadcrumbs">
                CSC 110 - 001
            </p>
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
        <div class="side-button">
            <a href="" class="msg-button snapclass-button" ><i class="fa fa-envelope"></i></a>
            <a href="" class="settings-button snapclass-button" ><i class="fa fa-gear"></i></a>
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
.msg-button, .settings-button {
    font-size: 2rem;
    color: $primary;
    margin-left: 1rem;
    :hover{
        transform: scale(1.1);
    }
}
.dropdown-menu>div{
    margin: 0;
}
</style>