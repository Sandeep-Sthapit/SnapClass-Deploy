function findColumn(myArray, prop, val) {
    for (let i = 0; i < myArray.length; i++) {
        if (myArray[i][prop] == val) {
            return i;
        }
    }
    return -1;
};


export {
    findColumn
}