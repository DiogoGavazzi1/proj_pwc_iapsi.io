// Função para buscar informações sobre um país
async function fetchCountryByName() {
  const input = document.getElementById('countryInput');
  const countryInfo = document.getElementById('countryInfo');
  const countryName = input.value.trim();

  if (!countryName) {
    countryInfo.innerHTML = '<div class="alert alert-warning">Por favor, digite o nome de um país.</div>';
    return;
  }

  countryInfo.innerHTML = '<div class="text-center">Carregando...</div>';

  try {
    const response = await fetch(`https://restcountries.com/v3.1/name/${countryName}`);
    if (!response.ok) {
      throw new Error(`Erro: ${response.status}`);
    }

    const countries = await response.json();
    const country = countries[0]; // Usar o primeiro resultado

    // Renderizar informações do país
    countryInfo.innerHTML = `
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">${country.name.common}</h5>
            <img src="${country.flags.svg}" alt="Bandeira de ${country.name.common}" class="img-fluid mb-3" style="max-width: 150px;">
            <p><strong>Capital:</strong> ${country.capital ? country.capital[0] : 'N/A'}</p>
            <p><strong>Região:</strong> ${country.region}</p>
            <p><strong>Sub-Região:</strong> ${country.subregion || 'N/A'}</p>
            <p><strong>População:</strong> ${country.population.toLocaleString()}</p>
            <p><strong>Área:</strong> ${country.area.toLocaleString()} km²</p>
            <p><strong>Moeda:</strong> ${Object.values(country.currencies || {}).map(currency => `${currency.name} (${currency.symbol})`).join(', ') || 'N/A'}</p>
            <p><strong>Idiomas:</strong> ${Object.values(country.languages || {}).join(', ') || 'N/A'}</p>
            <p><strong>Fuso horário:</strong> ${country.timezones.join(', ') || 'N/A'}</p>
            <p><strong>Domínio de nível superior:</strong> ${country.tld.join(', ') || 'N/A'}</p>
            <p><strong>Fronteiras:</strong> ${country.borders ? country.borders.join(', ') : 'N/A'}</p>
            <p><strong>Coordenadas:</strong> Latitude: ${country.latlng[0]}, Longitude: ${country.latlng[1]}</p>
          </div>
        </div>
      `;
  } catch (error) {
    console.error(error);
    countryInfo.innerHTML = '<div class="alert alert-danger">Erro ao procurar informações sobre o país. Verifique o nome digitado.</div>';
  }
}

// Adicionar evento ao botão
document.getElementById('searchCountry').addEventListener('click', fetchCountryByName);
