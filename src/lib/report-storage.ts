const DEFAULT_REPORTS_BUCKET = "reports";

function getSupabaseUrl() {
  const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (!url) throw new Error("Missing SUPABASE_URL.");
  return url.replace(/\/$/, "");
}

export function getReportsBucket() {
  return process.env.SUPABASE_REPORTS_BUCKET || DEFAULT_REPORTS_BUCKET;
}

export function getReportPublicUrl(path: string) {
  const cleanPath = path.replace(/^\/+/, "");
  return `${getSupabaseUrl()}/storage/v1/object/public/${getReportsBucket()}/${cleanPath}`;
}

