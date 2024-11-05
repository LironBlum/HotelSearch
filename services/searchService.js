const HotelsProviderFactory = require('../providers/hotelsProviderFactory');
const DatabaseProvider = require('../providers/databaseProvider');
const mapService = require('./mapService');
const { v4: uuid } = require('uuid');

exports.getSearchById = async (id) => {
  // TODO Input validation
  const searchResult = DatabaseProvider.getSearchById(id);
  if (!searchResult) {
    throw new Error(`Search id: ${id} not found`);
  }
  return searchResult;
};

exports.createHotelSearch = async (input) => {
  const { ski_site, from_date, to_date, guests } = input;
  // TODO Input validation
  const providersNames = ['HotelSimulatorProvider', 'SlowHotelSimulatorProvider'];
  const searchId = uuid();
  
  DatabaseProvider.createSearch(searchId);
  const hotelProviders = providersNames.map(name => HotelsProviderFactory.getProvider(name));
  const getAccommodationPromises = createProviderRequestsWithGuestCountOptions(hotelProviders, ski_site, from_date, to_date, guests, searchId);
  getAccommodationPromises.forEach(promise => promise.catch(e => console.error(e)));
  return { searchId };
};

function createProviderRequestsWithGuestCountOptions(providers, ski_site, from_date, to_date, baseGuests, searchId) {
  return providers.flatMap(provider => {
    const guestCountOptions = [baseGuests, baseGuests + 1, baseGuests + 2];
    return guestCountOptions.map(guestCountOpt => 
      fetchAndStoreAccommodations(provider, ski_site, from_date, to_date, guestCountOpt, searchId)
    );
  });
}

async function fetchAndStoreAccommodations(provider, ski_site, from_date, to_date, guests, searchId) {
  const mappedRequest = mapService.mapToHotelSearchRequest(ski_site, from_date, to_date, guests);
  try {
    const response = await provider.getAccommodations(mappedRequest);
    const accommodation = provider.mapFromResponse(response);
    DatabaseProvider.addAccommodationToSearch(searchId, accommodation);
  } catch (error) {
    console.error(`Failed to retrieve data from ${provider.constructor.name} for ${guests} guests:`, error);
  }
}