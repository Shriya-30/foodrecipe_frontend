import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// import { supabase } from '../lib/supabase';
import toast from "react-hot-toast";
import {createRecipe} from "../api/recipe";
import { Recipe } from '../types/recipe';
function AddformData() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<{
    title: string;
    description: string;
    category: string;
    images: { name: string; file: File; preview: string }[];
    ingredients: string[];
    instructions: string[];
    servings: number;
    prepTime: number;
  }>({
    title: "",
    description: "",
    category: "",
    images: [],
    ingredients: [""],
    instructions: [""],
    servings: 0,
    prepTime: 0,
  });

  const handleIngredientChange = (index: number, value: string) => {
    const newIngredients = [...formData.ingredients];
    newIngredients[index] = value;
    setFormData({ ...formData, ingredients: newIngredients });
  };

  const handleInstructionChange = (index: number, value: string) => {
    const newInstructions = [...formData.instructions];
    newInstructions[index] = value;
    setFormData({ ...formData, instructions: newInstructions });
  };

  const addIngredient = () => {
    setFormData({ ...formData, ingredients: [...formData.ingredients, ""] });
  };

  const addInstruction = () => {
    setFormData({ ...formData, instructions: [...formData.instructions, ""] });
  };

  const removeIngredient = (index: number) => {
    const newIngredients = formData.ingredients.filter((_, i) => i !== index);
    setFormData({ ...formData, ingredients: newIngredients });
  };

  const removeInstruction = (index: number) => {
    const newInstructions = formData.instructions.filter((_, i) => i !== index);
    setFormData({ ...formData, instructions: newInstructions });
  };
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFiles = Array.from(e.target.files || []);
    const maxFileSize = 500 * 1024; // 500 KB
    const validFiles: { name: string; file: File; preview: string }[] = [];
    const invalidFiles: string[] = [];

    newFiles.forEach((file) => {
      if (file.size <= maxFileSize) {
        validFiles.push({
          name: file.name,
          file,
          preview: URL.createObjectURL(file),
        });
      } else {
        invalidFiles.push(file.name);
      }
    });

    if (invalidFiles.length > 0) {
      toast.error(
        `The following files are too large: ${invalidFiles.join(", ")}`
      );
      // toast({
      //   title: "Error",
      //   description: `The following files are too large: ${invalidFiles.join(", ")}`,
      //   variant: "destructive",
      // });
    }

    setFormData((prevFormData) => ({
      ...prevFormData,
      images: [...prevFormData.images, ...validFiles],
    }));
  };

  // Handle file deletion
  const handleFileDelete = (index: number) => {
    const imageToDelete = formData.images[index];
    if (imageToDelete) {
      const fileName = imageToDelete.name;
      setFormData((prevFormData) => ({
        ...prevFormData,
        images: prevFormData.images.filter((file) => file.name !== fileName), // Remove the selected file
      }));
    }
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !formData.title ||
      !formData?.description
    ) {
      toast.error("Please fill in all required fields.");
      return;
    }
    try {
      // setLoading(true)
      setLoading(true);
      const formDataToSend = new FormData();

      formDataToSend.append("title", formData.title);
      formDataToSend.append("description", formData.description);
      formDataToSend.append("category", formData.category);
      formDataToSend.append("servings", String(formData.servings));
      formDataToSend.append("prepTime", String(formData.prepTime));

      // Append images
      formData.images.forEach((image) => {
        formDataToSend.append("images", image.file);
      });

      // Append ingredients and instructions as JSON strings
      formDataToSend.append("ingredients", JSON.stringify(formData.ingredients));
      formDataToSend.append("instructions", JSON.stringify(formData.instructions));
      const response=await createRecipe(formDataToSend);
      setLoading(false);
      console.log("response",response);
      toast.success("Recipe created successfully");
      navigate("/");
      
    } catch (error) {
      toast.error("Error to create Product");
    } finally {
      setLoading(true);
    }
   
  };

  const categories = [
    "Breakfast",
    "Lunch",
    "Dinner",
    "Snack",
    "Dessert",
    "Vegan",
    "Beverage",
    "Other",
  ];
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-3xl font-bold text-gray-900 text-center mb-6">
          Add New Recipe
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Title <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                // required
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Category
              </label>
              <select
                value={formData?.category}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value })
                }
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              >
                <option value="">Select a category</option>
                {categories.map((category, index) => (
                  <option key={index} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Description<span className="text-red-600">*</span>
            </label>
            <textarea
              rows={2}
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Ingredients
            </label>
            {formData.ingredients.map((ingredient, index) => (
              <div key={index} className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={ingredient}
                  onChange={(e) =>
                    handleIngredientChange(index, e.target.value)
                  }
                  className="flex-1 mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                />
                <button
                  type="button"
                  onClick={() => removeIngredient(index)}
                  className="px-3 py-2 text-red-600 hover:text-red-800"
                >
                  ✕
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addIngredient}
              className="text-primary hover:text-primary font-semibold"
            >
              + Add Ingredient
            </button>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Instructions
            </label>
            {formData?.instructions.map((instruction: any, index: number) => (
              <div key={index} className="flex gap-2 mb-2">
                <textarea
                  value={instruction}
                  onChange={(e) =>
                    handleInstructionChange(index, e.target.value)
                  }
                  className="flex-1 mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                  rows={2}
                />
                <button
                  type="button"
                  onClick={() => removeInstruction(index)}
                  className="px-3 py-2 text-red-600 hover:text-red-800"
                >
                  ✕
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addInstruction}
              className="text-primary hover:text-primary font-semibold"
            >
              + Add Instruction
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Pereperation Time (mins)
              </label>
              <input
                type="number"
                // min="1"
                // required
                value={formData?.prepTime}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    prepTime: parseInt(e.target.value),
                  })
                }
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Servings
              </label>
              <input
                type="number"
                // min="1"
                // required
                value={formData.servings}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    servings: parseInt(e.target.value),
                  })
                }
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="images"
              className="block text-sm font-medium text-gray-700"
            >
              Upload Images{" "}
              <span className="text-gray-500">
                (Max 8 images less Then 500Kb)
              </span>{" "}
              <span className="text-red-500">*</span>
            </label>
            {formData.images.length < 8 && (
              <input
                type="file"
                id="images"
                multiple
                onChange={handleFileChange}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              />
            )}
            {formData.images.length > 0 && (
              <div className="flex flex-wrap mt-4 gap-2">
                {formData.images.map((image, index) => (
                  <div key={index} className="relative w-24 h-24 m-2">
                    {/* Display image preview */}
                    <img
                      src={image?.preview || image?.name} // Show the preview or the actual URL
                      alt={`Uploaded preview ${index}`}
                      className="w-full h-full object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => handleFileDelete(index)}
                      className="absolute top-2 right-2 p-1 bg-white rounded-full shadow hover:bg-gray-100"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="w-4 h-4 text-gray-500"
                      >
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              disabled={loading}
              className="w-full md:w-1/3 flex justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-light disabled:opacity-50"
            >
              {loading ? (
                <span className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></span>
              ) : (
                "Create Recipe"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddformData;
