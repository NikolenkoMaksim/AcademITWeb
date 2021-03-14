(function () {
    var array1 = [15, 2, 0, 5, -3, 16, 4, 18, 9, 5];

    function sortDescending(array) {
        return array.sort(function (e1, e2) {
            return e2 - e1;
        });
    }

    console.log(sortDescending(array1));

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

    function getEvenNumbersSum(array) {
        return array.reduce(function (accumulator, currentElement) {
            if (currentElement % 2 === 0) {
                return accumulator + currentElement;
            }

            return accumulator;
        }, 0);
    }

    console.log(getEvenNumbersSum(array1));

    var array4 = [];

    function fillArrayWithNumbers(array, startNumber, finishNumber) {
        for (var i = startNumber; i <= finishNumber; i++) {
            array.push(i);
        }

        return array;
    }

    console.log(fillArrayWithNumbers(array4, 1, 100));

    function getEvenNumbersSquares(array) {
        return array.filter(function (number) {
            return number % 2 === 0;
        }).map(function (currentValue) {
            return currentValue * currentValue;
        });
    }

    console.log(getEvenNumbersSquares(array4));
})();