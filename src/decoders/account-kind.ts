import { AccountKind, UnknownEnumValue } from "../models";

export const decodeAccountKind = (kind: any): AccountKind => {
  kind = String(kind);

  // We assert that the value is a valid AccountKind value.
  if (!Object.values(AccountKind).includes(kind)) {
    throw new UnknownEnumValue("AccountKind", kind);
  }

  return kind as AccountKind;
};
