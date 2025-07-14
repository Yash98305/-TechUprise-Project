const Note = require("../Models/noteModel.js");
const catchAsyncError = require("../Middlewares/catchAsyncError");
const ErrorHandler = require("../Utils/errorHandler");

exports.createNotes = catchAsyncError(async (req, res, next) => {
  const { title, content, tags, favorite } = req.body;
  const note = await Note.create({
    title,
    content,
    tags,
    favorite,
    userId: req.user,
  });
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
    query.$or = [{ title: { $regex: q, $options: "i" } }];
  }
  if (tags) {
    const tagArray = tags
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean);
    if (tagArray.length > 0) {
      query.tags = { $in: tagArray }; // OR match on tags
    }
  }

  const notes = await Note.find(query).sort({ createdAt: -1 });
  res.json(notes);
});

exports.getSingleNote = catchAsyncError(async (req, res, next) => {
  const note = await Note.findOne({ _id: req.params.id, userId: req.user });
  if (!note) return res.status(404).json({ message: "Not found" });
  res.json(note);
});

exports.UpdateSingleNote = catchAsyncError(async (req, res, next) => {
  const { title, content, tags } = req.body;
  const note = await Note.findOneAndUpdate(
    { _id: req.params.id, userId: req.user },
    { title, content, tags },
    { new: true, runValidators: true }
  );
  if (!note) return next(new ErrorHandler("Note not found", 404));
  res.json(note);
});

exports.UpdateFavorite = catchAsyncError(async (req, res, next) => {
  const note = await Note.findOne({ _id: req.params.id, userId: req.user });
  if (!note) return res.status(404).json({ message: "Note not found" });

  note.favorite = !note.favorite;
  await note.save();
  res.json(note);
});

exports.deleteSingleNote = catchAsyncError(async (req, res, next) => {
  const deleted = await Note.findOneAndDelete({
    _id: req.params.id,
    userId: req.user,
  });
  if (!deleted) return res.status(404).json({ message: "Not found" });
  res.json({ message: "Deleted successfully" });
});

exports.getFavoriteNotes = catchAsyncError(async (req, res) => {
  const notes = await Note.find({ userId: req.user, favorite: true });
  res.status(200).json({ success: true, notes });
});
