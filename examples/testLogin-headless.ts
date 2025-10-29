import { config } from "dotenv";
config(); // charge .env si présent

import { credentials } from "./_credentials";
import {
  DoubleAuthRequired,
  type Session,
  initDoubleAuth,
  checkDoubleAuth,
  login,
  setAccessToken
} from "../src";

async function main() {
  const session: Session = {
    username: credentials.student_username!,
    device_uuid: "your-device-uuid" // garde-le stable
  };

  try {
    let accounts = await login(session, credentials.student_password!);

    // Pas de 2FA → déjà connecté
    const account = accounts[0];
    setAccessToken(session, account);
    console.log("✅ Connexion réussie !");
    console.log("Compte :", account);
  } catch (err) {
    if (err instanceof DoubleAuthRequired) {
      console.log("🔐 Double authentification requise…");
      const qcm = await initDoubleAuth(session);
      console.log("Question:", qcm.question);
      console.log("Propositions:", qcm.answers);

      // Récupère la réponse depuis .env
      const byText = process.env.ED_2FA_ANSWER; // texte exact de la proposition
      const byIndex = process.env.ED_2FA_INDEX; // index numérique (string)

      let chosen: string | undefined;

      if (byText) {
        const idx = qcm.answers.findIndex((a) => a === byText);
        if (idx >= 0) chosen = qcm.answers[idx];
        else {
          throw new Error(
            `ED_2FA_ANSWER ne correspond à aucune proposition: "${byText}"`
          );
        }
      }
      else if (byIndex) {
        const idx = Number.parseInt(byIndex, 10);
        if (Number.isFinite(idx) && qcm.answers[idx] !== undefined) {
          chosen = qcm.answers[idx];
        } else {
          throw new Error(
            `ED_2FA_INDEX invalide: "${byIndex}" (doit être un index entre 0 et ${qcm.answers.length - 1})`
          );
        }
      } else {
        throw new Error(
          "Aucune réponse fournie pour la 2FA. Définis ED_2FA_ANSWER (texte exact) ou ED_2FA_INDEX (index)."
        );
      }

      const ok = await checkDoubleAuth(session, chosen);
      if (!ok) {
        // La réponse était fausse → on arrête proprement
        throw new Error("La validation 2FA a échoué (mauvaise réponse).");
      }

      // Re-login après 2FA validée
      const accounts = await login(session, credentials.student_password!);
      const account = accounts[0];
      setAccessToken(session, account);
      console.log("✅ Connexion réussie après 2FA !");
      console.log("Compte :", account);
    } else {
      console.error("❌ Erreur pendant la connexion :", err);
    }
  }
}

main();