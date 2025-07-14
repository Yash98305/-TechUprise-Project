import React from 'react';

const BookmarkCard = ({ bookmark, toggleFavorite, deleteBookmark }) => {
  return (
    <li className="p-4 bg-white shadow rounded">
      <div className="flex justify-between">
        <div>
          <a
            href={bookmark.url}
            target="_blank"
            rel="noreferrer"
            className="font-bold text-blue-700 hover:underline"
          >
            {bookmark.title}
          </a>
          <p>{bookmark.description}</p>
          <p className="text-sm text-gray-600">
            Tags: {bookmark.tags.join(', ')}
          </p>
        </div>
        {/* <div className="flex flex-col items-end">
          <button
            onClick={() => toggleFavorite(bookmark._id)}
            className="text-yellow-500 text-xl"
          >
            {bookmark.favorite ? '⭐' : '☆'}
          </button>
          <button
            onClick={() => deleteBookmark(bookmark._id)}
            className="text-red-600 mt-2"
          >
            🗑️
          </button>
        </div> */}
      </div>
    </li>
  );
};

export default BookmarkCard;
