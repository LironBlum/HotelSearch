class HotelsProvider {
    async getAccommodations(searchCriteria) {
      throw new Error('Method getAccommodations() must be implemented');
    }

    mapFromResponse(response) {
      throw new Error('Method mapFromResponse() must be implemented');
    }
  }
  
  module.exports = HotelsProvider;
  