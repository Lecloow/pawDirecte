import {
  type Response as UnsafeResponse,
  getHeaderFromResponse
} from "@literate.ink/utilities";

const validJson = (value: string) => {
  return (
    (value.startsWith("[") || value.startsWith("{")) &&
    (value.endsWith("]") || value.endsWith("}"))
  );
};

export class Response {
  public status: number;
  public token: string | null;
  public two_fa_token: string | null; // NEW
  public access_token: string | null = null;
  public message: string | null = null;
  public data: any;

  public constructor(response: UnsafeResponse) {
    this.token = getHeaderFromResponse(response, "x-token");
    this.two_fa_token = getHeaderFromResponse(response, "2fa-token") ?? null; // NEW

    const content_type = getHeaderFromResponse(response, "content-type");
    if (
      !content_type?.startsWith("application/json") &&
      !validJson(response.content)
    ) {
      this.status = Number.parseInt(
        getHeaderFromResponse(response, "x-code")!,
        10
      );
    }
    else {
      const content = JSON.parse(response.content);

      this.status = content.code;
      this.data = content.data;
      this.message = content.message;

      if ("token" in content) {
        this.token = content.token;
      }
    }
  }
}