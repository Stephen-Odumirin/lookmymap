import multer from 'multer';
import path from 'path';
import Tour from '../models/tourModel.js';
import { error } from 'console';



// Create a new tour
export const createTour = async (req, res) => {
  const { tourName } = req.body;
  const tourImage = req.files.tourImage?.[0];

  if(!tourName || !tourImage){
    return res.status(400).json({error: 'All fields are required'});
  }

  try {
    const newTour = new Tour({
      tourName,
      tourImage: tourImage.path
    });
    await newTour.save();
    res.status(201).json(newTour);
  } catch (error) {
    console.error('Error during file upload:', error);
    res.status(500).json({ error: 'Failed to create tour' });
  }
};

// Get all maps
export const getTours = async (req, res) => {
  try {
    const tours = await Tour.find();
    res.json(tours);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve tours' });
  }
};

// Get a single map
export const getTourById = async (req, res) => {
  const { id } = req.params;
  try {
    const tour = await Tour.findById(id);
    if (!tour) {
      return res.status(404).json({ error: 'Tour not found' });
    }
    return res.status(200).json(tour);
  } catch (error) {
    console.error('Error fetching tour:', error);
    res.status(500).json({ error: 'Failed to retrieve tour' });
  }
};

export const updateTour = async (req, res) => {
  const { id } = req.params;
  const { tourName } = req.body;

  const tourImage = req.files?.tourImage?.[0];

  try {
    const exsitingTour = await Tour.findById(id);

    if(!exsitingTour) return res.status(404).json({error: 'Tour not found'});

    const updatedTourFields = {
      tourName: tourName || exsitingTour.tourName,
      tourImage: tourImage ? tourImage.path : exsitingTour.tourImage,
    };

    const updatedTour = await Tour.findByIdAndUpdate(id, updatedTourFields, {new: true});

    res.json(updatedTour);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update tour' });
  }
};


// Delete a tour
export const deleteTour = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedTour = await Tour.findByIdAndDelete(id);
    if (!deletedTour) return res.status(404).json({ error: 'Tour not found' });
    res.json({ message: 'Tour deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete tour' });
  }
};
