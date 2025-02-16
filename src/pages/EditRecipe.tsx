import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
// import { supabase } from '../lib/supabase';
import toast from 'react-hot-toast';
import type { Recipe } from '../types/recipe';

function EditRecipe() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [recipe, setRecipe] = useState<Recipe>({
    id: '',
    title: '',
    description: '',
    ingredients: [''],
    instructions: [''],
    cooking_time: 30,
    servings: 4,
    image_url: '',
    category: 'Main Course',
    user_id: '',
    created_at: ''
  });

  // useEffect(() => {
  //   const fetchRecipe = async () => {
  //     if (!id) return;

  //     const { data: recipe, error } = await supabase
  //       .from('recipes')
  //       .select('*')
  //       .eq('id', id)
  //       .single();

  //     if (error) {
  //       console.error('Error fetching recipe:', error);
  //       navigate('/');
  //       return;
  //     }

  //     setRecipe(recipe);
  //   };

  //   fetchRecipe();
  // }, [id, navigate]);

  const handleIngredientChange = (index: number, value: string) => {
    const newIngredients = [...recipe.ingredients];
    newIngredients[index] = value;
    setRecipe({ ...recipe, ingredients: newIngredients });
  };

  const handleInstructionChange = (index: number, value: string) => {
    const newInstructions = [...recipe.instructions];
    newInstructions[index] = value;
    setRecipe({ ...recipe, instructions: newInstructions });
  };

  const addIngredient = () => {
    setRecipe({ ...recipe, ingredients: [...recipe.ingredients, ''] });
  };

  const addInstruction = () => {
    setRecipe({ ...recipe, instructions: [...recipe.instructions, ''] });
  };

  const removeIngredient = (index: number) => {
    const newIngredients = recipe.ingredients.filter((_, i) => i !== index);
    setRecipe({ ...recipe, ingredients: newIngredients });
  };

  const removeInstruction = (index: number) => {
    const newInstructions = recipe.instructions.filter((_, i) => i !== index);
    setRecipe({ ...recipe, instructions: newInstructions });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // try {
    //   const {
    //     data: { user },
    //   } = await supabase.auth.getUser();

    //   if (!user) throw new Error('You must be logged in to update a recipe');
    //   if (user.id !== recipe.user_id) throw new Error('You can only edit your own recipes');

    //   const { error } = await supabase
    //     .from('recipes')
    //     .update({
    //       title: recipe.title,
    //       description: recipe.description,
    //       ingredients: recipe.ingredients.filter(Boolean),
    //       instructions: recipe.instructions.filter(Boolean),
    //       cooking_time: recipe.cooking_time,
    //       servings: recipe.servings,
    //       image_url: recipe.image_url,
    //       category: recipe.category,
    //     })
    //     .eq('id', recipe.id);

    //   if (error) throw error;

    //   toast.success('Recipe updated successfully!');
    //   navigate(`/recipe/${recipe.id}`);
    // } catch (error: any) {
    //   toast.error(error.message);
    // } finally {
    //   setLoading(false);
    // }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Edit Recipe</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Title
          </label>
          <input
            type="text"
            id="title"
            required
            value={recipe.title}
            onChange={(e) => setRecipe({ ...recipe, title: e.target.value })}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            id="description"
            rows={3}
            value={recipe.description}
            onChange={(e) => setRecipe({ ...recipe, description: e.target.value })}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Ingredients
          </label>
          {recipe.ingredients.map((ingredient, index) => (
            <div key={index} className="flex gap-2 mb-2">
              <input
                type="text"
                value={ingredient}
                onChange={(e) => handleIngredientChange(index, e.target.value)}
                className="flex-1 rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
                placeholder={`Ingredient ${index + 1}`}
              />
              <button
                type="button"
                onClick={() => removeIngredient(index)}
                className="px-3 py-2 text-red-600 hover:text-red-800"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addIngredient}
            className="text-indigo-600 hover:text-indigo-800"
          >
            + Add Ingredient
          </button>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Instructions
          </label>
          {recipe.instructions.map((instruction, index) => (
            <div key={index} className="flex gap-2 mb-2">
              <textarea
                value={instruction}
                onChange={(e) => handleInstructionChange(index, e.target.value)}
                className="flex-1 rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
                placeholder={`Step ${index + 1}`}
                rows={2}
              />
              <button
                type="button"
                onClick={() => removeInstruction(index)}
                className="px-3 py-2 text-red-600 hover:text-red-800"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addInstruction}
            className="text-indigo-600 hover:text-indigo-800"
          >
            + Add Instruction
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="cooking_time" className="block text-sm font-medium text-gray-700">
              Cooking Time (minutes)
            </label>
            <input
              type="number"
              id="cooking_time"
              min="1"
              required
              value={recipe.cooking_time}
              onChange={(e) => setRecipe({ ...recipe, cooking_time: parseInt(e.target.value) })}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
            />
          </div>

          <div>
            <label htmlFor="servings" className="block text-sm font-medium text-gray-700">
              Servings
            </label>
            <input
              type="number"
              id="servings"
              min="1"
              required
              value={recipe.servings}
              onChange={(e) => setRecipe({ ...recipe, servings: parseInt(e.target.value) })}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
            />
          </div>
        </div>

        <div>
          <label htmlFor="image_url" className="block text-sm font-medium text-gray-700">
            Image URL
          </label>
          <input
            type="url"
            id="image_url"
            value={recipe.image_url}
            onChange={(e) => setRecipe({ ...recipe, image_url: e.target.value })}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
            placeholder="https://example.com/image.jpg"
          />
        </div>

        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700">
            Category
          </label>
          <select
            id="category"
            value={recipe.category}
            onChange={(e) => setRecipe({ ...recipe, category: e.target.value })}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
          >
            <option>Main Course</option>
            <option>Appetizer</option>
            <option>Dessert</option>
            <option>Breakfast</option>
            <option>Snack</option>
            <option>Beverage</option>
          </select>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className="flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              'Update Recipe'
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditRecipe;