var ETR = {};

ETR.countries = [
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
            {name: "Saint Petersburg", population: 539064},
            {name: "Novosibirsk", population: 1625631}
        ]
    }
];

console.log("Countries names with max cities count:");

(function printCountriesNamesWithMaxCitiesCount(countries) {
    var maxCitiesCount = 0;
    var countriesWithMaxCitiesCountNames = [];

    for (var i = 0; i < countries.length; i++) {
        if (countries[i].cities.length > maxCitiesCount) {
            countriesWithMaxCitiesCountNames = [countries[i].name];
            maxCitiesCount = countries[i].cities.length;
        } else if (countries[i].cities.length === maxCitiesCount) {
            countriesWithMaxCitiesCountNames.push(countries[i].name);
        }
    }

    console.log(countriesWithMaxCitiesCountNames.join(", "));
})(ETR.countries);

ETR.countriesPopulation = (function createObjectWithCountriesAndPopulation(countries) {
    var countriesPopulation = {};

    function summarizeCitiesPopulation(country) {
        return country.cities.reduce(function (accumulator, currentElement) {
            return accumulator + currentElement.population;
        }, 0);
    }

    for (var i = 0; i < countries.length; i++) {
        countriesPopulation[countries[i].name] = summarizeCitiesPopulation(countries[i]);
    }

    return countriesPopulation;
})(ETR.countries);

console.log(ETR.countriesPopulation);
