function findColumn(myArray, columnName) {
    for (let i = 0; i < myArray.length; i++) {
        if (myArray[i].name == columnName) {
            return i;
        }
    }
    return -1;
};


export {
    findColumn
}