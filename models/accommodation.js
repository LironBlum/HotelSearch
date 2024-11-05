class Accommodation {
    constructor(code, name, images, latitude, longitude, distances, rating, beds, amountAfterTax, amountBeforeTax) {
      this.code = code;
      this.name = name;
      this.images = images;
      this.location = {
        latitude: latitude,
        longitude: longitude,
        distances: distances
      };
      this.rating = rating;
      this.num_of_beds = beds;
      this.price = {
        amountAfterTax: amountAfterTax,
        amountBeforeTax: amountBeforeTax
      };
    }
  }
  
module.exports = Accommodation;
  