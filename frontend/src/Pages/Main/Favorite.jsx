import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../Context/auth";
import NoteCard from "../../Components/NoteCard";
import BookmarkCard from "../../Components/BookmarkCard";

const Favorite = () => {
  const { api, auth } = useAuth();
  const [notes, setNotes] = useState([]);
  const [bookmarks, setBookmarks] = useState([]);
  const [showNotes, setShowNotes] = useState(true);
  const [showBookmarks, setShowBookmarks] = useState(true);

  const fetchFavorites = async () => {
    try {
      const resNotes = await axios.get(`${api}/notes/favorite`, {
        headers: { Authorization: auth?.token },
      });
      const resBookmarks = await axios.get(`${api}/bookmarks/favorite`, {
        headers: { Authorization: auth?.token },
      });
      console.log(resBookmarks)
      console.log(resNotes)
      setNotes(resNotes.data.notes || []);
      setBookmarks(resBookmarks.data.bookmarks || []);
    } catch (error) {
      console.error("Error fetching favorites:", error);
    }
  };

 

  useEffect(() => {
    if (auth?.token) fetchFavorites();
  }, [auth]);

  return (
    <div className="min-h-screen px-4 py-6 md:px-10">
      <h1 className="text-2xl font-semibold mb-6">Your Favorites</h1>

      <div className="flex gap-4 mb-6">
        <button
          onClick={() => setShowNotes(!showNotes)}
          className={`px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600 transition ${!showNotes && "opacity-50"}`}
        >
          Toggle Notes
        </button>
        <button
          onClick={() => setShowBookmarks(!showBookmarks)}
          className={`px-4 py-2 rounded bg-green-500 text-white hover:bg-green-600 transition ${!showBookmarks && "opacity-50"}`}
        >
          Toggle Bookmarks
        </button>
      </div>

      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {showNotes && notes.map((note) => (
          <NoteCard key={note._id} note={note} />
        ))}

        {showBookmarks && bookmarks.map((b) => (
          <BookmarkCard
            key={b._id}
            bookmark={b}
            
          />
        ))}
      </div>
    </div>
  );
};

export default Favorite;
