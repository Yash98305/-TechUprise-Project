const Note = require('../Models/noteModel.js');
const catchAsyncError = require("../Middlewares/catchAsyncError");
const ErrorHandler = require("../Utils/errorHandler");

exports.createNotes = catchAsyncError(async (req, res, next) => {  
    const note = await Note.create(req.body);
    res.status(201).json(note);
  
});

exports.getNotes = catchAsyncError(async (req, res, next) => {
      const { q, tags } = req.query;
  const query = {};
  if (q) query.$or = [
    { title: { $regex: q, $options: 'i' } },
    { content: { $regex: q, $options: 'i' } }
  ];
  if (tags) query.tags = { $in: tags.split(',') };

  const notes = await Note.find(query);
  res.json(notes);
});

exports.getSingleNote = catchAsyncError(async (req, res, next) => {
      const note = await Note.findById(req.params.id);
  note ? res.json(note) : res.status(404).json({ error: 'Not found' });
});

exports.UpdateSingleNote = catchAsyncError(async (req, res, next) => {
    
    const updated = await Note.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  
});

exports.deleteSingleNote = catchAsyncError(async (req, res, next) => {  
    await Note.findByIdAndDelete(req.params.id);
  res.json({ message: 'Deleted' });
});

