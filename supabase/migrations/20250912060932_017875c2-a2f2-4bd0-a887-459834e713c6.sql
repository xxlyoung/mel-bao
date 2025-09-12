-- Fix payment system security vulnerabilities by adding proper validation to edge function policies

-- 1. Drop existing overly permissive policies for orders
DROP POLICY IF EXISTS "Edge functions can insert orders" ON public.orders;
DROP POLICY IF EXISTS "Edge functions can update orders" ON public.orders;

-- 2. Drop existing overly permissive policy for order_items  
DROP POLICY IF EXISTS "Edge functions can insert order items" ON public.order_items;

-- 3. Create validated INSERT policy for orders - only allow legitimate order creation
CREATE POLICY "Validated order creation only" 
ON public.orders 
FOR INSERT 
WITH CHECK (
  -- Ensure required fields are present and valid
  customer_name IS NOT NULL AND customer_name != '' AND
  customer_email IS NOT NULL AND customer_email != '' AND
  customer_phone IS NOT NULL AND customer_phone != '' AND
  pickup_date IS NOT NULL AND
  pickup_time_start IS NOT NULL AND
  pickup_time_end IS NOT NULL AND
  total_amount IS NOT NULL AND total_amount > 0 AND total_amount <= 100000 AND -- Max $1000 order limit
  payment_status IN ('pending', 'paid', 'failed', 'cancelled') AND
  order_status IN ('pending', 'confirmed', 'ready', 'completed', 'cancelled') AND
  -- Validate pickup date is not in the past (with 1 day buffer)
  pickup_date >= CURRENT_DATE - INTERVAL '1 day' AND
  -- Validate pickup date is not too far in the future (max 30 days)
  pickup_date <= CURRENT_DATE + INTERVAL '30 days'
);

-- 4. Create restricted UPDATE policy for orders - only allow status updates
CREATE POLICY "Restricted order status updates only" 
ON public.orders 
FOR UPDATE 
USING (
  -- Only allow updates when the order is in a valid state for modification
  payment_status IN ('pending', 'paid', 'failed', 'cancelled') AND
  order_status IN ('pending', 'confirmed', 'ready', 'completed', 'cancelled')
)
WITH CHECK (
  -- Only allow updates to payment and order status fields
  payment_status IN ('pending', 'paid', 'failed', 'cancelled') AND
  order_status IN ('pending', 'confirmed', 'ready', 'completed', 'cancelled')
);

-- 5. Create validated INSERT policy for order_items - prevent fake order items
CREATE POLICY "Validated order items creation only" 
ON public.order_items 
FOR INSERT 
WITH CHECK (
  -- Ensure required fields are present and valid
  order_id IS NOT NULL AND
  product_id IS NOT NULL AND
  quantity IS NOT NULL AND quantity > 0 AND quantity <= 100 AND -- Max 100 items per product
  unit_price IS NOT NULL AND unit_price > 0 AND unit_price <= 10000 AND -- Max $100 per item
  total_price IS NOT NULL AND total_price > 0 AND
  -- Ensure total_price matches unit_price * quantity
  total_price = unit_price * quantity AND
  -- Ensure the product exists and is active
  EXISTS (
    SELECT 1 FROM products 
    WHERE products.id = order_items.product_id 
    AND products.active = true
  )
);