-- Add flavor field to orders table
ALTER TABLE public.orders ADD COLUMN flavor TEXT NOT NULL DEFAULT 'Chicken Mild';