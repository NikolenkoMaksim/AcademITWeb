var array1 = [15, 2, 0, 5, -3, 16, 4, 18, 9, 5];

function descendingSort(array) {
    return array.sort(function (e1, e2) {
        return e2 - e1;
    });
}

array1 = descendingSort(array1);

console.log(array1);

function getFirstElements(array, elementsAmount) {
    return array.slice(0, elementsAmount);
}

var array2 = getFirstElements(array1, 5);
console.log(array2);

function getLastElements(array, elementsAmount) {
    return array.slice(array.length - elementsAmount);
}

var array3 = getLastElements(array1, 5);
console.log(array3);

function summariseEvenNumbers(array) {
    return array.reduce(function (accumulator, currentElement) {
        if (currentElement % 2 === 0) {
            return accumulator + currentElement;
        } else {
            return accumulator;
        }
    }, 0);
}

console.log(summariseEvenNumbers(array1));

var array4 = [];

function fillArrayByNumbers(array, startNumber, finishNumber) {
    for (var i = startNumber; i <= finishNumber; i++) {
        array.push(i);
    }

    return array;
}

console.log(fillArrayByNumbers(array4, 1, 100));

function summariseEvenNumberSquares(array) {
    return array.reduce(function (accumulator, currentElement) {
        if (currentElement % 2 === 0) {
            return accumulator + Math.pow(currentElement, 2);
        } else {
            return accumulator;
        }
    }, 0);
}

console.log(summariseEvenNumberSquares(array4));