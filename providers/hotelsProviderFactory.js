const HotelSimulatorProvider = require('./HotelSimulatorProvider');
const SlowHotelSimulatorProvider = require('./slowHotelSimulatorProvider');


class HotelsProviderFactory {
  static getProvider(providerName) {
    switch (providerName) {
      case 'HotelSimulatorProvider':
        return new HotelSimulatorProvider();
      case 'SlowHotelSimulatorProvider':
        return new SlowHotelSimulatorProvider();
      default:
        throw new Error(`Provider ${providerName} not found`);
    }
  }
}

module.exports = HotelsProviderFactory;
