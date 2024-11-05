const axios = require('axios');
const HotelsProvider = require('./hotelsProvider');
const Accommodation = require('../models/accommodation');

class HotelSimulatorProvider extends HotelsProvider {
  async getAccommodations(hotelSearchRequest) {
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
  
      return response.data.body;
    } catch (error) {
      throw new Error('failed to fetch accommodations from HotelSimulatorProvider');
    }
  }

  mapFromResponse(response) {
    if (!response.success) {
      throw new Error('failed to fetch accommodations from HotelSimulatorProvider');
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
  
}
module.exports = HotelSimulatorProvider;