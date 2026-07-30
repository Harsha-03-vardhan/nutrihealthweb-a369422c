-- ============ shared helper: updated_at ============
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

-- ============ profiles ============
CREATE TABLE public.profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  name text NOT NULL DEFAULT '',
  role text NOT NULL DEFAULT 'Mother',
  relationship text NOT NULL DEFAULT 'Mother',
  age integer,
  mobile text NOT NULL DEFAULT '',
  email text NOT NULL DEFAULT '',
  occupation text NOT NULL DEFAULT '',
  address text NOT NULL DEFAULT '',
  photo text NOT NULL DEFAULT '',
  active_baby_id uuid,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.profiles TO authenticated;
GRANT ALL ON public.profiles TO service_role;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users manage their own profile"
  ON public.profiles FOR ALL TO authenticated
  USING (id = auth.uid()) WITH CHECK (id = auth.uid());

CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- ============ babies ============
CREATE TABLE public.babies (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  name text NOT NULL,
  dob date NOT NULL,
  gender text NOT NULL DEFAULT 'Female',
  blood_group text NOT NULL DEFAULT '',
  birth_weight numeric,
  birth_time text NOT NULL DEFAULT '',
  allergies text NOT NULL DEFAULT '',
  notes text NOT NULL DEFAULT '',
  photo text NOT NULL DEFAULT '',
  weight numeric,
  height numeric,
  head_circumference numeric,
  bmi numeric,
  water_ml integer NOT NULL DEFAULT 0,
  status text NOT NULL DEFAULT 'Healthy',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX babies_user_id_idx ON public.babies(user_id);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.babies TO authenticated;
GRANT ALL ON public.babies TO service_role;
ALTER TABLE public.babies ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users manage their own babies"
  ON public.babies FOR ALL TO authenticated
  USING (user_id = auth.uid()) WITH CHECK (user_id = auth.uid());

CREATE TRIGGER update_babies_updated_at
  BEFORE UPDATE ON public.babies
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

ALTER TABLE public.profiles
  ADD CONSTRAINT profiles_active_baby_fk
  FOREIGN KEY (active_baby_id) REFERENCES public.babies(id) ON DELETE SET NULL;

-- ============ security definer: baby ownership ============
CREATE OR REPLACE FUNCTION public.has_baby_access(_baby_id uuid, _user_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.babies
    WHERE id = _baby_id AND user_id = _user_id
  )
$$;

-- ============ growth_entries ============
CREATE TABLE public.growth_entries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  baby_id uuid NOT NULL REFERENCES public.babies(id) ON DELETE CASCADE,
  entry_date date NOT NULL DEFAULT CURRENT_DATE,
  weight numeric NOT NULL,
  height numeric NOT NULL,
  head_circ numeric,
  bmi numeric,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX growth_entries_baby_id_idx ON public.growth_entries(baby_id);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.growth_entries TO authenticated;
GRANT ALL ON public.growth_entries TO service_role;
ALTER TABLE public.growth_entries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users manage growth for their own babies"
  ON public.growth_entries FOR ALL TO authenticated
  USING (public.has_baby_access(baby_id, auth.uid()))
  WITH CHECK (public.has_baby_access(baby_id, auth.uid()));

-- ============ milestones ============
CREATE TABLE public.milestones (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  baby_id uuid NOT NULL REFERENCES public.babies(id) ON DELETE CASCADE,
  title text NOT NULL,
  age_label text NOT NULL DEFAULT '',
  emoji text NOT NULL DEFAULT '',
  done boolean NOT NULL DEFAULT false,
  sort integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX milestones_baby_id_idx ON public.milestones(baby_id);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.milestones TO authenticated;
GRANT ALL ON public.milestones TO service_role;
ALTER TABLE public.milestones ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users manage milestones for their own babies"
  ON public.milestones FOR ALL TO authenticated
  USING (public.has_baby_access(baby_id, auth.uid()))
  WITH CHECK (public.has_baby_access(baby_id, auth.uid()));

CREATE TRIGGER update_milestones_updated_at
  BEFORE UPDATE ON public.milestones
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- ============ vaccines ============
CREATE TABLE public.vaccines (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  baby_id uuid NOT NULL REFERENCES public.babies(id) ON DELETE CASCADE,
  name text NOT NULL,
  dose text NOT NULL DEFAULT '',
  age_label text NOT NULL DEFAULT '',
  age_months numeric NOT NULL DEFAULT 0,
  due_date date,
  protects text NOT NULL DEFAULT '',
  completed boolean NOT NULL DEFAULT false,
  completed_date date,
  sort integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX vaccines_baby_id_idx ON public.vaccines(baby_id);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.vaccines TO authenticated;
GRANT ALL ON public.vaccines TO service_role;
ALTER TABLE public.vaccines ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users manage vaccines for their own babies"
  ON public.vaccines FOR ALL TO authenticated
  USING (public.has_baby_access(baby_id, auth.uid()))
  WITH CHECK (public.has_baby_access(baby_id, auth.uid()));

-- ============ meals ============
CREATE TABLE public.meals (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  baby_id uuid NOT NULL REFERENCES public.babies(id) ON DELETE CASCADE,
  recipe_id text NOT NULL,
  slot text NOT NULL,
  time text NOT NULL DEFAULT '',
  scheduled_date date NOT NULL DEFAULT CURRENT_DATE,
  completed boolean NOT NULL DEFAULT false,
  favorite boolean NOT NULL DEFAULT false,
  skipped boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX meals_baby_id_date_idx ON public.meals(baby_id, scheduled_date);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.meals TO authenticated;
GRANT ALL ON public.meals TO service_role;
ALTER TABLE public.meals ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users manage meals for their own babies"
  ON public.meals FOR ALL TO authenticated
  USING (public.has_baby_access(baby_id, auth.uid()))
  WITH CHECK (public.has_baby_access(baby_id, auth.uid()));

-- ============ favorite_recipes ============
CREATE TABLE public.favorite_recipes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  baby_id uuid NOT NULL REFERENCES public.babies(id) ON DELETE CASCADE,
  recipe_id text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (baby_id, recipe_id)
);

CREATE INDEX favorite_recipes_baby_id_idx ON public.favorite_recipes(baby_id);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.favorite_recipes TO authenticated;
GRANT ALL ON public.favorite_recipes TO service_role;
ALTER TABLE public.favorite_recipes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users manage saved recipes for their own babies"
  ON public.favorite_recipes FOR ALL TO authenticated
  USING (public.has_baby_access(baby_id, auth.uid()))
  WITH CHECK (public.has_baby_access(baby_id, auth.uid()));