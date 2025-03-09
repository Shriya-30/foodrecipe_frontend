export interface Recipe {
  images: string[];
  _id: any;
  createdAt: string;
  title: string;
  description: string;
  ingredients: string[];
  instructions: string[];
  prepTime: number;
  servings: number;
  user: string;
  category: string;
}

export interface User {
  _id: string;
  email: string;
  createdAt: string;
}