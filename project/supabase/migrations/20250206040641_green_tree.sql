/*
  # Create gallery table and storage

  1. New Tables
    - `gallery`
      - `id` (uuid, primary key)
      - `title` (text)
      - `url` (text)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on `gallery` table
    - Add policies for authenticated users to manage gallery content
*/

CREATE TABLE IF NOT EXISTS gallery (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  url text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE gallery ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow authenticated users to view gallery"
  ON gallery
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Allow authenticated users to insert gallery items"
  ON gallery
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Allow authenticated users to delete gallery items"
  ON gallery
  FOR DELETE
  TO authenticated
  USING (true);