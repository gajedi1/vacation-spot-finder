function getspot() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(success, error);
  } else { 
    document.getElementById("demo").innerHTML = "Geolocation is not supported by this browser.";
  }
}

function success(position) {
  document.getElementById("demo").innerHTML =
    "Latitude: " + position.coords.latitude +
    "<br>Longitude: " + position.coords.longitude;

  const apiKey = 'c0036066518f432f8eb24d2fa569c825';
  var query = position.coords.latitude + ',' + position.coords.longitude;
  var api_url = 'https://api.opencagedata.com/geocode/v1/json';
  var geocodeUrl = api_url
      + '?'
      + 'key=' + apiKey
      + '&q=' + encodeURIComponent(query)
      + '&pretty=1'
      + '&no_annotations=1';
  document.getElementById('buffer').style.display = 'block';
  document.getElementById('print').innerText = '';
  fetch(geocodeUrl)
      .then(response => response.json())
      .then(data => {
          document.getElementById('buffer').style.display = 'none';
          if (data.results && data.results.length > 0) {
              const location = data.results[0].formatted;
              document.getElementById('print').innerText = `Location: ${location}`;
              suggestVacationSpot(position.coords.latitude, position.coords.longitude);
          } else {
              document.getElementById('print').innerText = "Location not found.";
          }
      })
      .catch(error => {
          document.getElementById('buffer').style.display = 'none';
          document.getElementById('print').innerText = "Error fetching location.";
          console.error(error);
      });
}

function suggestVacationSpot(lat, lon) {
  const apiKey = '5ae2e3f221c38a28845f05b68da7feb165a710822fb78296c3a2bdf0'; 
  const radius = 15000;
  const limit = 20;

  const url = `https://api.opentripmap.com/0.1/en/places/radius?radius=${radius}&lon=${lon}&lat=${lat}&limit=${limit}&apikey=${apiKey}`;

  document.getElementById('buffer').style.display = 'block';

        fetch(url)
          .then(response => response.json())
          .then(data => {
            document.getElementById('buffer').style.display = 'none';
            if (data.features && data.features.length > 0) {
              const spots = data.features;
              const namedSpots = spots.filter(s => s.properties.name && s.properties.name.trim() !== "");
              const displaySpots = namedSpots.length > 0 ? namedSpots : spots;
              const maxSuggestions = 5;
              const shuffled = displaySpots.sort(() => 0.5 - Math.random());
              const suggestions = shuffled.slice(0, maxSuggestions);
              let html = `<br><br><b>Suggested Vacation Spots Nearby:</b><br>`;
              suggestions.forEach((spot, idx) => {
                const name = spot.properties.name && spot.properties.name.trim() !== "" ? spot.properties.name : "Unknown Place";
                const kindRaw = spot.properties.kinds || "";
                const kindTags = kindRaw.split(',').map(k => k.replace(/_/g, ' ')).map(k => k.charAt(0).toUpperCase() + k.slice(1)).filter(Boolean);
                const kindDisplay = kindTags.length > 0 ? kindTags.map(tag => `<span class="kind-tag">${tag}</span>`).join(' ') : "N/A";
                html += `<div style="margin-bottom:10px;"><span class="spot-name"><b>${idx+1}. ${name}</b></span><br><i>Type:</i> ${kindDisplay}</div>`;
              });
              document.getElementById('print').innerHTML += html;
            } else {
              document.getElementById('print').innerHTML += "<br>No vacation spots found nearby.";
            }
          })
          .catch(error => {
            document.getElementById('buffer').style.display = 'none';
            document.getElementById('print').innerHTML += "<br>Error fetching vacation spots.";
            console.error(error);
          });
}

function error() {
  alert("Sorry, no position available.");
}
