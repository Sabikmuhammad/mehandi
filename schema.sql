-- Raihana Mehendi Artistry - Supabase Schema
-- This script sets up the tables, triggers, and RLS policies for the application.

-- 1. Enable pgcrypto for UUID generation
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 2. Create Custom Types
CREATE TYPE enquiry_status AS ENUM ('New', 'Contacted', 'Quoted', 'Advance Pending', 'Confirmed', 'Completed', 'Cancelled');
CREATE TYPE booking_status AS ENUM ('Pending', 'Confirmed', 'Completed', 'Cancelled');
CREATE TYPE payment_status AS ENUM ('Pending', 'Partially Paid', 'Paid', 'Refunded');
CREATE TYPE availability_status AS ENUM ('Available', 'Limited', 'Unavailable');

-- 3. Create Tables

-- PROFILES (Linked to auth.users)
CREATE TABLE public.profiles (
    id UUID REFERENCES auth.users(id) PRIMARY KEY,
    full_name TEXT,
    role TEXT DEFAULT 'staff' CHECK (role IN ('admin', 'staff')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- CUSTOMERS
CREATE TABLE public.customers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    phone TEXT,
    email TEXT,
    total_spent DECIMAL(12,2) DEFAULT 0.00,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ENQUIRIES
CREATE TABLE public.enquiries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    customer_id UUID REFERENCES public.customers(id),
    customer_name TEXT NOT NULL, -- Denormalized for easier searching if customer doesn't exist yet
    customer_phone TEXT,
    customer_email TEXT,
    event_type TEXT,
    event_date DATE,
    event_time TIME,
    venue TEXT,
    guests INTEGER,
    budget DECIMAL(12,2),
    mehendi_style TEXT,
    status enquiry_status DEFAULT 'New',
    notes TEXT,
    quoted_amount DECIMAL(12,2),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- BOOKINGS
CREATE TABLE public.bookings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    customer_id UUID REFERENCES public.customers(id) NOT NULL,
    enquiry_id UUID REFERENCES public.enquiries(id),
    event_date DATE NOT NULL,
    event_time TIME,
    event_type TEXT NOT NULL,
    venue TEXT,
    service_details TEXT,
    total_amount DECIMAL(12,2) NOT NULL DEFAULT 0.00,
    advance_amount DECIMAL(12,2) NOT NULL DEFAULT 0.00,
    status booking_status DEFAULT 'Pending',
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- PAYMENTS
CREATE TABLE public.payments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    booking_id UUID REFERENCES public.bookings(id) NOT NULL,
    amount DECIMAL(12,2) NOT NULL,
    payment_method TEXT,
    payment_date TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    status payment_status DEFAULT 'Pending',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- PORTFOLIO IMAGES
CREATE TABLE public.portfolio_images (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT,
    category TEXT NOT NULL,
    description TEXT,
    image_url TEXT NOT NULL,
    display_order INTEGER DEFAULT 0,
    is_featured BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- AVAILABILITY
CREATE TABLE public.availability (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    date DATE NOT NULL UNIQUE,
    status availability_status NOT NULL DEFAULT 'Available',
    note TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- SETTINGS
CREATE TABLE public.settings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    key TEXT NOT NULL UNIQUE,
    value JSONB NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. Triggers for updated_at

CREATE OR REPLACE FUNCTION update_modified_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_profiles_modtime BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE PROCEDURE update_modified_column();
CREATE TRIGGER update_customers_modtime BEFORE UPDATE ON public.customers FOR EACH ROW EXECUTE PROCEDURE update_modified_column();
CREATE TRIGGER update_enquiries_modtime BEFORE UPDATE ON public.enquiries FOR EACH ROW EXECUTE PROCEDURE update_modified_column();
CREATE TRIGGER update_bookings_modtime BEFORE UPDATE ON public.bookings FOR EACH ROW EXECUTE PROCEDURE update_modified_column();
CREATE TRIGGER update_payments_modtime BEFORE UPDATE ON public.payments FOR EACH ROW EXECUTE PROCEDURE update_modified_column();
CREATE TRIGGER update_portfolio_images_modtime BEFORE UPDATE ON public.portfolio_images FOR EACH ROW EXECUTE PROCEDURE update_modified_column();
CREATE TRIGGER update_availability_modtime BEFORE UPDATE ON public.availability FOR EACH ROW EXECUTE PROCEDURE update_modified_column();
CREATE TRIGGER update_settings_modtime BEFORE UPDATE ON public.settings FOR EACH ROW EXECUTE PROCEDURE update_modified_column();

-- 5. Row Level Security (RLS)

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.enquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.portfolio_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.availability ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.settings ENABLE ROW LEVEL SECURITY;

-- Allow public read access to portfolio, availability, and non-sensitive settings (optional based on public site needs)
CREATE POLICY "Public profiles are viewable by everyone." ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Portfolio images are viewable by everyone." ON public.portfolio_images FOR SELECT USING (true);
CREATE POLICY "Availability is viewable by everyone." ON public.availability FOR SELECT USING (true);

-- Admin access policy (requires a valid auth session)
-- This is a simple approach: if you are authenticated, you can do anything.
-- In a real production system, you'd check `auth.uid() IN (SELECT id FROM profiles WHERE role = 'admin')`
-- For this prototype, we'll assume any authenticated user is an admin/staff.

CREATE POLICY "Authenticated users can select customers" ON public.customers FOR SELECT TO authenticated USING (true);
CREATE POLICY "Authenticated users can insert customers" ON public.customers FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Authenticated users can update customers" ON public.customers FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Authenticated users can delete customers" ON public.customers FOR DELETE TO authenticated USING (true);

CREATE POLICY "Authenticated users can select enquiries" ON public.enquiries FOR SELECT TO authenticated USING (true);
CREATE POLICY "Authenticated users can insert enquiries" ON public.enquiries FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Authenticated users can update enquiries" ON public.enquiries FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Authenticated users can delete enquiries" ON public.enquiries FOR DELETE TO authenticated USING (true);

CREATE POLICY "Authenticated users can select bookings" ON public.bookings FOR SELECT TO authenticated USING (true);
CREATE POLICY "Authenticated users can insert bookings" ON public.bookings FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Authenticated users can update bookings" ON public.bookings FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Authenticated users can delete bookings" ON public.bookings FOR DELETE TO authenticated USING (true);

CREATE POLICY "Authenticated users can select payments" ON public.payments FOR SELECT TO authenticated USING (true);
CREATE POLICY "Authenticated users can insert payments" ON public.payments FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Authenticated users can update payments" ON public.payments FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Authenticated users can delete payments" ON public.payments FOR DELETE TO authenticated USING (true);

CREATE POLICY "Authenticated users can select portfolio_images" ON public.portfolio_images FOR SELECT TO authenticated USING (true);
CREATE POLICY "Authenticated users can insert portfolio_images" ON public.portfolio_images FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Authenticated users can update portfolio_images" ON public.portfolio_images FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Authenticated users can delete portfolio_images" ON public.portfolio_images FOR DELETE TO authenticated USING (true);

CREATE POLICY "Authenticated users can select availability" ON public.availability FOR SELECT TO authenticated USING (true);
CREATE POLICY "Authenticated users can insert availability" ON public.availability FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Authenticated users can update availability" ON public.availability FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Authenticated users can delete availability" ON public.availability FOR DELETE TO authenticated USING (true);

CREATE POLICY "Authenticated users can select settings" ON public.settings FOR SELECT TO authenticated USING (true);
CREATE POLICY "Authenticated users can insert settings" ON public.settings FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Authenticated users can update settings" ON public.settings FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Authenticated users can delete settings" ON public.settings FOR DELETE TO authenticated USING (true);

-- 6. Trigger for creating profile on auth.users insert
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, role)
  VALUES (new.id, new.raw_user_meta_data->>'full_name', 'admin');
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- Seed data for testing (Optional)
-- INSERT INTO public.settings (key, value) VALUES ('brand_name', '"Raihana Mehendi Artistry"');
