import { decode } from "js-base64";
import type { DoubleAuthChallenge } from "../models";

export const decodeDoubleAuthChallenge = (
  challenge: any
): DoubleAuthChallenge => {
  return {
    question: decode(challenge.question),
    answers: challenge.propositions.map(decode)
  };
};
