type SupabaseCountRow = {
  total: number;
};

type SupabaseRpcResponse =
  | number
  | { increment_view_count?: number }
  | Array<number | { increment_view_count?: number }>;

function getSupabaseConfig() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !key) {
    throw new Error("Missing Supabase environment variables.");
  }

  return {
    restUrl: `${url.replace(/\/$/, "")}/rest/v1`,
    key,
  };
}

async function supabaseRequest<T>(path: string, init: RequestInit = {}) {
  const { restUrl, key } = getSupabaseConfig();
  const response = await fetch(`${restUrl}${path}`, {
    ...init,
    headers: {
      apikey: key,
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
      ...init.headers,
    },
    cache: "no-store",
  });

  if (!response.ok) {
    const detail = await response.text().catch(() => response.statusText);
    throw new Error(`Supabase request failed: ${response.status} ${detail}`);
  }

  return response.json() as Promise<T>;
}

export async function getViewCount() {
  const rows = await supabaseRequest<SupabaseCountRow[]>(
    "/site_stats?key=eq.home_views&select=total&limit=1"
  );

  return rows[0]?.total ?? 0;
}

export async function incrementViewCount() {
  const data = await supabaseRequest<SupabaseRpcResponse>("/rpc/increment_view_count", {
    method: "POST",
    body: "{}",
  });

  if (typeof data === "number") return data;

  const first = Array.isArray(data) ? data[0] : data;
  if (typeof first === "number") return first;

  return first?.increment_view_count ?? 0;
}
