import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../Context/auth';
import { toast } from 'react-toastify';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import CloseIcon from '@mui/icons-material/Close';

const Bookmark = () => {
  const [bookmarks, setBookmarks] = useState([]);
  const [url, setUrl] = useState('');
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [tags, setTags] = useState('');
  const [search, setSearch] = useState('');
  const [filterTags, setFilterTags] = useState('');
  const [selectedBookmark, setSelectedBookmark] = useState(null);
  const [editBookmark, setEditBookmark] = useState({ title: '', description: '', url: '', tags: '' });
  const { auth } = useAuth();

  const fetchBookmarks = async () => {
    try {
      const query = `?q=${search.trim()}&tags=${filterTags.trim()}`;
      const res = await axios.get(`http://localhost:8000/api/v1/bookmarks${query}`, {
        headers: { Authorization: `${auth?.token}` },
      });
      setBookmarks(res.data);
    } catch (err) {
      console.error('Fetch error:', err.response?.data || err.message);
      toast.error('Failed to fetch bookmarks');
    }
  };

  const createBookmark = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        'http://localhost:8000/api/v1/bookmarks',
        {
          url,
          title,
          description: desc,
          tags: tags.split(',').map((t) => t.trim()),
        },
        { headers: { Authorization: `${auth?.token}` } }
      );
      setUrl('');
      setTitle('');
      setDesc('');
      setTags('');
      toast.success('Bookmark added');
      fetchBookmarks();
    } catch (err) {
      const msg = err.response?.data?.message || 'Invalid URL or error creating bookmark';
      toast.error(msg);
    }
  };

  const deleteBookmark = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/v1/bookmarks/${id}`, {
        headers: { Authorization: `${auth?.token}` },
      });
      toast.success('Deleted');
      fetchBookmarks();
    } catch (err) {
      toast.error('Error deleting bookmark');
    }
  };

  const toggleFavorite = async (id) => {
    try {
      await axios.put(
        `http://localhost:8000/api/v1/bookmarks/favorite/${id}`,
        {},
        { headers: { Authorization: `${auth?.token}` } }
      );
      fetchBookmarks();
    } catch (err) {
      console.error('Favorite toggle error:', err.response?.data || err.message);
      toast.error('Toggle favorite failed');
    }
  };

  const handleOpenModal = (bookmark) => {
    setSelectedBookmark(bookmark);
    setEditBookmark({
      title: bookmark.title,
      description: bookmark.description,
      url: bookmark.url,
      tags: bookmark.tags.join(', '),
    });
  };

  const handleCloseModal = () => setSelectedBookmark(null);

  const handleEditChange = (e) => {
    setEditBookmark({ ...editBookmark, [e.target.name]: e.target.value });
  };

  const handleUpdateBookmark = async () => {
    try {
      await axios.put(
        `http://localhost:8000/api/v1/bookmarks/${selectedBookmark._id}`,
        {
          ...editBookmark,
          tags: editBookmark.tags.split(',').map((tag) => tag.trim()),
        },
        {
          headers: { Authorization: `${auth?.token}` },
        }
      );
      toast.success('Bookmark updated!');
      handleCloseModal();
      fetchBookmarks();
    } catch (err) {
      toast.error('Update failed');
    }
  };

  useEffect(() => {
    if (auth?.token) fetchBookmarks();
  }, [auth?.token, search, filterTags]);

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Search Bookmarks</h1>

      <input
        placeholder="Search bookmarks"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full p-2 border rounded mb-2"
      />

      <input
        placeholder="Filter by tags (comma separated)"
        value={filterTags}
        onChange={(e) => setFilterTags(e.target.value)}
        className="w-full p-2 border rounded mb-4"
      />

      <h1 className="text-2xl font-bold mb-4">Create Bookmarks</h1>
      <form onSubmit={createBookmark} className="space-y-2 mb-6">
        <input placeholder="URL" value={url} onChange={(e) => setUrl(e.target.value)} className="w-full p-2 border rounded" />
        <input placeholder="Title (optional)" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full p-2 border rounded" />
        <input placeholder="Description" value={desc} onChange={(e) => setDesc(e.target.value)} className="w-full p-2 border rounded" />
        <input placeholder="Tags (comma separated)" value={tags} onChange={(e) => setTags(e.target.value)} className="w-full p-2 border rounded" />
        <button className="bg-green-600 text-white px-4 py-2 rounded">Add Bookmark</button>
      </form>

      <h1 className="text-2xl font-bold mb-4">All Bookmarks</h1>
      <ul className="grid gap-4">
        {bookmarks.length === 0 ? (
          <p className="text-gray-500">No bookmarks found.</p>
        ) : (
          bookmarks.map((b) => (
            <li key={b._id} className="p-4 bg-white shadow rounded cursor-pointer" onClick={() => handleOpenModal(b)}>
              <div className="flex justify-between">
                <div>
                  <p className="font-bold text-blue-700 hover:underline">{b.title}</p>
                  <p>{b.description}</p>
                  <p className="text-sm text-gray-600">Tags: {b.tags.join(', ')}</p>
                </div>
                <div className="flex flex-col items-end">
                  <button onClick={(e) => { e.stopPropagation(); toggleFavorite(b._id); }} className="text-yellow-500 text-xl">
                    {b.favorite ? '⭐' : '☆'}
                  </button>
                  <button onClick={(e) => { e.stopPropagation(); deleteBookmark(b._id); }} className="text-red-600 mt-2">
                    🗑️
                  </button>
                </div>
              </div>
            </li>
          ))
        )}
      </ul>

      <Modal open={!!selectedBookmark} onClose={handleCloseModal}>
        <Box className="bg-white p-6 rounded shadow max-w-xl mx-auto mt-20 relative">
          <button onClick={handleCloseModal} className="absolute top-2 right-2 text-gray-500 hover:text-black">
            <CloseIcon />
          </button>
          <h2 className="text-xl font-semibold mb-4">Edit Bookmark</h2>
          <div className="space-y-3">
            <input name="url" value={editBookmark.url} onChange={handleEditChange} className="w-full p-2 border rounded" />
            <input name="title" value={editBookmark.title} onChange={handleEditChange} className="w-full p-2 border rounded" />
            <textarea name="description" value={editBookmark.description} onChange={handleEditChange} className="w-full p-2 border rounded" />
            <input name="tags" value={editBookmark.tags} onChange={handleEditChange} className="w-full p-2 border rounded" placeholder="Comma separated tags" />
            <button onClick={handleUpdateBookmark} className="bg-blue-600 text-white px-4 py-2 rounded">Save Changes</button>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default Bookmark;
