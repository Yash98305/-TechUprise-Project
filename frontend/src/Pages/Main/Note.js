import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../Context/auth';
import { toast } from 'react-toastify';

const Note = () => {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState('');
  const [search, setSearch] = useState('');
const [filterTags, setFilterTags] = useState('');
  const { auth } = useAuth();

 const fetchNotes = async () => {
  try {
    const query = `?q=${search}&tags=${filterTags}`;
    const res = await axios.get(`http://localhost:8000/api/v1/notes${query}`, {
      headers: { Authorization: `${auth?.token}` },
    });
    setNotes(res.data);
  } catch (err) {
    toast.error('Failed to fetch notes');
  }
};

  const createNote = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        'http://localhost:8000/api/v1/notes',
        { title, content, tags: tags.split(',') },
        { headers: { Authorization: `${auth?.token}` } }
      );
      setTitle('');
      setContent('');
      setTags('');
      toast.success('Note added');
      fetchNotes();
    } catch (err) {
      toast.error('Error creating note');
    }
  };

  const deleteNote = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/v1/notes/${id}`, {
        headers: { Authorization: `${auth?.token}` },
      });
      toast.success('Note deleted');
      fetchNotes();
    } catch (err) {
      toast.error('Delete error');
    }
  };

  const toggleFavorite = async (id) => {
    try {
      await axios.put(`http://localhost:8000/api/v1/notes/${id}`, {
        headers: { Authorization: `${auth?.token}` },
      });
      fetchNotes();
    } catch (err) {
      toast.error('Toggle favorite failed');
    }
  };


  useEffect(() => {
  if (auth?.token) fetchNotes();
}, [auth?.token, search, filterTags]);

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Notes</h1>


  {/* Search input */}
  <input
    placeholder="Search notes"
    value={search}
    onChange={e => setSearch(e.target.value)}
    className="w-full p-2 border rounded mb-4"
  />

  {/* Filter by tags input */}
  <input
    placeholder="Filter by tags (comma separated)"
    value={filterTags}
    onChange={(e) => setFilterTags(e.target.value)}
    className="w-full p-2 border rounded mb-4"
  />
      <form onSubmit={createNote} className="space-y-2 mb-6">
        <input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <input
          placeholder="Tags (comma separated)"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <button className="bg-green-600 text-white px-4 py-2 rounded">Add Note</button>
      </form>

      <ul className="grid gap-4">
        {notes.map((note) => (
          <li key={note._id} className="p-4 bg-white shadow rounded">
            <div className="flex justify-between">
              <div>
                <h2 className="font-bold text-lg">{note.title}</h2>
                <p>{note.content}</p>
                <p className="text-sm text-gray-600">Tags: {note.tags.join(', ')}</p>
              </div>
              <div className="flex flex-col items-end">
                <button onClick={() => toggleFavorite(note._id)} className="text-yellow-500 text-xl">
                  {note.favorite ? '⭐' : '☆'}
                </button>
                <button onClick={() => deleteNote(note._id)} className="text-red-600 mt-2">🗑️</button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Note;
