-- Replace the SECURITY DEFINER helper with direct ownership subqueries.
DROP POLICY "Users manage growth for their own babies" ON public.growth_entries;
DROP POLICY "Users manage milestones for their own babies" ON public.milestones;
DROP POLICY "Users manage vaccines for their own babies" ON public.vaccines;
DROP POLICY "Users manage meals for their own babies" ON public.meals;
DROP POLICY "Users manage saved recipes for their own babies" ON public.favorite_recipes;

DROP FUNCTION IF EXISTS public.has_baby_access(uuid, uuid);

CREATE POLICY "Users manage growth for their own babies"
  ON public.growth_entries FOR ALL TO authenticated
  USING (baby_id IN (SELECT id FROM public.babies WHERE user_id = auth.uid()))
  WITH CHECK (baby_id IN (SELECT id FROM public.babies WHERE user_id = auth.uid()));

CREATE POLICY "Users manage milestones for their own babies"
  ON public.milestones FOR ALL TO authenticated
  USING (baby_id IN (SELECT id FROM public.babies WHERE user_id = auth.uid()))
  WITH CHECK (baby_id IN (SELECT id FROM public.babies WHERE user_id = auth.uid()));

CREATE POLICY "Users manage vaccines for their own babies"
  ON public.vaccines FOR ALL TO authenticated
  USING (baby_id IN (SELECT id FROM public.babies WHERE user_id = auth.uid()))
  WITH CHECK (baby_id IN (SELECT id FROM public.babies WHERE user_id = auth.uid()));

CREATE POLICY "Users manage meals for their own babies"
  ON public.meals FOR ALL TO authenticated
  USING (baby_id IN (SELECT id FROM public.babies WHERE user_id = auth.uid()))
  WITH CHECK (baby_id IN (SELECT id FROM public.babies WHERE user_id = auth.uid()));

CREATE POLICY "Users manage saved recipes for their own babies"
  ON public.favorite_recipes FOR ALL TO authenticated
  USING (baby_id IN (SELECT id FROM public.babies WHERE user_id = auth.uid()))
  WITH CHECK (baby_id IN (SELECT id FROM public.babies WHERE user_id = auth.uid()));