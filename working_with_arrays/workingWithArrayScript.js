var ETR = {};
ETR.array1 = [15, 2, 0, 5, -3, 16, 4, 18, 9, 5];

(function descendingSort(array) {
    array.sort(function (e1, e2) {
        return e2 - e1;
    })
})(ETR.array1);

console.log(ETR.array1);

ETR.array2 = (function createArrayFromFirstElements(array, elementsAmount) {
    return array.slice(0, elementsAmount)
})(ETR.array1, 5);
console.log(ETR.array2);

ETR.array3 = (function createArrayFromLastElements(array, elementsAmount) {
    return array.slice(array.length - elementsAmount)
})(ETR.array1, 5)
console.log(ETR.array3);

console.log(ETR.array1.reduce(function (accumulator, currentElement) {
    if (currentElement % 2 === 0) {
        return accumulator + currentElement;
    } else {
        return accumulator;
    }
}, 0));

ETR.array4 = [];
(function fillArrayWithNumbers(array, startNumber, finishNumber) {
    for (var i = startNumber; i <= finishNumber; i++) {
        array.push(i);
    }
})(ETR.array4, 1, 100);
console.log(ETR.array4);

console.log(ETR.array4.reduce(function (accumulator, currentElement) {
    if (currentElement % 2 === 0) {
        return accumulator + Math.pow(currentElement, 2);
    } else {
        return accumulator;
    }
}, 0));