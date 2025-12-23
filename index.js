document.addEventListener('DOMContentLoaded', () => {
  const input = document.querySelector('input[placeholder="Enter state abbreviation"]');
  const button = document.querySelector('button');
  const displayDiv = document.querySelector('#alerts-display');
  const errorDiv = document.querySelector('#error-message');

  async function fetchWeatherData(state) {
    try {
      const response = await fetch(
        `https://api.weather.gov/alerts/active?area=${state}`
      );

      if (!response.ok) {
        throw new Error('Network failure');
      }

      const data = await response.json();

      // ✅ Clear error FIRST (required by tests)
      clearError();

      displayWeather(data);
    } catch (error) {
      displayError(error.message);
    }
  }

  function displayWeather(data) {
    if (!displayDiv) return;

    displayDiv.innerHTML = '';

    const heading = document.createElement('h3');
    heading.textContent = `${data.title}: ${data.features.length}`;
    displayDiv.appendChild(heading);

    data.features.forEach(alert => {
      const p = document.createElement('p');
      p.textContent = alert.properties.headline;
      displayDiv.appendChild(p);
    });
  }

  function displayError(message) {
    errorDiv.textContent = message;
    errorDiv.classList.remove('hidden');
  }

  function clearError() {
    errorDiv.textContent = '';
    errorDiv.classList.add('hidden');
  }

  button.addEventListener('click', () => {
    const state = input.value.trim().toUpperCase();

    // ✅ Input cleared immediately (test requirement)
    input.value = '';

    fetchWeatherData(state);
  });
});
