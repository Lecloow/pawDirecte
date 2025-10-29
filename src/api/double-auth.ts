import { Request } from "../core/request";
import { decodeDoubleAuth } from "../decoders/double-auth";
import { decodeDoubleAuthChallenge } from "../decoders/double-auth-challenge";
import {
  BadCredentials,
  type DoubleAuthChallenge,
  type Session,
  SessionTokenRequired
} from "../models";

import { encode } from "js-base64";

export const initDoubleAuth = async (
  session: Session
): Promise<DoubleAuthChallenge> => {
  if (!session.token) throw new SessionTokenRequired();

  const request = new Request("/connexion/doubleauth.awp?verbe=get")
    .addVersionURL()
    .setToken(session.token)
    .setFormData({});

  // Propager le 2FA token si on l’a déjà
  if (session.two_factor_token) {
    request.setTwoFactorToken(session.two_factor_token);
  }

  const response = await request.send(session.fetcher);

  if (!response.token) throw new BadCredentials();

  // MAJ des tokens
  session.token = response.token;
  session.two_factor_token = response.two_fa_token ?? session.two_factor_token;

  return decodeDoubleAuthChallenge(response.data);
};

export const checkDoubleAuth = async (
  session: Session,
  answer: string
): Promise<boolean> => {
  if (!session.token) throw new SessionTokenRequired();

  const request = new Request("/connexion/doubleauth.awp?verbe=post")
    .addVersionURL()
    .setToken(session.token)
    .setFormData({
      choix: encode(answer)
    });

  // Propager le 2FA token
  if (session.two_factor_token) {
    request.setTwoFactorToken(session.two_factor_token);
  }

  const response = await request.send(session.fetcher);

  // MAJ des tokens + du double_auth (cn/cv)
  session.token = response.token;
  session.two_factor_token = response.two_fa_token ?? session.two_factor_token;
  session.double_auth = decodeDoubleAuth(response.data);

  return true;
};
