const searchService = require('../services/searchService');

exports.createHotelSearch = async (req, res) => {
    try {
      const searchId = await searchService.createHotelSearch(req.body);
      res.status(200).json(searchId);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
exports.getHotelSearchResultById = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await searchService.getSearchById(id);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

