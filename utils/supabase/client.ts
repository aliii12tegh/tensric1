import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  console.log("Loading Supabase Key:", process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? "EXISTS" : "MISSING");
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}
