const FORM_ID = import.meta.env.VITE_FORMSPREE_FORM_ID?.trim();

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

  const res = await fetch(`https://formspree.io/f/${FORM_ID}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      email,
      plan,
      plan_label: planLabel,
      submitted_at: new Date().toISOString(),
      _replyto: email,
      _subject: `New noryx trial request — ${planLabel}`,
      message: [
        "New trial request from noryxtest.io",
        "",
        `Name: ${name}`,
        `Company email: ${email}`,
        `Plan: ${planLabel}`,
      ].join("\n"),
    }),
  });

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
