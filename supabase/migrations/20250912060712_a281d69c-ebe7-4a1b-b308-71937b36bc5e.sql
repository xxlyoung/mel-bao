-- Fix critical security vulnerabilities by restricting access to sensitive customer data

-- 1. Drop existing problematic policies for orders
DROP POLICY IF EXISTS "Users can view their own orders" ON public.orders;
DROP POLICY IF EXISTS "Users can view their order items" ON public.order_items;

-- 2. Create new restrictive policies for orders - only authenticated users can view their own orders
CREATE POLICY "Authenticated users can view their own orders" 
ON public.orders 
FOR SELECT 
TO authenticated
USING (auth.uid() = user_id AND user_id IS NOT NULL);

-- 3. Create new restrictive policies for order_items - only authenticated users can view items from their own orders
CREATE POLICY "Authenticated users can view their own order items" 
ON public.order_items 
FOR SELECT 
TO authenticated
USING (EXISTS (
  SELECT 1 
  FROM orders 
  WHERE orders.id = order_items.order_id 
    AND orders.user_id = auth.uid() 
    AND orders.user_id IS NOT NULL
));

-- 4. Add admin-only access policies for contact_messages (no public SELECT access)
CREATE POLICY "Admins can view contact messages" 
ON public.contact_messages 
FOR SELECT 
TO authenticated
USING (false); -- For now, disable all SELECT access. This can be updated when admin roles are implemented.

-- 5. Add admin-only access policies for newsletter_subscribers (no public SELECT access)
CREATE POLICY "Admins can view newsletter subscribers" 
ON public.newsletter_subscribers 
FOR SELECT 
TO authenticated
USING (false); -- For now, disable all SELECT access. This can be updated when admin roles are implemented.

-- 6. Ensure existing INSERT policies remain functional for contact form and newsletter signup
-- (These policies already exist and don't need changes)

-- 7. Add UPDATE/DELETE restrictions for contact_messages
CREATE POLICY "No public updates to contact messages" 
ON public.contact_messages 
FOR UPDATE 
TO authenticated
USING (false);

CREATE POLICY "No public deletes to contact messages" 
ON public.contact_messages 
FOR DELETE 
TO authenticated
USING (false);

-- 8. Add UPDATE/DELETE restrictions for newsletter_subscribers  
CREATE POLICY "No public updates to newsletter subscribers" 
ON public.newsletter_subscribers 
FOR UPDATE 
TO authenticated
USING (false);

CREATE POLICY "No public deletes to newsletter subscribers" 
ON public.newsletter_subscribers 
FOR DELETE 
TO authenticated
USING (false);