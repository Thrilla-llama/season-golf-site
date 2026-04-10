import { createClient } from '@supabase/supabase-js'

export const lovableSupabase = createClient(
  process.env.NEXT_PUBLIC_LOVABLE_SUPABASE_URL,
  process.env.NEXT_PUBLIC_LOVABLE_SUPABASE_ANON_KEY
)
