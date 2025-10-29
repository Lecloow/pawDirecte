import { refresh } from "../src";

import { ExampleCredentialsError, credentials } from "./_credentials";
import { loginUsingCredentials, uuid } from "./_login-using-crendentials";

void (async function main() {
  if (!credentials.student_username || !credentials.student_password)
    throw new ExampleCredentialsError("student");

  let { session, account } = await loginUsingCredentials(
    credentials.student_username,
    credentials.student_password
  );

  // Refresh the session token and get the accounts for the given session.
  const accounts = await refresh(session, account.kind);

  // Grab the first account, and show some information.
  account = accounts[0];
  console.log(
    "Re-logged in to",
    account.firstName,
    account.lastName,
    "from",
    account.schoolName
  );
})();
