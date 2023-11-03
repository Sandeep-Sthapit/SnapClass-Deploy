import { defineStore } from "pinia"
import { findColumn } from "../utility";

import students from "@/data/students.json"


const studentData = students

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
                if (student.handRaised == "code" || student.handRaised == "other") {
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
    }

})