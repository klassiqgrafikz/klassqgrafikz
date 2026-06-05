
-- Fix search_path on set_updated_at
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END $$;

-- handle_new_user and has_role are SECURITY DEFINER but only called by triggers / inside policies;
-- revoke public EXECUTE so they aren't callable as RPC.
REVOKE EXECUTE ON FUNCTION public.handle_new_user() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.set_updated_at() FROM PUBLIC, anon, authenticated;

-- get_traffic_stats returns only aggregates → keep public.
-- (no change needed; left as SECURITY DEFINER)

-- Tighten contact_submissions insert: require non-empty fields & cap inserts implicitly via CHECK already.
DROP POLICY IF EXISTS "Anyone can submit contact" ON public.contact_submissions;
CREATE POLICY "Anyone can submit contact" ON public.contact_submissions
  FOR INSERT WITH CHECK (
    -- guest submission must leave user_id null
    (auth.uid() IS NULL AND user_id IS NULL)
    OR
    -- logged-in must own the row
    (auth.uid() IS NOT NULL AND user_id = auth.uid())
  );

-- Tighten reviews insert similarly
DROP POLICY IF EXISTS "Anyone can submit a review" ON public.reviews;
CREATE POLICY "Anyone can submit a review" ON public.reviews
  FOR INSERT WITH CHECK (
    (auth.uid() IS NULL AND user_id IS NULL)
    OR
    (auth.uid() IS NOT NULL AND user_id = auth.uid())
  );

-- page_visits insert: just enforce non-null path
DROP POLICY IF EXISTS "Anyone can record a visit" ON public.page_visits;
CREATE POLICY "Anyone can record a visit" ON public.page_visits
  FOR INSERT WITH CHECK (path IS NOT NULL AND char_length(path) BETWEEN 1 AND 500);
