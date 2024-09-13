import mongoose from 'mongoose';

const mapSchema = new mongoose.Schema({
  city: { type: String, required: true },
  mapImage: { type: String, required: true },
  // description: { type: String, required: true },
  // latitude: { type: Number, required: true },  // Add latitude
  // longitude: { type: Number, required: true }, // Add longitude
}, {timestamps: true});

const Map = mongoose.model('Map', mapSchema);

export default Map;
