-- Add cart_items JSON field to orders table for cart functionality
ALTER TABLE public.orders ADD COLUMN cart_items JSONB;

-- Update existing records to have empty cart_items array
UPDATE public.orders SET cart_items = '[]'::jsonb WHERE cart_items IS NULL;