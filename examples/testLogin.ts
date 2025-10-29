import { credentials } from "./_credentials";
import { loginUsingCredentials } from "./_login-using-crendentials";

async function main() {
  try {
    const { session, account } = await loginUsingCredentials(
      credentials.student_username!,
      credentials.student_password!
    );

    console.log("✅ Connexion réussie !");
    console.log("Compte :", account);
  } catch (error) {
    console.error("❌ Erreur pendant la connexion :", error);
  }
}

main();