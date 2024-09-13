import multer from 'multer';
import path from 'path';
import Map from '../models/mapModel.js';
import { error } from 'console';



// Create a new map
export const createMap = async (req, res) => {
  const { city } = req.body;
  const mapImage = req.files.mapImage?.[0];

  if(!city || !mapImage){
    return res.status(400).json({error: 'All fields are required'});
  }

  try {
    const newMap = new Map({
      city,
      mapImage: mapImage.path
    });
    await newMap.save();
    res.status(201).json(newMap);
  } catch (error) {
    console.error('Error during file upload:', error);
    res.status(500).json({ error: 'Failed to create map' });
  }
};

// Get all maps
export const getMaps = async (req, res) => {
  try {
    const maps = await Map.find();
    res.json(maps);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve maps' });
  }
};

// Get a single map
export const getMapById = async (req, res) => {
  const { id } = req.params;
  try {
    const map = await Map.findById(id);
    if (!map) {
      return res.status(404).json({ error: 'Map not found' });
    }
    return res.status(200).json(map);
  } catch (error) {
    console.error('Error fetching map:', error);
    res.status(500).json({ error: 'Failed to retrieve map' });
  }
};

export const updateMap = async (req, res) => {
  const { id } = req.params;
  const { city } = req.body;

  const mapImage = req.files?.mapImage?.[0];

  try {
    const exsitingMap = await Map.findById(id);

    if(!exsitingMap) return res.status(404).json({error: 'Map not found'});

    const updatedMapFields = {
      city: city || exsitingMap.city,
      mapImage: mapImage ? mapImage.path : exsitingMap.mapImage,
    };

    const updatedMap = await Map.findByIdAndUpdate(id, updatedMapFields, {new: true});

    res.json(updatedMap);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update map' });
  }
};


// Delete a map
export const deleteMap = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedMap = await Map.findByIdAndDelete(id);
    if (!deletedMap) return res.status(404).json({ error: 'Map not found' });
    res.json({ message: 'Map deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete map' });
  }
};
