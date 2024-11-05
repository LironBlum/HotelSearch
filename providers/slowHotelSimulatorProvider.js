const axios = require('axios');
const HotelsProvider = require('./hotelsProvider');
const Accommodation = require('../models/accommodation');

class SlowHotelSimulatorProvider extends HotelsProvider {
  async getAccommodations(hotelSearchRequest) {
    const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
    await delay(60000);

    //TODO implement caching
    try {
      const response = await axios.post('https://gya7b1xubh.execute-api.eu-west-2.amazonaws.com/default/HotelsSimulator', {
        query: {
          ski_site: hotelSearchRequest.skiSite,
          from_date: hotelSearchRequest.fromDate,
          to_date: hotelSearchRequest.toDate,
          group_size: hotelSearchRequest.numOfGuests
        }
      });
      console.log('---- GOT RESPONSE FROM SLOW HOTEL SIMULATOR ----'); //when you see this log get the search result again, meant for testing that the search result is updating when the slow provider responds
      return response.data.body;
    } catch (error) {
      throw new Error('failed to fetch accommodations from SlowHotelSimulatorProvider');
    }
  }

  mapFromResponse(response) {
    if (!response.success) {
      throw new Error('failed to fetch accommodations from SlowHotelSimulatorProvider');
    }

    return response.accommodations.map(accommodation => {
      const images = accommodation.HotelDescriptiveContent.Images.map(image => image.URL);
      const distances = accommodation.HotelInfo.Position.Distances.map(distance => ({
        type: distance.type,
        distance: distance.distance,
      }));

      return new Accommodation(
        accommodation.HotelCode,
        accommodation.HotelName,
        images,
        parseFloat(accommodation.HotelInfo.Position.Latitude),
        parseFloat(accommodation.HotelInfo.Position.Longitude),
        distances,
        accommodation.HotelInfo.Rating,
        accommodation.HotelInfo.Beds,
        parseFloat(accommodation.PricesInfo.AmountAfterTax),
        parseFloat(accommodation.PricesInfo.AmountBeforeTax)
      );
    });
  }

  //TODO implement getName
  //TODO implement mapToRequest fromHotelSearchRequest
}

module.exports = SlowHotelSimulatorProvider;
