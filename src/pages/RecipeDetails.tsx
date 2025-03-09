import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Clock, Users, Pencil, Trash2 } from 'lucide-react';
// import { supabase } from '../lib/supabase';
import type { Recipe } from '../types/recipe';
import toast from 'react-hot-toast';

function RecipeDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);

  
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (!recipe) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-semibold text-gray-700">Recipe not found</h2>
        <Link to="/" className="text-indigo-600 hover:text-indigo-800 mt-4 inline-block">
          Return to home
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="relative h-64 md:h-96">
          <img
            src={recipe.image_url || 'https://images.unsplash.com/photo-1495521821757-a1efb6729352?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80'}
            alt={recipe.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-0 right-0 bg-indigo-600 text-white px-3 py-1 rounded-bl-lg">
            {recipe.category}
          </div>
        </div>

        <div className="p-6">
          <div className="flex justify-between items-start mb-6">
            <h1 className="text-3xl font-bold text-gray-900">{recipe.title}</h1>
            {user && user.id === recipe.user_id && (
              <div className="flex space-x-2">
                <Link
                  to={`/recipe/${recipe.id}/edit`}
                  className="p-2 text-indigo-600 hover:text-indigo-800"
                >
                  <Pencil className="h-5 w-5" />
                </Link>
                <button
                  // onClick={handleDelete}
                  className="p-2 text-red-600 hover:text-red-800"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
            )}
          </div>

          <p className="text-gray-600 mb-6">{recipe.description}</p>

          <div className="flex items-center space-x-6 mb-6 text-gray-500">
            <div className="flex items-center space-x-2">
              <Clock className="h-5 w-5" />
              <span>{recipe.cooking_time} mins</span>
            </div>
            <div className="flex items-center space-x-2">
              <Users className="h-5 w-5" />
              <span>{recipe.servings} servings</span>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Ingredients</h2>
            <ul className="list-disc list-inside space-y-2">
              {recipe.ingredients.map((ingredient, index) => (
                <li key={index} className="text-gray-600">{ingredient}</li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Instructions</h2>
            <ol className="list-decimal list-inside space-y-4">
              {recipe.instructions.map((instruction, index) => (
                <li key={index} className="text-gray-600">{instruction}</li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RecipeDetails;