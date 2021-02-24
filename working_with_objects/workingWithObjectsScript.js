var countries = [
    {
        name: "Federative Republic of Brazil",
        cities: [
            {name: "Sao Paulo", population: 12106920},
            {name: "Rio de Janeiro", population: 6688930},
            {name: "Brasilia", population: 2609997}
        ]
    },
    {
        name: "Thailand",
        cities: [
            {name: "Bangkok", population: 5676648},
            {name: "Nonthaburi", population: 266930},
        ]
    },
    {
        name: "Russian Federation",
        cities: [
            {name: "Moscow", population: 12678079},
            {name: "Saint Petersburg", population: 5390641},
            {name: "Novosibirsk", population: 1625631}
        ]
    }
];

console.log("Countries names with max cities count:");
console.log(countries);

function getCountriesNamesWithMaxCitiesCount(countries) {
    var maxCitiesCount = 0;
    var countriesWithMaxCitiesCountNames = [];

    countries.forEach(function (item, i, countries) {
        if (countries[i].cities.length > maxCitiesCount) {
            countriesWithMaxCitiesCountNames = [countries[i].name];
            maxCitiesCount = countries[i].cities.length;
        } else if (countries[i].cities.length === maxCitiesCount) {
            countriesWithMaxCitiesCountNames.push(countries[i].name);
        }
    })

    return countriesWithMaxCitiesCountNames;
}

console.log(getCountriesNamesWithMaxCitiesCount(countries));

function getObjectWithCountriesAndPopulation(countries) {
    var countriesPopulation = {};

    function getCountriesPopulation(country) {
        return country.cities.reduce(function (accumulator, currentElement) {
            return accumulator + currentElement.population;
        }, 0);
    }

    countries.forEach(function (item, i, countries) {
        countriesPopulation[countries[i].name] = getCountriesPopulation(countries[i]);
    });

    return countriesPopulation;
}

var countriesPopulation = getObjectWithCountriesAndPopulation(countries);

console.log(countriesPopulation);
