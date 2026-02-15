const Event = require('../models/Event');
const Registration = require('../models/Registration');

exports.registerEvent = async (req, res) => {
  const { eventId } = req.params;

  const event = await Event.findById(eventId);
  if (!event)
    return res.status(404).json({ message: "Event not found" });

  if (event.registeredCount >= event.capacity)
    return res.status(400).json({ message: "Event full" });

  try {
    await Registration.create({
      user: req.user._id,
      event: eventId
    });

    event.registeredCount += 1;
    await event.save();

    res.status(201).json({ message: "Registered successfully" });
  } catch (err) {
    res.status(400).json({ message: "Already registered" });
  }
};

exports.cancelRegistration = async (req, res) => {
  const { eventId } = req.params;

  const registration = await Registration.findOne({
    user: req.user._id,
    event: eventId
  });

  if (!registration)
    return res.status(404).json({ message: "Registration not found" });

  try {
    await Registration.deleteOne({ _id: registration._id });

    const event = await Event.findById(eventId);
    if (event) {
      event.registeredCount -= 1;
      await event.save();
    }

    res.json({ message: "Registration cancelled successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error cancelling registration" });
  }
};

exports.getMyRegistrations = async (req, res) => {
  const registrations = await Registration.find({ user: req.user._id })
    .populate('event');

  res.json(registrations);
};
