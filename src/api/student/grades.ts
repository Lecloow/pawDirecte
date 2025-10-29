import { Request } from "../../core/request";
import { decodeGrade } from "../../decoders/grade";
import { buildOverview } from "../../decoders/grades-overview";
import { decodePeriod } from "../../decoders/period";
import {
  type Account,
  type Grade,
  type GradesOverview,
  type Period,
  type Session,
  SessionTokenRequired
} from "../../models";

type GradesResponse = {
  grades: Array<Grade>;
  periods: Array<Period>;
  overview: GradesOverview;
};

/**
 * @param session
 * @param account
 * @param year "The year to fetch grades in YYYY format." SENSITIVE PARAMETER NOT ALL ACCOUNTS CAN DO THAT
 */
export const studentGrades = async (
  session: Session,
  account: Account,
  year: string
): Promise<GradesResponse> => {
  if (!session.token) throw new SessionTokenRequired();

  const request = new Request(`/eleves/${account.id}/notes.awp?verbe=get`)
    .addVersionURL()
    .setToken(session.token)
    .setFormData({
      anneeScolaire: year
    });

  const response = await request.send(session.fetcher);
  session.token = response.token;

  // TODO: return parameters like colors ect...
  return {
    grades: response.data.notes?.map(decodeGrade),
    periods: response.data.periodes
      ?.map(decodePeriod)
      .filter(
        (i: any) =>
          !(
            response.data.parametrage.notePeriodeAnnuelle === false &&
            i.yearly === true
          )
      ),
    overview: buildOverview(response.data)
  };
};
