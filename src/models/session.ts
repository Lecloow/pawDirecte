import type { DoubleAuth } from "./double-auth";

export type Session = Readonly<{
  username?: string;
  device_uuid?: string;
  token?: string | null;
  accessToken?: string | null;
  double_auth?: DoubleAuth | null;

  // NEW: jeton 2FA à propager entre les étapes
  two_factor_token?: string | null;

  // Optionnel si déjà présent dans le projet:
  fetcher?: any;
}>;