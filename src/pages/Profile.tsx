import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Clock, Users } from 'lucide-react';
// import { supabase } from '../lib/supabase';
import type { Recipe } from '../types/recipe';

function Profile() {
  const navigate = useNavigate();
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);

  // useEffect(() => {
  //   const fetchUserAndRecipes = async () => {
  //     const { data: { user } } = await supabase.auth.getUser();
      
  //     if (!user) {
  //       navigate('/auth');
  //       return;
  //     }

  //     setUser(user);

  //     const { data: recipes, error } = await supabase
  //       .from('recipes')
  //       .select('*')
  //       .eq('user_id', user.id)
  //       .order('created_at', { ascending: false });

  //     if (error) {
  //       console.error('Error fetching recipes:', error);
  //     } else {
  //       setRecipes(recipes || []);
  //     }

  //     setLoading(false);
  //   };

  //   fetchUserAndRecipes();
  // }, [navigate]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>
        <p className="text-gray-600 mt-2">{user?.email}</p>
      </div>

      <div className="mb-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-900">My Recipes</h2>
          <Link
            to="/add-recipe"
            className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors"
          >
            Add New Recipe
          </Link>
        </div>

        {recipes.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No recipes yet</h3>
            <p className="text-gray-500 mb-4">Start sharing your culinary creations!</p>
            <Link
              to="/add-recipe"
              className="text-indigo-600 hover:text-indigo-800"
            >
              Create your first recipe
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recipes.map((recipe) => (
              <Link
                key={recipe.id}
                to={`/recipe/${recipe.id}`}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                <div className="relative h-48">
                  <img
                    src={recipe.image_url || 'https://images.unsplash.com/photo-1495521821757-a1efb6729352?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8& auto=format&fit=crop&w=800&q=80'}
                    alt={recipe.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-0 right-0 bg-indigo-600 text-white px-3 py-1 rounded-bl-lg">
                    {recipe.category}
                  </div>
                </div>
                <div className="p-4">
                  <h2 className="text-xl font-semibold text-gray-900 mb-2">{recipe.title}</h2>
                  <p className="text-gray-600 mb-4 line-clamp-2">{recipe.description}</p>
                  <div className="flex items-center justify-between text-gray-500">
                    <div className="flex items-center space-x-1">
                      <Clock className="h-4 w-4" />
                      <span>{recipe.cooking_time} mins</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Users className="h-4 w-4" />
                      <span>{recipe.servings} servings</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Profile;