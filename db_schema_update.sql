-- Add homebase column to store the color separately
ALTER TABLE registrations ADD COLUMN IF NOT EXISTS homebase TEXT;

-- Add nominal column for infaq amount
ALTER TABLE registrations ADD COLUMN IF NOT EXISTS nominal NUMERIC DEFAULT 0;
