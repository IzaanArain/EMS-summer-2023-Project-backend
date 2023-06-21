const Event = require("../models/EventModel");
const asyncHandler = require("express-async-handler");
const mongoose = require("mongoose");

const getAllEvents = asyncHandler(async (req, res) => {
  // const events=await Event.find()
  const events = await Event.find({ user_id: req.user._id });
  res.status(200).json(events);
  // res.status(200).json({message:"get all the events"})
});

const addEvent = asyncHandler(async (req, res) => {
  // console.log(req.body)
  const { title, description, date, time, location } = req.body;

  if (!title || !description || !date || !time || !location) {
    res.status(400);
    throw new Error("all fields ar mandatory");
  }
  const event = await Event.create({
    title,
    description,
    date,
    time,
    location,
    user_id: req.user._id,
  });
  res.status(201).json(event);
  // console.log(res.statusCode)
  // res.status(200).json({message:"add an event"})
});

const getEvent = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(404);
    throw new Error("No such Event");
  }

  const event = await Event.findById(id);

  if (!event) {
    res.status(404);
    throw new Error("event not found");
  }
  res.status(200).json(event);
  // res.status(200).json({message:`get an event at id ${req.params.id}`})
});

const UpdateEvent = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(404);
    throw new Error("No such Event");
  }

  const event = await Event.findById(id);
  if (!event) {
    res.status(404);
    throw new Error("event not found");
  }

//   console.log("update event user: ",event.user_id)

  if (event.user_id.toString() !== req.user._id.toString()) {
    res.status(403);
    throw new Error("user is not authorized to edit this event");
  }

  const updatedEvent = await Event.findByIdAndUpdate(
    id, 
    req.body, 
    {new: true}
    );
  res.status(200).json(updatedEvent);
  // res.status(200).json({message:`update an event at id ${req.params.id}`})
});

const deleteEvent = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(404);
    throw new Error("No such Event");
  }

  const event = await Event.findById(id);
  if (!event) {
    res.status(404);
    throw new Error("event not found");
  }
  if (event.user_id.toString() !== req.user._id.toString()) {
    res.status(403);
    throw new Error("user is not authorized to delete this event");
  }
  const deletedEvent = await Event.findByIdAndDelete(id);
  res.status(200).json(deletedEvent);
  // res.status(200).json({message:`delete an event at id ${req.params.id}`})
});

const patchEvent = (req, res) => {
  res.status(200).json({ message: `patch an event at id ${req.params.id}` });
};

module.exports = {
  getAllEvents,
  addEvent,
  getEvent,
  UpdateEvent,
  deleteEvent,
  patchEvent,
};
