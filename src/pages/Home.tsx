import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Clock, Users } from 'lucide-react';
// import { supabase } from '../lib/supabase';
import type { Recipe } from '../types/recipe';

function Home() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  // const [loading, setLoading] = useState(true);

  // useEffect(() => {
    // const fetchRecipes = async () => {
    //   const { data, error } = await supabase
    //     .from('recipes')
    //     .select('*')
    //     .order('created_at', { ascending: false });

    //   if (error) {
    //     console.error('Error fetching recipes:', error);
    //   } else {
    //     setRecipes(data || []);
    //   }
    //   setLoading(false);
    // };

    // fetchRecipes();

    // Subscribe to real-time changes
  //   const subscription = supabase
  //     .channel('recipes_changes')
  //     .on('postgres_changes', 
  //       { event: '*', schema: 'public', table: 'recipes' },
  //       (payload) => {
  //         if (payload.eventType === 'INSERT') {
  //           setRecipes(prev => [payload.new as Recipe, ...prev]);
  //         } else if (payload.eventType === 'DELETE') {
  //           setRecipes(prev => prev.filter(recipe => recipe.id !== payload.old.id));
  //         } else if (payload.eventType === 'UPDATE') {
  //           setRecipes(prev => prev.map(recipe => 
  //             recipe.id === payload.new.id ? payload.new as Recipe : recipe
  //           ));
  //         }
  //       }
  //     )
  //     .subscribe();

  //   return () => {
  //     subscription.unsubscribe();
  //   };
  // }, []);

  // if (loading) {
  //   return (
  //     <div className="flex justify-center items-center h-64">
  //       <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
  //     </div>
  //   );
  // }

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Discover Delicious Recipes</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {recipes.map((recipe) => (
          <Link
            key={recipe.id}
            to={`/recipe/${recipe.id}`}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
          >
            <div className="relative h-48">
              <img
                src={recipe.image_url || 'https://images.unsplash.com/photo-1495521821757-a1efb6729352?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80'}
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
      {recipes.length === 0 && (
        <div className="text-center py-12">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">No recipes found</h2>
          <p className="text-gray-500">Be the first to add a recipe!</p>
        </div>
      )}
    </div>
  );
}

export default Home;