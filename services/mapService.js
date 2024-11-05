const HotelSearchRequest = require('../models/hotelSearchRequest');

exports.mapToHotelSearchRequest = (ski_site, from_date, to_date, num_of_guests) => {
  return new HotelSearchRequest(ski_site, from_date, to_date, num_of_guests);
};