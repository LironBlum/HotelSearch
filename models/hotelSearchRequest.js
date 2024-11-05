class HotelSearchRequest {
    constructor(ski_site, from_date, to_date, num_of_guests) {
      this.skiSite = ski_site;
      this.fromDate = from_date;
      this.toDate = to_date;
      this.numOfGuests = num_of_guests;
    }
  }
  
  module.exports = HotelSearchRequest;