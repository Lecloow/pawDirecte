import type { GradeKind } from "~/models/grade-kind";

export type GradeValue = Readonly<{
  kind: GradeKind;
  points: number;
}>;
