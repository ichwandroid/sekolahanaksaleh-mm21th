-- Add homebase column to store the color separately
ALTER TABLE registrations ADD COLUMN IF NOT EXISTS homebase TEXT;
