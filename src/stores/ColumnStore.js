import { defineStore } from "pinia";
import { findColumn } from "../utility";


import columns from "@/data/columns.json"


// will be 100%
function calculateTotalVisibleWidth(list) {
    let sumWidth = 0;
    for (let key in list) {
        sumWidth += parseInt(list[key]["width"]);
    }
    return sumWidth;
}
const TOTALWIDTH = calculateTotalVisibleWidth(columns);

function scaleColWidth(currentWidth, currentTotal) {
    return Math.floor((currentWidth * window.innerWidth * 0.90) / currentTotal)
}


// store what columns are visible and are in which order

export const useColumnStore = defineStore("ColumnStore", {
    //state
    state: () => {
        return {
            columns,
        }
    },
    //getters
    getters: {
        isName() {
            return this.columns["name"].visibility;
        },
        nameOrder() {
            return this.columns["name"].order;
        },
        nameWidth() {
            // return scaleColWidth(this.columns["name"].width, calculateTotalVisibleWidth(this.columns));
            // return scaleColWidth(this.columns["name"].width, TOTALWIDTH);
            return this.columns["name"].width + "rem";
        },

        isLastHelped() {
            return this.columns["lastHelped"].visibility;
        },
        lastHelpedOrder() {
            return this.columns["lastHelped"].order;
        },
        lastHelpedWidth() {
            // return scaleColWidth(this.columns["lastHelped"].width, TOTALWIDTH);
            return this.columns["lastHelped"].width + "rem";
        },

        isAffect() {
            return this.columns["affect"].visibility;
        },
        affectOrder() {
            return this.columns["affect"].order;
        },
        affectWidth() {
            // return scaleColWidth(this.columns["affect"].width, TOTALWIDTH);
            return this.columns["affect"].width + "rem";
        },

        isHand() {
            return this.columns["hand"].visibility;
        },
        handOrder() {
            return this.columns["hand"].order;
        },
        handWidth() {
            // return scaleColWidth(this.columns["hand"].width, TOTALWIDTH);
            return this.columns["hand"].width + "rem";
        },

        isLastActive() {
            return this.columns["lastActive"].visibility;
        },
        lastActiveOrder() {
            return this.columns["lastActive"].order;
        },
        lastActiveWidth() {
            // return scaleColWidth(this.columns["lastActive"].width, TOTALWIDTH);
            return this.columns["lastActive"].width + "rem";
        },

        isLoc2min() {
            return this.columns["loc2min"].visibility;
        },
        loc2minOrder() {
            return this.columns["loc2min"].order;
        },
        loc2minWidth() {
            // return scaleColWidth(this.columns["loc2min"].width, TOTALWIDTH);
            return this.columns["loc2min"].width + "rem";
        },

        isViewCode() {
            return this.columns["viewCode"].visibility;
        },
        viewCodeOrder() {
            return this.columns["viewCode"].order;
        },
        viewCodeWidth() {
            // return scaleColWidth(this.columns["viewCode"].width, TOTALWIDTH);
            return this.columns["viewCode"].width + "rem";
        },

        isSubmission() {
            return this.columns["submission"].visibility;
        },
        submissionOrder() {
            return this.columns["submission"].order;
        },
        submissionWidth() {
            // return scaleColWidth(this.columns["submission"].width, TOTALWIDTH);
            return this.columns["submission"].width + "rem";
        },
    },

    //action
    actions: {
        changeOrder(columnName, order) {
            this.columns[columnName].order = order
            console.log(this.columns[columnName].order = order)
        },
        changeVisibility(columnName, newVisibility) {
            this.columns[columnName].visibility = newVisibility
        },
        toggleVisibility(columnName) {
            this.columns[columnName].visibility = !this.columns[columnName].visibility;
        }
    }

})