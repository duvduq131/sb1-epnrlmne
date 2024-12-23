/*
  # Initial schema setup for Ha Mi Kindergarten

  1. New Tables
    - `posts`
      - `id` (uuid, primary key)
      - `title` (text)
      - `content` (text)
      - `image_url` (text, optional)
      - `video_url` (text, optional)
      - `category` (enum: news, activity, menu, event)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on `posts` table
    - Add policies for authenticated users to manage posts
*/

-- Create enum type for post categories
CREATE TYPE post_category AS ENUM ('news', 'activity', 'menu', 'event');

-- Create posts table
CREATE TABLE IF NOT EXISTS posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  content text NOT NULL,
  image_url text,
  video_url text,
  category post_category NOT NULL DEFAULT 'news',
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Allow public read access"
  ON posts
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow authenticated users to create posts"
  ON posts
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Allow authenticated users to update posts"
  ON posts
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow authenticated users to delete posts"
  ON posts
  FOR DELETE
  TO authenticated
  USING (true);