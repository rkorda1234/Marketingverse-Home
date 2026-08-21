const UTM_KEY = 'mv_utm';
const UTM_PARAMS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'fbclid', 'gclid'];

export function captureAdAttribution(): void {
  try {
    const params = new URLSearchParams(window.location.search);
    const captured: Record<string, string> = {};
    UTM_PARAMS.forEach(key => {
      const val = params.get(key);
      if (val) captured[key] = val;
    });
    if (Object.keys(captured).length > 0) {
      sessionStorage.setItem(UTM_KEY, JSON.stringify(captured));
    }
  } catch {}
}

export function getGHLFormSrc(baseUrl: string): string {
  try {
    const stored = sessionStorage.getItem(UTM_KEY);
    if (!stored) return baseUrl;
    const utms = JSON.parse(stored) as Record<string, string>;
    const url = new URL(baseUrl);
    Object.entries(utms).forEach(([k, v]) => url.searchParams.set(k, v));
    return url.toString();
  } catch {
    return baseUrl;
  }
}
