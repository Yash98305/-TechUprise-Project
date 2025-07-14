import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../Context/auth';

const FeatureCard = ({ icon, title, desc }) => (
  <div className="p-6 shadow rounded-xl bg-white text-center hover:shadow-lg transition">
    <div className="text-4xl mb-2">{icon}</div>
    <h3 className="text-xl font-semibold">{title}</h3>
    <p className="text-gray-600 text-sm mt-1">{desc}</p>
  </div>
);

const Home = () => {
  const { auth } = useAuth();

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold mb-2">📚 Notes & Bookmark Manager</h1>
        <p className="text-gray-600 max-w-xl mx-auto">
          Organize your thoughts and useful links in one place. Create notes, manage bookmarks, search by tags, and more.
        </p>
      
      </div>

      <div className="grid gap-6 md:grid-cols-3 mt:10" >
        <FeatureCard
          icon="📝"
          title="Notes"
          desc="Create, update, and delete personal notes with tag support and favorites."
        />
        <FeatureCard
          icon="🔖"
          title="Bookmarks"
          desc="Save and organize useful website links with titles, tags, and descriptions."
        />
        <FeatureCard
          icon="⭐"
          title="Favorites"
          desc="Quickly access your favorite notes and bookmarks by starring them with a single click."
        />
      </div>

      {!auth?.token && (
        <div className="text-center mt-10 text-sm">
          Already have an account? <Link to="/login" className="text-blue-600 underline">Login</Link> or <Link to="/register" className="text-blue-600 underline">Register</Link>
        </div>
      )}

     
    </div>
  );
};

export default Home;
