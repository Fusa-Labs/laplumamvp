import combosData from "@/modules/catalog/data/combos.json";

/**
 * Resolves the correct navigation destination for a given search query.
 * Priority: combo name/id match → product catalog text filter.
 * Descriptions are intentionally excluded to avoid false positives.
 */
export const resolveSearchDestination = (query: string): string => {
  const q = query.toLowerCase().trim();

  const matchedCombo = combosData.find(
    (combo) =>
      combo.name.toLowerCase().includes(q) ||
      combo.id.toLowerCase().replace(/-/g, " ").includes(q)
  );

  if (matchedCombo) return `/combo/${matchedCombo.id}`;

  return `/productos?search=${encodeURIComponent(query.trim())}`;
};
