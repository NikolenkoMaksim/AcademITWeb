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

        countries.forEach(function (country) {
            if (country.cities.length > maxCitiesCount) {
                maxCitiesCountCountries = [country];
                maxCitiesCount = country.cities.length;
            } else if (country.cities.length === maxCitiesCount) {
                maxCitiesCountCountries.push(country);
            }
        });

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
