import TourPackage from '../models/TourPackage.js';

// @desc Get all tours with filtering, search & pagination
// @route GET /api/tours
export const getTours = async (req, res) => {
  try {
    const {
      search,
      category,
      minPrice,
      maxPrice,
      duration,
      sort,
      featured,
      page = 1,
      limit = 12,
    } = req.query;

    let query = { status: 'active' };

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { destination: { $regex: search, $options: 'i' } },
        { country: { $regex: search, $options: 'i' } },
      ];
    }

    if (category && category !== 'All') {
      query.category = category;
    }

    if (featured === 'true') {
      query.featured = true;
    }

    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    if (duration) {
      if (duration === 'short') query.durationDays = { $lte: 3 };
      else if (duration === 'medium') query.durationDays = { $gte: 4, $lte: 7 };
      else if (duration === 'long') query.durationDays = { $gte: 8 };
    }

    let sortOption = { createdAt: -1 };
    if (sort === 'price-low') sortOption = { price: 1 };
    else if (sort === 'price-high') sortOption = { price: -1 };
    else if (sort === 'rating') sortOption = { rating: -1 };
    else if (sort === 'duration') sortOption = { durationDays: 1 };

    const pageNumber = parseInt(page, 10);
    const limitNumber = parseInt(limit, 10);
    const skip = (pageNumber - 1) * limitNumber;

    const total = await TourPackage.countDocuments(query);
    const tours = await TourPackage.find(query)
      .sort(sortOption)
      .skip(skip)
      .limit(limitNumber);

    res.json({
      success: true,
      total,
      page: pageNumber,
      pages: Math.ceil(total / limitNumber),
      tours,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc Get single tour details by ID
// @route GET /api/tours/:id
export const getTourById = async (req, res) => {
  try {
    const tour = await TourPackage.findById(req.params.id);
    if (!tour) {
      return res.status(404).json({ success: false, message: 'Tour package not found' });
    }
    res.json({ success: true, tour });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc Create new tour package (Admin only)
// @route POST /api/tours
export const createTour = async (req, res) => {
  try {
    const tour = await TourPackage.create(req.body);
    res.status(201).json({ success: true, tour });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc Update tour package (Admin only)
// @route PUT /api/tours/:id
export const updateTour = async (req, res) => {
  try {
    const tour = await TourPackage.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!tour) {
      return res.status(404).json({ success: false, message: 'Tour package not found' });
    }
    res.json({ success: true, tour });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc Delete tour package (Admin only)
// @route DELETE /api/tours/:id
export const deleteTour = async (req, res) => {
  try {
    const tour = await TourPackage.findByIdAndDelete(req.params.id);
    if (!tour) {
      return res.status(404).json({ success: false, message: 'Tour package not found' });
    }
    res.json({ success: true, message: 'Tour package deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc Get featured tours & categories summary
// @route GET /api/tours/featured/list
export const getFeaturedTours = async (req, res) => {
  try {
    const featured = await TourPackage.find({ featured: true, status: 'active' }).limit(6);
    const categories = await TourPackage.aggregate([
      { $match: { status: 'active' } },
      { $group: { _id: '$category', count: { $sum: 1 }, coverImage: { $first: '$coverImage' } } },
    ]);
    res.json({ success: true, featured, categories });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
