import multer from 'multer';
import path from 'path';
import Listing from '../models/listingModel.js';

// Create a new listing (Admin)
export const createListing = async (req, res) => {
  //console.log('Uploaded Files:', req.files);
  const { title, description, location, website, googleNavigator, email, phone, address, latitude, longitude, category } = req.body;
  
  const coverImage = req.files.coverImage?.[0];//req.files.coverImage?.[0];
  const logo = req.files.logo?.[0];


  if (!title || !description || !coverImage || !logo) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const newListing = new Listing({
      title,
      description,
      location,
      coverImage: coverImage.path,
      logo: logo.path,
      website,
      address,
      googleNavigator,
      email,
      phone,
      latitude, 
      longitude,
      category
    });
    await newListing.save();
    res.status(201).json(newListing);
  } catch (error) {
    console.error('Error during file upload:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Get all listings (Public)
export const getListings = async (req, res) => {
  //const { page = 1, limit = 10 } = req.query;
  try {
    const listings = await Listing.find()
      // .limit(limit * 1)
      // .skip((page - 1) * limit)
      // .exec();
    
    //const count = await Listing.countDocuments();
    res.json({
      listings
      // totalPages: Math.ceil(count / limit),
      // currentPage: Number(page),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Get a single listing by ID (Public)
export const getListingById = async (req, res) => {
  const { id } = req.params;
  try {
    const listing = await Listing.findById(id);
    if (!listing) {
      return res.status(404).json({ error: 'Listing not found' });
    }
    return res.status(200).json(listing);
  } catch (error) {
    console.error('Error fetching listing:',error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Update a listing (Admin)
// export const updateListing = async (req, res) => {
//   const { id } = req.params;
//   const { title, coverImage, logo, description, location, website, googleNavigator, email, phone, address, latitude, longitude, category } = req.body;

//   try {
//     const updatedListing = await Listing.findByIdAndUpdate(
//       id,
//       { title, coverImage, logo, description, location, coverImage, logo, website, address, googleNavigator, email, phone, latitude, longitude, category },
//       { new: true }
//     );
//     if (!updatedListing) return res.status(404).json({ error: 'Listing not found' });
//     res.json(updatedListing);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Server error' });
//   }
// };
// Update a listing (Admin)
export const updateListing = async (req, res) => {
  const { id } = req.params;
  const {
    title,
    description,
    location,
    website,
    googleNavigator,
    email,
    phone,
    address,
    latitude,
    longitude,
    category,
  } = req.body;

  // Handle uploaded files
  const coverImage = req.files?.coverImage?.[0]; // Get coverImage if uploaded
  const logo = req.files?.logo?.[0]; // Get logo if uploaded

  try {
    // Find the listing by ID
    const existingListing = await Listing.findById(id);
    if (!existingListing) return res.status(404).json({ error: 'Listing not found' });

    // Prepare updated fields
    const updatedFields = {
      title: title || existingListing.title,
      description: description || existingListing.description,
      location: location || existingListing.location,
      coverImage: coverImage ? coverImage.path : existingListing.coverImage, // Use new path if updated, else keep old
      logo: logo ? logo.path : existingListing.logo, // Use new path if updated, else keep old
      website: website || existingListing.website,
      address: address || existingListing.address,
      googleNavigator: googleNavigator || existingListing.googleNavigator,
      email: email || existingListing.email,
      phone: phone || existingListing.phone,
      latitude: latitude || existingListing.latitude,
      longitude: longitude || existingListing.longitude,
      category: category || existingListing.category,
    };

    // Update the listing with new fields
    const updatedListing = await Listing.findByIdAndUpdate(id, updatedFields, { new: true });

    res.json(updatedListing);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Delete a listing (Admin)
export const deleteListing = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedListing = await Listing.findByIdAndDelete(id);
    if (!deletedListing) return res.status(404).json({ error: 'Listing not found' });
    res.json({ message: 'Listing deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};
