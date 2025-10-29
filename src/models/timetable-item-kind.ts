export const TimetableItemKind = {
  COURS: "COURS",
  PERMANENCE: "PERMANENCE",
  CONGE: "CONGE",
  EVENEMENT: "EVENEMENT",
  SANCTION: "SANCTION"
} as const;

export type TimetableItemKind =
  (typeof TimetableItemKind)[keyof typeof TimetableItemKind];
