export interface Recipe {
  id: string;
  created_at: string;
  title: string;
  description: string;
  ingredients: string[];
  instructions: string[];
  cooking_time: number;
  servings: number;
  image_url: string;
  user_id: string;
  category: string;
}

export interface User {
  id: string;
  email: string;
  created_at: string;
}