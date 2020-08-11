
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
const baseUrl = '/api'

Vue.component('flight-widget', {
  template: `<div
                data-skyscanner-widget="SearchWidget"
                data-locale="en-GB"
                data-market="GB"
                data-currency="GBP"
                data-origin-geo-lookup="true"
                data-flight-type="return"
                data-responsive="false"
                data-destination-name="'London'"
              ></div>`,
  mounted() {
    
    let newScript= document.createElement('script')
    newScript.setAttribute('src', 'https://widgets.skyscanner.net/widget-server/js/loader.js')
    document.head.appendChild(newScript)
    
  }

})

// Vue instance

var app = new Vue({
  el: '#app',
  data: {
    city: '',
    venues: null, // [{"id":"4adcdac9f964a520055421e3","name":"Fontana dei Quattro Fiumi","location":{"address":"Piazza Navona","lat":41.89896683723093,"lng":12.473131782782303,"labeledLatLngs":[{"label":"display","lat":41.89896683723093,"lng":12.473131782782303}],"postalCode":"00186","cc":"IT","neighborhood":"Parione","city":"Roma","state":"Lazio","country":"Italia","formattedAddress":["Piazza Navona","00186 Roma Lazio","Italia"]},"categories":[{"id":"56aa371be4b08b9a8d573547","name":"Fountain","pluralName":"Fountains","shortName":"Fountain","icon":{"prefix":"https://ss3.4sqi.net/img/categories_v2/parks_outdoors/plaza_","suffix":".png"},"primary":true}],"photos":{"count":0,"groups":[]}},{"id":"4adcdac6f964a5202f5321e3","name":"Pantheon","location":{"address":"Piazza della Rotonda","crossStreet":"Via Palombella","lat":41.89913348171708,"lng":12.47680466523532,"labeledLatLngs":[{"label":"display","lat":41.89913348171708,"lng":12.47680466523532}],"postalCode":"00186","cc":"IT","city":"Roma","state":"Lazio","country":"Italia","formattedAddress":["Piazza della Rotonda (Via Palombella)","00186 Roma Lazio","Italia"]},"categories":[{"id":"4bf58dd8d48988d12d941735","name":"Monument / Landmark","pluralName":"Monuments / Landmarks","shortName":"Landmark","icon":{"prefix":"https://ss3.4sqi.net/img/categories_v2/building/government_monument_","suffix":".png"},"primary":true}],"photos":{"count":0,"groups":[]}},{"id":"4c1df65ffcf8c9b6fb8bac0b","name":"Basilica di Santa Maria Maggiore","location":{"address":"Piazza di Santa Maria Maggiore","lat":41.897629420367046,"lng":12.498428821563719,"labeledLatLngs":[{"label":"display","lat":41.897629420367046,"lng":12.498428821563719}],"postalCode":"00184","cc":"IT","city":"Roma","state":"Lazio","country":"Italia","formattedAddress":["Piazza di Santa Maria Maggiore","00184 Roma Lazio","Italia"]},"categories":[{"id":"4bf58dd8d48988d132941735","name":"Church","pluralName":"Churches","shortName":"Church","icon":{"prefix":"https://ss3.4sqi.net/img/categories_v2/building/religious_church_","suffix":".png"},"primary":true}],"photos":{"count":0,"groups":[]}},{"id":"4adcdac6f964a520285321e3","name":"Piazza Navona","location":{"address":"Piazza Navona","lat":41.89923909819951,"lng":12.473184388488416,"postalCode":"00186","cc":"IT","neighborhood":"Parione","city":"Roma","state":"Lazio","country":"Italia","formattedAddress":["Piazza Navona","00186 Roma Lazio","Italia"]},"categories":[{"id":"4bf58dd8d48988d164941735","name":"Plaza","pluralName":"Plazas","shortName":"Plaza","icon":{"prefix":"https://ss3.4sqi.net/img/categories_v2/parks_outdoors/plaza_","suffix":".png"},"primary":true}],"photos":{"count":0,"groups":[]}},{"id":"56dd7b20498ebb7ab96350ee","name":"Pane e Salame","location":{"address":"Via di Santa Maria in Via 19","crossStreet":"Via dei Crociferi","lat":41.900604,"lng":12.481798,"labeledLatLngs":[{"label":"display","lat":41.900604,"lng":12.481798}],"cc":"IT","neighborhood":"Trevi","city":"Roma","state":"Lazio","country":"Italia","formattedAddress":["Via di Santa Maria in Via 19 (Via dei Crociferi)","Roma Lazio","Italia"]},"categories":[{"id":"4bf58dd8d48988d1c5941735","name":"Sandwich Place","pluralName":"Sandwich Places","shortName":"Sandwiches","icon":{"prefix":"https://ss3.4sqi.net/img/categories_v2/food/deli_","suffix":".png"},"primary":true}],"photos":{"count":0,"groups":[]}},{"id":"4adcdac6f964a520105321e3","name":"Basilica di San Pietro (Basilica Sancti Petri)","location":{"address":"Piazza San Pietro","lat":41.902133305189565,"lng":12.453582286834715,"labeledLatLngs":[{"label":"display","lat":41.902133305189565,"lng":12.453582286834715}],"postalCode":"00120","cc":"VA","neighborhood":"Città del Vaticano","city":"Vatican","country":"Vatican","formattedAddress":["Piazza San Pietro","00120 Città del Vaticano","Vatican"]},"categories":[{"id":"4bf58dd8d48988d132941735","name":"Church","pluralName":"Churches","shortName":"Church","icon":{"prefix":"https://ss3.4sqi.net/img/categories_v2/building/religious_church_","suffix":".png"},"primary":true}],"photos":{"count":0,"groups":[]}},{"id":"4adcdac6f964a5203c5321e3","name":"Villa Borghese","location":{"address":"Piazzale Flaminio","lat":41.914653074615394,"lng":12.483644485473633,"labeledLatLngs":[{"label":"display","lat":41.914653074615394,"lng":12.483644485473633}],"postalCode":"00196","cc":"IT","city":"Roma","state":"Lazio","country":"Italia","formattedAddress":["Piazzale Flaminio","00196 Roma Lazio","Italia"]},"categories":[{"id":"4bf58dd8d48988d163941735","name":"Park","pluralName":"Parks","shortName":"Park","icon":{"prefix":"https://ss3.4sqi.net/img/categories_v2/parks_outdoors/park_","suffix":".png"},"primary":true}],"photos":{"count":0,"groups":[]}},{"id":"55859646498ee5701031b5c7","name":"La Romana","location":{"address":"Via Cola Di Rienzo, 2","lat":41.909174,"lng":12.470601,"labeledLatLngs":[{"label":"display","lat":41.909174,"lng":12.470601}],"postalCode":"00193","cc":"IT","city":"Roma","state":"Lazio","country":"Italia","formattedAddress":["Via Cola Di Rienzo, 2","00193 Roma Lazio","Italia"]},"categories":[{"id":"4bf58dd8d48988d1c9941735","name":"Ice Cream Shop","pluralName":"Ice Cream Shops","shortName":"Ice Cream","icon":{"prefix":"https://ss3.4sqi.net/img/categories_v2/food/icecream_","suffix":".png"},"primary":true}],"photos":{"count":0,"groups":[]}},{"id":"4adcdac6f964a520465321e3","name":"Piazza Venezia","location":{"address":"Piazza Venezia","lat":41.895746560967744,"lng":12.48244572340433,"postalCode":"00187","cc":"IT","city":"Roma","state":"Lazio","country":"Italia","formattedAddress":["Piazza Venezia","00187 Roma Lazio","Italia"]},"categories":[{"id":"4bf58dd8d48988d164941735","name":"Plaza","pluralName":"Plazas","shortName":"Plaza","icon":{"prefix":"https://ss3.4sqi.net/img/categories_v2/parks_outdoors/plaza_","suffix":".png"},"primary":true}],"photos":{"count":0,"groups":[]}},{"id":"5043382de4b072dc96b3796d","name":"Cupola di San Pietro","location":{"address":"Piazza San Pietro","lat":41.90220976115311,"lng":12.453407016695822,"labeledLatLngs":[{"label":"display","lat":41.90220976115311,"lng":12.453407016695822}],"cc":"IT","neighborhood":"Città del Vaticano","city":"Città del Vaticano","state":"Città del Vaticano","country":"Italia","formattedAddress":["Piazza San Pietro","Città del Vaticano Città del Vaticano","Italia"]},"categories":[{"id":"4bf58dd8d48988d165941735","name":"Scenic Lookout","pluralName":"Scenic Lookouts","shortName":"Scenic Lookout","icon":{"prefix":"https://ss3.4sqi.net/img/categories_v2/parks_outdoors/sceniclookout_","suffix":".png"},"primary":true}],"photos":{"count":0,"groups":[]}}],
    forecast: null, // {"coord":{"lon":-85.16,"lat":34.26},"weather":[{"id":803,"main":"Clouds","description":"broken clouds","icon":"04n"}],"base":"stations","main":{"temp":294.77,"feels_like":297.85,"temp_min":294.26,"temp_max":295.37,"pressure":1014,"humidity":88},"visibility":10000,"wind":{"speed":0.58,"deg":120},"clouds":{"all":75},"dt":1596525191,"sys":{"type":1,"id":5680,"country":"US","sunrise":1596538447,"sunset":1596587952},"timezone":-14400,"id":4219762,"name":"Rome","cod":200},
    restaurants: null, /* [{"id":"oVoj_A1FExfvI_7UbAdQgQ","alias":"pane-e-salame-roma-2","name":"Pane e Salame","image_url":"https://s3-media4.fl.yelpcdn.com/bphoto/huqOAETiIViqIpUfK08DAA/o.jpg","is_closed":false,"url":"https://www.yelp.com/biz/pane-e-salame-roma-2?adjust_creative=CFjAjKOIpD6ZvcjB6lX80Q&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=CFjAjKOIpD6ZvcjB6lX80Q","review_count":246,"categories":[{"alias":"wine_bars","title":"Wine Bars"},{"alias":"sandwiches","title":"Sandwiches"},{"alias":"roman","title":"Roman"}],"rating":5,"coordinates":{"latitude":41.9006243095738,"longitude":12.4817441403866},"transactions":[],"price":"€","location":{"address1":"Via di Santa Maria in Via 19","address2":"","address3":null,"city":"Rome","zip_code":"00187","country":"IT","state":"RM","display_address":["Via di Santa Maria in Via 19","00187 Rome","Italy"]},"phone":"+39066791352","display_phone":"+39 06 679 1352","distance":4568.086271688501},
    {"id":"-i5sf6JOXkYY6BhtO2EMMw","alias":"cantina-dei-papi-roma","name":"Cantina dei Papi","image_url":"https://s3-media1.fl.yelpcdn.com/bphoto/mSOAef8CqSY70_l9uzzIZg/o.jpg","is_closed":false,"url":"https://www.yelp.com/biz/cantina-dei-papi-roma?adjust_creative=CFjAjKOIpD6ZvcjB6lX80Q&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=CFjAjKOIpD6ZvcjB6lX80Q","review_count":516,"categories":[{"alias":"wine_bars","title":"Wine Bars"},{"alias":"italian","title":"Italian"},{"alias":"sandwiches","title":"Sandwiches"}],"rating":4.5,"coordinates":{"latitude":41.9017494369833,"longitude":12.4846919717593},"transactions":[],"price":"€€","location":{"address1":"Via della Panetteria 34A","address2":"","address3":null,"city":"Rome","zip_code":"00187","country":"IT","state":"RM","display_address":["Via della Panetteria 34A","00187 Rome","Italy"]},"phone":"+39066786990","display_phone":"+39 06 678 6990","distance":4302.025119586658},
    {"id":"wi1KPs9dEJAKP8W3vkj07Q","alias":"pizza-zizza-roma-2","name":"Pizza Zizza","image_url":"https://s3-media1.fl.yelpcdn.com/bphoto/FZrLHtn9dwsxAZm0brtzKQ/o.jpg","is_closed":false,"url":"https://www.yelp.com/biz/pizza-zizza-roma-2?adjust_creative=CFjAjKOIpD6ZvcjB6lX80Q&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=CFjAjKOIpD6ZvcjB6lX80Q","review_count":300,"categories":[{"alias":"pizza","title":"Pizza"},{"alias":"cafeteria","title":"Cafeteria"},{"alias":"beerbar","title":"Beer Bar"}],"rating":4.5,"coordinates":{"latitude":41.8997788372,"longitude":12.4565518275},"transactions":[],"price":"€","location":{"address1":"Via delle Fornaci 11","address2":null,"address3":"","city":"Rome","zip_code":"00165","country":"IT","state":"RM","display_address":["Via delle Fornaci 11","00165 Rome","Italy"]},"phone":"+393388681227","display_phone":"+39 338 868 1227","distance":6628.720219928269},
    {"id":"i-r9xiwKBkWhknxSfZww0w","alias":"frigidarium-roma","name":"Frigidarium","image_url":"https://s3-media2.fl.yelpcdn.com/bphoto/I6v5SPHCgB1eeePf3YqmmQ/o.jpg","is_closed":false,"url":"https://www.yelp.com/biz/frigidarium-roma?adjust_creative=CFjAjKOIpD6ZvcjB6lX80Q&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=CFjAjKOIpD6ZvcjB6lX80Q","review_count":523,"categories":[{"alias":"icecream","title":"Ice Cream & Frozen Yogurt"},{"alias":"desserts","title":"Desserts"},{"alias":"creperies","title":"Creperies"}],"rating":4.5,"coordinates":{"latitude":41.8982940871793,"longitude":12.4704499525814},"transactions":[],"price":"€","location":{"address1":"Via del Governo Vecchio 112","address2":"","address3":"","city":"Rome","zip_code":"00186","country":"IT","state":"RM","display_address":["Via del Governo Vecchio 112","00186 Rome","Italy"]},"phone":"+393349951184","display_phone":"+39 334 995 1184","distance":5537.652103949691},
    {"id":"913ZaqO7F7sZJjasGhXvaQ","alias":"pinsere-roma","name":"Pinsere","image_url":"https://s3-media2.fl.yelpcdn.com/bphoto/59ncS6GUFpC-eKP8eYkOPA/o.jpg","is_closed":false,"url":"https://www.yelp.com/biz/pinsere-roma?adjust_creative=CFjAjKOIpD6ZvcjB6lX80Q&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=CFjAjKOIpD6ZvcjB6lX80Q","review_count":221,"categories":[{"alias":"pizza","title":"Pizza"}],"rating":4.5,"coordinates":{"latitude":41.9076607,"longitude":12.4979234},"transactions":[],"price":"€","location":{"address1":"Via Flavia 98","address2":"","address3":"","city":"Rome","zip_code":"00187","country":"IT","state":"RM","display_address":["Via Flavia 98","00187 Rome","Italy"]},"phone":"+390642020924","display_phone":"+39 06 4202 0924","distance":3114.8304865491336}
  ], */

    flights: null //{"Routes":[],"Quotes":[{"QuoteId":332,"MinPrice":45,"Direct":true,"OutboundLeg":{"CarrierIds":[1090],"OriginId":82398,"DestinationId":44993,"DepartureDate":"2020-08-20"},"InboundLeg":{"CarrierIds":[1865],"OriginId":51631,"DestinationId":65655,"DepartureDate":"2020-08-28"},"QuoteDateTime":"2020-08-06T21:30:00"},{"QuoteId":294,"MinPrice":45,"Direct":true,"OutboundLeg":{"CarrierIds":[1090],"OriginId":82398,"DestinationId":44993,"DepartureDate":"2020-08-18"},"InboundLeg":{"CarrierIds":[1865],"OriginId":51631,"DestinationId":65655,"DepartureDate":"2020-08-28"},"QuoteDateTime":"2020-08-06T23:19:00"},{"QuoteId":415,"MinPrice":47,"Direct":true,"OutboundLeg":{"CarrierIds":[1090],"OriginId":82398,"DestinationId":44993,"DepartureDate":"2020-08-27"},"InboundLeg":{"CarrierIds":[1865],"OriginId":51631,"DestinationId":65655,"DepartureDate":"2020-08-28"},"QuoteDateTime":"2020-08-06T21:10:00"},{"QuoteId":287,"MinPrice":49,"Direct":true,"OutboundLeg":{"CarrierIds":[1090],"OriginId":82398,"DestinationId":44993,"DepartureDate":"2020-08-18"},"InboundLeg":{"CarrierIds":[1090],"OriginId":44993,"DestinationId":82398,"DepartureDate":"2020-08-22"},"QuoteDateTime":"2020-08-07T00:23:00"},{"QuoteId":408,"MinPrice":50,"Direct":true,"OutboundLeg":{"CarrierIds":[1090],"OriginId":82398,"DestinationId":44993,"DepartureDate":"2020-08-26"},"InboundLeg":{"CarrierIds":[1865],"OriginId":51631,"DestinationId":65655,"DepartureDate":"2020-08-28"},"QuoteDateTime":"2020-08-05T21:42:00"},{"QuoteId":399,"MinPrice":50,"Direct":true,"OutboundLeg":{"CarrierIds":[1090],"OriginId":82398,"DestinationId":44993,"DepartureDate":"2020-08-25"},"InboundLeg":{"CarrierIds":[1865],"OriginId":51631,"DestinationId":65655,"DepartureDate":"2020-08-28"},"QuoteDateTime":"2020-08-06T22:48:00"},{"QuoteId":388,"MinPrice":52,"Direct":true,"OutboundLeg":{"CarrierIds":[1090],"OriginId":82398,"DestinationId":44993,"DepartureDate":"2020-08-24"},"InboundLeg":{"CarrierIds":[1865],"OriginId":51631,"DestinationId":65655,"DepartureDate":"2020-08-28"},"QuoteDateTime":"2020-08-06T23:08:00"},{"QuoteId":322,"MinPrice":52,"Direct":true,"OutboundLeg":{"CarrierIds":[1090],"OriginId":82398,"DestinationId":44993,"DepartureDate":"2020-08-20"},"InboundLeg":{"CarrierIds":[1865],"OriginId":51631,"DestinationId":65655,"DepartureDate":"2020-08-21"},"QuoteDateTime":"2020-08-06T21:07:00"},{"QuoteId":305,"MinPrice":52,"Direct":true,"OutboundLeg":{"CarrierIds":[1090],"OriginId":82398,"DestinationId":44993,"DepartureDate":"2020-08-19"},"InboundLeg":{"CarrierIds":[1090],"OriginId":44993,"DestinationId":82398,"DepartureDate":"2020-08-22"},"QuoteDateTime":"2020-08-06T17:27:00"},{"QuoteId":284,"MinPrice":52,"Direct":false,"OutboundLeg":{"CarrierIds":[1090],"OriginId":82398,"DestinationId":44993,"DepartureDate":"2020-08-18"},"InboundLeg":{"CarrierIds":[1090],"OriginId":44993,"DestinationId":82398,"DepartureDate":"2020-08-20"},"QuoteDateTime":"2020-08-07T00:59:00"}],"Places":[{"PlaceId":44993,"IataCode":"CIA","Name":"Rome Ciampino","Type":"Station","SkyscannerCode":"CIA","CityName":"Rome","CityId":"ROME","CountryName":"Italy"},{"PlaceId":51631,"IataCode":"FCO","Name":"Rome Fiumicino","Type":"Station","SkyscannerCode":"FCO","CityName":"Rome","CityId":"ROME","CountryName":"Italy"},{"PlaceId":65655,"IataCode":"LGW","Name":"London Gatwick","Type":"Station","SkyscannerCode":"LGW","CityName":"London","CityId":"LOND","CountryName":"United Kingdom"},{"PlaceId":65698,"IataCode":"LHR","Name":"London Heathrow","Type":"Station","SkyscannerCode":"LHR","CityName":"London","CityId":"LOND","CountryName":"United Kingdom"},{"PlaceId":66270,"IataCode":"LTN","Name":"London Luton","Type":"Station","SkyscannerCode":"LTN","CityName":"London","CityId":"LOND","CountryName":"United Kingdom"},{"PlaceId":81678,"IataCode":"SEN","Name":"London Southend","Type":"Station","SkyscannerCode":"SEN","CityName":"London","CityId":"LOND","CountryName":"United Kingdom"},{"PlaceId":82398,"IataCode":"STN","Name":"London Stansted","Type":"Station","SkyscannerCode":"STN","CityName":"London","CityId":"LOND","CountryName":"United Kingdom"}],"Carriers":[{"CarrierId":858,"Name":"Alitalia"},{"CarrierId":881,"Name":"British Airways"},{"CarrierId":50441,"Name":"easyJet"},{"CarrierId":1090,"Name":"Ryanair"},{"CarrierId":1865,"Name":"Vueling Airlines"},{"CarrierId":1878,"Name":"Wizz Air"}],"Currencies":[{"Code":"GBP","Symbol":"£","ThousandsSeparator":",","DecimalSeparator":".","SymbolOnLeft":true,"SpaceBetweenAmountAndSymbol":false,"RoundingCoefficient":0,"DecimalDigits":2}]}
  },
  computed: {
    celciusTemp: function () {
      // converts kelvin temp to celcius
      return (this.forecast.main.temp - 273.15).toFixed(0);
    },
    weatherIconUrl: function () {
      // generates weather icon url from forecast data
      return `https://openweathermap.org/img/wn/${this.forecast.weather[0].icon}@2x.png`
    },
    venueIconUrls: function () {
      let urls = this.venues.map(venue => `${venue.categories[0].icon.prefix}bg_64${venue.categories[0].icon.suffix}`)
      return urls
    },
    loaded: function () {
      
         return (this.venues && this.forecast && this.restaurants && this.flights) ? true : false  
      
      
    }
  },

  methods: {
    search: async function() {
      
      await this.getVenues();
      await this.getForecast();
      await this.getRestaurants();
      await this.getFlights();
      

    },
    getVenues: async function() {
      
      const location = this.city
      const urlToFetch = `${baseUrl}/attractions/${location}`;
      try {
        const response = await fetch(urlToFetch);
        if (response.ok) {
          const jsonResponse = await response.json();
          const venues = jsonResponse.response.groups[0].items.map(item => item.venue);
          let newVenues = []
          let parks = 0
          
          
          for (let i = 0; i < venues.length; i++) {
            if (newVenues.length < 10) {
              if (venues[i].categories[0].name === 'Park') {
                if (parks < 2) {
                  newVenues.push(venues[i])
                  parks ++
                } else {
                  continue
                }
              } else {
                newVenues.push(venues[i])                
              }
            } else {
              break
            }
          }
          
          
          this.venues = newVenues;
        }
        
        
      } catch (error) {
        console.log(error)
      }

    },
    getForecast: async function () {
      const location = this.city
      const urlToFetch = `${baseUrl}/weather/${location}`;
      try {
        const response = await fetch(urlToFetch)
        if (response.ok) {
          const jsonResponse = await response.json();
          this.forecast = jsonResponse;
        }
      } catch (error) {
        console.log(error)
      }
    },
    getRestaurants: async function () {
      const location = this.city
      const urlToFetch = `${baseUrl}/restaurants/${location}`;
      try {
        const response = await fetch(urlToFetch);
        if (response.ok) {
          const jsonResponse = await response.json();
          this.restaurants = jsonResponse.businesses;
        }
      } catch (error) {
        console.log(error)
      }
    },
    getFlights: async function () {
      const location = this.city
      const urlToFetch = `${baseUrl}/flights/${location}`;
      try {
        const response = await fetch(urlToFetch);
        if (response.ok) {
          let jsonResponse = await response.json();
          // sort quotes by price and limit to cheapest 10, reformat dates
          const sortedQuotes = jsonResponse.Quotes.sort((a, b) => {
            return a.MinPrice > b.MinPrice ? 1 : -1
          }).slice(0,10).map(quote => {
            const oldInboundDate = quote.InboundLeg.DepartureDate
            const newInboundDate = oldInboundDate.slice(0,10)
            quote.InboundLeg.DepartureDate = newInboundDate
            const oldOutboundDate = quote.OutboundLeg.DepartureDate
            const newOutboundDate = oldOutboundDate.slice(0,10)
            quote.OutboundLeg.DepartureDate = newOutboundDate
            return quote
          })
          jsonResponse.Quotes = sortedQuotes
          



          this.flights = jsonResponse;
        }
      } catch (error) {
        console.log(error)
      }
    },
    
  }
})


