const Event = require('../models/Event');

exports.getEvents = async (req, res) => {
  const { search, category, location, page = 1 } = req.query;
  const limit = 8;
  const skip = (page - 1) * limit;

  let query = {};

  if (search) {
    query.$or = [
      { name: { $regex: search, $options: 'i' } },
      { description: { $regex: search, $options: 'i' } }
    ];
  }

  if (category) query.category = category;
  if (location) query.location = location;

  try {
    const total = await Event.countDocuments(query);
    const events = await Event.find(query)
      .sort({ date: 1 })
      .limit(limit)
      .skip(skip);

    res.json({
      events,
      page: parseInt(page),
      totalPages: Math.ceil(total / limit),
      totalEvents: total
    });
  } catch (err) {
    res.status(500).json({ message: "Error fetching events" });
  }
};

exports.getEventById = async (req, res) => {
  const event = await Event.findById(req.params.id);
  if (!event)
    return res.status(404).json({ message: "Event not found" });

  res.json(event);
};
