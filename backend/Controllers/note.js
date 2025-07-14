const Note = require('../Models/noteModel.js');
const catchAsyncError = require("../Middlewares/catchAsyncError");
const ErrorHandler = require("../Utils/errorHandler");

exports.createNotes = catchAsyncError(async (req, res, next) => {  
    const { title, content, tags, favorite } = req.body;
  const note = await Note.create({ title, content, tags, favorite, userId: req.user });
  res.status(201).json(note);
  
});
exports.getAllNotes = catchAsyncError(async (req, res, next) => {
  const notes = await Note.find({ userId: req.user }).sort({ createdAt: -1 });
  res.json(notes);
});

exports.getFilteredNotes = catchAsyncError(async (req, res, next) => {
  const { q, tags } = req.query;

  const query = { userId: req.user };

  if (q) {
    query.$or = [{ title: { $regex: q, $options: 'i' } }];
  }

  if (tags) {
    const tagArray = tags.split(',').map(tag => tag.trim());
    query.tags = { $all: tagArray };
  }

  const notes = await Note.find(query).sort({ createdAt: -1 });
  res.json(notes);
});


exports.getSingleNote = catchAsyncError(async (req, res, next) => {
 const note = await Note.findOne({ _id: req.params.id, userId: req.user });
  if (!note) return res.status(404).json({ message: 'Not found' });
  res.json(note);
});


exports.UpdateSingleNote = catchAsyncError(async (req, res, next) => {

  // const updated = await Note.findOneAndUpdate(
  //   { _id: req.params.id, userId: req.user }, 
  //   req.body,
  //   { new: true }
  // );
  
  // if (!updated) {
  //   return res.status(404).json({ message: 'Note not found' });
  // }

  // res.json(updated);
   const note = await Note.findOne({ _id: req.params.id, userId: req.user });
  if (!note) return res.status(404).json({ message: 'Note not found' });

  note.favorite = !note.favorite;
  await note.save();
  res.json(note);
});

exports.deleteSingleNote = catchAsyncError(async (req, res, next) => {  
     const deleted = await Note.findOneAndDelete({ _id: req.params.id, userId: req.user });
  if (!deleted) return res.status(404).json({ message: 'Not found' });
  res.json({ message: 'Deleted successfully' });
});

