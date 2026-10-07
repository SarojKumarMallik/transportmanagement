import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema(
  {
    bookingReference: {
      type: String,
      unique: true,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    tourPackage: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'TourPackage',
      required: true,
    },
    travelDate: {
      type: Date,
      required: true,
    },
    numberOfTravelers: {
      type: Number,
      required: true,
      min: 1,
      default: 1,
    },
    totalAmount: {
      type: Number,
      required: true,
    },
    paymentStatus: {
      type: String,
      enum: ['pending', 'paid', 'refunded', 'failed'],
      default: 'paid',
    },
    paymentMethod: {
      type: String,
      default: 'Credit Card (Online)',
    },
    bookingStatus: {
      type: String,
      enum: ['pending', 'confirmed', 'completed', 'cancelled'],
      default: 'confirmed',
    },
    specialRequests: {
      type: String,
      default: '',
    },
    contactPhone: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Booking = mongoose.model('Booking', bookingSchema);
export default Booking;
