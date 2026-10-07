import Booking from '../models/Booking.js';
import TourPackage from '../models/TourPackage.js';

// Helper to generate readable booking reference (e.g. TRV-8942)
const generateBookingRef = () => {
  return 'TRV-' + Math.floor(100000 + Math.random() * 900000);
};

// @desc Create a new booking
// @route POST /api/bookings
export const createBooking = async (req, res) => {
  try {
    const {
      tourPackageId,
      travelDate,
      numberOfTravelers,
      contactPhone,
      specialRequests,
      paymentMethod,
    } = req.body;

    const tour = await TourPackage.findById(tourPackageId);
    if (!tour) {
      return res.status(404).json({ success: false, message: 'Tour package not found' });
    }

    const pricePerPerson = tour.discountPrice > 0 ? tour.discountPrice : tour.price;
    const totalAmount = pricePerPerson * Number(numberOfTravelers);

    const booking = await Booking.create({
      bookingReference: generateBookingRef(),
      user: req.user.id,
      tourPackage: tourPackageId,
      travelDate,
      numberOfTravelers,
      totalAmount,
      contactPhone,
      specialRequests: specialRequests || '',
      paymentMethod: paymentMethod || 'Credit Card (Online)',
      paymentStatus: 'paid',
      bookingStatus: 'confirmed',
    });

    const populatedBooking = await Booking.findById(booking._id).populate('tourPackage', 'title coverImage destination country durationDays');

    res.status(201).json({
      success: true,
      booking: populatedBooking,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc Get current user's bookings
// @route GET /api/bookings/my
export const getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user.id })
      .populate('tourPackage')
      .sort({ createdAt: -1 });

    res.json({ success: true, bookings });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc Get all bookings (Admin only)
// @route GET /api/bookings
export const getAllBookings = async (req, res) => {
  try {
    const { status, search, page = 1, limit = 20 } = req.query;
    let query = {};

    if (status && status !== 'all') {
      query.bookingStatus = status;
    }

    const pageNumber = parseInt(page, 10);
    const limitNumber = parseInt(limit, 10);
    const skip = (pageNumber - 1) * limitNumber;

    const total = await Booking.countDocuments(query);
    const bookings = await Booking.find(query)
      .populate('user', 'name email phone avatar')
      .populate('tourPackage', 'title destination price coverImage')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limitNumber);

    res.json({
      success: true,
      total,
      page: pageNumber,
      pages: Math.ceil(total / limitNumber),
      bookings,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc Update booking status (Admin only)
// @route PUT /api/bookings/:id/status
export const updateBookingStatus = async (req, res) => {
  try {
    const { bookingStatus, paymentStatus } = req.body;
    const updateData = {};
    if (bookingStatus) updateData.bookingStatus = bookingStatus;
    if (paymentStatus) updateData.paymentStatus = paymentStatus;

    const booking = await Booking.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
    })
      .populate('user', 'name email phone')
      .populate('tourPackage', 'title destination');

    if (!booking) {
      return res.status(404).json({ success: false, message: 'Booking not found' });
    }

    res.json({ success: true, booking });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc Cancel booking
// @route PUT /api/bookings/:id/cancel
export const cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findOne({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!booking) {
      return res.status(404).json({ success: false, message: 'Booking not found' });
    }

    if (booking.bookingStatus === 'cancelled') {
      return res.status(400).json({ success: false, message: 'Booking is already cancelled' });
    }

    booking.bookingStatus = 'cancelled';
    await booking.save();

    res.json({ success: true, message: 'Booking cancelled successfully', booking });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
