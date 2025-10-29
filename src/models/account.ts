import type { AccountKind } from "~/models";

export type Account = Readonly<{
  loginID: number;
  id: number;
  userID: string;
  username: string;
  kind: AccountKind;
  ogecID: string;
  main: boolean;
  lastConnection: Date;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  schoolName: string;
  schoolUAI: string;
  schoolLogoPath: string;
  /** As HEX. */
  schoolAgendaColor: string;
  access_token: string;
  socket_token: string;
  gender: "M" | "F";
  profilePictureURL: string;
  modules: any[]; // TODO
  /**
   * current year cycle
   * @example "2023-2024"
   */
  currentSchoolCycle: string;
  class: { short: string; long: string };
}>;
