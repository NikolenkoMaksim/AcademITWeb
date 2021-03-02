var people = [
    {
        age: 27,
        name: "Вася",
        lastName: "Николенко"
    },
    {
        age: 35,
        name: "Дмитрий",
        lastName: "Муравьев"
    },
    {
        age: 15,
        name: "Елизавета",
        lastName: "Третьякова"
    },
    {
        age: 87,
        name: "Даниил",
        lastName: "Волков"
    },
    {
        age: 63,
        name: "Георгий",
        lastName: "Крылов"
    },
    {
        age: 34,
        name: "Владислав",
        lastName: "Зубков"
    },
    {
        age: 8,
        name: "Алиса",
        lastName: "Панова"
    },
    {
        age: 25,
        name: "Никита",
        lastName: "Кузнецов"
    },
    {
        age: 55,
        name: "Амалия",
        lastName: "Гочарова"
    },
    {
        age: 23,
        name: "Казаков",
        lastName: "Владимир"
    }
];

console.log("Список людей:");
console.log(people);

var averageAge = _.chain(people)
        .pluck("age")
        .reduce(function (accumulator, currentElement) {
            return accumulator + currentElement;
        }, 0)
        .value()
    /
    people.length;

console.log("Средний возраст всех людей:");
console.log(averageAge);

var peopleFrom20To30 = _.chain(people)
    .filter(function (p) {
        return p.age >= 20 && p.age <= 30;
    })
    .sortBy("age")
    .value();


console.log("Список людей от 20 до 30 включительно, отсортированный по возврастанию:");
console.log(peopleFrom20To30);

var names = _.pluck(people, "name");
var lastNames = _.pluck(people, "lastName");

function cloneArrayWithObjects(oldArray) {
    var newArray = [];

    _.each(oldArray, function (object, index) {
        newArray[index] = _.clone(object);
    })

    return newArray;
}

var peopleWithFullNames = cloneArrayWithObjects(people);

_.each(peopleWithFullNames, function (element, index) {
    element.fullName = lastNames[index] + " " + names[index];
});

console.log("Для каждого объекта добавили поле со значением (фамилия + имя):");
console.log(peopleWithFullNames);