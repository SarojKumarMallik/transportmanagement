import mongoose from 'mongoose';

const destinationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    country: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    popular: {
      type: Boolean,
      default: false,
    },
    toursCount: {
      type: Number,
      default: 0,
    },
    bestTimeToVisit: {
      type: String,
      default: 'Year-round',
    },
  },
  { timestamps: true }
);

const Destination = mongoose.model('Destination', destinationSchema);
export default Destination;
