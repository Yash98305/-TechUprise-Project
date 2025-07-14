import React from 'react';

const NoteCard = ({ note, toggleFavorite, deleteNote }) => {
  return (
    <li className="p-4 bg-white shadow rounded">
      <div className="flex justify-between">
        <div>
          <h3 className="text-lg font-bold text-gray-800">{note.title}</h3>
          <p className="text-gray-700">{note.content}</p>
          <p className="text-sm text-gray-600">
            Tags: {note.tags.join(', ')}
          </p>
        </div>
        {/* <div className="flex flex-col items-end">
          <button
            onClick={() => toggleFavorite(note._id)}
            className="text-yellow-500 text-xl"
          >
            {note.favorite ? '⭐' : '☆'}
          </button>
          <button
            onClick={() => deleteNote(note._id)}
            className="text-red-600 mt-2"
          >
            🗑️
          </button>
        </div> */}
      </div>
    </li>
  );
};

export default NoteCard;
