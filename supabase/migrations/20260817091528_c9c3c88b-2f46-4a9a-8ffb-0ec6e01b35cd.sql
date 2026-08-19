CREATE TABLE public.wishes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL CHECK (char_length(trim(name)) BETWEEN 1 AND 60),
  message TEXT NOT NULL CHECK (char_length(trim(message)) BETWEEN 1 AND 500),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT ON public.wishes TO anon;
GRANT SELECT, INSERT, DELETE ON public.wishes TO authenticated;
GRANT ALL ON public.wishes TO service_role;

ALTER TABLE public.wishes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read wishes" ON public.wishes FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Anyone can post a wish" ON public.wishes FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "Admin can delete wishes" ON public.wishes FOR DELETE TO authenticated USING (true);

CREATE INDEX wishes_created_at_idx ON public.wishes (created_at DESC);