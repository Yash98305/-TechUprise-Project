const catchAsyncError = require("../Middlewares/catchAsyncError");
const ErrorHandler = require("../Utils/errorHandler");
const axios = require('axios');
const cheerio = require('cheerio');
const Bookmark = require('../Models/bookmarkModel.js');

async function fetchTitle(url) {
  try {
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);
    return $('title').text();
  } catch {
    return '';
  }
}

exports.createBookmarks = catchAsyncError(async (req, res, next) => {
   let { url, title, description, tags, favorite } = req.body;
  if (!url) return res.status(400).json({ message: 'URL is required' });

  if (!title) {
    title = await fetchTitle(url);
  }
console.log(11)
  const bookmark = await Bookmark.create({ url, title, description, tags, favorite, userId: req.user });
  res.status(201).json(bookmark);
 
});

exports.getBookmarks = catchAsyncError(async (req, res, next) => {
     const { q, tags } = req.query;
  const filter = { userId: req.user };
  if (q) filter.$or = [{ title: { $regex: q, $options: 'i' } }];
  if (tags){
    const tagArray = tags.split(',').map(tag => tag.trim());
    query.tags = { $all: tagArray };
  }

  const bookmarks = await Bookmark.find(filter).sort({ createdAt: -1 });
  res.json(bookmarks);
});

exports.getSingleBookmark = catchAsyncError(async (req, res, next) => {
     const bookmark = await Bookmark.findOne({ _id: req.params.id, userId: req.user });
  if (!bookmark) return res.status(404).json({ message: 'Not found' });
  res.json(bookmark);
});

exports.updateSingleBookmark = catchAsyncError(async (req, res, next) => {  
    const bookmark = await Bookmark.findOne({ _id: req.params.id, userId: req.user });
      if (!bookmark) return res.status(404).json({ message: 'Bookmark not found' });
    
      bookmark.favorite = !bookmark.favorite;
      await bookmark.save();
      res.json(bookmark);
  
});

exports.deleteSingleBookmark = catchAsyncError(async (req, res, next) => {
      const deleted = await Bookmark.findOneAndDelete({ _id: req.params.id, userId: req.user });
  if (!deleted) return res.status(404).json({ message: 'Not found' });
  res.json({ message: 'Deleted successfully' });
});



