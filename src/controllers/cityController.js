import City from '../models/cityModel.js';

// Create a new city
export const createCity = async (req, res) => {
  const { city } = req.body;
  try {
    const newCity = new City({
      city,
    });
    await newCity.save();
    res.status(201).json(newCity);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create city' });
  }
};

// Get all cities
export const getCities = async (req, res) => {
  try {
    const cities = await City.find();
    res.json(cities);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve cities' });
  }
};

// Get a single category
export const getCityById = async (req, res) => {
  const { id } = req.params;
  try {
    const city = await City.findById(id);
    if (!city) return res.status(404).json({ error: 'City not found' });
    res.json(city);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve city' });
  }
};

// Update a category
export const updateCity = async (req, res) => {
  const { id } = req.params;
  const { city } = req.body;
  try {
    const updatedCity = await City.findByIdAndUpdate(id, {
      city,
    }, { new: true });
    if (!updatedCity) return res.status(404).json({ error: 'City not found' });
    res.json(updatedCity);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update city' });
  }
};

// Delete a category
export const deleteCity = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedCity = await City.findByIdAndDelete(id);
    if (!deletedCity) return res.status(404).json({ error: 'City not found' });
    res.json({ message: 'City deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete category' });
  }
};
