import { createClient, SupabaseClient } from "@supabase/supabase-js";

let rawUrl = (import.meta.env.VITE_SUPABASE_URL || "").trim();
const rawKey = (import.meta.env.VITE_SUPABASE_ANON_KEY || "").trim();

// Smart conversion if a user inadvertently pasted their PostgreSQL connection string
if (rawUrl.startsWith("postgresql://") || rawUrl.startsWith("postgres://")) {
  const match = rawUrl.match(/postgres\.([a-z0-9_-]+):/i);
  if (match && match[1]) {
    rawUrl = `https://${match[1]}.supabase.co`;
    console.info(`[Supabase] Converted postgresql URI to Supabase project URL: ${rawUrl}`);
  }
}

// Strip trailing slashes and paths like /rest/v1 or /rest/v2 if inadvertently included
rawUrl = rawUrl.replace(/\/rest\/v[0-9]+\/?$/i, "").replace(/\/+$/, "");

export const isSupabaseConfigured = Boolean(
  rawUrl &&
  rawKey &&
  rawUrl.startsWith("http")
);

if (!isSupabaseConfigured) {
  console.warn(
    "[Supabase] Configuration Note: VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY is not configured with a valid HTTPS URL. " +
    "The application is running in safe fallback mode using the local dataset."
  );
}

// Safe client instantiation ensures the browser app and tests never crash on invalid/empty .env
let clientInstance: SupabaseClient;
try {
  clientInstance = createClient(
    isSupabaseConfigured ? rawUrl : "https://placeholder.supabase.co",
    isSupabaseConfigured ? rawKey : "placeholder-anon-key",
    {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    }
  );
} catch (err) {
  console.error("[Supabase] Failed to initialize Supabase client, using safe fallback:", err);
  clientInstance = createClient("https://placeholder.supabase.co", "placeholder-anon-key");
}

export const supabase: SupabaseClient = clientInstance;
