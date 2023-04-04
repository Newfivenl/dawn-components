function loadParameters(){
    const urlParams = new URLSearchParams(window.location.search);
    const paramVolume = urlParams.get('volume');
    const paramHotel = urlParams.get('hotel');
    const paramEvent = urlParams.get('event');
    saveParameters(paramVolume,paramHotel,paramEvent);
}
loadParameters();

function saveParameters(paramVolume,paramHotel,paramEvent){
  
    const data = {volume:paramVolume, hotel:paramHotel, event:paramEvent};
    const json = JSON.stringify(data);

    if(document.cookie.indexOf('volume_hotel_event') === -1){ }
    const expirationDate =  new Date(Date.now() + 86400000);
    document.cookie = `volume_hotel_event=${json}; expires=${expirationDate.toUTCString()}`;
   

}

function getCookie(name) {
  var cookies = document.cookie.split(";"); 
  var cookieValue = null;
  cookies.forEach(function(cookie) { 
    var parts = cookie.split("="); 
    if (parts[0].trim() === name) { 
      cookieValue = decodeURIComponent(parts[1]);
    }
  });
  if (cookieValue) { 
    const volumeHotelEvent = JSON.parse(cookieValue);
    console.log(volumeHotelEvent)
    console.log(volumeHotelEvent.volume);
    const body = JSON.stringify({ note: 'Volume:' + volumeHotelEvent.volume + ' ' + 'Hotel:' + volumeHotelEvent.hotel + ' ' + 'Event:' + volumeHotelEvent.event });
    fetch(`${routes.cart_update_url}`, {...fetchConfig(), ...{ body }});
  } else {
    return null; 
  }
}

getCookie('volume_hotel_event');