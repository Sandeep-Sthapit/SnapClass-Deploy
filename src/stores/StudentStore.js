import { defineStore } from "pinia"
import { findColumn } from "../utility";

import students from "@/data/students.json"
import { useColumnStore as columnStore } from './ColumnStore';


const studentData = students;
const timedColNames = ["lastHelped", "lastActive"]
const StringColNames = ["name", "affect", "hand", "submission"]

function parseTimeToSeconds(input) {
    if (input.toLowerCase() == "never") {
        return Number.MAX_SAFE_INTEGER;
    }
    let items = input.split(" ");
    let num = parseInt(items[0])
    let unit = items[1].toLowerCase();
    let returnVal = num;
    if (unit == "seconds") {
        return returnVal
    }
    if (unit.includes("min")) {
        return returnVal * 60
    }
    if (unit.includes("hour")) {
        return returnVal * 60 * 60
    }
    if (unit.includes("day")) {
        return returnVal * 60 * 60 * 24
    }
}

function compareDirection(a, b, colName, direction) {
    if (direction == 1) {
        return comparator(a, b, colName)
    } else if (direction == -1) {
        return -1 * comparator(a, b, colName)
    }
    return 0
}

function comparator(a, b, colName) {
    // string columns
    if (StringColNames.includes(colName)) {
        if (a[colName] < b[colName])
            return -1;
        if (a[colName] > b[colName])
            return 1;
        return 0;
    }
    // for timed ones
    else if (timedColNames.includes(colName)) {
        let aVAl = parseTimeToSeconds(a[colName])
        let bVAl = parseTimeToSeconds(b[colName])
        if (aVAl < bVAl)
            return -1;
        if (aVAl > bVAl)
            return 1;
        return 0;
    } else {
        console.log(a[colName])
        if (a[colName] < b[colName])
            return -1;
        if (a[colName] > b[colName])
            return 1;
        return 0;
    }
}

export const useStudentStore = defineStore("StudentStore", {
    //state
    state: () => {
        return {
            studentData,
        }
    },
    //getters
    getters: {
        getStudents() {
            return this.studentData
        },
        getHandRaised() {
            let retData = []
            this.studentData.forEach(function(student) {
                if (student.hand == "code" || student.hand == "other") {
                    retData.push(student)
                }
            })
            return retData;
        },
        getPinned() {
            let retData = []
            this.studentData.forEach(function(student) {
                if (student.isPinned == true) {
                    retData.push(student)
                }
            })
            return retData;
        },
    },

    //action
    actions: {
        pinStudent(studentId, bool) {
            let colIdx = findColumn(this.studentData, "id", studentId)
            this.studentData[colIdx].isPinned = bool
        },

        sortStudents(columnName) {
            let colDirection = columnStore().updateSortDirection(columnName)
            this.studentData = this.studentData.sort((a, b) => compareDirection(a, b, columnName, colDirection));
            // console.log(this.studentData);
        },

    }

})