(function () {
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

    function getMaxCitiesCountCountries(countries) {
        var maxCitiesCount = 0;
        var maxCitiesCountCountries = [];

        countries.forEach(function (item, i, countries) {
            if (countries[i].cities.length > maxCitiesCount) {
                maxCitiesCountCountries = [countries[i]];
                maxCitiesCount = countries[i].cities.length;
            } else if (countries[i].cities.length === maxCitiesCount) {
                maxCitiesCountCountries.push(countries[i]);
            }
        })

        return maxCitiesCountCountries;
    }

    console.log(getMaxCitiesCountCountries(countries));

    function getCountriesPopulations(countries) {
        var countriesPopulations = {};

        function getCountryPopulation(country) {
            return country.cities.reduce(function (countryPopulation, city) {
                return countryPopulation + city.population;
            }, 0);
        }

        countries.forEach(function (country) {
            countriesPopulations[country.name] = getCountryPopulation(country);
        });

        return countriesPopulations;
    }

    console.log(getCountriesPopulations(countries));
})();
