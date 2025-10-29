import type { Document } from "~/models";
import { decodeDocumentKind } from "./document-kind";

export const decodeDocument = (item: any): Document => {
  return {
    id: item.id,
    name: item.libelle,
    date: new Date(item.date),
    kind: decodeDocumentKind(item.type),
    signatureRequired: item.signatureDemandee ?? false,
    signature: item.signature ?? void 0
  };
};
