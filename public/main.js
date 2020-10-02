
// Page Elements
const $input = $('#city');
const $submit = $('#button');
const $destination = $('#destination');
const $container = $('.container');
const $venueDivs = [$("#venue1"), $("#venue2"), $("#venue3"), $("#venue4"), $("#venue5"), $("#venue6")];


const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
var numVenues = 0
const baseUrl = '/api'


// Vue instance

var app = new Vue({
  el: '#app',
  data: {
    loading: false,
    city: '',
    from: '',
    venues: null, 
    forecast: null,
    restaurants: null,
    flights: null, 
    images: null 
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
      // generates venue icon urls from venue details returned from api
      let urls = this.venues.map(venue => `${venue.categories[0].icon.prefix}bg_64${venue.categories[0].icon.suffix}`)
      return urls
    },
    imageUrls: function () {
      // creates unsplash image urls from api response
      let urls = this.images.map(image => {
        return {
          imageUrl: image.url,
          userUrl: `${image.userUrl}?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText`,
          alt: image.alt
        }
        
      })
      return urls;
    },    
    loaded: function () {
        
         return (this.venues && this.forecast && this.restaurants && this.flights && this.images) ? true : false  
    }
  },

  methods: {
    reset: function () {
      // resets all data
      this.venues = null;
      this.images = null;
      this.forecast = null;
      this.restaurants = null;
      this.flights = null;
    },
    search: async function() {
      // reset all data
      await this.reset();
      // set loading true
      this.loading = true;
      // get all data
      await this.getVenues();
      await this.getForecast();
      await this.getRestaurants();
      await this.getFlights();
      await this.getImages();
      // loading finished
      this.loading = false;      

    },
    getVenues: async function() {
      // hits attractions api endpoint
      const location = this.city
      const urlToFetch = `${baseUrl}/attractions/${location}`;
      try {
        const response = await fetch(urlToFetch);
        if (response.ok) {
          const jsonResponse = await response.json();
          const venues = jsonResponse.response.groups[0].items.map(item => item.venue);
          // limits number of parks returned to 2, some cities returning 7-8 parks in top ten attractions
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
      return;
    },
    getForecast: async function () {
      // hits weather endpoint & returns forecast object to data
      const location = this.city
      const urlToFetch = `${baseUrl}/weather/${location}`;
      try {
        const response = await fetch(urlToFetch)
        if (response.ok) {
          const jsonResponse = await response.json();
          this.forecast = jsonResponse;
          
        }
      } catch (error) {
        console.log(error);
        
      }
      return;
    },
    getRestaurants: async function () {
      // hits restaurant endpoint and returns restaurant object to data
      const location = this.city
      const urlToFetch = `${baseUrl}/restaurants/${location}`;
      try {
        const response = await fetch(urlToFetch);
        if (response.ok) {
          const jsonResponse = await response.json();
          this.restaurants = jsonResponse.businesses;
          
        }
      } catch (error) {
        console.log(error);
        
      }
      return;
    },
    getFlights: async function () {
      // hits flights endpoint and returns flights object to data
      const location = this.city
      const from = this.from
      const urlToFetch = `${baseUrl}/flights/${location}/${from}`;
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
        console.log(error);
        
      }
      return;
    },
    getImages: async function () {
      const location = this.city
      const urlToFetch = `${baseUrl}/images/${location}`;
      try {
        const response = await fetch(urlToFetch);
        if (response.ok) {
          const jsonResponse = await response.json();
          this.images = jsonResponse.results.map(image => {
            return {
              url: image.urls.small,
              user: image.user.username,
              userUrl: image.user.links.html,
              alt: image.alt_description
            }
          });
        }
      } catch (error) {
        console.log(error);
        
      }
      return;
    }
    
  }
})


