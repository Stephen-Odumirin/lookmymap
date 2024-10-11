import mongoose from 'mongoose';

const mapSchema = new mongoose.Schema({
  city: { type: String, required: true },
  mapImage: { type: String, required: true },
}, {timestamps: true});

const Map = mongoose.model('Map', mapSchema);

export default Map;
