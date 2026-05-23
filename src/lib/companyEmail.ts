/** Common personal / consumer mail hosts — trial signups require a company domain. */
const PERSONAL_EMAIL_DOMAINS = new Set([
  "126.com",
  "163.com",
  "aol.com",
  "att.net",
  "bellsouth.net",
  "btinternet.com",
  "charter.net",
  "comcast.net",
  "cox.net",
  "email.com",
  "fastmail.com",
  "foxmail.com",
  "gmail.com",
  "gmx.com",
  "gmx.net",
  "googlemail.com",
  "hey.com",
  "hotmail.co.uk",
  "hotmail.com",
  "hotmail.fr",
  "icloud.com",
  "inbox.com",
  "laposte.net",
  "libero.it",
  "live.com",
  "mac.com",
  "mail.com",
  "mail.ru",
  "me.com",
  "msn.com",
  "naver.com",
  "orange.fr",
  "outlook.com",
  "outlook.co.uk",
  "pm.me",
  "proton.me",
  "protonmail.com",
  "qq.com",
  "rediffmail.com",
  "rocketmail.com",
  "sbcglobal.net",
  "sina.com",
  "tutanota.com",
  "tuta.io",
  "verizon.net",
  "web.de",
  "yahoo.co.in",
  "yahoo.co.uk",
  "yahoo.com",
  "yandex.com",
  "yandex.ru",
  "ymail.com",
  "zoho.com",
]);

const EMAIL_FORMAT = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function getEmailDomain(email: string): string | null {
  const trimmed = email.trim().toLowerCase();
  const at = trimmed.lastIndexOf("@");
  if (at < 1 || at === trimmed.length - 1) return null;
  return trimmed.slice(at + 1);
}

export function isCompanyEmail(email: string): boolean {
  const domain = getEmailDomain(email);
  if (!domain || !EMAIL_FORMAT.test(email.trim())) return false;
  return !PERSONAL_EMAIL_DOMAINS.has(domain);
}

export function getCompanyEmailError(email: string): string | null {
  const trimmed = email.trim();
  if (!trimmed) return "Company email is required";
  if (!EMAIL_FORMAT.test(trimmed)) return "Enter a valid email address";
  if (!isCompanyEmail(trimmed)) {
    return "Use your company email. Personal providers (Gmail, Outlook, Yahoo, etc.) aren’t accepted.";
  }
  return null;
}
