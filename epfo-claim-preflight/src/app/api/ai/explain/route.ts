import { CheckStatus } from "@/lib/types";
import { NextResponse } from "next/server";

function fallbackExplanation(status: CheckStatus, label: string, reason: string): string {
  if (status === "pass") {
    return `${label} is ready. ${reason}`;
  }
  if (status === "blocking") {
    return `${label} is blocking your claim in this demo. ${reason}`;
  }
  return `${label} needs attention before you continue. ${reason}`;
}

export async function POST(request: Request) {
  const body = (await request.json()) as {
    status?: CheckStatus;
    label?: string;
    reason?: string;
    lang?: "en" | "hi";
  };

  if (!body.status || !body.label || !body.reason) {
    return NextResponse.json({ error: "status, label, and reason are required" }, { status: 400 });
  }

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ explanation: fallbackExplanation(body.status, body.label, body.reason) });
  }

  try {
    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-5-mini",
        input: [
          {
            role: "system",
            content:
              "You explain deterministic claim checks in simple citizen language. Keep to 1-2 lines. Do not invent government rules.",
          },
          {
            role: "user",
            content: `Status: ${body.status}. Label: ${body.label}. Reason: ${body.reason}. Language: ${body.lang ?? "en"}`,
          },
        ],
      }),
    });

    if (!response.ok) {
      return NextResponse.json({ explanation: fallbackExplanation(body.status, body.label, body.reason) });
    }

    const data = (await response.json()) as { output_text?: string };

    return NextResponse.json({
      explanation: data.output_text?.trim() || fallbackExplanation(body.status, body.label, body.reason),
    });
  } catch {
    return NextResponse.json({ explanation: fallbackExplanation(body.status, body.label, body.reason) });
  }
}
