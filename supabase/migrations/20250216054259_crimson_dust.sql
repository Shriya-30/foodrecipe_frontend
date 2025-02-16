/*
  # Recipe Management Schema

  1. New Tables
    - `recipes`
      - `id` (uuid, primary key)
      - `created_at` (timestamp)
      - `title` (text)
      - `description` (text)
      - `ingredients` (text array)
      - `instructions` (text array)
      - `cooking_time` (integer)
      - `servings` (integer)
      - `image_url` (text)
      - `user_id` (uuid, foreign key)
      - `category` (text)

  2. Security
    - Enable RLS on `recipes` table
    - Add policies for CRUD operations
*/

CREATE TABLE IF NOT EXISTS recipes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz DEFAULT now(),
  title text NOT NULL,
  description text,
  ingredients text[] NOT NULL,
  instructions text[] NOT NULL,
  cooking_time integer NOT NULL,
  servings integer NOT NULL,
  image_url text,
  user_id uuid REFERENCES auth.users NOT NULL,
  category text NOT NULL
);

ALTER TABLE recipes ENABLE ROW LEVEL SECURITY;

-- Allow users to read all recipes
CREATE POLICY "Anyone can view recipes"
  ON recipes
  FOR SELECT
  USING (true);

-- Allow authenticated users to create recipes
CREATE POLICY "Authenticated users can create recipes"
  ON recipes
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Allow users to update their own recipes
CREATE POLICY "Users can update own recipes"
  ON recipes
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Allow users to delete their own recipes
CREATE POLICY "Users can delete own recipes"
  ON recipes
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);