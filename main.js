// Page Elements
const $input = $('#city');
const $submit = $('#button');
const $destination = $('#destination');
const $container = $('.container');
const $venueDivs = [$("#venue1"), $("#venue2"), $("#venue3"), $("#venue4"), $("#venue5"), $("#venue6")];
const $weatherDiv = $("#weather1");
const $mapsDiv = $("#map1");
const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
var numVenues = 0



// Random number functions

randNums = []

const generateArray = (num) => {
  for (i=0; i<=num; i++) {
      randNums.push(i)
  }
  
};

picked = []

const generatePos = () => {
  let randIndex = Math.floor(Math.random() * (randNums.length)); 
  randNum = randNums[randIndex]
  picked.push(randNums[randIndex])
  randNums.splice(randIndex,1)
  
}


// AJAX functions
const getVenues = async () => {
  picked = []
  const location = $input.val()
  const urlToFetch = `http://localhost:3001/attractions/${location}`;
  try {
    const response = await fetch(urlToFetch);
    if (response.ok) {
      console.log(response);
      const jsonResponse = await response.json();
      const venues = jsonResponse.response.groups[0].items.map(item => item.venue);
      numVenues = jsonResponse.response.groups[0].items.length;
      console.log(jsonResponse);
      generateArray(numVenues-1);
      
      for (i=0; i < numVenues; i++) {
        generatePos()
      }

      return venues;
    }
    
    
  } catch (error) {
    console.log(error)
  }
  
}

const getForecast = async () => {
  const location = $input.val()
  
  const urlToFetch = `http://localhost:3001/weather/${location}`;
  
  try {
    const response = await fetch(urlToFetch)
    if (response.ok) {
      const jsonResponse = await response.json();
      
      return jsonResponse;
    }
  } catch (error) {
    console.log(error)
  }
};

// Render functions
const renderVenues = (venues) => {
  $venueDivs.forEach(($venue, index) => {
       
    const venue = venues[picked[index]];
    const venueIcon = venue.categories[0].icon;
    const venueImgSrc = `${venueIcon.prefix}bg_64${venueIcon.suffix}`;
    let venueContent = createVenueHTML(venue.name, venue.location,venueImgSrc);
    $venue.append(venueContent);
  });
  $destination.append(`<h2>${venues[0].location.city}</h2>`);
}

const renderForecast = (day) => {
  
  
	let weatherContent = createWeatherHTML(day);
  $weatherDiv.append(weatherContent);
}
/*
const renderMaps = (location) => {
  let mapsContent = createMapsHTML(location);
  $mapsDiv.append(mapsContent)
}
*/

const executeSearch = () => {
  $venueDivs.forEach(venue => venue.empty());
  $weatherDiv.empty();
  $destination.empty();
  $container.css("visibility", "visible");
  getVenues().then(venues => renderVenues(venues));
  getForecast().then(forecast => renderForecast(forecast));
  //renderMaps($input.val())
  return false;
}

$submit.click(executeSearch)