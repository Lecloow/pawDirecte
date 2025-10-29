import type { AttendanceItemKind } from "~/models";

export type AttendanceItem = Readonly<{
  id: number;
  studentId: number;
  studentName: string;
  reason: string;
  date: Date;
  dateOfEvent: Date;
  label: string;
  teacher: string;
  comment: string;
  subjectName: string;
  justified: boolean;
  justificationType: string;
  onlineJustification: boolean;
  todo: string;
  kind: AttendanceItemKind;
  displayDate: string;
}>;
