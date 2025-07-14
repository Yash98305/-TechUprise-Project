import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../Context/auth';
import { toast } from 'react-toastify';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import CloseIcon from '@mui/icons-material/Close';

const Note = () => {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState('');
  const [search, setSearch] = useState('');
  const [filterTags, setFilterTags] = useState('');
  const [selectedNote, setSelectedNote] = useState(null);
  const [editNote, setEditNote] = useState({ title: '', content: '', tags: '' });
  const { auth,api } = useAuth();

  const fetchNotes = async () => {
    try {
      const query = `?q=${search.trim()}&tags=${filterTags.trim()}`;
      const res = await axios.get(`${api}/notes${query}`, {
        headers: { Authorization: `${auth?.token}` },
      });
      setNotes(res.data);
    } catch (err) {
      console.error('Fetch error:', err.response?.data || err.message);
      toast.error('Failed to fetch notes');
    }
  };

  const createNote = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        `${api}/notes`,
        {
          title,
          content,
          tags: tags.split(',').map((t) => t.trim()),
        },
        {
          headers: { Authorization: `${auth?.token}` },
        }
      );
      setTitle('');
      setContent('');
      setTags('');
      toast.success('Note added');
      fetchNotes();
    } catch (err) {
      console.error('Create error:', err.response?.data || err.message);
      toast.error('Error creating note');
    }
  };

  const deleteNote = async (id) => {
    try {
      await axios.delete(`${api}/notes/${id}`, {
        headers: { Authorization: `${auth?.token}` },
      });
      toast.success('Note deleted');
      fetchNotes();
    } catch (err) {
      toast.error('Error deleting note');
    }
  };

  const toggleFavorite = async (id) => {
    try {
      await axios.put(`${api}/notes/favorite/${id}`, {}, {
        headers: { Authorization: `${auth?.token}` },
      });
      fetchNotes();
    } catch (err) {
      toast.error('Toggle favorite failed');
    }
  };

  const handleOpenModal = (note) => {
    setSelectedNote(note);
    setEditNote({
      title: note.title,
      content: note.content,
      tags: note.tags.join(', '),
    });
  };

  const handleCloseModal = () => setSelectedNote(null);

  const handleEditChange = (e) => {
    setEditNote({ ...editNote, [e.target.name]: e.target.value });
  };

  const handleUpdateNote = async () => {
    try {
      await axios.put(
        `${api}/notes/${selectedNote._id}`,
        {
          ...editNote,
          tags: editNote.tags.split(',').map((tag) => tag.trim()),
        },
        { headers: { Authorization: `${auth?.token}` } }
      );
      toast.success('Note updated!');
      handleCloseModal();
      fetchNotes();
    } catch (err) {
      toast.error('Update failed');
    }
  };

  useEffect(() => {
    if (auth?.token) fetchNotes();
  }, [api,auth?.token, search, filterTags]);

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Search Notes</h1>
      <input placeholder="Search notes" value={search} onChange={(e) => setSearch(e.target.value)} className="w-full p-2 border rounded mb-4" />
      <input placeholder="Filter by tags (comma separated)" value={filterTags} onChange={(e) => setFilterTags(e.target.value)} className="w-full p-2 border rounded mb-4" />

      <h1 className="text-2xl font-bold mb-4">Create Notes</h1>
      <form onSubmit={createNote} className="space-y-2 mb-6">
        <input placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full p-2 border rounded" />
        <textarea placeholder="Content" value={content} onChange={(e) => setContent(e.target.value)} className="w-full p-2 border rounded" />
        <input placeholder="Tags (comma separated)" value={tags} onChange={(e) => setTags(e.target.value)} className="w-full p-2 border rounded" />
        <button className="bg-green-600 text-white px-4 py-2 rounded">Add Note</button>
      </form>

      <h1 className="text-2xl font-bold mb-4">All Notes</h1>
      <ul className="grid gap-4">
        {notes.length === 0 ? (
          <p className="text-gray-500">No notes found.</p>
        ) : (
          notes.map((note) => (
            <li key={note._id} className="p-4 bg-white shadow rounded cursor-pointer" onClick={() => handleOpenModal(note)}>
              <div className="flex justify-between">
                <div>
                  <h2 className="font-bold text-lg">{note.title}</h2>
                  <p>{note.content}</p>
                  <p className="text-sm text-gray-600">Tags: {note.tags.join(', ')}</p>
                </div>
                <div className="flex flex-col items-end">
                  <button onClick={(e) => { e.stopPropagation(); toggleFavorite(note._id); }} className="text-yellow-500 text-xl">
                    {note.favorite ? '⭐' : '☆'}
                  </button>
                  <button onClick={(e) => { e.stopPropagation(); deleteNote(note._id); }} className="text-red-600 mt-2">
                    🗑️
                  </button>
                </div>
              </div>
            </li>
          ))
        )}
      </ul>

      <Modal open={!!selectedNote} onClose={handleCloseModal}>
        <Box className="bg-white p-6 rounded shadow max-w-xl mx-auto mt-20 relative">
          <button onClick={handleCloseModal} className="absolute top-2 right-2 text-gray-500 hover:text-black">
            <CloseIcon />
          </button>
          <h2 className="text-xl font-semibold mb-4">Edit Note</h2>
          <div className="space-y-3">
            <input name="title" value={editNote.title} onChange={handleEditChange} className="w-full p-2 border rounded" />
            <textarea name="content" value={editNote.content} onChange={handleEditChange} className="w-full p-2 border rounded" />
            <input name="tags" value={editNote.tags} onChange={handleEditChange} className="w-full p-2 border rounded" placeholder="Comma separated tags" />
            <button onClick={handleUpdateNote} className="bg-blue-600 text-white px-4 py-2 rounded">Save Changes</button>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default Note;