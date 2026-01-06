
-- =============================================
-- PHASE 5: STORAGE BUCKETS SECURISES
-- =============================================

-- Bucket pour les avatars utilisateurs (public)
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES ('avatars', 'avatars', true, 5242880, ARRAY['image/jpeg', 'image/png', 'image/webp']);

-- Bucket pour les assets vendeurs (public)
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES ('seller-assets', 'seller-assets', true, 10485760, ARRAY['image/jpeg', 'image/png', 'image/webp']);

-- Bucket pour les documents de verification (prive)
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES ('documents', 'documents', false, 10485760, ARRAY['image/jpeg', 'image/png', 'application/pdf']);

-- Bucket pour les images produits (public)
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES ('products', 'products', true, 5242880, ARRAY['image/jpeg', 'image/png', 'image/webp']);

-- =============================================
-- STORAGE POLICIES - AVATARS
-- =============================================

CREATE POLICY "Avatar images are publicly accessible"
ON storage.objects FOR SELECT
USING (bucket_id = 'avatars');

CREATE POLICY "Users can upload their own avatar"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'avatars' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can update their own avatar"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'avatars' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can delete their own avatar"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'avatars' AND auth.uid()::text = (storage.foldername(name))[1]);

-- =============================================
-- STORAGE POLICIES - SELLER ASSETS
-- =============================================

CREATE POLICY "Seller assets are publicly accessible"
ON storage.objects FOR SELECT
USING (bucket_id = 'seller-assets');

CREATE POLICY "Sellers can upload their own assets"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'seller-assets' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Sellers can update their own assets"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'seller-assets' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Sellers can delete their own assets"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'seller-assets' AND auth.uid()::text = (storage.foldername(name))[1]);

-- =============================================
-- STORAGE POLICIES - DOCUMENTS (PRIVATE)
-- =============================================

CREATE POLICY "Users can view their own documents"
ON storage.objects FOR SELECT
TO authenticated
USING (bucket_id = 'documents' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can upload their own documents"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'documents' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Admins can view all documents"
ON storage.objects FOR SELECT
TO authenticated
USING (bucket_id = 'documents' AND public.has_role(auth.uid(), 'admin'));

-- =============================================
-- STORAGE POLICIES - PRODUCTS
-- =============================================

CREATE POLICY "Product images are publicly accessible"
ON storage.objects FOR SELECT
USING (bucket_id = 'products');

CREATE POLICY "Sellers can upload product images"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'products' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Sellers can update product images"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'products' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Sellers can delete product images"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'products' AND auth.uid()::text = (storage.foldername(name))[1]);
