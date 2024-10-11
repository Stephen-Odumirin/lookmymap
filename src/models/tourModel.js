import mongoose from 'mongoose';

const tourSchema = new mongoose.Schema({
    tourName: { type: String, required: true },
    tourImage: { type: String, required: true },
  }, {timestamps: true});
  
  const Tour = mongoose.model('Tour', tourSchema);
  
  export default Tour;