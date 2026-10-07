import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import TourPackage from '../models/TourPackage.js';
import Destination from '../models/Destination.js';
import Booking from '../models/Booking.js';

dotenv.config();

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/travel_db');
    console.log('🌱 Connected to MongoDB for seeding...');

    // Clear existing data
    await User.deleteMany({});
    await TourPackage.deleteMany({});
    await Destination.deleteMany({});
    await Booking.deleteMany({});

    console.log('🧹 Cleared existing database records.');

    // 1. Create Users (1 Admin, 2 Regular Users) - User model pre-save hook will hash 'password123'
    const users = await User.create([
      {
        name: 'Admin Manager',
        email: 'admin@travel.com',
        password: 'password123',
        role: 'admin',
        phone: '+1 555-0199',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      },
      {
        name: 'Sophia Reynolds',
        email: 'sophia@example.com',
        password: 'password123',
        role: 'user',
        phone: '+1 555-0144',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
      },
      {
        name: 'Alex Rivera',
        email: 'alex@example.com',
        password: 'password123',
        role: 'user',
        phone: '+1 555-0178',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
      },
    ]);

    console.log(`👤 Created ${users.length} users.`);

    // 2. Create Destinations
    const destinations = await Destination.create([
      {
        name: 'Santorini',
        country: 'Greece',
        description: 'Iconic white-washed cliffside villages overlooking the azure Aegean sea.',
        image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=1000&q=80',
        popular: true,
        toursCount: 4,
        bestTimeToVisit: 'May to October',
      },
      {
        name: 'Kyoto & Tokyo',
        country: 'Japan',
        description: 'Immerse yourself in cherry blossoms, ancient shrines, and futuristic neon skylines.',
        image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1000&q=80',
        popular: true,
        toursCount: 6,
        bestTimeToVisit: 'March to May & Sept to Nov',
      },
      {
        name: 'Swiss Alps',
        country: 'Switzerland',
        description: 'Majestic snowy peaks, alpine lakes, and panoramic scenic train rides.',
        image: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=1000&q=80',
        popular: true,
        toursCount: 5,
        bestTimeToVisit: 'December to April & June to Sept',
      },
      {
        name: 'Bali & Nusa Penida',
        country: 'Indonesia',
        description: 'Tropical paradise featuring lush rice terraces, sacred temples, and turquoise waves.',
        image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1000&q=80',
        popular: true,
        toursCount: 8,
        bestTimeToVisit: 'April to October',
      },
      {
        name: 'Serengeti Safari',
        country: 'Tanzania',
        description: 'Witness the Great Migration, the Big Five, and glorious African sunsets in the wild.',
        image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1000&q=80',
        popular: true,
        toursCount: 3,
        bestTimeToVisit: 'June to October',
      },
    ]);

    console.log(`📍 Created ${destinations.length} destinations.`);

    // 3. Create Tour Packages
    const tourPackages = await TourPackage.create([
      {
        title: 'Santorini Sunset & Aegean Yacht Experience',
        destination: 'Santorini',
        country: 'Greece',
        category: 'Luxury',
        durationDays: 6,
        durationNights: 5,
        groupSize: 10,
        price: 1899,
        discountPrice: 1599,
        featured: true,
        status: 'active',
        rating: 4.9,
        reviewCount: 48,
        coverImage: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=1000&q=80',
        images: [
          'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1000&q=80',
          'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1000&q=80',
          'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1000&q=80',
        ],
        overview: 'Experience the magic of Greece with an exclusive tour across Santorini. Sail on a catamaran, taste authentic volcanic wines, and enjoy sunset dinners in Oia.',
        highlights: [
          'Sunset catamaran cruise with gourmet Greek dinner',
          'Private wine tasting tour at organic volcanic vineyards',
          'Guided hike from Fira to Oia with spectacular caldera views',
          'Luxury 5-star cliffside boutique hotel with private jacuzzi',
        ],
        inclusions: [
          '5 Nights luxury accommodation',
          'Daily organic breakfast & 3 special dinners',
          'Catamaran yacht cruise with drinks & meal',
          'All airport transfers in private VIP Mercedes',
          'Professional English-speaking local guide',
        ],
        exclusions: ['International flights', 'Travel insurance', 'Personal expenses'],
        itinerary: [
          { day: 1, title: 'Arrival in Santorini & Welcome Cocktails', description: 'Arrive at Thira Airport, private transfer to hotel, evening welcome cocktail with caldera views.' },
          { day: 2, title: 'Fira Exploration & Volcanic Wine Tour', description: 'Explore narrow alleys of Fira followed by a wine tasting at 3 traditional volcanic estates.' },
          { day: 3, title: 'Private Yacht Cruise to Hot Springs & Red Beach', description: 'Set sail on a private catamaran, snorkel in crystalline waters, and swim in volcanic hot springs.' },
          { day: 4, title: 'Akrotiri Archaeological Site & Black Sand Beaches', description: 'Discover prehistoric Minoan ruins preserved in ash, then relax on Perissa black beach.' },
          { day: 5, title: 'Oia Sunset Photography & Farewell Feast', description: 'Spend the afternoon in Oia capturing world-famous blue domes, followed by a multi-course dinner.' },
          { day: 6, title: 'Departure', description: 'Enjoy your final sunrise breakfast before private transfer to the airport.' },
        ],
      },
      {
        title: 'Mystical Japan: Tokyo Lights & Kyoto Ancient Temples',
        destination: 'Kyoto & Tokyo',
        country: 'Japan',
        category: 'Cultural',
        durationDays: 8,
        durationNights: 7,
        groupSize: 12,
        price: 2450,
        discountPrice: 2199,
        featured: true,
        status: 'active',
        rating: 4.95,
        reviewCount: 64,
        coverImage: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1000&q=80',
        images: [
          'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1000&q=80',
          'https://images.unsplash.com/photo-1528164344705-475426879c0d?auto=format&fit=crop&w=1000&q=80',
        ],
        overview: 'Discover the ultimate contrast between Tokyo ultra-modern metropolis and Kyoto serene zen gardens, golden pavilions, and bamboo groves.',
        highlights: [
          'Bullet train (Shinkansen) high-speed ride across Mount Fuji',
          'Traditional tea ceremony in a 400-year-old Kyoto garden',
          'Street food tasting tour in Shinjuku & Tsukiji Outer Market',
          'Night tour through Gion district searching for Geisha culture',
        ],
        inclusions: [
          '7 Nights in 4-star handpicked hotels',
          '7-Day JR Pass for all high-speed rail travel',
          'Daily breakfasts & 4 curated regional dinners',
          'English speaking master guide throughout',
        ],
        exclusions: ['International flights', 'Discretionary tips'],
        itinerary: [
          { day: 1, title: 'Arrival in Tokyo', description: 'Check into hotel in Shinjuku, orientation walk, and welcome Izakaya dinner.' },
          { day: 2, title: 'Tokyo Contrasts: Senso-ji & Akihabara', description: 'Visit Asakusa historic district and neon tech streets of Akihabara.' },
          { day: 3, title: 'Mount Fuji Excursion & Lake Kawaguchiko', description: 'Day trip to Mount Fuji with cable car ride and lakeside views.' },
          { day: 4, title: 'Shinkansen to Kyoto & Fushimi Inari', description: 'Ride the bullet train to Kyoto and walk through 10,000 vermilion Torii gates.' },
          { day: 5, title: 'Arashiyama Bamboo Forest & Golden Pavilion', description: 'Wander through towering bamboo and visit Kinkaku-ji golden temple.' },
          { day: 6, title: 'Nara Day Trip & Sacred Deer Park', description: 'Meet bowing deer in Nara Park and marvel at the giant Buddha statue.' },
          { day: 7, title: 'Osaka Gourmet Food Walk', description: 'Sample Takoyaki and Okonomiyaki in lively Dotonbori district.' },
          { day: 8, title: 'Sayonara Japan', description: 'Kansai / Haneda airport transfer for your flight home.' },
        ],
      },
      {
        title: 'Swiss Alps & Glacier Express Alpine Expedition',
        destination: 'Swiss Alps',
        country: 'Switzerland',
        category: 'Mountain & Trekking',
        durationDays: 7,
        durationNights: 6,
        groupSize: 8,
        price: 2890,
        discountPrice: 2650,
        featured: true,
        status: 'active',
        rating: 4.88,
        reviewCount: 32,
        coverImage: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=1000&q=80',
        images: [
          'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1000&q=80',
        ],
        overview: 'Traverse the most spectacular mountain passes on Earth. Ride the legendary Glacier Express, summit the Jungfraujoch Top of Europe, and stay in cozy chalets.',
        highlights: [
          'Panoramic ride on the world-renowned Glacier Express',
          'Jungfraujoch Sphinx Observatory at 3,454m above sea level',
          'Matterhorn sunrise view in car-free Zermatt',
          'Traditional Swiss fondue and Swiss chocolate workshop',
        ],
        inclusions: [
          '6 Nights in authentic Alpine boutique chalets',
          'Swiss Travel Pass for unlimited train, bus & boat transit',
          'Jungfraujoch and Gornergrat mountain rail tickets',
        ],
        exclusions: ['Ski gear rentals', 'International airfare'],
        itinerary: [
          { day: 1, title: 'Zurich to Lucerne', description: 'Scenic train ride to Lucerne, stroll Chapel Bridge and cruise Lake Lucerne.' },
          { day: 2, title: 'Interlaken & Lauterbrunnen Waterfalls', description: 'Hike through the valley of 72 waterfalls.' },
          { day: 3, title: 'Jungfraujoch - Top of Europe', description: 'High-altitude railway ascent to the Aletsch Glacier.' },
          { day: 4, title: 'Glacier Express Scenic Journey', description: 'Full day panoramic train passing through 91 tunnels and across 291 bridges.' },
          { day: 5, title: 'Zermatt & Matterhorn Exploration', description: 'Ascend Gornergrat to view the iconic Matterhorn reflection.' },
          { day: 6, title: 'Geneva Lakeside & Chocolate Tasting', description: 'Travel to Geneva, visit old town, and taste artisan Swiss chocolates.' },
          { day: 7, title: 'Departure', description: 'Farewell Swiss Alps and transfer to Geneva Airport.' },
        ],
      },
      {
        title: 'Tropical Bali Paradise: Waterfalls, Temples & Nusa Penida',
        destination: 'Bali & Nusa Penida',
        country: 'Indonesia',
        category: 'Beach & Island',
        durationDays: 5,
        durationNights: 4,
        groupSize: 14,
        price: 980,
        discountPrice: 799,
        featured: true,
        status: 'active',
        rating: 4.85,
        reviewCount: 92,
        coverImage: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1000&q=80',
        images: [
          'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=1000&q=80',
        ],
        overview: 'Escape to tropical bliss with rice terrace swings, sacred water temples, secret jungle waterfalls, and manta ray snorkeling in Nusa Penida.',
        highlights: [
          'Speedboat day trip to Kelingking T-Rex Beach & Angel Billabong',
          'Snorkel with gentle giant Manta Rays in crystal turquoise bays',
          'Ubud jungle swing and Tegalalang rice terrace trek',
          'Tanah Lot sunset temple dinner with Balinese dance',
        ],
        inclusions: [
          '4 Nights in tropical pool villa in Ubud & Seminyak',
          'All private air-conditioned transport & speedboats',
          'Snorkeling equipment, safety gear, and towel service',
        ],
        exclusions: ['Personal shopping', 'International flights'],
        itinerary: [
          { day: 1, title: 'Arrival in Denpasar & Ubud Villa', description: 'Airport pickup, check in to jungle villa, Balinese massage.' },
          { day: 2, title: 'Ubud Waterfalls & Sacred Monkey Forest', description: 'Visit Tegenungan Waterfall, Sacred Monkey Forest, and Ubud Market.' },
          { day: 3, title: 'Nusa Penida Island Tour', description: 'Fast boat to Nusa Penida, visit Kelingking Beach, Broken Beach, and Angel Billabong.' },
          { day: 4, title: 'Manta Bay Snorkeling & Uluwatu Sunset', description: 'Morning snorkeling with mantas, afternoon visit to Uluwatu cliff temple.' },
          { day: 5, title: 'Seminyak Beach Club & Departure', description: 'Relax at beachfront club before afternoon flight home.' },
        ],
      },
      {
        title: 'Serengeti & Ngorongoro Big 5 Safari Expedition',
        destination: 'Serengeti Safari',
        country: 'Tanzania',
        category: 'Wildlife & Safari',
        durationDays: 7,
        durationNights: 6,
        groupSize: 6,
        price: 3450,
        discountPrice: 3100,
        featured: false,
        status: 'active',
        rating: 4.98,
        reviewCount: 29,
        coverImage: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1000&q=80',
        images: [
          'https://images.unsplash.com/photo-1534177616072-ef7dc120449d?auto=format&fit=crop&w=1000&q=80',
        ],
        overview: 'Experience Africa’s most thrilling wildlife safari across Serengeti endless plains and the volcanic amphitheater of Ngorongoro Crater.',
        highlights: [
          'Game drives tracking lions, leopards, elephants, rhinos & buffalos',
          'Stay in luxury tented safari camps under the African night sky',
          'Hot air balloon safari over the Serengeti plains at dawn',
          'Authentic Maasai boma village cultural visit',
        ],
        inclusions: [
          '6 Nights luxury safari lodge & tented camps',
          'Custom 4x4 Land Cruiser with pop-up photography roof',
          'All national park conservation fees and safari permits',
          'All gourmet meals & bush breakfasts',
        ],
        exclusions: ['Tanzania entry visa', 'Hot air balloon optional upgrade'],
        itinerary: [
          { day: 1, title: 'Arusha to Tarangire National Park', description: 'Spot massive elephant herds and iconic baobab trees.' },
          { day: 2, title: 'Lake Manyara & Rift Valley', description: 'See flamingos and tree-climbing lions along the soda lake.' },
          { day: 3, title: 'Ascend into Serengeti National Park', description: 'Endless horizons and big predator sightings.' },
          { day: 4, title: 'Full Day Serengeti Big Cat Safari', description: 'Witness hunt action with pride of lions and cheetahs.' },
          { day: 5, title: 'Ngorongoro Crater Floor Descent', description: 'Descend 600m into the extinct caldera teeming with wildlife.' },
          { day: 6, title: 'Maasai Cultural Experience', description: 'Learn traditional warrior dances and bush survival skills.' },
          { day: 7, title: 'Return to Kilimanjaro Airport', description: 'Final bush brunch and departure.' },
        ],
      },
    ]);

    console.log(`✈️ Created ${tourPackages.length} tour packages.`);

    // 4. Create Sample Bookings
    const sampleBookings = await Booking.create([
      {
        bookingReference: 'TRV-782910',
        user: users[1]._id,
        tourPackage: tourPackages[0]._id,
        travelDate: new Date('2026-11-15'),
        numberOfTravelers: 2,
        totalAmount: 3198,
        paymentStatus: 'paid',
        bookingStatus: 'confirmed',
        contactPhone: '+1 555-0144',
        specialRequests: 'Honeymoon couple, high floor caldera view if available.',
        createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000),
      },
      {
        bookingReference: 'TRV-419022',
        user: users[2]._id,
        tourPackage: tourPackages[1]._id,
        travelDate: new Date('2026-12-05'),
        numberOfTravelers: 1,
        totalAmount: 2199,
        paymentStatus: 'paid',
        bookingStatus: 'confirmed',
        contactPhone: '+1 555-0178',
        specialRequests: 'Vegetarian meal requests on train.',
        createdAt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000),
      },
      {
        bookingReference: 'TRV-993184',
        user: users[1]._id,
        tourPackage: tourPackages[3]._id,
        travelDate: new Date('2027-01-20'),
        numberOfTravelers: 3,
        totalAmount: 2397,
        paymentStatus: 'paid',
        bookingStatus: 'pending',
        contactPhone: '+1 555-0144',
        specialRequests: 'Need scuba equipment for 1 person.',
        createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      },
    ]);

    console.log(`📋 Created ${sampleBookings.length} sample bookings.`);
    console.log('🎉 Seeding successfully finished!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding error:', error);
    process.exit(1);
  }
};

seedDB();
