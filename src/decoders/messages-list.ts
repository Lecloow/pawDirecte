import type { FileKind } from "~/models";
import type { APIReceivedMessageType, ReceivedMessage } from "~/models/message";

export const decodeMesssagesList = (
  message: APIReceivedMessageType
): ReceivedMessage => {
  return {
    id: message.id,
    type: message.mtype,
    read: message.read,
    subject: message.subject,
    date: new Date(message.date),
    sender: `${message.from.prenom} ${message.from.nom}`,
    canAnswer: message.canAnswer,
    content: message.content,
    files: message.files.map((file) => ({
      // to download attachement GET /telechargement.awp?leTypeDeFichier={type}&fichierId={id}
      id: file.id,
      name: file.libelle,
      type: file.type as FileKind // file.type is always a FileKind type... a decoder would be overkill
    }))
  };
};
