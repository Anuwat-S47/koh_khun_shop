export const Languages = ["th", "lo", "en"] as const;
export type Language = (typeof Languages)[number];
