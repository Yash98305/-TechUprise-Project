import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../Context/auth';
import { toast } from 'react-toastify';

const Bookmark = () => {
  const [bookmarks, setBookmarks] = useState([]);
  const [url, setUrl] = useState('');
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [tags, setTags] = useState('');
const [search, setSearch] = useState('');
const [filterTags, setFilterTags] = useState('');  const { auth } = useAuth();

 const fetchBookmarks = async () => {
  try {
    const query = `?q=${search}&tags=${filterTags}`;
    const res = await axios.get(`http://localhost:8000/api/v1/bookmarks${query}`, {
      headers: { Authorization: `${auth?.token}` },
    });
    setBookmarks(res.data);
  } catch (err) {
    toast.error('Failed to fetch bookmarks');
  }
};


  const createBookmark = async e => {
    e.preventDefault();
    try {
      await axios.post(
        'http://localhost:8000/api/v1/bookmarks',
        { url, title, description: desc, tags: tags.split(',') },
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

  const deleteBookmark = async id => {
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

  useEffect(() => {
    if (auth?.token) fetchBookmarks();
  }, [search]);

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Bookmarks</h1>

      <input
        placeholder="Search bookmarks"
        value={search}
        onChange={e => setSearch(e.target.value)}
        className="w-full p-2 border rounded mb-4"
      />

      <form onSubmit={createBookmark} className="space-y-2 mb-6">
        <input placeholder="URL" value={url} onChange={e => setUrl(e.target.value)} className="w-full p-2 border rounded" />
        <input placeholder="Title (optional)" value={title} onChange={e => setTitle(e.target.value)} className="w-full p-2 border rounded" />
        <input placeholder="Description" value={desc} onChange={e => setDesc(e.target.value)} className="w-full p-2 border rounded" />
        <input placeholder="Tags (comma separated)" value={tags} onChange={e => setTags(e.target.value)} className="w-full p-2 border rounded" />
        <button className="bg-blue-600 text-white px-4 py-2 rounded">Add Bookmark</button>
      </form>

      <ul className="grid gap-4">
        {bookmarks.map(b => (
          <li key={b._id} className="p-4 bg-white shadow rounded">
            <div className="flex justify-between">
              <div>
                <a href={b.url} target="_blank" rel="noreferrer" className="font-bold text-blue-700 hover:underline">{b.title}</a>
                <p>{b.description}</p>
                <p className="text-sm text-gray-600">Tags: {b.tags.join(', ')}</p>
              </div>
              <button onClick={() => deleteBookmark(b._id)} className="text-red-600">🗑️</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Bookmark;