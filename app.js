document.getElementById('getCountrydata').addEventListener('click', async () => {
    const countryName = document.getElementById('cityInput').value;
    const selectedRegion = document.getElementById('regionSelect').value;
    const countryInfoDiv = document.getElementById('Countryinfo');
    countryInfoDiv.innerHTML = ''; 

    if (!countryName && !selectedRegion) {
        countryInfoDiv.innerHTML = 'Please enter a country name or select a region.';
        return;
    }

    try {
        let url = 'https://restcountries.com/v3.1/all';
        
        if (selectedRegion) {
            url = `https://restcountries.com/v3.1/region/${selectedRegion.toLowerCase()}`;
        } else if (countryName) {
            url = `https://restcountries.com/v3.1/name/${countryName}`;
        }

        const response = await fetch(url);
        if (!response.ok) throw new Error('Country not found or invalid region');

        const countries = await response.json();
        const filteredCountries = countryName ? countries.filter(country => country.name.common.toLowerCase().includes(countryName.toLowerCase())) : countries;

        if (filteredCountries.length === 0) {
            countryInfoDiv.innerHTML = 'No countries found.';
            return;
        }

        // Display information for the country
        filteredCountries.forEach(country => {
            const flag = country.flags.png;
            const population = country.population;
            const region = country.region;
            const currencies = Object.values(country.currencies).map(currency => currency.name).join(', ');
            const languages = Object.values(country.languages).join(', ');
            const borders = country.borders ? country.borders.join(', ') : 'None';

            countryInfoDiv.innerHTML += `
                <div class="country-card">
                    <img src="${flag}" alt="${country.name.common} flag" style="width: 100px; height: auto;" />
                    <p><strong>${country.name.common}</strong></p>
                    <p><strong>Population:</strong> ${population}</p>
                    <p><strong>Region:</strong> ${region}</p>
                    <p><strong>Currencies:</strong> ${currencies}</p>
                    <p><strong>Languages:</strong> ${languages}</p>
                    <p><strong>Bordering Countries:</strong> ${borders}</p>
                </div>
                <hr />
            `;
        });
    } catch (error) {
        countryInfoDiv.innerHTML = error.message;
    }
});

// Reset button
document.getElementById('resetSearch').addEventListener('click', () => {
    document.getElementById('cityInput').value = '';
    document.getElementById('regionSelect').value = '';
    document.getElementById('Countryinfo').innerHTML = '';
});

// Theme 
const toggleThemeButton = document.getElementById('toggleTheme');
toggleThemeButton.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    if (document.body.classList.contains('dark-mode')) {
        toggleThemeButton.textContent = 'LIGHT MODE';
    } else {
        toggleThemeButton.textContent = 'DARK MODE';
    }
});
