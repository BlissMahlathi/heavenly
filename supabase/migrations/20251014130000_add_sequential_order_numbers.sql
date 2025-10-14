-- Add sequential order number to orders table
-- Create a sequence for order numbers starting from 1
CREATE SEQUENCE IF NOT EXISTS public.order_number_seq START 1;

-- Add order_number column to orders table
ALTER TABLE public.orders ADD COLUMN order_number TEXT;

-- Create a function to generate order numbers in format A01, A02, etc.
CREATE OR REPLACE FUNCTION public.generate_order_number()
RETURNS TEXT
LANGUAGE plpgsql
AS $$
DECLARE
  next_num INTEGER;
  order_num TEXT;
BEGIN
  -- Get next number from sequence
  next_num := nextval('public.order_number_seq');

  -- Format as A01, A02, etc. (pad with zeros to 2 digits)
  order_num := 'A' || lpad(next_num::TEXT, 2, '0');

  RETURN order_num;
END;
$$;

-- Update existing orders with sequential numbers (if any exist)
-- This will assign numbers to existing orders based on creation order
UPDATE public.orders
SET order_number = 'A' || lpad(row_number::TEXT, 2, '0')
FROM (
  SELECT id, row_number() OVER (ORDER BY created_at) as row_number
  FROM public.orders
  WHERE order_number IS NULL
) AS numbered_orders
WHERE public.orders.id = numbered_orders.id;

-- Set default for new orders
ALTER TABLE public.orders ALTER COLUMN order_number SET DEFAULT public.generate_order_number();

-- Make sure all future orders get a number
CREATE OR REPLACE FUNCTION public.set_order_number()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  IF NEW.order_number IS NULL THEN
    NEW.order_number := public.generate_order_number();
  END IF;
  RETURN NEW;
END;
$$;

CREATE TRIGGER set_order_number_trigger
  BEFORE INSERT ON public.orders
  FOR EACH ROW EXECUTE FUNCTION public.set_order_number();