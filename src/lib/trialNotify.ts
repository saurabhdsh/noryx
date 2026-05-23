/** Form ID only, or full URL — we normalize either format from the env var. */
function getFormspreeFormId(): string {
  const raw = import.meta.env.VITE_FORMSPREE_FORM_ID?.trim() ?? "";
  if (!raw) return "";

  const fromUrl = raw.match(/formspree\.io\/f\/([a-zA-Z0-9]+)/i);
  if (fromUrl) return fromUrl[1];

  return raw;
}

const FORM_ID = getFormspreeFormId();

export type TrialNotifyPayload = {
  name: string;
  email: string;
  plan: string;
  planLabel: string;
};

export function isTrialNotifyConfigured(): boolean {
  return Boolean(FORM_ID);
}

/** Sends trial signup details to reach@noryxtest.io via Formspree. */
export async function notifyTrialRegistration(payload: TrialNotifyPayload): Promise<void> {
  if (!FORM_ID) {
    if (import.meta.env.PROD) {
      throw new Error(
        "Trial signup is temporarily unavailable. Please email reach@noryxtest.io directly.",
      );
    }
    console.warn("[trial] VITE_FORMSPREE_FORM_ID is not set — email notification skipped");
    return;
  }

  const { name, email, plan, planLabel } = payload;
  const endpoint = `https://formspree.io/f/${FORM_ID}`;

  const body = new FormData();
  body.append("name", name);
  body.append("email", email);
  body.append("plan", plan);
  body.append("plan_label", planLabel);
  body.append("submitted_at", new Date().toISOString());
  body.append("_replyto", email);
  body.append("_subject", `New noryx trial request — ${planLabel}`);
  body.append(
    "message",
    [
      "New trial request from noryxtest.io",
      "",
      `Name: ${name}`,
      `Company email: ${email}`,
      `Plan: ${planLabel}`,
    ].join("\n"),
  );

  let res: Response;
  try {
    res = await fetch(endpoint, {
      method: "POST",
      headers: { Accept: "application/json" },
      body,
    });
  } catch {
    throw new Error(
      "Could not reach our signup service. Check your connection, disable ad blockers for this site, or email reach@noryxtest.io.",
    );
  }

  if (!res.ok) {
    let detail = "Could not submit your request. Please try again.";
    try {
      const data = (await res.json()) as { error?: string };
      if (data.error) detail = data.error;
    } catch {
      /* ignore */
    }
    throw new Error(detail);
  }
}
