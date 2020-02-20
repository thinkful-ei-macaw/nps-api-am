
function init() {
  parksFormSubmit();
}

function parksFormSubmit() {
  $('#national-parks').submit( function(e) {
    e.preventDefault();
    let park = $('#park-name').val();
    let state = $('#state-name').val();
    let maxResults = $('#search-results').val();
    sendRequest(park, state, maxResults);
  });
}

function sendRequest(park, state, maxResults ) {
  const apiKey = "1Hge8qs8XNqiYFIF1HySn4MhboakRjzWjVKUV3UF";
  fetch(`https://developer.nps.gov/api/v1/parks?q=${park}&stateCode=${state}&limit=${maxResults}&api_key=${apiKey}`)
    .then(response => response.json())
    .then(responseJson => displayParks(responseJson))
    .catch(() => alert('Something went wrong. Try again later.'));
}

function generateParks(response) {

  let html = '';
  const parks = response.data;
  

  parks.forEach(item => {
    html += 
            `<article>
                <h2><a href="${item.url}">${item.fullName}</a></h2>
                <p>${item.description}</p>
            </article>`;
  });

  return parks.length > 0 ? html : '<p>No results found</p>';
}

function displayParks(response) {

  let html = generateParks(response);
  $('#parks-display').html(html);
  
}

$(init);

