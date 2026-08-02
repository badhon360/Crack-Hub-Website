export function formatDownloads(num) {
  const n = Number(num);

  if (!Number.isFinite(n) || n < 0) {
    return "0";
  }

  if (n >= 1_000_000) {
    return `${(n / 1_000_000).toFixed(1).replace(".0", "")}M`;
  }

  if (n >= 1_000) {
    return `${(n / 1_000).toFixed(1).replace(".0", "")}K`;
  }

  return n.toString();
}
export function filterAppsByName(apps, searchQuery = "") {
  if (!Array.isArray(apps)) {
    return [];
  }

  const query = searchQuery.trim().toLowerCase();

  if (!query) {
    return apps;
  }

  return apps.filter((app) =>
    (app.title || "").toLowerCase().includes(query)
  );
}
