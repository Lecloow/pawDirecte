export const AccountKind = {
  Student: "E"
  // Family1: "1",
  // Family2: "2"
  // Staff: "A",
  // Teacher: "P"
} as const;

export type AccountKind = typeof AccountKind[keyof typeof AccountKind];
