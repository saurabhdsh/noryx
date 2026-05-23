import { getCompanyEmailError } from "./companyEmail";

export type PlanId = "starter" | "growth" | "business" | "enterprise";

export type User = {
  id: string;
  email: string;
  name: string;
  company: string;
  teamSize: string;
  plan: PlanId;
  createdAt: string;
};

export type SignUpInput = {
  email: string;
  name: string;
  company?: string;
  teamSize?: string;
  plan: PlanId;
};

const USERS_KEY = "noryx_users";
const SESSION_KEY = "noryx_session";

type StoredUser = User & { passwordHash?: string };

function readUsers(): StoredUser[] {
  try {
    const raw = localStorage.getItem(USERS_KEY);
    return raw ? (JSON.parse(raw) as StoredUser[]) : [];
  } catch {
    return [];
  }
}

function writeUsers(users: StoredUser[]) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

/** Demo-only hash — replace with server-side auth in production. */
async function hashPassword(password: string): Promise<string> {
  const data = new TextEncoder().encode(password);
  const buf = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

function toPublicUser(user: StoredUser): User {
  const { passwordHash: _, ...publicUser } = user;
  return publicUser;
}

function registerTrialUser(input: SignUpInput): StoredUser {
  const users = readUsers();
  const normalizedEmail = input.email.trim().toLowerCase();

  if (users.some((u) => u.email === normalizedEmail)) {
    throw new Error("A trial request with this email already exists.");
  }

  const emailError = getCompanyEmailError(normalizedEmail);
  if (emailError) throw new Error(emailError);

  if (!input.name.trim()) {
    throw new Error("Name is required.");
  }

  const user: StoredUser = {
    id: crypto.randomUUID(),
    email: normalizedEmail,
    name: input.name.trim(),
    company: input.company?.trim() ?? "",
    teamSize: input.teamSize ?? "1–10",
    plan: input.plan,
    createdAt: new Date().toISOString(),
  };

  users.push(user);
  writeUsers(users);
  return user;
}

/** Saves a trial request without signing the user in (queue flow). */
export async function submitTrialRequest(input: SignUpInput): Promise<User> {
  return toPublicUser(registerTrialUser(input));
}

export async function signUp(input: SignUpInput): Promise<User> {
  const user = registerTrialUser(input);
  setSession(user.id);
  return toPublicUser(user);
}

export async function signIn(email: string, password: string): Promise<User> {
  const users = readUsers();
  const normalizedEmail = email.trim().toLowerCase();
  const match = users.find((u) => u.email === normalizedEmail);

  if (!match) {
    throw new Error("No account found with this email.");
  }

  if (!match.passwordHash) {
    throw new Error("This trial account has no password. Use Start free trial to register.");
  }

  const hash = await hashPassword(password);
  if (hash !== match.passwordHash) {
    throw new Error("Incorrect password.");
  }

  setSession(match.id);
  return toPublicUser(match);
}

export function signOut() {
  localStorage.removeItem(SESSION_KEY);
}

export function getSessionUserId(): string | null {
  return localStorage.getItem(SESSION_KEY);
}

function setSession(userId: string) {
  localStorage.setItem(SESSION_KEY, userId);
}

export function getCurrentUser(): User | null {
  const id = getSessionUserId();
  if (!id) return null;
  const user = readUsers().find((u) => u.id === id);
  return user ? toPublicUser(user) : null;
}

export const PLAN_LABELS: Record<PlanId, string> = {
  starter: "Starter — 3 agents",
  growth: "Growth — 10 agents",
  business: "Business — 50 agents",
  enterprise: "Enterprise — Unlimited",
};

export const PLAN_AGENT_LIMIT: Record<PlanId, number | null> = {
  starter: 3,
  growth: 10,
  business: 50,
  enterprise: null,
};
