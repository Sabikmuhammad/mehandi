-- Allow public (anon) insertions for the booking form
CREATE POLICY "Public can insert customers" ON public.customers FOR INSERT WITH CHECK (true);
CREATE POLICY "Public can insert enquiries" ON public.enquiries FOR INSERT WITH CHECK (true);
CREATE POLICY "Public can insert bookings" ON public.bookings FOR INSERT WITH CHECK (true);
¯