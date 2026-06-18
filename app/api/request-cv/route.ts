import { NextResponse } from "next/server";
import { isWorkEmail, WORK_EMAIL_ERROR } from "@/lib/workEmail";

const CV_REQUEST_TO = "hello@nvzhn.com";

/** Vercel env values are literal — pasted quotes are not stripped like in .env files. */
function stripEnvQuotes(value: string): string {
  const trimmed = value.trim();
  if (
    (trimmed.startsWith('"') && trimmed.endsWith('"')) ||
    (trimmed.startsWith("'") && trimmed.endsWith("'"))
  ) {
    return trimmed.slice(1, -1).trim();
  }
  return trimmed;
}

type RequestBody = {
  name?: string;
  company?: string;
  email?: string;
};

export async function POST(request: Request) {
  let body: RequestBody;

  try {
    body = (await request.json()) as RequestBody;
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const name = body.name?.trim() ?? "";
  const company = body.company?.trim() ?? "";
  const email = body.email?.trim() ?? "";

  if (!name || !company || !email) {
    return NextResponse.json(
      { error: "Please fill in all fields." },
      { status: 400 }
    );
  }

  if (!isWorkEmail(email)) {
    return NextResponse.json({ error: WORK_EMAIL_ERROR }, { status: 400 });
  }

  const apiKey = stripEnvQuotes(process.env.RESEND_API_KEY ?? "");
  if (!apiKey) {
    console.error("RESEND_API_KEY is not configured.");
    return NextResponse.json(
      { error: "Email delivery is not configured yet." },
      { status: 503 }
    );
  }

  const from =
    stripEnvQuotes(process.env.RESEND_FROM ?? "") ||
    "Portfolio <onboarding@resend.dev>";

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [CV_REQUEST_TO],
      reply_to: email,
      subject: `CV request from ${name} at ${company}`,
      text: [
        "New CV request from the portfolio site.",
        "",
        `Name: ${name}`,
        `Company: ${company}`,
        `Work email: ${email}`,
      ].join("\n"),
    }),
  });

  if (!response.ok) {
    const errorBody = await response.text();
    console.error("Resend API error:", errorBody);
    return NextResponse.json(
      { error: "Unable to send your request right now." },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true });
}
