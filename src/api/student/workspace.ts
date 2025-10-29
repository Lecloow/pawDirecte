import { Request } from "../../core/request";
import { decodeWorkspace } from "../../decoders/workspace-item";
import {
  type Account,
  type Session,
  SessionTokenRequired,
  type WorkspaceItem
} from "../../models";

export const studentWorkspace = async (
  session: Session,
  account: Account
): Promise<Array<WorkspaceItem>> => {
  if (!session.token) throw new SessionTokenRequired();

  const request = new Request(`/E/${account.id}/espacestravail.awp?verbe=get`)
    .addVersionURL()
    .setToken(session.token)
    .setFormData({});

  const response = await request.send(session.fetcher);
  session.token = response.token;

  return response.data?.map(decodeWorkspace) ?? [];
};
