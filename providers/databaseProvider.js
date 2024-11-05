class DatabaseProvider {
    constructor() {
      this.searches = new Map(); // in memory storage, mock a db
    }
  
    createSearch(id) {
      this.searches.set(id, {accommodations: []});
    }

    addAccommodationToSearch(id, accommodation) {
      const search = this.searches.get(id);
      search.accommodations.push(accommodation);
    }
  
    getSearchById(id) {
      return this.searches.get(id) || null;
    }
  
  }
  
  module.exports = new DatabaseProvider(); //singelton, only one inst
  