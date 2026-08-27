import { NextResponse } from "next/server";

function fallbackIntent(input: string) {
  const lower = input.toLowerCase();
  const amountMatch = lower.match(/(\d{4,7})/);
  const amount = amountMatch ? Number(amountMatch[1]) : null;

  let purpose = "other";
  if (/(medical|treatment|hospital|illness|mother|father)/.test(lower)) {
    purpose = "medical_treatment";
  } else if (/(education|college|school|fees)/.test(lower)) {
    purpose = "education";
  } else if (/(marriage|wedding)/.test(lower)) {
    purpose = "marriage";
  } else if (/(house|housing|home)/.test(lower)) {
    purpose = "housing";
  }

  return {
    intent: "pf_advance",
    purpose,
    amount,
    needs_clarification: amount === null,
    clarification_question: amount === null ? "How much would you like to request?" : null,
  };
}

export async function POST(request: Request) {
  const body = (await request.json()) as { message?: string };
  const message = body.message?.trim();

  if (!message) {
    return NextResponse.json({ error: "message is required" }, { status: 400 });
  }

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return NextResponse.json(fallbackIntent(message));
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
              "Extract PF claim intent. Return strict JSON with keys: intent, purpose, amount, needs_clarification, clarification_question.",
          },
          {
            role: "user",
            content: message,
          },
        ],
        text: {
          format: {
            type: "json_schema",
            name: "intent_schema",
            schema: {
              type: "object",
              additionalProperties: false,
              properties: {
                intent: { type: "string" },
                purpose: { type: "string" },
                amount: { type: ["number", "null"] },
                needs_clarification: { type: "boolean" },
                clarification_question: { type: ["string", "null"] },
              },
              required: ["intent", "purpose", "amount", "needs_clarification", "clarification_question"],
            },
            strict: true,
          },
        },
      }),
    });

    if (!response.ok) {
      return NextResponse.json(fallbackIntent(message));
    }

    const data = (await response.json()) as {
      output_text?: string;
    };

    if (!data.output_text) {
      return NextResponse.json(fallbackIntent(message));
    }

    return NextResponse.json(JSON.parse(data.output_text));
  } catch {
    return NextResponse.json(fallbackIntent(message));
  }
}
