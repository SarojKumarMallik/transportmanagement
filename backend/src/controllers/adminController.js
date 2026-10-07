import Booking from '../models/Booking.js';
import User from '../models/User.js';
import TourPackage from '../models/TourPackage.js';

// @desc Get comprehensive admin dashboard analytics
// @route GET /api/admin/dashboard-stats
export const getDashboardStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalTours = await TourPackage.countDocuments();
    const totalBookings = await Booking.countDocuments();

    // Aggregate revenue
    const revenueAgg = await Booking.aggregate([
      { $match: { paymentStatus: 'paid' } },
      { $group: { _id: null, totalRevenue: { $sum: '$totalAmount' } } },
    ]);
    const totalRevenue = revenueAgg.length > 0 ? revenueAgg[0].totalRevenue : 0;

    // Recent 5 bookings
    const recentBookings = await Booking.find()
      .populate('user', 'name email avatar')
      .populate('tourPackage', 'title price coverImage')
      .sort({ createdAt: -1 })
      .limit(5);

    // Bookings status breakdown
    const bookingsByStatus = await Booking.aggregate([
      { $group: { _id: '$bookingStatus', count: { $sum: 1 } } },
    ]);

    // Monthly revenue trend (last 6 months)
    const monthlyRevenue = await Booking.aggregate([
      { $match: { paymentStatus: 'paid' } },
      {
        $group: {
          _id: {
            year: { $year: '$createdAt' },
            month: { $month: '$createdAt' },
          },
          revenue: { $sum: '$totalAmount' },
          bookings: { $sum: 1 },
        },
      },
      { $sort: { '_id.year': 1, '_id.month': 1 } },
      { $limit: 6 },
    ]);

    // Top tours by bookings
    const topTours = await TourPackage.find({ status: 'active' })
      .sort({ rating: -1, reviewCount: -1 })
      .limit(4)
      .select('title destination price rating reviewCount coverImage category');

    res.json({
      success: true,
      stats: {
        totalRevenue,
        totalBookings,
        totalUsers,
        totalTours,
        recentBookings,
        bookingsByStatus,
        monthlyRevenue,
        topTours,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc Get all registered users (Admin only)
// @route GET /api/admin/users
export const getAllUsers = async (req, res) => {
  try {
    const { search, role, page = 1, limit = 20 } = req.query;
    let query = {};

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
      ];
    }

    if (role && role !== 'all') {
      query.role = role;
    }

    const pageNumber = parseInt(page, 10);
    const limitNumber = parseInt(limit, 10);
    const skip = (pageNumber - 1) * limitNumber;

    const total = await User.countDocuments(query);
    const users = await User.find(query)
      .select('-password')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limitNumber);

    res.json({
      success: true,
      total,
      page: pageNumber,
      pages: Math.ceil(total / limitNumber),
      users,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc Toggle user active status or change role (Admin only)
// @route PUT /api/admin/users/:id
export const updateUserByAdmin = async (req, res) => {
  try {
    const { isActive, role } = req.body;
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    if (typeof isActive === 'boolean') user.isActive = isActive;
    if (role) user.role = role;

    await user.save();

    res.json({
      success: true,
      message: 'User updated successfully',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        isActive: user.isActive,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
