import { Request } from "../../core/request";
import { decodeAttendanceItem } from "../../decoders/attendance-item";
import {
  type Account,
  type AttendanceItem,
  type Session,
  SessionTokenRequired
} from "../../models";

type AttendanceResponse = Readonly<{
  punishments: Array<AttendanceItem>;
  absences: Array<AttendanceItem>;
  exemptions: Array<AttendanceItem>;
}>;

export const studentAttendance = async (
  session: Session,
  account: Account
): Promise<AttendanceResponse> => {
  if (!session.token) throw new SessionTokenRequired();

  const request = new Request(`/eleves/${account.id}/viescolaire.awp?verbe=get`)
    .addVersionURL()
    .setToken(session.token)
    .setFormData({});

  const response = await request.send(session.fetcher);
  session.token = response.token;

  const punishments = response.data.sanctionsEncouragements;
  const absences = response.data.absencesRetards;
  const exemptions = response.data.dispenses;

  return {
    punishments: punishments.map(decodeAttendanceItem),
    absences: absences.map(decodeAttendanceItem),
    exemptions: exemptions.map(decodeAttendanceItem)
  };
};
