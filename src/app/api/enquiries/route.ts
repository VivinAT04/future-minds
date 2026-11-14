import { NextResponse } from "next/server";
import { validateEnquiry } from "@/lib/enquiry";

function json(
  message: string,
  status: number
) {
  return NextResponse.json(
    { message },
    {
      status,
      headers: {
        "Cache-Control": "no-store"
      }
    }
  );
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY;
  const recipient = process.env.ENQUIRY_TO_EMAIL;
  const sender = process.env.RESEND_FROM_EMAIL;

  if (!apiKey || !recipient || !sender) {
    return json(
      "Online enquiries are not available yet. Please try again later.",
      503
    );
  }

  if (
    Number(request.headers.get("content-length") || 0) >
    10000
  ) {
    return json("Request is too large.", 413);
  }

  let body: unknown;

  try {
    const raw = await request.text();

    if (raw.length > 10000) {
      return json("Request is too large.", 413);
    }

    body = JSON.parse(raw);
  } catch {
    return json("Invalid request.", 400);
  }

  const result = validateEnquiry(body);

  if (!result.ok) {
    return json(result.error, 400);
  }

  const enquiry = result.data;

  const html = `
    <h2>Future Minds — New Enquiry</h2>
    <p><strong>Name:</strong> ${escapeHtml(enquiry.guardianName)}</p>
    <p><strong>Email:</strong> ${escapeHtml(enquiry.email)}</p>
    <p><strong>Phone:</strong> ${escapeHtml(enquiry.phone || "Not provided")}</p>
    <p><strong>Programme:</strong> ${escapeHtml(enquiry.programme)}</p>
    <p><strong>Message:</strong></p>
    <p style="white-space:pre-wrap">${escapeHtml(enquiry.message)}</p>
  `;

  try {
    const response = await fetch(
      "https://api.resend.com/emails",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          from: sender,
          to: [recipient],
          reply_to: enquiry.email,
          subject: "Future Minds — New Admissions Enquiry",
          html
        }),
        signal: AbortSignal.timeout(10000),
        cache: "no-store"
      }
    );

    if (!response.ok) {
      console.error(
        "Enquiry delivery failed:",
        response.status
      );

      return json(
        "We could not deliver your enquiry. Please try again later.",
        502
      );
    }

    return json(
      "Your enquiry has been sent successfully.",
      200
    );
  } catch {
    return json(
      "Enquiry delivery is temporarily unavailable.",
      502
    );
  }
}
