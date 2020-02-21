/* global $ */

/**
 * starts listeners
 */
function init() {
  parksFormSubmit();
}

/**
 * listeners for submit of parks form (#national-parks)
 * and sends API request
 */
function parksFormSubmit() {
  $('#national-parks').submit( function(e) {
    e.preventDefault();
    let park = $('#park-name').val();
    let state = $('#state-name').val();
    let maxResults = $('#search-results').val();
    sendRequest(park, state, maxResults);
  });
}

/**
 * 
 * @param {string} park the query entered into 'park name'
 * @param {string} state the value entered into 'state'
 * @param {number} maxResults the value entered into 'maxResults'
 */
function sendRequest(park, state, maxResults ) {
  const apiKey = '1Hge8qs8XNqiYFIF1HySn4MhboakRjzWjVKUV3UF';
  fetch(`https://developer.nps.gov/api/v1/parks?q=${park}&stateCode=${state}&limit=${maxResults}&fields=addresses&api_key=${apiKey}`)
    .then(response => response.json())
    .then(responseJson => displayParks(responseJson))
    .catch(error => {
      alert('Something went wrong. Try again later.');
      console.error(error);
    });
}

/**
 * Renders a JSON response object to the DOM
 * @param {object} response JSON response object
 */
function displayParks(response) {
  let html = generateParkTemplates(response);
  $('#parks-display').html(html);
}

/**
 * Generates HTML from a JSON response object
 * @param {object} response JSON response object
 */
function generateParkTemplates(response) {
  let html = '';
  const parks = response.data;
  
  parks.forEach(item => {
    let address = item.addresses[0];
    html += `
      <article>
        <h2><a href="${item.url}" target="_blank">${item.fullName}</a></h2>
        <p>${item.description}</p>
        <address>
          ${address.line1 + '<br>'}    
          ${address.city}, ${address.stateCode} ${address.postalCode}
        </address>
      </article>
    `;
  });

  // return html or no results if none available
  return parks.length > 0 ? html : '<p>No results found</p>';
}



$(init);

