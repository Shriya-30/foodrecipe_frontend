import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import AddRecipe from './pages/AddRecipe';
import RecipeDetails from './pages/RecipeDetails';
import EditRecipe from './pages/EditRecipe';
import Profile from './pages/Profile';
import Auth from './pages/Auth';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/add-recipe" element={<AddRecipe />} />
            <Route path="/recipe/:id" element={<RecipeDetails />} />
            <Route path="/recipe/:id/edit" element={<EditRecipe />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </main>
        {/* <Toaster position="bottom-right" /> */}
      </div>
    </Router>
  );
}

export default App;