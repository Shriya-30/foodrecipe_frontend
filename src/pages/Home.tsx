import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Clock, Users } from 'lucide-react';
// import { supabase } from '../lib/supabase';
import type { Recipe } from '../types/recipe';
import { getRecipes } from "../api/recipe";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
function Home() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
 const [isLoading, setIsLoading] = useState(true);
 useEffect(() => {
  const fetchRecipes = async () => {
    try {
      const response = await getRecipes();
      console.log("recipeies data are the her",response.data.data)
      setRecipes(response.data.data);
    } catch (error) {
      console.error('Error fetching recipes:', error);
    } finally {
      setIsLoading(false);
    }
  };

  fetchRecipes();
}, []);
 

  return (
    <div className="min-h-screen px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">Discover Delicious Recipes</h1>

      {isLoading ? (
        <div className="flex justify-center items-center">
          <svg className="animate-spin h-6 w-6 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291l2.828 2.829A8.001 8.001 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        </div>
      ) : recipes.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {recipes.map((recipe) => (
            <Link
              key={recipe?._id}
              to={`/recipe/${recipe?._id}`}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <div className="relative h-48">
                {/* <img
                  src={recipe?.images[0] || 'https://via.placeholder.com/300'}
                  alt={recipe.title}
                  className="w-full h-full object-cover"
                /> */}
                <Swiper
                  pagination={{ clickable: true }}
                  modules={[Pagination]}
                  className="h-full"
                >
                  {recipe?.images?.map((img, index) => (
                    <SwiperSlide key={index}>
                      <img
                        src={img || "https://via.placeholder.com/300"}
                        alt={`Recipe Image ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
                <div className="absolute top-0 right-0 bg-primary text-white px-3 py-1 rounded-bl-lg">
                  {recipe.category}
                </div>
              </div>
              <div className="p-4">
                <h2 className="text-xl font-semibold text-gray-900 mb-2">{recipe.title}</h2>
                <p className="text-gray-600 mb-4 line-clamp-2">{recipe.description}</p>
                <div className="flex items-center justify-between text-gray-500">
                  <div className="flex items-center space-x-1">
                    <Clock className="h-4 w-4" />
                    <span>{recipe.prepTime} mins</span>
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
      ) : (
        <div className="text-center py-12">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">No recipes found</h2>
          <p className="text-gray-500">Be the first to add a recipe!</p>
        </div>
      )}
    </div>
   
  );
}

export default Home;