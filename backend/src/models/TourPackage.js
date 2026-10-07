import mongoose from 'mongoose';

const itinerarySchema = new mongoose.Schema({
  day: { type: Number, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  activities: [{ type: String }],
});

const tourPackageSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please provide package title'],
      trim: true,
    },
    slug: {
      type: String,
      lowercase: true,
      trim: true,
    },
    destination: {
      type: String,
      required: [true, 'Please provide destination'],
    },
    country: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      enum: ['Adventure', 'Cultural', 'Beach & Island', 'Mountain & Trekking', 'Luxury', 'Wildlife & Safari', 'City Tour'],
      default: 'Adventure',
    },
    durationDays: {
      type: Number,
      required: true,
    },
    durationNights: {
      type: Number,
      required: true,
    },
    groupSize: {
      type: Number,
      default: 12,
    },
    price: {
      type: Number,
      required: [true, 'Please specify regular price'],
    },
    discountPrice: {
      type: Number,
      default: 0,
    },
    featured: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      enum: ['active', 'draft', 'archived'],
      default: 'active',
    },
    rating: {
      type: Number,
      default: 4.8,
    },
    reviewCount: {
      type: Number,
      default: 0,
    },
    coverImage: {
      type: String,
      required: true,
    },
    images: [{ type: String }],
    overview: {
      type: String,
      required: true,
    },
    highlights: [{ type: String }],
    inclusions: [{ type: String }],
    exclusions: [{ type: String }],
    itinerary: [itinerarySchema],
    startDates: [{ type: Date }],
  },
  { timestamps: true }
);

const TourPackage = mongoose.model('TourPackage', tourPackageSchema);
export default TourPackage;
