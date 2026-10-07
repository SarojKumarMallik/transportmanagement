import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema(
  {
    tourPackage: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'TourPackage',
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    title: {
      type: String,
      default: '',
    },
    comment: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Review = mongoose.model('Review', reviewSchema);
export default Review;
